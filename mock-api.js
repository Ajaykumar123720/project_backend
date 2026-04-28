const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 8080;
app.use(cors());
app.use(express.json());

const funds = [
  { id: '1', name: 'BlueChip Growth Fund', category: 'Equity', subcategory: 'Large Cap', nav: 58.34, aum: 32500, expenseRatio: 0.89, riskLevel: 'High', rating: 5, returns1Y: 18.5, returns3Y: 15.2, returns5Y: 14.8, fundManager: 'Rajesh Kumar', fundHouse: 'Axis Mutual Fund', minInvestment: 5000, sipMin: 500, launched: '2013-01-15', benchmark: 'Nifty 50', navHistory: [{date:'2021-01-01', value:40},{date:'2026-01-01', value:58.34}] },
  { id: '2', name: 'Corporate Bond Fund', category: 'Debt', subcategory: 'Corporate Bond', nav: 15.67, aum: 18200, expenseRatio: 0.45, riskLevel: 'Low', rating: 4, returns1Y: 7.2, returns3Y: 7.8, returns5Y: 8.1, fundManager: 'Priya Sharma', fundHouse: 'HDFC Mutual Fund', minInvestment: 1000, sipMin: 100, launched: '2015-06-20', benchmark: 'CRISIL Corporate Bond', navHistory:[{date:'2021-01-01',value:12},{date:'2026-01-01',value:15.67}] },
  { id: '3', name: 'Balanced Advantage Fund', category: 'Hybrid', subcategory: 'Dynamic Asset Allocation', nav: 32.89, aum: 45000, expenseRatio: 0.72, riskLevel: 'Moderate', rating: 5, returns1Y: 12.4, returns3Y: 11.8, returns5Y: 12.5, fundManager: 'Amit Patel', fundHouse: 'ICICI Prudential', minInvestment: 5000, sipMin: 500, launched: '2014-03-10', benchmark: 'Nifty 50 Hybrid Composite', navHistory:[{date:'2021-01-01',value:25},{date:'2026-01-01',value:32.89}] }
];

const users = { 'demo@example.com': { id: '1', fullName: 'Demo User', email: 'demo@example.com', role: 'investor' } };

app.get('/api/funds', (req, res) => res.json(funds));
app.get('/api/funds/:id', (req, res) => {
  const f = funds.find(x => x.id === req.params.id);
  if (!f) return res.status(404).json({ error: 'Fund not found' });
  res.json(f);
});
app.get('/api/health', (req, res) => res.json({ status: 'UP' }));
app.post('/api/login', (req, res) => {
  const { email } = req.body;
  const u = users[email];
  if (!u) return res.status(401).json({ error: 'Invalid credentials' });
  return res.json({ user: u });
});
app.post('/api/register', (req, res) => {
  const { fullName, email, password, role } = req.body;
  if (users[email]) return res.status(409).json({ error: 'Email already exists' });
  const id = String(Date.now());
  users[email] = { id, fullName, email, role: role || 'investor' };
  res.json({ user: users[email] });
});

app.listen(PORT, () => console.log(`Mock API listening on http://localhost:${PORT}`));
