Angular開発基盤
===============

ビルドツールのgulpを使用してAngularの開発基盤を作成

## SetUp

```
npm install && bower install
```

## Task

```
gulp
```

gulpコマンドでdefaultタスクを実行
・bower経由で読込んでいるjsをvendor.jsにまとめ圧縮
・assets/css配下のcssファイルにプリフィックス付与と圧縮
・assets/js配下のjsファイル圧縮