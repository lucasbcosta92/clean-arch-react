import { HttpStatusCode, type HttpPostClient } from '@/data/protocols/http'

import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors'
import { type AccountModel } from '@/domain/models'
import { type AuthenticationParams, type Authentication } from '@/domain/use-cases'

export class RemoteAuthentication implements Authentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async auth ({ email, password }: AuthenticationParams): Promise<AccountModel> {
    const response = await this.httpPostClient.post({
      url: this.url,
      body: { email, password }
    })

    switch (response.statusCode) {
      case HttpStatusCode.ok: return response.body
      case HttpStatusCode.unauthorized: throw new InvalidCredentialsError()
      default: throw new UnexpectedError()
    }
  }
}
