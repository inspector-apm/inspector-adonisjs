import {ApplicationContract} from "@ioc:Adonis/Core/Application";
import Inspector from "@inspector-apm/inspector-nodejs";

export default class InspectorProvider {
    public static needsApplication = true

    constructor(protected app: ApplicationContract) {}

    public register() {
        this.app.container.singleton('Adonis/Addons/Inspector', () => {
            const config = this.app.container.resolveBinding('Adonis/Core/Config').get('inspector.inspectorConfig')

            // todo: add other configuration parameters
            return new Inspector({
                ingestionKey: config.ingestionKey
            })
        })

        this.app.container.singleton('Adonis/Addons/Inspector/Middleware', () => {
            const {InspectorMiddleware} = require('../src/Middleware/InspectorMiddleware')
            return InspectorMiddleware
        })
    }

    public boot() {

    }
}