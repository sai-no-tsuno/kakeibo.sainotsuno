import React, { useState, useEffect } from 'react';
import GoalForm from '../components/GoalForm';
import GoalList from '../components/GoalList';
import '../styles/GoalPage.css';

function GoalPage() {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedGoals = JSON.parse(localStorage.getItem('goals')) || [];
    setGoals(storedGoals);
  }, []);

  const handleAddGoal = (goal) => {
    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  const handleDeleteGoal = (id) => {
    const updatedGoals = goals.filter((goal, index) => index !== id);
    setGoals(updatedGoals);
    localStorage.setItem('goals', JSON.stringify(updatedGoals));
  };

  return (
    <div className="goal-page">
      <h1>貯金目標</h1>
      <GoalForm onAdd={handleAddGoal} />
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <GoalList goals={goals} onDelete={handleDeleteGoal} />
      )}
    </div>
  );
}

export default GoalPage;
