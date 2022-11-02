import { APIRequestContext } from '@playwright/test'

const API_KEY = process.env.API_KEY
const API_TOKEN = process.env.API_TOKEN
const AUTH = `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${API_TOKEN}"`

export class CardsAPI{
    readonly request: APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
    }

    async postCards(listId: string, name: string, description: string){
        let response = await this.request.post(`cards`, {
            headers: {
                'Authorization': AUTH
              },
              params: {
                'idList': listId,
                'name': name,
                'desc': description
              }
        })
        return response
    }

    async deleteCards(cardId: string){
        let response = await this.request.post(`cards/${cardId}`, {
            headers: {
                'Authorization': AUTH
              }
        })
        return response
    }
}