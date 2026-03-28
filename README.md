# Morning Dashboard（モーニングダッシュボード）

投資初心者が毎朝チェックする市場情報ダッシュボード。

## 公開URL

- フロントエンド：https://frontend-smoky-chi-72.vercel.app
- バックエンドAPI：https://morning-dashboard-back.onrender.com

## 機能

- マーケット概況（日経平均・NYダウ・ナスダック・S&P500・VIX・ドル円・ゴールド・原油・米10年国債利回りなど）
- Bloomberg ニュース（NewsAPI経由）
- TradingViewチャート埋め込み
- 経済指標（FRED API：雇用統計・CPI・GDP・政策金利など）
- 経済カレンダー

## デプロイ構成

| 役割 | サービス |
|------|---------|
| フロントエンド | Vercel |
| バックエンド | Render（GitHubプッシュで自動デプロイ） |

## ローカル開発セットアップ

### 1. バックエンド

```bash
cd backend
npm install
cp .env.example .env
# .env を開いて以下を設定
# FRED_API_KEY：https://fred.stlouisfed.org/docs/api/api_key.html
# NEWS_API_KEY：https://newsapi.org
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

## デプロイ方法

**フロントエンド：**
```bash
cd frontend
vercel --prod
```

**バックエンド：**
```bash
git add .
git commit -m "変更内容"
git push
# → Renderが自動デプロイ
```

## 注意事項

- `.env` は絶対にGitにコミットしないこと（`.gitignore` で除外済み）
- Yahoo Finance APIは非公式のため、仕様変更の可能性あり
- Renderの無料プランはスリープあり（初回アクセスに50秒以上かかる場合がある）
- Bloombergニュースは平日のみ記事が充実（土日は空欄になる場合あり）
