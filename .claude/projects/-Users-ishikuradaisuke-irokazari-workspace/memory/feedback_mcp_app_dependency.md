---
name: MCP連携エラー時のClaudeアプリ起動リマインド
description: Notion等のmcp__claude_ai__系ツールが失敗した際はClaudeデスクトップアプリの起動を促す
type: feedback
---

`mcp__claude_ai_Notion__*` や `mcp__claude_ai_Google_Calendar__*` など `claude_ai` 系のMCPツールが読み取りに失敗した場合、pekopoko に「Claudeアプリ（デスクトップ）を起動してください」と伝えること。

**Why:** これらのツールはClaudeデスクトップアプリのOAuth連携を経由しているため、アプリが起動していないと使えない。pekopoko はオンライン環境で基本使うので、アプリを立ち上げていれば問題ない。

**How to apply:** MCPツールでエラーや空レスポンスが出たとき、真っ先に「Claudeアプリは起動していますか？」と確認する。
