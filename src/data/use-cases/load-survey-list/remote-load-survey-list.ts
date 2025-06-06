import { HttpStatusCode, type HttpGetClient } from '@/data/protocols/http'

import { type LoadSurveyList } from '@/domain/use-cases'
import { type SurveyModel } from '@/domain/models'
import { UnexpectedError } from '@/domain/errors'

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor (
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<SurveyModel[]>
  ) {}

  async loadAll (): Promise<SurveyModel[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body
      case HttpStatusCode.noContent: return []
      default: throw new UnexpectedError()
    }
  }
}
