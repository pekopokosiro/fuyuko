---
name: WordPress自動投稿化計画
description: irokazari公式ブログをAIが自動投稿できるようにするための設計と準備状況
type: project
---

WordPress REST APIを使い、Claudeが公式ブログ（irokazari.com）を自動投稿する仕組みを構築する。

**Why:** pekopoko自身が投稿操作をしなくてもブログ発信が回るようにする。新作・イベント出店などのトリガーがあれば自動で記事化・公開まで完結させたい。

**How to apply:** 以下の準備が完了次第、自動投稿フローを稼働させる。

## やること（2026-04-10時点・未対応）

### 1. WordPressアプリケーションパスワード発行（pekopoko作業・5分）
- WordPress管理画面 → ユーザー → プロフィール → アプリケーションパスワード
- 名前「Claude」で発行 → 表示されたパスワードをClaudeに伝える

### 2. 画像フォルダの整備（USB解決後）
- USBメモリを `/Volumes/irokazari-images/` という名前でマウントできるようにする
  - Finderでボリューム名を `irokazari-images` に変更するだけ
- フォルダ構成：
  ```
  /Volumes/irokazari-images/
      ├── products/   ← 商品写真（BASEタイトルに合わせた名前）
      ├── events/     ← イベント・出店写真
      ├── characters/ ← おこげ・もなか
      └── general/    ← 汎用・背景
  ```
- 画像はBASEタイトルに合わせた名前で保存する運用
- 作業開始時「USB刺した」と一言言えばClaudeがマウント確認→画像選別→アップロード

### 3. ブログ記事HTMLテンプレート作成（Claude作業）
- Notionドラフト → HTML変換 → リンクボタン付きで公開まで完結

## 技術仕様
- WordPress REST API（`/wp/v2/posts`・`/wp/v2/media`）
- curlコマンドで記事作成・画像アップロード・アイキャッチ設定・公開予約すべて可能
- Claudeが画像ファイルを視覚的に判断して内容に合う画像を選べる

## 現状のブロッカー
- USBハブが認識しない（別ハブまたは直刺しで対応予定）
- APIパスワード未発行
