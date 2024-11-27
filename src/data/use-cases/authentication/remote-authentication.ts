import { type AuthenticationParams } from '@/domain/use-cases/authentication'

import { type HttpPostClient } from '@/data/protocols/http/http-post-client'

export class RemoteAuthentication {
  constructor (
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient
  ) {}

  async auth ({ email, password }: AuthenticationParams): Promise<void> {
    await this.httpPostClient.post({
      url: this.url,
      body: { email, password }
    })
  }
}
