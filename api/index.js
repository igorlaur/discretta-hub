import express from 'express';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcrypt';
import cors from 'cors';
import helmet from 'helmet';
import { body, validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';

const app = express();
import path from 'path';
const dbPath = path.resolve(process.cwd(), 'discretta.db');
const db = new sqlite3.Database(dbPath);
const SECRET = process.env.JWT_SECRET || 'supersecretkey';

app.use(express.json());
app.use(cors());
app.use(helmet());

// Cria tabela de usuários segura
const userTable = `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  role TEXT NOT NULL CHECK(role IN ('ADMIN','GESTOR','VENDEDORA','ANALISTA_ECOMMERCE','EMPACOTADOR')),
  approved INTEGER NOT NULL DEFAULT 0
);`;
db.run(userTable);

// Registro seguro
app.post('/register',
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('role').isIn(['ADMIN','GESTOR','VENDEDORA','ANALISTA_ECOMMERCE','EMPACOTADOR']),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { name, email, password, role } = req.body;
    const hash = await bcrypt.hash(password, 10);
    db.run('INSERT INTO users (name, email, password, role, approved) VALUES (?, ?, ?, ?, 0)', [name, email, hash, role], function(err) {
      if (err) return res.status(400).json({ error: 'Email já cadastrado.' });
      res.json({ success: true, id: this.lastID });
    });
  }
);

// Login seguro
app.post('/login',
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body;
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err || !user) return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      if (!user.approved) return res.status(403).json({ error: 'Usuário não aprovado.' });
      const match = await bcrypt.compare(password, user.password);
      if (!match) return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
      const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '2h' });
      res.json({ success: true, token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    });
  }
);

// Aprovação de usuário (admin)
app.post('/approve',
  body('id').isInt(),
  body('approved').isBoolean(),
  (req, res) => {
    const { id, approved } = req.body;
    db.run('UPDATE users SET approved = ? WHERE id = ?', [approved ? 1 : 0, id], function(err) {
      if (err) return res.status(400).json({ error: 'Erro ao aprovar usuário.' });
      res.json({ success: true });
    });
  }
);

// Listar usuários (admin)
app.get('/users', (req, res) => {
  db.all('SELECT id, name, email, role, approved FROM users', [], (err, rows) => {
    if (err) return res.status(500).json({ error: 'Erro ao buscar usuários.' });
    res.json(rows);
  });
});

app.listen(3001, () => {
  console.log('API Discretta rodando em http://localhost:3001');
});
