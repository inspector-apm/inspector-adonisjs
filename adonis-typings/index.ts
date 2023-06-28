declare module '@ioc:Adonis/Addons/Inspector' {
    import {ApplicationContract} from "@ioc:Adonis/Core/Application";
    import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

    export type InspectorConfig = {
        ingestionKey: string,
        excludeUrls: string[],
        hideParameters: string[],
    }

    export interface InspectorMiddlewareContract {
        new (application: ApplicationContract): {
            handle(ctx: HttpContextContract, next: Promise<void>): any
        }
    }

    const InspectorMiddleware: InspectorMiddlewareContract

    export default InspectorMiddleware
}
