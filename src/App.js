import React, { useState } from 'react';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import TransactionPage from './pages/TransactionPage';
import BudgetPage from './pages/BudgetPage';
import GoalPage from './pages/GoalPage';
import ReportPage from './pages/ReportPage';
import './styles/index.css';

function App() {
  const [activePage, setActivePage] = useState('transaction');

  return (
    <Router>
      <div className="app">
        <nav className="navbar">
          <h1>💰 家計簿</h1>
          <ul className="nav-links">
            <li>
              <Link 
                to="/" 
                className={activePage === 'transaction' ? 'active' : ''}
                onClick={() => setActivePage('transaction')}
              >
                📊 収支管理
              </Link>
            </li>
            <li>
              <Link 
                to="/budget" 
                className={activePage === 'budget' ? 'active' : ''}
                onClick={() => setActivePage('budget')}
              >
                💳 予算管理
              </Link>
            </li>
            <li>
              <Link 
                to="/goals" 
                className={activePage === 'goals' ? 'active' : ''}
                onClick={() => setActivePage('goals')}
              >
                🎯 貯金目標
              </Link>
            </li>
            <li>
              <Link 
                to="/reports" 
                className={activePage === 'reports' ? 'active' : ''}
                onClick={() => setActivePage('reports')}
              >
                📈 分析レポート
              </Link>
            </li>
          </ul>
        </nav>

        <div className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="container">
                <TransactionPage />
              </div>
            } />
            <Route path="/budget" element={
              <div className="container">
                <BudgetPage />
              </div>
            } />
            <Route path="/goals" element={
              <div className="container">
                <GoalPage />
              </div>
            } />
            <Route path="/reports" element={
              <div className="container">
                <ReportPage />
              </div>
            } />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
