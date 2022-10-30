import { createStore } from 'vuex'

import { playgroundScheme } from './data.ts'

const store = createStore({
  state () {
    return {
      tasks: Object.fromEntries(playgroundScheme.points.map(point => [point.id, { correctAnswer: null }]))
    }
  },
  mutations: {
    taskSuccess(state, id) {
      state.tasks[id].correctAnswer = true
    },
    taskFail(state, id) { 
      state.tasks[id].correctAnswer = false
    }
  },
  getters: {
    tasks(state) {
      return state.tasks
    },
    answeredQuestionsCount(state) {
      return Object.entries(state.tasks).filter(([id, value]) => value.correctAnswer !== null).length
    },
  },
})


export default store
