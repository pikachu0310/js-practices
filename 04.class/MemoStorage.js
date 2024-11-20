import sqlite3 from "sqlite3";
import { open } from "sqlite";

export class MemoStorage {
  async init() {
    this.db = await open({
      filename: "./memos.db",
      driver: sqlite3.Database,
    });
    await this.db.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY, title TEXT, content TEXT)",
    );
  }

  async addMemo(title, content) {
    await this.db.run(
      "INSERT INTO memos (title, content) VALUES (?, ?)",
      title,
      content,
    );
  }

  async listMemos() {
    return this.db.all("SELECT id, title FROM memos");
  }

  async getMemo(id) {
    return this.db.get("SELECT * FROM memos WHERE id = ?", id);
  }

  async deleteMemo(id) {
    await this.db.run("DELETE FROM memos WHERE id = ?", id);
  }
}
