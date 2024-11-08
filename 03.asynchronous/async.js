import sqlite3 from 'sqlite3';
import { run, get } from './db_utils.js';

async function executeWithoutError() {
    const db = new sqlite3.Database(':memory:');

    try {
        await run(db, "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)");
        console.log("テーブルを作成しました");

        const result = await run(db, "INSERT INTO books (title) VALUES (?)", ["Async/awaitでの本"]);
        console.log(`レコードを追加しました。ID: ${result.lastID}`);

        const row = await get(db, "SELECT * FROM books WHERE id = ?", [result.lastID]);
        console.log("取得したレコード:", row);

        await run(db, "DROP TABLE books");
        console.log("テーブルを削除しました");
    } catch (err) {
        console.error("エラー:", err.message);
    } finally {
        db.close((err) => {
            if (err) {
                console.error("データベースを閉じるときのエラー:", err.message);
            } else {
                console.log("データベースを正常に閉じました");
            }
        });
    }
}

async function executeWithError() {
    const db = new sqlite3.Database(':memory:');

    try {
        await run(db, "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE)");
        console.log("テーブルを作成しました");

        const result = await run(db, "INSERT INTO books (title) VALUES (?)", ["Async/awaitでの本"]);
        console.log(`レコードを追加しました。ID: ${result.lastID}`);

        try {
            await run(db, "INSERT INTO books (title) VALUES (?)", ["Async/awaitでの本"]);
        } catch (err) {
            console.error("重複したレコード追加エラー:", err.message);
        }

        const nonExistentRow = await get(db, "SELECT * FROM books WHERE id = ?", [999]);
        if (!nonExistentRow) {
            console.error("エラー: 指定されたIDのレコードは存在しません。");
        }

        await run(db, "DROP TABLE books");
        console.log("テーブルを削除しました");
    } catch (err) {
        console.error("エラー:", err.message);
    } finally {
        db.close((err) => {
            if (err) {
                console.error("データベースを閉じるときのエラー:", err.message);
            } else {
                console.log("データベースを正常に閉じました");
            }
        });
    }
}

(async () => {
    console.log("エラーなしの実行:");
    await executeWithoutError();

    console.log("\nエラーありの実行:");
    await executeWithError();
})();
