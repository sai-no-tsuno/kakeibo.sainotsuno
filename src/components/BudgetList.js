import React from 'react';

function BudgetList({ budgets, onDelete }) {
  return (
    <div className="budget-list">
      {budgets.length === 0 ? (
        <p>予算はありません</p>
      ) : (
        <div className="budget-cards">
          {budgets.map(budget => (
            <div key={budget.id} className="budget-card">
              <h3>{budget.category}</h3>
              <p className="month">{budget.month}</p>
              <p className="limit-amount">予算: ¥{budget.limit_amount.toLocaleString()}</p>
              <button onClick={() => onDelete(budget.id)} className="btn-delete">削除</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BudgetList;
