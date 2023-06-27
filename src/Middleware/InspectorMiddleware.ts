import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Inspector from "@ioc:Inspector";
import {inject} from "@adonisjs/fold";
import {ApplicationContract} from "@ioc:Adonis/Core/Application";

@inject('Adonis/Core/Application')
export default class InspectorMiddleware {
    private config = this.app.container.resolveBinding('Adonis/Core/Config').get('inspector.inspectorConfig')

    constructor(protected app: ApplicationContract) {}

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
