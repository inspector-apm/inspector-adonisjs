import {ApplicationContract} from "@ioc:Adonis/Core/Application";

export default class InspectorProvider {
    public static needsApplication = true

    constructor(protected app: ApplicationContract) {}

    public register() {
        this.app.container.singleton('Adonis/Addons/Inspector', () => {
            const config = this.app.container.resolveBinding('Adonis/Core/Config').get('inspector.inspectorConfig')

            // todo: add other configuration parameters
            return {
                ...require('@inspector-apm/inspector-nodejs')({
                    ingestionKey: config.ingestionKey
                })
            }
        })

        this.app.container.singleton('Adonis/Addons/Inspector/Middleware', () => {
            return require('../src/Middleware/InspectorMiddleware')
        })
    }

    public boot() {

    }
}