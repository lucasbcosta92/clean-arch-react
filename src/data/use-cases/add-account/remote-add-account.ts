import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpStatusCode, type HttpPostClient } from '@/data/protocols/http'
import { type AccountModel } from '@/domain/models'
import { type AddAccountParams, type AddAccount } from '@/domain/use-cases'

export class RemoteAddAccount implements AddAccount {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>
  ) {}

  async add (params: AddAccountParams): Promise<AccountModel> {
    const httpResponse = await this.httpPostClient.post({
      url: this.url,
      body: params
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.forbidden: throw new EmailInUseError()
      default: throw new UnexpectedError()
    }
  }
}
