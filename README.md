# 家計簿アプリ

家計簿アプリは、個人の収支管理、予算設定、貯金目標の管理、および支出分析を行うための包括的なWebアプリケーションです。

## 主な機能

### 1. 収支管理
- 日々の収入と支出を記録
- カテゴリ別の分類
- 日付ごとの履歴管理
- 取引の編集・削除が可能

### 2. 予算管理
- 月別・カテゴリ別の予算設定
- 予算の編集・削除
- 支出が予算を超えた場合のアラート機能

### 3. 貯金目標管理
- 複数の貯金目標を設定
- 進捗状況の可視化（プログレスバー）
- 目標達成度の確認

### 4. レポート・分析
- 月別の収支サマリー
- カテゴリ別の支出分析
- グラフやチャートによる可視化
  - 棒グラフ：カテゴリ別の収支比較
  - 円グラフ：支出分布の表示

### 5. 通知機能
- 予算超過時のアラート
- 支払い期限のリマインダー
- 目標達成状況の通知

### 6. データ同期
- ブラウザ側でのリアルタイムデータ管理
- バックエンドとの同期

## 技術構成

### バックエンド
- **言語**: Node.js
- **フレームワーク**: Express.js
- **データベース**: SQLite3

### フロントエンド
- **ライブラリ**: React 18
- **ルーティング**: React Router v6
- **HTTP通信**: Axios
- **チャート**: Chart.js & react-chartjs-2
- **日付操作**: date-fns
- **スタイリング**: CSS3

## インストール

```bash
# 依存パッケージのインストール
npm install
```

## 使い方

### サーバーの起動

```bash
# 開発モードでサーバーを起動
npm run dev

# または本番モードで起動
npm start
```

サーバーは http://localhost:5000 で起動します。

### クライアントの起動

別のターミナルウィンドウで：

```bash
npm run client
```

クライアントは http://localhost:3000 で起動します。

## プロジェクト構造

```
家計簿/
├── src/
│   ├── components/           # Reactコンポーネント
│   │   ├── TransactionForm.js
│   │   ├── TransactionList.js
│   │   ├── BudgetForm.js
│   │   ├── BudgetList.js
│   │   ├── GoalForm.js
│   │   ├── GoalList.js
│   │   └── ReportChart.js
│   ├── pages/               # ページコンポーネント
│   │   ├── TransactionPage.js
│   │   ├── BudgetPage.js
│   │   ├── GoalPage.js
│   │   └── ReportPage.js
│   ├── styles/              # CSS スタイル
│   │   ├── index.css
│   │   ├── TransactionPage.css
│   │   ├── BudgetPage.css
│   │   ├── GoalPage.css
│   │   └── ReportPage.css
│   ├── App.js               # メインアプリケーション
│   └── index.js             # エントリーポイント
├── server/
│   ├── database/            # データベース関連
│   │   └── init.js
│   ├── routes/              # APIルート
│   │   ├── transactions.js
│   │   ├── budgets.js
│   │   ├── goals.js
│   │   └── reports.js
│   ├── middleware/          # ミドルウェア（拡張用）
│   └── server.js            # メインサーバーファイル
├── public/
│   └── index.html           # HTMLテンプレート
├── package.json             # 依存関係と設定
├── .env                     # 環境変数
└── .gitignore              # Gitで除外するファイル
```

## API エンドポイント

### トランザクション
- `GET /api/transactions` - すべてのトランザクションを取得
- `POST /api/transactions` - 新しいトランザクションを作成
- `PUT /api/transactions/:id` - トランザクションを更新
- `DELETE /api/transactions/:id` - トランザクションを削除

### 予算
- `GET /api/budgets` - すべての予算を取得
- `POST /api/budgets` - 新しい予算を作成
- `PUT /api/budgets/:id` - 予算を更新
- `DELETE /api/budgets/:id` - 予算を削除

### 目標
- `GET /api/goals` - すべての目標を取得
- `POST /api/goals` - 新しい目標を作成
- `PUT /api/goals/:id` - 目標を更新
- `DELETE /api/goals/:id` - 目標を削除

### レポート
- `GET /api/reports/monthly/:month` - 月別レポートを取得
- `GET /api/reports/summary/:month` - 収支サマリーを取得
- `GET /api/reports/category-analysis/:month` - カテゴリ別分析を取得

## 環境変数

`.env` ファイルに以下の変数を設定します：

```
NODE_ENV=development
PORT=5000
DATABASE_PATH=./server/database/kakeibo.db
```

## ライセンス

MIT
