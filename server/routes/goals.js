const express = require('express');
const router = express.Router();
const db = require('../database/init');

// すべての目標を取得
router.get('/', (req, res) => {
  const query = `SELECT * FROM goals ORDER BY target_date ASC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 目標を作成
router.post('/', (req, res) => {
  const { name, target_amount, target_date } = req.body;

  if (!name || !target_amount) {
    res.status(400).json({ error: '必須フィールドが不足しています' });
    return;
  }

  const query = `
    INSERT INTO goals (name, target_amount, target_date)
    VALUES (?, ?, ?)
  `;

  db.run(query, [name, target_amount, target_date], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// 目標を更新
router.put('/:id', (req, res) => {
  const { name, target_amount, current_amount, target_date, status } = req.body;
  const { id } = req.params;

  const query = `
    UPDATE goals 
    SET name = ?, target_amount = ?, current_amount = ?, target_date = ?, status = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [name, target_amount, current_amount, target_date, status, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

// 目標を削除
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM goals WHERE id = ?`;

  db.run(query, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;
