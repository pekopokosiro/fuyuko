---
name: タロットアプリ Xserverアップロード計画
description: irokazari.com/tarot/ へのアップロードとDB実装を翌日（2026-03-28）に予定
type: project
---

タロットカードアプリを irokazari.com/tarot/ にアップロード予定（2026-03-28）。

**アップロード手順（明日出す）：**
- ツール：Cyberduck（FTP）
- 対象フォルダ：irokazari-workspace/タロットカード/ → サーバー上で /tarot/ にリネーム
- 除外ファイル：.DS_Store

**同時実装予定：データベース連携**
- Xserver付属MySQL + PHP API
- save_reading.php：占い結果を保存
- storage.jsをlocalStorage → PHP APIに切り替え
- 管理者向けstats.htmlで全ユーザー集計

**Why:** 他ユーザーが使う前提のため、履歴をサーバー側に保存する必要がある

**How to apply:** 翌日の作業開始時に手順書を提示する。MySQL DB名・ユーザー名をXserverパネルで確認するよう促す。
