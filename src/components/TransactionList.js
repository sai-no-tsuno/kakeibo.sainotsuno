import React from 'react';

function TransactionList({ transactions, onDelete }) {
  return (
    <div className="transaction-list">
      {transactions.length === 0 ? (
        <p>トランザクションはありません</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>日付</th>
              <th>種類</th>
              <th>カテゴリ</th>
              <th>金額</th>
              <th>説明</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map(tx => (
              <tr key={tx.id} className={tx.type}>
                <td>{tx.date}</td>
                <td>{tx.type === 'income' ? '収入' : '支出'}</td>
                <td>{tx.category}</td>
                <td className={`amount ${tx.type}`}>
                  {tx.type === 'income' ? '+' : '-'}¥{tx.amount.toLocaleString()}
                </td>
                <td>{tx.description}</td>
                <td>
                  <button onClick={() => onDelete(tx.id)} className="btn-delete">削除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default TransactionList;
