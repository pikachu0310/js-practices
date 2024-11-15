import sqlite3 from "sqlite3";
import { run, get, close } from "./db_utils.js";

async function executeWithoutError() {
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

    const row = await get(db, "SELECT * FROM books WHERE id = ?", [
      result.lastID,
    ]);
    console.log("取得したレコード:", row);

    await run(db, "DROP TABLE books");
    console.log("テーブルを削除しました");
  } finally {
    await close(db).catch((err) =>
      console.error("データベースを閉じるときのエラー:", err.message),
    );
    console.log("データベースを正常に閉じました");
  }
}

await executeWithoutError();
