import path from 'node:path';
import { BrowserWindow, app } from 'electron';

app.whenReady().then(() => {
  // アプリの起動イベント発火で BrowserWindow インスタンスを作成
  const mainWindow = new BrowserWindow({
    // 初期表示
    width: 400,
    height: 550,

    // ウィンドウサイズの最小
    minWidth: 400,
    minHeight: 550,
    // // ウィンドウサイズの最大
    // maxWidth: 400,
    // maxHeight: 550,
    webPreferences: {
      // webpack が出力したプリロードスクリプトを読み込み
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // レンダラープロセスをロード
  mainWindow.loadFile('dist/index.html');
});

// すべてのウィンドウが閉じられたらアプリを終了する
app.once('window-all-closed', () => app.quit());