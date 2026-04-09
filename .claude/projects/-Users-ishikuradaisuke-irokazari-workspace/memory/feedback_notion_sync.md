---
name: notion_sync_rule
description: CLAUDE.md更新時はNotionの「Claude 動作指示書」にも同じ内容を反映する
type: feedback
---

CLAUDE.mdを更新したとき、またはgit pushをしたとき、Notionの「Claude 動作指示書」（ID: 33bf9149-2041-8070-8444-cddfb0c7689c）にも同じ内容を追加・更新すること。

**Why:** Claude Codeが使えない障害時にはアプリ版（claude.ai）が代行するが、アプリ版はローカルファイルを読めない。Notionにも指示書があることで、どのClaudeが対応しても同じルールで動ける体制を維持するため。

**How to apply:** CLAUDE.mdの内容を変更した場合、またはルール・ペルソナ情報を更新した場合は、必ずNotionの「Claude 動作指示書」にも反映する。git pushと同じタイミングで行う。
