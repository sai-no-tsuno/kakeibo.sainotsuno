import React, { useState, useEffect } from 'react';
import BudgetForm from '../components/BudgetForm';
import BudgetList from '../components/BudgetList';
import '../styles/BudgetPage.css';

function BudgetPage() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedBudgets = JSON.parse(localStorage.getItem('budgets')) || [];
    setBudgets(storedBudgets);
  }, []);

  const handleAddBudget = (budget) => {
    const updatedBudgets = [...budgets, budget];
    setBudgets(updatedBudgets);
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
  };

  const handleDeleteBudget = (id) => {
    const updatedBudgets = budgets.filter((budget, index) => index !== id);
    setBudgets(updatedBudgets);
    localStorage.setItem('budgets', JSON.stringify(updatedBudgets));
  };

  return (
    <div className="budget-page">
      <h1>予算管理</h1>
      <BudgetForm onAdd={handleAddBudget} />
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <BudgetList budgets={budgets} onDelete={handleDeleteBudget} />
      )}
    </div>
  );
}

export default BudgetPage;
