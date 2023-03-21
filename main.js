// commanderモジュールからprogramオブジェクトをインポートする
import { program } from "commander";
// fs/promisesモジュール全体を読み込む
import * as fs from "node:fs/promises";
// markedモジュールからmarkedオブジェクトをインポートする
import { marked } from "marked";

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
// コマンドライン引数からファイルパスを取得する
program.parse(process.argv);
const filePath = program.args[0];

// コマンドライン引数のオプションを取得する
const options = program.opts();

// コマンドライン引数で指定されなかったオプションにデフォルト値を上書きする
const cliOptions = {
    gfm: options.gfm ?? false,
};

// ファイルをUTF-8として非同期で読み込む
fs.readFile(filePath, { encoding: "utf8" }).then(file => {
  // MarkdownファイルをHTML文字列に変換する
  // gfmオプションを無効にする
  const html = marked.parse(file, {
    gfm: false
  });
  console.log(html);
}).catch(err => {
  console.error(err.message);
  // 終了ステータス 1（一般的なエラー）としてプロセスを終了する
  process.exit(1);
});