<script setup lang="ts">
import {ref} from 'vue'
import { Button, Modal } from 'ant-design-vue'
import StepProgress from 'vue-step-progress';
import 'vue-step-progress/dist/main.css';
import { useStore } from 'vuex'
import { useStopwatch } from 'vue-timer-hook';

import Playground from '@/components/Playground.vue'
import { playgroundScheme, rules } from '@/data.ts'
import bg from '@/assets/bg.png'
import ModalSelector from '@/assets/modal_selector.svg'

const RULES_SHOWN_KEY = 'rules_shown'
const SELECTOR_INIT_X = -120

const modalRulesVisible = ref<boolean>(window.localStorage.getItem(RULES_SHOWN_KEY) != "true");
const modalFinishVisible = ref<boolean>(false);
const modalQuestionVisible = ref<boolean>(false);
const activeQuestion = ref<object>({});
const rocketX = ref<int>(SELECTOR_INIT_X);
const selectedAnswerIdx = ref<int>(undefined);
const highlightRightAnswer = ref<boolean>(false);

const store = useStore()
const stopwatch = useStopwatch(true);

const onRulesClose = (e: MouseEvent) => {
  modalRulesVisible.value = false;
  window.localStorage.setItem(RULES_SHOWN_KEY, "true")
};

const onPointClick = (data) => {
  if (store.getters.tasks[data.id].correctAnswer === null) {
    modalQuestionVisible.value = true
    activeQuestion.value = questions.find(q => q.nodeId == data.id)
  }
}

const onQuestionAnswered = (data) => {
  if (selectedAnswerIdx.value === undefined) {
    return
  }
  const isRight = selectedAnswerIdx.value == activeQuestion.value.rightA

  highlightRightAnswer.value = true

  setTimeout(() => {
    modalQuestionVisible.value = false
    selectedAnswerIdx.value = undefined
    highlightRightAnswer.value = false
    rocketX.value = SELECTOR_INIT_X
    store.commit(isRight ? 'taskSuccess' : 'taskFail', activeQuestion.value.nodeId)

    if (store.getters.answeredQuestionsCount == questions.length) {
      modalFinishVisible.value = true
    }
  }, 2000) 
}

const onAnswerClick = (e) => {
  const el = e.target
  const modal = document.querySelector('.selector-line')
  const modalPos = modal.getBoundingClientRect()
  const pos = el.getBoundingClientRect()
  const answerIdx = el.getAttribute('data-answer-idx')

  selectedAnswerIdx.value = answerIdx
  rocketX.value = pos.x - modalPos.x;
}

const questions = playgroundScheme.points.map(point => ({
  nodeId: point.id,
  q: point.addInfo.q,
  a: point.addInfo.a,
  rightA: point.addInfo.rightA
}))
</script>


<template>
  <main :style="{ backgroundImage: 'url(' + bg + ')', backgroundSize: 'cover', width: '100%', height: '100%', position: 'relative' }">
    <div style="position: absolute; top: 10%; left: 50%; transform: translateX(-50%); width: 80%; height: 80%;">
      <Playground @pointClick="onPointClick" />
    </div>
    <div style="position: fixed; right: 80px; top: 230px">
      <span style="color: white;">
        Время: <span>{{stopwatch.minutes}}</span>,<span>{{stopwatch.seconds}}</span>
      </span>
        🕔
    </div>
    <modal v-model:visible="modalRulesVisible" :footer="null" width="1220px">
      <div class="modal-rules__header">Правила</div>
      <div class="modal-rules__text">{{ rules }}</div>
      <div class="modal-rules__btnwrapper">
        <button class="modal-rules__btnwrapper__btn" @click="onRulesClose">Поехали!</button>
      </div>
    </modal>
    <modal v-model:visible="modalQuestionVisible" :footer="null" width="1220px">
      <div class="questions-counter">{{ store.getters.answeredQuestionsCount + 1 }} / {{ questions.length }}</div>
      <div class="question">{{ activeQuestion.q }}</div>
      <div v-for="(answer, index) in activeQuestion.a" class="answer">
        <div 
          class="answer__badge" 
          :class="{ 
            right: highlightRightAnswer && index === activeQuestion.rightA, 
            fail: highlightRightAnswer && index == selectedAnswerIdx && selectedAnswerIdx != activeQuestion.rightA 
          }"
        >
          <div class="answer__badge__digit">{{ index + 1 }}</div>
        </div>
        <div class="answer__text">
          {{ answer }}
        </div>
      </div>
      <div class="selector-line">
        <div class="selector-line__selector" :style="{ transform: `translateX(${rocketX}px)` }"><modal-selector /></div>
        <div class="selector-line__options">
          <div v-for="(a, index) in activeQuestion.a" class="selector-line__options__digit" @click="onAnswerClick" :data-answer-idx="index">
            {{ index + 1 }}
          </div>
          <div class="selector-line__options__line"></div>
        </div>
        <div class="selector-line__btnwrapper">
          <button class="selector-line__btnwrapper__btn" :class="{active: selectedAnswerIdx !== undefined}" @click="onQuestionAnswered">Ответить</button>
        </div>
      </div>
    </modal>
     <modal v-model:visible="modalFinishVisible" :footer="null" width="1220px">
      <div class="modal-finish__header">{{ questions.length }} / {{ questions.length }}</div>
      <div class="modal-finish__text">Поздравляем с успешным прохождением теста!</div>
    </modal>
  </main>
