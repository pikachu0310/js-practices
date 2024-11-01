import { MemoStorage } from "./MemoStorage.js";
import enquirer from "enquirer";

const { prompt } = enquirer;

export class MemoApp {
  constructor() {
    this.storage = new MemoStorage();
  }

  async add() {
    const { title, content } = await prompt([
      {
        type: "input",
        name: "title",
        message: "メモのタイトルを入力してください:",
      },
      {
        type: "input",
        name: "content",
        message: "メモの内容を入力してください:",
      },
    ]);
    await this.storage.addMemo(title, content);
    console.log("メモが追加されました。");
  }

  async list() {
    const memos = await this.storage.listMemos();
    console.log("メモ一覧:");
    memos.forEach((memo) => console.log(`${memo.id}: ${memo.title}`));
  }

  async read() {
    const memos = await this.storage.listMemos();
    const choices = memos.map((memo) => ({
      name: memo.id,
      message: memo.title,
    }));
    const { id } = await prompt({
      type: "select",
      name: "id",
      message: "表示したいメモを選択してください:",
      choices,
    });
    const memo = await this.storage.getMemo(id);
    console.log(`\n${memo.title}\n${memo.content}`);
  }

  async delete() {
    const memos = await this.storage.listMemos();
    const choices = memos.map((memo) => ({
      name: memo.id,
      message: memo.title,
    }));
    const { id } = await prompt({
      type: "select",
      name: "id",
      message: "削除したいメモを選択してください:",
      choices,
    });
    await this.storage.deleteMemo(id);
    console.log("メモが削除されました。");
  }
}
