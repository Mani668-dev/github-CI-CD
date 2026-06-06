const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'nodejs-api', timestamp: new Date().toISOString() });
});

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Node.js API', version: '1.0.0' });
});

const users = [
  { id: 1, name: 'Mulayam Yadav', role: 'Cloud Engineer' },
  { id: 2, name: 'John Doe', role: 'DevOps Engineer' }
];

app.get('/api/users', (req, res) => res.json({ success: true, data: users }));

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ success: false, message: 'User not found' });
  res.json({ success: true, data: user });
});

app.post('/api/users', (req, res) => {
  const { name, role } = req.body;
  if (!name || !role) return res.status(400).json({ success: false, message: 'name and role required' });
  const user = { id: users.length + 1, name, role };
  users.push(user);
  res.status(201).json({ success: true, data: user });
});

module.exports = app;
