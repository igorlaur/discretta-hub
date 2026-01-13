# API Discretta (segura)

Como rodar:
1. Abra o terminal na pasta `api`
2. Execute: npm install
3. Execute: npm start

A API estará disponível em http://localhost:3001

Rotas principais:
- POST /register (name, email, password, role)
- POST /login (email, password)
- POST /approve (id, approved) [admin]
- GET /users [admin]

Senhas são protegidas com bcrypt. JWT para autenticação. Proteção contra SQL Injection e validação de dados.
