const express = require('express');
const router = express.Router();
const db = require('../database/init');

// 月別レポートを取得
router.get('/monthly/:month', (req, res) => {
  const { month } = req.params;

  const query = `
    SELECT 
      type,
      category,
      SUM(amount) as total
    FROM transactions
    WHERE strftime('%Y-%m', date) = ?
    GROUP BY type, category
    ORDER BY type, total DESC
  `;

  db.all(query, [month], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

// 収支サマリーを取得
router.get('/summary/:month', (req, res) => {
  const { month } = req.params;

  const query = `
    SELECT 
      type,
      SUM(amount) as total
    FROM transactions
    WHERE strftime('%Y-%m', date) = ?
    GROUP BY type
  `;

  db.all(query, [month], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    const summary = {
      income: 0,
      expense: 0,
      balance: 0
    };

    rows.forEach(row => {
      if (row.type === 'income') {
        summary.income = row.total;
      } else if (row.type === 'expense') {
        summary.expense = row.total;
      }
    });

    summary.balance = summary.income - summary.expense;

    res.json(summary);
  });
});

// カテゴリ別分析を取得
router.get('/category-analysis/:month', (req, res) => {
  const { month } = req.params;

  const query = `
    SELECT 
      category,
      type,
      SUM(amount) as total,
      COUNT(*) as count
    FROM transactions
    WHERE strftime('%Y-%m', date) = ?
    GROUP BY category, type
    ORDER BY total DESC
  `;

  db.all(query, [month], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json(rows);
  });
});

module.exports = router;
