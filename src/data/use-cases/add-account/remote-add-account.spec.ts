import { faker } from '@faker-js/faker'

import { EmailInUseError, UnexpectedError } from '@/domain/errors'
import { HttpPostClientSpy } from '@/data/test'
import { HttpStatusCode } from '@/data/protocols/http'
import { mockAccountModel, mockAddAccount } from '@/domain/test'
import { RemoteAddAccount } from '@/data/use-cases/add-account/remote-add-account'
import { type AccountModel } from '@/domain/models'

type SutTypes = {
  sut: RemoteAddAccount
  httpPostClientSpy: HttpPostClientSpy<AccountModel>
}

const defaultUrl = faker.internet.url()

const makeSut = (url: string = defaultUrl): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AccountModel>()

  const sut = new RemoteAddAccount(url, httpPostClientSpy)

  return {
    sut,
    httpPostClientSpy
  }
}

describe('RemoteAddAccoutn', () => {
  test('should call HttpPostClient with correct URL', async () => {
    const { sut, httpPostClientSpy } = makeSut(defaultUrl)

    await sut.add(mockAddAccount())

    expect(httpPostClientSpy.url).toBe(defaultUrl)
  })

  test('should call HttpPostClient with correct body', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const addAccountParams = mockAddAccount()

    await sut.add(addAccountParams)

    expect(httpPostClientSpy.body).toEqual(addAccountParams)
  })

  test('should throw EmailInUseError if HttpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const promise = sut.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new EmailInUseError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should throw UnexpectedError if HttpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.add(mockAddAccount())

    await expect(promise).rejects.toThrow(new UnexpectedError())
  })

  test('should return an AccountModel if HttpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = makeSut()

    const httpResponse = mockAccountModel()
    const addAccountParams = mockAddAccount()

    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResponse
    }

    const account = await sut.add(addAccountParams)

    expect(account).toEqual(httpResponse)
  })
})
