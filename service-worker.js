// service-worker.js

// インストールイベント
self.addEventListener('install', event => {
    console.log('Service Worker installing...');
    // （キャッシュ処理などをここに記述することも可能）
  });
  
  // 有効化イベント
  self.addEventListener('activate', event => {
    console.log('Service Worker activated.');
  });
  
  // フェッチイベント：ネットワークリクエストを監視
  self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    // ここでキャッシュを返すなどの処理が可能です。
  });

