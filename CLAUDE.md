# morning-dashboard プロジェクト構成

## デプロイ構成

| 役割 | サービス | URL |
|------|---------|-----|
| フロントエンド | Vercel | https://frontend-smoky-chi-72.vercel.app |
| バックエンド | Render | https://morning-dashboard-back.onrender.com |

## デプロイ方法

**フロントエンド（Vercel）：**
```bash
cd frontend
vercel --prod
```

**バックエンド（Render）：**
- GitHub リポジトリ：https://github.com/YukaChristina/morning-dashboard-back
- `git push` するとRenderが自動デプロイ
- Renderが実行するファイル：リポジトリルートの `server.js` と `routes/`

## ローカルとリモートの構造の違い（重要）

ローカルはmonorepo構造：
```
backend/
  routes/
  server.js
frontend/
  src/
```

GitHubの `morning-dashboard-back` リポジトリはバックエンドのみ、ルート直下に配置：
```
routes/      ← Renderはここを使う
server.js    ← Renderはここを使う
package.json
frontend/    ← Renderは無視
backend/     ← Renderは無視（ローカルのmonorepo構造が混入済み）
```

**バックエンドを変更する際は必ず `routes/` と `server.js`（ルートレベル）を編集すること。**
`backend/routes/` を編集してもRenderには反映されない。

## 環境変数

**Render：**
- `FRED_API_KEY`：FRED（経済指標）APIキー
- `NEWS_API_KEY`：NewsAPIキー（Bloomberg ニュース取得用）

**Vercel：**
- `VITE_API_BASE`：`https://morning-dashboard-back.onrender.com/api`

## 現在の既知の問題（2026-03-28時点）

- Bloombergニュース欄が空欄になることがある
  - NewsAPI経由に切り替え済みだが、土日は記事が少なく空欄になる場合あり
  - 月曜日に平日の動作を確認予定

## 注意事項

- Renderの無料プランはスリープあり（初回アクセスに50秒以上かかる場合がある）
- フロントの `EconomicIndicators.jsx` は `VITE_API_BASE` を使ってAPIを呼ぶ
- Yahoo Finance APIは非公式のため、仕様変更の可能性あり
