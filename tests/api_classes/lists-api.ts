import { APIRequestContext } from '@playwright/test'

const API_KEY = process.env.API_KEY
const API_TOKEN = process.env.API_TOKEN
const AUTH = `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${API_TOKEN}"`

export class ListsAPI{
    readonly request: APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
    }

    async postList(listName: string, idBoard: string){
        let response = await this.request.post(`lists`, {
            headers: {
                'Authorization': AUTH,
                'Accept': ''
              },
              params: {
                'name': listName,
                'idBoard': idBoard
              }
        })
        return response
    }

    async putList(listId: string){
        let response = await this.request.put(`lists/${listId}/closed`, {
            headers: {
                'Authorization': AUTH
            },
            params: {
                value: 'true'
            }
        })
        return response
    }
    
    async getCardsList(listId: string){
        let response = await this.request.get(`lists/${listId}/cards`, {
            headers: {
                'Authorization': AUTH
            }
        })
        return response
    }
}