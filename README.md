# ODEKAKE TODO

## 動作環境

* node v8.13.0

## 開発準備

.firebaserc の `<firebase-project-id>` の部分を自分の firebase のプロジェクト id に置き換えます。

```json
{
  "projects": {
    "default": "<firebase-project-id>"
  }
}
```

ターミナルで下記コマンドを打ちます

```bash
# ①firebase コマンドを実行できない場合は firebase-tools をインストールします
  npm install -g firebase-tools

# ②firebase へログインします
  firebase login

# ③各ディレクトリに対して yarn install を実行します。
  yarn setup
```

## 開発コマンド

```bash
# vue が build され functons/ へ nuxt/ が出力される。同時に public へ assets/ コピーされる
  yarn build

# functions/ の index.ts をコンパイル後、そのファイルに基づいて firebase ローカルサーバーを立てる
  yarn serve

# functions/ の index.ts をコンパイル後、firebase へデプロイ
  firebase deploy --project <firebase-project-id>
```

## その他

* node v8.16 だと `fsevents.watch is not a function` でERRORとなり起動しない
* node v8.11.4 だと `yarn dev` コマンドなどは動作するが、 `@nuxt/pwa` の install でつまづく
* node v8.13.0 で完全な動作確認
