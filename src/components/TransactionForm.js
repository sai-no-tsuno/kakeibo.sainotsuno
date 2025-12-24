import React, { useState } from 'react';

function TransactionForm({ onAdd }) {
  const [formData, setFormData] = useState({
    type: 'expense',
    category: '',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });

  const categories = {
    income: ['給与', 'ボーナス', 'その他収入'],
    expense: ['食事', '交通', '娯楽', '医療', '教育', 'その他']
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.amount) {
      alert('カテゴリと金額を入力してください');
      return;
    }
    onAdd(formData);
    setFormData({
      type: 'expense',
      category: '',
      amount: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label>種類</label>
        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="income">収入</option>
          <option value="expense">支出</option>
        </select>
      </div>

      <div className="form-group">
        <label>カテゴリ</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">選択してください</option>
          {categories[formData.type].map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>金額</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          placeholder="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label>説明</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="説明を入力してください"
        />
      </div>

      <div className="form-group">
        <label>日付</label>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-submit">記録する</button>
    </form>
  );
}

export default TransactionForm;
