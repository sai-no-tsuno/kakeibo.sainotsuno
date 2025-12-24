import React, { useState, useEffect } from 'react';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';
import '../styles/TransactionPage.css';

function TransactionPage() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];
    setTransactions(storedTransactions);
  }, []);

  const handleAddTransaction = (transaction) => {
    const updatedTransactions = [...transactions, transaction];
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((tx, index) => index !== id);
    setTransactions(updatedTransactions);
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  };

  return (
    <div className="transaction-page">
      <h1>収支管理</h1>
      <TransactionForm onAdd={handleAddTransaction} />
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <TransactionList transactions={transactions} onDelete={handleDeleteTransaction} />
      )}
    </div>
  );
}

export default TransactionPage;
