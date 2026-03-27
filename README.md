# Morning Dashboard（モーニングダッシュボード）

投資初心者が毎朝チェックする市場情報ダッシュボード。

## 機能

- 株価・指数・コモディティのリアルタイム表示（Yahoo Finance）
- TradingViewチャート埋め込み
- ロイターRSSニュース ＋ Claude AIによる市況サマリー
- 経済指標カレンダー

## セットアップ

### 1. バックエンド

```bash
cd backend
npm install
cp .env.example .env
# .env を開いて ANTHROPIC_API_KEY を設定する
```

### 2. バックエンド起動

```bash
npm run dev
# → http://localhost:3001 で起動
```

### 3. フロントエンド（別ターミナル）

```bash
cd frontend
npm install
npm run dev
# → http://localhost:5173 をブラウザで開く
```

## 注意事項

- `.env` は絶対にGitにコミットしないこと（`.gitignore` で除外済み）
- Yahoo Finance APIは非公式のため、仕様変更の可能性あり
- 経済指標カレンダーはハードコードのため、実績値は手動更新が必要
