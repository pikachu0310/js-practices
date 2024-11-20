#!/usr/bin/env node

import { MemoApp } from "./MemoApp.js";

async function main() {
  const app = new MemoApp();
  await app.storage.init();

  const command = process.argv[2] || "-a";

  switch (command) {
    case "-a":
      await app.addFromStdin();
      break;
    case "-l":
      await app.list();
      break;
    case "-r":
      await app.read();
      break;
    case "-d":
      await app.delete();
      break;
    default:
      console.log("使い方:");
      console.log("  -a      メモを追加 (標準入力を利用)");
      console.log("  -l      メモの一覧を表示");
      console.log("  -r      メモを参照");
      console.log("  -d      メモを削除");
      break;
  }
}

main();
