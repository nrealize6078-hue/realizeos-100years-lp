# REALIZE OS 採用LP「100年後の子どもたちに、何を残す？」

chatgpt.site 版（`https://realizeos-careers.uminchu-t0422.chatgpt.site/100-years/`）を複製し、
自前で編集・公開できるようにしたもの。

## 公開先

https://nrealize6078-hue.github.io/realizeos-100years-lp/ （GitHub Pages・検索掲載あり）

## 構成

ビルド不要の静的サイト。外部フォント・CDN・計測タグはなし。

| ファイル | 内容 |
|---|---|
| `index.html` | ページ本体 |
| `styles.css` | デザイン一式 |
| `script.js` | アンカーリンクのフォーカス移動のみ |
| `assets/` | 画像2点 |

## 編集と反映

`index.html` / `styles.css` を直接編集して push すれば Pages に反映される。
ローカルプレビューは `.claude/launch.json` の `lp-100years`（ポート8963）。

## 元サイトからの変更点

- 参照パスを相対パス化（`/100-years/styles.css` → `styles.css` など）
- `canonical` / `og:url` を Pages の URL に変更
- ヘッダー・フッターの採用トップへのリンク（`/`・`/#jobs`・`/#gym`）は、
  別リポジトリで公開している採用トップ（`nrealize6078-hue/realizeos-careers-lp`）の絶対URLに向けている。
  将来2ページを1リポジトリにまとめる場合は相対パスに戻すこと。
