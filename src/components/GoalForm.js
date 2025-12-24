import React, { useState } from 'react';

function GoalForm({ onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    target_amount: '',
    target_date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.target_amount) {
      alert('目標名と目標額を入力してください');
      return;
    }
    onAdd(formData);
    setFormData({
      name: '',
      target_amount: '',
      target_date: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="goal-form">
      <div className="form-group">
        <label>目標名</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="例: 海外旅行、新車購入"
        />
      </div>

      <div className="form-group">
        <label>目標額</label>
        <input
          type="number"
          name="target_amount"
          value={formData.target_amount}
          onChange={handleChange}
          placeholder="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label>目標日</label>
        <input
          type="date"
          name="target_date"
          value={formData.target_date}
          onChange={handleChange}
        />
      </div>

      <button type="submit" className="btn-submit">目標を追加</button>
    </form>
  );
}

export default GoalForm;
