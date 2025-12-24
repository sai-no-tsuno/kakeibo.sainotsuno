import React, { useState } from 'react';

function BudgetForm({ onAdd }) {
  const [formData, setFormData] = useState({
    category: '',
    limit_amount: '',
    month: new Date().toISOString().slice(0, 7)
  });

  const categories = ['食事', '交通', '娯楽', '医療', '教育', 'その他'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category || !formData.limit_amount) {
      alert('カテゴリと予算額を入力してください');
      return;
    }
    onAdd(formData);
    setFormData({
      category: '',
      limit_amount: '',
      month: new Date().toISOString().slice(0, 7)
    });
  };

  return (
    <form onSubmit={handleSubmit} className="budget-form">
      <div className="form-group">
        <label>カテゴリ</label>
        <select name="category" value={formData.category} onChange={handleChange}>
          <option value="">選択してください</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>予算額</label>
        <input
          type="number"
          name="limit_amount"
          value={formData.limit_amount}
          onChange={handleChange}
          placeholder="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label>月</label>
        <input
          type="month"
          name="month"
          value={formData.month}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-submit">予算を設定</button>
    </form>
  );
}

export default BudgetForm;
