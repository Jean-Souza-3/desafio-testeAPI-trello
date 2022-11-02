import { test, expect } from '@playwright/test';
import { BoardsAPI } from './api_classes/boards-api';
import { ListsAPI } from './api_classes/lists-api';
import { CardsAPI } from './api_classes/cards-api';
import { boardLists } from '../arrays.json';
import { listsCardsObjs } from '../arrays.json';
import { faker } from '@faker-js/faker';

require('dotenv').config()

test.describe('Test Trello APIs - NextQA Test Automation Class', () => {

  let boardsRequest: BoardsAPI
  let listsRequest: ListsAPI
  let cardsRequest: CardsAPI

  let boardId
  let boardList = boardLists
  let listsCardsObj = listsCardsObjs

  test.beforeEach(async ({ request }) => {
    boardsRequest = new BoardsAPI(request)
    listsRequest = new ListsAPI(request)
    cardsRequest = new CardsAPI(request)
  })

  test('Obtem board do usuário', async () => {

    let response = await boardsRequest.getUserBoards()

    expect(response.ok()).toBeTruthy();
    const body = JSON.parse(await response.text())
    console.log(body)
    body.forEach(board => {
      if (board.name == 'nextQA') {
        boardId = body[0].id
        console.log('Encontrou o Board ID: ', boardId)
      }
    })
  });

  test('Criar listas e cards', async () => {

    await Promise.all(
      listsCardsObj.map(async (list, index) => {

        await Promise.all(
          boardList.map(async (column, index) => {

            let response = await boardsRequest.getListsBoard()

            expect(response.ok()).toBeTruthy();
            const body = JSON.parse(await response.text())
            console.log(body)
            boardList[index].listName2 = body.name
            boardList[index].listId2 = body.id
            //console.log(boardList)

            if (column.listName2 == list.listName) {

              let response1 = await listsRequest.putList(column.listId2);

              expect(response1.ok()).toBeTruthy()
              const body1 = JSON.parse(await response1.text())
              console.log(body1)
              boardList[index].listName2 = body.name
              boardList[index].listId2 = body.id
              //console.log(boardList)
            }
          })
        )
        let response = await listsRequest.postList(list.listName, boardId);

        expect(response.ok()).toBeTruthy()
        const body = JSON.parse(await response.text())
        console.log(body)
        listsCardsObj[index].listId = body.id

        await Promise.all(
          listsCardsObj[index].cards.map(async (card, index) => {

            let name = faker.word.verb(2);
            let description = faker.lorem.paragraph(4);

            let response1 = await cardsRequest.postCards(list.listId, name, description);

            expect(response1.ok()).toBeTruthy()
            const body1 = JSON.parse(await response1.text())
            listsCardsObj[index].cards[index].id = body1.id
            listsCardsObj[index].cards[index].name = body1.name
            listsCardsObj[index].cards[index].description = body1.desc
            //console.log(body1)

            let response2 = await listsRequest.getCardsList(list.listId);

            expect(response2.ok()).toBeTruthy();
            const body2 = JSON.parse(await response2.text())
            console.log(body2)
            listsCardsObj[index].cards[index].id2 = body2.id2
            listsCardsObj[index].cards[index].name2 = body2.name2

            if (card.name2 == card.name) {

              let response = await cardsRequest.deleteCards(card.id2);

              expect(response.ok()).toBeTruthy()
            }
          })
        )
      })
    )
  })
})