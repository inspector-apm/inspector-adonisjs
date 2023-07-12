import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {inject} from "@adonisjs/fold";
import Inspector, {InspectorConfig} from '@ioc:Adonis/Addons/Inspector'
import {ConfigContract} from "@ioc:Adonis/Core/Config";

@inject('Adonis/Core/Config')
export default class InspectorMiddleware {
    private config: InspectorConfig

    constructor(protected Config: ConfigContract) {
        this.config = Config.get('inspector.inspectorConfig')
    }

    public async handle({request, response}: HttpContextContract, next: () => Promise<void>) {

        // Support exclude_path from configuration file
        if (!this.config.excludeUrls.includes(request.url())) {
            await next()
            return;
        }

        let transaction = Inspector.startTransaction(request.method() + ' ' + request.url())

        transaction.addContext('Url', {
            protocol: request.protocol(),
            params: request.params(),
            //query: request.query,
            url: request.original(),
            full: request.protocol() + '://' + request.host() + request.original()
        })

        transaction.addContext('Request', {
            method: request.method(),
            headers: request.headers(),
        })

        // todo: support for hideParameters from configuration file
        transaction.addContext('Request Body', request.body())

        await next()

        transaction.addContext('Response', {
            status_code: response.getStatus(),
            headers: response.getHeaders()
        })

        transaction.setResult(response.getStatus())

        Inspector.flush()
    }
}
