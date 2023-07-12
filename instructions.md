The package has been configured successfully. 
Make sure to configure the `InspectorMiddleware` as first entry inside the `start/kernel.ts` file:

```ts
Server.middleware.register([
    () => import('@ioc:Adonis/Addons/Inspector/Middleware'),
    ...,
])
```

For detailed instructions check out our [documentation](https://docs.inspector.dev/guides/adonisjs).