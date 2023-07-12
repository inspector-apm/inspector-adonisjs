declare module '@ioc:Adonis/Addons/InspectorMiddleware' {
    import {ApplicationContract} from "@ioc:Adonis/Core/Application";
    import {HttpContextContract} from "@ioc:Adonis/Core/HttpContext";

    export interface InspectorMiddlewareInterface {
        new (application: ApplicationContract): {
            handle(ctx: HttpContextContract, next: () => Promise<void>): any
        }
    }

    const InspectorMiddleware: InspectorMiddlewareInterface

    export default InspectorMiddleware
}