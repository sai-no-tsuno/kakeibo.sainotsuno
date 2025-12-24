import React from 'react';

function GoalList({ goals, onDelete }) {
  const getProgressPercentage = (current, target) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <div className="goal-list">
      {goals.length === 0 ? (
        <p>目標はありません</p>
      ) : (
        <div className="goal-cards">
          {goals.map(goal => {
            const percentage = getProgressPercentage(goal.current_amount, goal.target_amount);
            return (
              <div key={goal.id} className={`goal-card ${goal.status}`}>
                <h3>{goal.name}</h3>
                <p className="target-amount">
                  ¥{goal.current_amount.toLocaleString()} / ¥{goal.target_amount.toLocaleString()}
                </p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
                </div>
                <p className="percentage">{percentage.toFixed(1)}%</p>
                {goal.target_date && <p className="target-date">目標日: {goal.target_date}</p>}
                <button onClick={() => onDelete(goal.id)} className="btn-delete">削除</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default GoalList;
