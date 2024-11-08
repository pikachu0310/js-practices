import sqlite3 from "sqlite3";
import { run, get, close } from "./db_utils.js";

const db = new sqlite3.Database(":memory:");

run(
  db,
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
)
  .then(() => {
    console.log("テーブルを作成しました");

    return run(db, "INSERT INTO books (title) VALUES (?)", ["Promiseでの本"]);
  })
  .then(function (result) {
    console.log(`レコードを追加しました。ID: ${result.lastID}`);

    return get(db, "SELECT * FROM books WHERE id = ?", [result.lastID]);
  })
  .then((row) => {
    console.log("取得したレコード:", row);

    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルを削除しました");

    return close(db);
  })
  .then(() => {
    console.log("データベースを正常に閉じました");
  })
  .catch((err) => {
    console.error("エラー:", err.message);
  });
