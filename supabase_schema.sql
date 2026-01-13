-- SUPABASE SQL: Estrutura de tabelas e políticas RLS

-- 1. Tabela de perfis vinculada ao auth.users
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  name text not null,
  role text not null check (role in ('ADMIN', 'GESTOR', 'VENDEDORA', 'ANALISTA_ECOMMERCE', 'EMPACOTADOR')),
  last_login timestamptz,
  created_at timestamptz default now()
);

-- 2. Guias por Área
create table guides (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  role text not null,
  created_at timestamptz default now(),
  updated_at timestamptz
);

-- 3. Procedimentos Operacionais (SOP)
create table sops (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  steps jsonb not null,
  checklist jsonb,
  created_by uuid references profiles(id),
  created_at timestamptz default now(),
  updated_at timestamptz
);

create table sop_reads (
  id uuid default gen_random_uuid() primary key,
  sop_id uuid references sops(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  read_at timestamptz default now()
);

-- 4. Comunicados Internos
create table announcements (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  content text not null,
  author_id uuid references profiles(id),
  created_at timestamptz default now()
);

create table announcement_reads (
  id uuid default gen_random_uuid() primary key,
  announcement_id uuid references announcements(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  read_at timestamptz default now()
);

-- 5. Presença
create table attendance (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id) on delete cascade,
  date date not null,
  check_in timestamptz,
  check_out timestamptz,
  created_at timestamptz default now()
);

-- 6. Treinamentos
create table trainings (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  link text,
  created_at timestamptz default now()
);

create table training_progress (
  id uuid default gen_random_uuid() primary key,
  training_id uuid references trainings(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  progress int default 0,
  completed boolean default false,
  updated_at timestamptz
);

-- 7. Feedbacks
create table feedbacks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  content text not null,
  anonymous boolean default false,
  created_at timestamptz default now()
);

-- 8. Audit Logs
create table audit_logs (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references profiles(id),
  action text not null,
  table_name text not null,
  record_id uuid,
  created_at timestamptz default now()
);

-- POLÍTICAS RLS EXEMPLO
-- Ativar RLS nas tabelas
alter table profiles enable row level security;
alter table guides enable row level security;
alter table sops enable row level security;
alter table sop_reads enable row level security;
alter table announcements enable row level security;
alter table announcement_reads enable row level security;
alter table attendance enable row level security;
alter table trainings enable row level security;
alter table training_progress enable row level security;
alter table feedbacks enable row level security;
alter table audit_logs enable row level security;

-- Exemplo de política para profiles
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
create policy "Admins can manage all profiles" on profiles
  for all using (exists (select 1 from profiles p where p.id = auth.uid() and p.role = 'ADMIN'));

-- Exemplo de política para guides
create policy "View guides by role" on guides
  for select using (role = (select role from profiles where id = auth.uid()));
create policy "Admin/Gestor can insert guides" on guides
  for insert using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('ADMIN','GESTOR')));
create policy "Admin/Gestor can update guides" on guides
  for update using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('ADMIN','GESTOR')));

-- Exemplo de política para feedbacks
create policy "User can insert feedback" on feedbacks
  for insert using (auth.uid() = user_id);
create policy "Admin/Gestor can view all feedbacks" on feedbacks
  for select using (exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('ADMIN','GESTOR')));

-- Repita lógica similar para as demais tabelas conforme requisitos de acesso.