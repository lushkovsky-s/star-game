import { faker } from '@faker-js/faker';

export const playgroundScheme = {
  points: [
    { id: '1', x: 0, y: 0, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '2', x: 173, y: 40, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 }},
    { id: '3', x: 415, y: 121, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '4', x: 667, y: 221, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '5', x: 0, y: 145, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '6', x: 120, y: 190, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '7', x: 240, y: 245, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '8', x: 381, y: 336, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '9', x: 240, y: 400, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '10', x: 120, y: 460, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '11', x: 0, y: 524, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '12', x: 0, y: 739, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '13', x: 173, y: 658, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '14', x: 415, y: 537, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
    { id: '15', x: 667, y: 438, addInfo: { q: faker.hacker.phrase(), a: new Array(4).fill(null).map(() => faker.hacker.phrase()), rightA: 2 } },
  ],
  edges: [
    ['1', '2'],
    ['2', '3'],
    ['3', '4'],
    ['1', '5'],
    ['5', '6'],
    ['6', '7'],
    ['7', '8'],
    ['8', '9'],
    ['9', '10'],
    ['10', '11'],
    ['11', '12'],
    ['12', '13'],
    ['13', '14'],
    ['14', '15'],
    ['4', '15'],
  ]
}

export const startBetweenNodes = ['2', '3']
export const animationDurationSec = 2

export const rules = `
Для выбора вопроса участник нажимает на звезду 
и появляется pop-up с вопросом и 4 вариантами ответа. Участнику необходимо выбрать один из 4 вариантов ответа. Ответы представлены в виде шкалы с 4 звездами, символизирующими 4 вариант ответа. Для того, 
чтобы ответить на вопрос, участник протягивает ракету 
до нужного вариант и нажимает кнопку “Подтвердить”.  При этом происходит запрос на сервер для сохранения ответа и получения правильного ответа на вопрос.
`
