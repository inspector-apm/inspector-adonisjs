# Inspector - Code Execution Monitoring

## Install
Install the latest version from npm:

```
npm i --save @inspector-apm/inspector-adonisjs
```

## Configure
Run the command below to connect dependencies:

```
node ace invoke @inspector-apm/inspector-adonisjs
```

## Usage
The first thing to do is to configure the `INSPECTOR_INGESTION_KEY` in your `.env` file to enable data transfer
from your application to Inspector.

```
INSPECTOR_INGESTION_KEY=xxxxxxxxxx
```

You can get a valid key creating a new application on your [Inspector dashboard](https://app.inspector.dev).

## HTTP traffic monitoring
To enable HTTP traffic monitoring make sure to configure the `InspectorMiddleware`
as first entry inside the `start/kernel.ts` file:

```ts
Server.middleware.register([
    () => import('@ioc:Adonis/Addons/InspectorMiddleware'),
    ...,
])
```

For detailed instructions check out the official [documentation](https://docs.inspector.dev/guides/adonisjs).