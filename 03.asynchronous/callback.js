import sqlite3 from "sqlite3";

const db = new sqlite3.Database(":memory:");

db.run(
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)",
  (err) => {
    if (err) {
      console.error("テーブル作成時のエラー:", err.message);
      return;
    }

    console.log("テーブルを作成しました");

    db.run(
      "INSERT INTO books (title) VALUES (?)",
      ["Node.jsの基礎"],
      function (err) {
        if (err) {
          console.error("レコード追加時のエラー:", err.message);
          return;
        }

        console.log(`レコードを追加しました。ID: ${this.lastID}`);

        db.get(
          "SELECT * FROM books WHERE id = ?",
          [this.lastID],
          (err, row) => {
            if (err) {
              console.error("レコード取得時のエラー:", err.message);
              return;
            }

            console.log("取得したレコード:", row);

            db.run("DROP TABLE books", (err) => {
              if (err) {
                console.error("テーブル削除時のエラー:", err.message);
                return;
              }
              console.log("テーブルを削除しました");

              db.close((err) => {
                if (err) {
                  console.error(
                    "データベースを閉じるときのエラー:",
                    err.message,
                  );
                } else {
                  console.log("データベースを正常に閉じました");
                }
              });
            });
          },
        );
      },
    );
  },
);
