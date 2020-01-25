# ODEKAKE TODO

[Qiita：ODEKAKE TODO についての開発記事](https://qiita.com/yuki153/items/f36600376b4d18d77708)

## ディレクトリ構造

```bash
.
├── README.md
├── firebase.json # Firebase deploy config
├── firestore.indexes.json
├── firestore.rules
├── functions # Server Side App <cloud functions for firebase>
│   ├── lib
│   │   ├── index.js # Main script after transpile
│   │   └── index.js.map
│   ├── nuxt # Output nuxt build files there
│   ├── package.json
│   ├── src
│   │   └── index.ts # Main script before transpile
│   ├── tsconfig.json
│   └── yarn.lock
├── package.json
├── public # Hosting files <firebase hosting>
│   ├── *\.(png|ico) # Nuxt static files
│   └── assets # Output nuxt build files for client there
└── src # Frontend App <nuxt>
    ├── assets
    │   ├── scss
    │   └── svg
    ├── components
    │   ├── mix
    │   └── single
    ├── layouts
    ├── middleware
    ├── nuxt.config.js
    ├── package.json
    ├── pages
    ├── plugins
    │   └── firebase.js # firebase initialize script
    ├── static
    ├── store
    └── yarn.lock
```

## 開発環境の仕様について

### node.js バージョン

[Cloud functions の Node 10 ランタイム](https://cloud.google.com/functions/docs/concepts/nodejs-10-runtime?hl=ja) は Node.js v10.15.3 に基づく為、  
開発環境も同じ v10.15.3 に合わせています

* node v10.15.3

### 事前準備 ①

[Firebase](https://firebase.google.com/?hl=ja) にて事前にプロジェクトを作成しておく必要があります  
下記ファイルを自身の firebase の設定に書き換えます

#### src/plugins/firebase.js

```js
const config = {
  apiKey: "xxxxxxxxxxxxxxxxxxxxxxxxx",
  authDomain: "xxxxxx.firebaseapp.com",
  databaseURL: "https://xxxxxx.firebaseio.com",
  projectId: "xxxxxx",
  storageBucket: "xxxxxx.appspot.com",
  messagingSenderId: "xxxxxxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxxxxxxxxx"
};
```

#### .firebaserc

```json
{
  "projects": {
    "default": "<firebase-project-id>"
  }
}
```

### 事前準備 ②

firebase コマンドを使用できるようにしておきます

```bash
# 1.firebase CLI をインストール
npm install -g firebase-tools
# 2.firebase へログインします
firebase login
```

### 開発環境の起動

下記コマンドを実行

```bash
# 1.各ディレクトリに対して yarn install を実行します。
yarn setup
# 2.nuxt の開発環境を起動します
yarn dev
```

## Firebase へのデプロイ

### ① デプロイ準備 & シュミレーション

`yarn dev` と違い、functions 側の挙動も合わせて確認可能

```bash
# 1.nuxt を build 後、必要なファイル群を functions へ出力
# 2.functions を build 後、firebase ローカルサーバーを起動
yarn serve
```

### ② デプロイ

```bash
# firebase へデプロイ
firebase deploy --project <firebase-project-id>
```
