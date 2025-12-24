const express = require('express');
const router = express.Router();
const db = require('../database/init');

// すべてのトランザクションを取得
router.get('/', (req, res) => {
  const query = `SELECT * FROM transactions ORDER BY date DESC`;
  db.all(query, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// トランザクションを作成
router.post('/', (req, res) => {
  const { type, category, amount, description, date } = req.body;

  if (!type || !category || !amount || !date) {
    res.status(400).json({ error: '必須フィールドが不足しています' });
    return;
  }

  const query = `
    INSERT INTO transactions (type, category, amount, description, date)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(query, [type, category, amount, description, date], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ id: this.lastID });
  });
});

// トランザクションを更新
router.put('/:id', (req, res) => {
  const { type, category, amount, description, date } = req.body;
  const { id } = req.params;

  const query = `
    UPDATE transactions 
    SET type = ?, category = ?, amount = ?, description = ?, date = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  db.run(query, [type, category, amount, description, date, id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

// トランザクションを削除
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM transactions WHERE id = ?`;

  db.run(query, [id], function(err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ success: true });
  });
});

module.exports = router;
