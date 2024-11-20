import { MemoStorage } from "./MemoStorage.js";
import enquirer from "enquirer";
const { prompt } = enquirer;

export class MemoApp {
  constructor() {
    this.storage = new MemoStorage();
  }

  async addFromStdin() {
    const stdin = process.stdin;
    stdin.setEncoding("utf-8");

    let input = "";
    for await (const chunk of stdin) {
      input += chunk;
    }

    const lines = input.trim().split("\n");
    if (lines.length < 2) {
      console.log("エラー: タイトルと内容をそれぞれ1行ずつ入力してください。");
      return;
    }

    const title = lines[0];
    const content = lines.slice(1).join("\n");
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
      name: memo.id.toString(),
      message: memo.title,
    }));

    const { id } = await prompt({
      type: "select",
      name: "id",
      message: "表示したいメモを選択してください:",
      choices,
    });

    const memo = await this.storage.getMemo(Number(id));
    console.log(`\n${memo.title}\n${memo.content}`);
  }

  async delete() {
    const memos = await this.storage.listMemos();
    const choices = memos.map((memo) => ({
      name: memo.id.toString(),
      message: memo.title,
    }));

    const { id } = await prompt({
      type: "select",
      name: "id",
      message: "削除したいメモを選択してください:",
      choices,
    });

    await this.storage.deleteMemo(Number(id));
    console.log("メモが削除されました。");
  }
}
