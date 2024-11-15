import sqlite3 from "sqlite3";
import { run, get, close } from "./db_utils.js";

async function executeWithError() {
  const db = new sqlite3.Database(":memory:");

  try {
    await run(
      db,
      "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
    );
    console.log("テーブルを作成しました");

    const result = await run(db, "INSERT INTO books (title) VALUES (?)", [
      "Async/awaitでの本",
    ]);
    console.log(`レコードを追加しました。ID: ${result.lastID}`);

    // 重複エラーのみ捕捉
    try {
      await run(db, "INSERT INTO books (title) VALUES (?)", [
        "Async/awaitでの本",
      ]);
    } catch (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        console.error("重複したレコード追加エラー:", err.message);
      } else {
        throw err; // 他のエラーは再スロー
      }
    }

    const nonExistentRow = await get(db, "SELECT * FROM books WHERE id = ?", [
      999,
    ]);
    if (!nonExistentRow) {
      console.log("指定されたIDのレコードは存在しません。");
    }

    await run(db, "DROP TABLE books");
    console.log("テーブルを削除しました");
  } finally {
    await close(db).catch((err) =>
      console.error("データベースを閉じるときのエラー:", err.message),
    );
    console.log("データベースを正常に閉じました");
  }
}

await executeWithError();
