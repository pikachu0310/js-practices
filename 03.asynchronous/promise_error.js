import sqlite3 from "sqlite3";
import { run, get } from "./db_utils.js";

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

    return run(db, "INSERT INTO books (title) VALUES (?)", ["Promiseでの本"]);
  })
  .catch((err) => {
    console.error("重複したレコード追加エラー:", err.message);

    return get(db, "SELECT * FROM books WHERE id = ?", [999]);
  })
  .then((row) => {
    if (!row) {
      console.error("エラー: 指定されたIDのレコードは存在しません。");
    } else {
      console.log("取得したレコード:", row);
    }

    return run(db, "DROP TABLE books");
  })
  .then(() => {
    console.log("テーブルを削除しました");

    db.close((err) => {
      if (err) {
        console.error("データベースを閉じるときのエラー:", err.message);
      } else {
        console.log("データベースを正常に閉じました");
      }
    });
  })
  .catch((err) => {
    console.error("エラー:", err.message);
  });
