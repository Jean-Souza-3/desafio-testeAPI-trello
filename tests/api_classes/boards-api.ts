import { APIRequestContext } from '@playwright/test'

const API_KEY = process.env.API_KEY
const API_TOKEN = process.env.API_TOKEN
const AUTH = `OAuth oauth_consumer_key="${API_KEY}", oauth_token="${API_TOKEN}"`

export class BoardsAPI{
    readonly request: APIRequestContext

    constructor(request: APIRequestContext){
        this.request = request
    }

    async getUserBoards(){
        let response = await this.request.get(`members/me/boards`, {
            headers: {
                'Authorization': AUTH
              },
              params: {
                'fields': 'name'
              }
        })
        return response
    }

    async getListsBoard(){
        let response = await this.request.get(`boards/63548375c78468128c0a06e4/lists`, {
            headers: {
                'Authorization': AUTH
              },
              params: {
                'filter': 'open'
              }
        })
        return response
    }
}