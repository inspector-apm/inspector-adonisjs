declare module '@ioc:Adonis/Addons/Inspector' {

    export type InspectorConfig = {
        ingestionKey: string,
        excludeUrls: string[],
        hideParameters: string[],
    }

    import Inspector from "@inspector-apm/inspector-nodejs";
    export default Inspector
}