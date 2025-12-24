const express = require('express');
const router = express.Router();
const db = require('../database/init');

// すべての予算を取得
router.get('/', (req, res) => {
  const query = `SELECT * FROM budgets ORDER BY month DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 予算を作成
router.post('/', (req, res) => {
  const { category, limit_amount, month } = req.body;

  if (!category || !limit_amount || !month) {
    res.status(400).json({ error: '必須フィールドが不足しています' });
    return;
  }

  const query = `
    INSERT INTO budgets (category, limit_amount, month)
    VALUES (?, ?, ?)
  `;

  db.run(query, [category, limit_amount, month], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// 予算を更新
router.put('/:id', (req, res) => {
  const { category, limit_amount, month } = req.body;
  const { id } = req.params;

  const query = `
    UPDATE budgets 
    SET category = ?, limit_amount = ?, month = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [category, limit_amount, month, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

// 予算を削除
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM budgets WHERE id = ?`;

  db.run(query, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;