</template>

<style>
/* Should be here - otherwise vue-flow renders not correctly */
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.ant-modal-content {
  border-radius: 66px;
  padding: 50px 129px;
}

.ant-modal-close-icon {
  display: none;
}

.questions-counter {
  color: #4F0078;
  font-weight: 700;
  font-size: 48px;
  margin-bottom: 23px;
}

.question {
  font-weight: 500;
  font-size: 33px;
  color: #1B1B1E;
  margin-bottom: 51px;
}

.answer {
  margin-bottom: 15px;
}

.answer__badge {
  border-radius: 50%;
  width: 61px;
  height: 61px;
  color: white;
  font-weight: bold;
  position: relative;
  display: inline-block;
  background: #37B4B6;
}

.answer__badge.right {
  background: #03FD39;
}

.answer__badge.fail {
  background: #FF003D;
}

.answer__badge__digit {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.answer__text {
  font-weight: 400;
  color: #1B1B1E;
  font-size: 24px;
  padding-left: 20px;
  display: inline-block;
  max-width: 840px;
  vertical-align: top;
}

.selector-line {
  display: flex;
  flex-direction: row;
  margin-top: 53px;
  align-items: center;
  position: relative;
}

.selector-line__selector {
  position: absolute;
  bottom: -10px;
  left: 0;
  z-index: 6;
  transition: transform 2s;
}

.selector-line__options {
  width: 70%;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.selector-line__options__digit {
  z-index: 5;
  border-radius: 50%;
  color: white;
  font-size: 48px;
  font-weight: 700;
  background: #4F0078;
  height: 65px;
  width: 65px;
  text-align: center;
  cursor: pointer;
}

.selector-line__options__line {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 10px;
  width: 100%;
  height: 11px;
  background: #4F0078;
  z-index: 4;
}

.selector-line__btnwrapper {
  padding-left: 53px;
}

.selector-line__btnwrapper__btn {
  color: #FFF;
  border-radius: 47px;
  font-size: 24px;
  border: none;
  padding: 20px 40px;
  width: 100%;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 24px;
  cursor: pointer;
}

.selector-line__btnwrapper__btn.active {
  background: #4F0078;
}

.modal-rules__header {
  font-weight: 600;
  font-size: 60px;
  color: #4F0078;
  text-align: center;
  margin-bottom: 21px;
}

.modal-rules__text {
  font-weight: 400;
  font-size: 33px;
  text-align: center;
}

.modal-rules__btnwrapper {
  margin-top: 40px;
  text-align: center;
}

.modal-rules__btnwrapper__btn {
  background: #4F0078;
  border-radius: 46.8047px;
  color: white;
  font-weight: 600;
  font-size: 36px;
  text-transform: uppercase;
  border: none;
  padding: 32px 43px;
  cursor: pointer;
}

.modal-finish__header {
  font-weight: 600;
  font-size: 60px;
  color: #4F0078;
  margin-bottom: 61px;
  text-align: center;
}

.modal-finish__text {
  font-weight: 600;
  font-size: 60px;
  color: #4F0078;
  text-align: center;
}
</style>
