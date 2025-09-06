# @unipro-tech/node-logger

UniPro Node.js 用内製 logger

Grafana Loki で構造化ロギングを効率よく収集するために、UniPro の共有プロジェクトで共通したルールでログを取ろうというもの。

詳しくは、そのうち書く Wiki を参照。

> [!WARNING]
> Bun では pino の仕様上バンドルしないと動かないので、@unipro-tech/bun-logger を使用してください。

## How to use

1. インストールする

```shell
npm install @unipro-tech/node-logger
```

2. 使用する

```ts
import { Logger, Transporter } from "@unipro-tech/node-logger";

const logger = Logger(
  "your-app-name", // ロガー名
  [
    Transporter.FileTransporter("./log.txt"),
    Transporter.PinoPrettyTransporter({ colorize: true }),
  ], // transportの配列
  "info", // ログレベル（省略可、デフォルト: info）
  {
    // pino.LoggerOptions のオプション(省略可)
    timestamp: () => `,"time":"${new Date().toUTCString()}"`,
    errorKey: "error",
  }
);

logger.info("Hello, logger!");
```

### Logger 関数について

```ts
Logger(
  name: string, // ロガー名
  transportTargets: readonly TransportTargetOptions[] | TransportPipelineOptions[], // transportの配列
  level?: string, // ログレベル（"info"など）
  options?: pino.LoggerOptions // pinoの追加オプション
): pino.Logger
```

- `name`: ロガーの名前。サービス名やアプリ名など。
- `transportTargets`: ログの出力先を配列で指定。`Transporter`の各関数で生成。
- `level`: ログレベル（"info", "error", "debug"など）。省略時は"info"、開発環境なら"trace"。
- `options`: pino の LoggerOptions。timestamp や errorKey などを追加可能。

### Transporter について

`Transporter`は各種ログ出力先（ファイル、コンソール、外部サービスなど）を生成する関数群です。

#### FileTransporter

ファイルにログを書き出す Transporter。

```ts
Transporter.FileTransporter(filePath: string, options?: object, level?: string)
```

- `filePath`: ログを書き込むファイルパス
- `options`: pino のファイル出力オプション
- `level`: ログレベル（"info"など）

#### ConsoleTransporter

標準出力（コンソール）にログを書き出す Transporter。

```ts
Transporter.ConsoleTransporter(options?: object, level?: string)
```

- `options`: destination=1 で標準出力。その他 pino のオプション
- `level`: ログレベル

#### PinoPrettyTransporter

見やすい整形ログ（色付きなど）を出力する Transporter。

```ts
Transporter.PinoPrettyTransporter(options?: object)
```

- `options`: colorize: true で色付き。その他 pino-pretty のオプション

#### LokiTransporter

Grafana Loki にログを送信する Transporter。

```ts
Transporter.LokiTransporter(host: string, options?: object, level?: string)
```

- `host`: Loki の URL
- `options`: batching, interval など Loki 用オプション
- `level`: ログレベル

#### LogFmtTransporter

logfmt 形式でログを出力する Transporter。

```ts
Transporter.LogFmtTransporter(options?: object, level?: string)
```

- `options`: logfmt 用オプション
- `level`: ログレベル

#### DiscordTransporter

Discord の Webhook にログを送信する Transporter。

```ts
Transporter.DiscordTransporter(webhookUrl: string, options?: object, level?: string)
```

- `webhookUrl`: Discord の Webhook URL
- `options`: その他オプション
- `level`: ログレベル
