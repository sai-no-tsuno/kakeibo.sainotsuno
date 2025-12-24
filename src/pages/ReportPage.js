import React, { useState, useEffect } from 'react';
import ReportChart from '../components/ReportChart';
import '../styles/ReportPage.css';

function ReportPage() {
  const [reportData, setReportData] = useState([]);
  const [summary, setSummary] = useState({ income: 0, expense: 0, balance: 0 });
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7));
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchReport();
  }, [selectedMonth]);

  const fetchReport = () => {
    setLoading(true);
    const storedTransactions = JSON.parse(localStorage.getItem('transactions')) || [];

    const income = storedTransactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

    const expense = storedTransactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + parseFloat(tx.amount), 0);

    setSummary({ income, expense, balance: income - expense });

    const categoryAnalysis = storedTransactions.reduce((acc, tx) => {
      if (!acc[tx.category]) {
        acc[tx.category] = { income: 0, expense: 0 };
      }
      acc[tx.category][tx.type] += parseFloat(tx.amount);
      return acc;
    }, {});

    setReportData(Object.entries(categoryAnalysis).map(([category, data]) => ({
      category,
      ...data
    })));

    setLoading(false);
  };

  return (
    <div className="report-page">
      <h1>レポート・分析</h1>
      <div className="month-selector">
        <label htmlFor="month">月を選択: </label>
        <input
          id="month"
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        />
      </div>

      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <>
          {summary && (
            <div className="summary-box">
              <div className="summary-item">
                <span>収入</span>
                <span className="amount income">¥{summary.income.toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>支出</span>
                <span className="amount expense">¥{summary.expense.toLocaleString()}</span>
              </div>
              <div className="summary-item">
                <span>残高</span>
                <span className={`amount ${summary.balance >= 0 ? 'positive' : 'negative'}`}>
                  ¥{summary.balance.toLocaleString()}
                </span>
              </div>
            </div>
          )}
          {reportData && <ReportChart data={reportData} />}
        </>
      )}
    </div>
  );
}

export default ReportPage;
