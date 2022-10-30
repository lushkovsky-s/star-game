<script setup lang="ts">
import { useStore } from 'vuex'
import { RouterLink, RouterView } from 'vue-router'
import { VueFlow, Handle, Position, useVueFlow } from '@vue-flow/core'

import PointDefault from '@/assets/point_default.svg'
import PointSuccess from '@/assets/point_success.svg'
import PointFail from '@/assets/point_fail.svg'
import rocket from '@/assets/rocket.svg'
import { playgroundScheme, startBetweenNodes, animationDurationSec } from '@/data.ts'

const store = useStore()
const { onPaneReady, applyNodeChanges } = useVueFlow()

const emit = defineEmits(['pointClick'])

const rocketX = ref(10000)
const rocketY = ref(0)
const rocketAngle = ref(0)

const getNodeElement = (id) => document.querySelector(`.vue-flow__node[data-id="${id}"]`)

const getRelativePosition = (x, y) => {
  const flowWrapper = document.querySelector('.flow-wrapper')
  const pos = flowWrapper.getBoundingClientRect()

  return {x: x - pos.x, y: y - pos.y}
}

onPaneReady((instance) => {
  setTimeout(() => {
    const [startNode1, startNode2] = startBetweenNodes
    const node1 = getNodeElement(startNode1)
    const node2 = getNodeElement(startNode2)

    const node1Pos = node1.getBoundingClientRect()
    const node2Pos = node2.getBoundingClientRect()

    const avgX = (node1Pos.x + node2Pos.x) / 2
    const avgY = (node1Pos.y + node2Pos.y) / 2

    const { x: newRocketX, y: newRocketY } = getRelativePosition(avgX, avgY)

    rocketX.value = newRocketX
    rocketY.value = newRocketY
  }, 1000)
})

const elements = ref([
  ...playgroundScheme.points.map(point => ({
    id: point.id,
    type: 'point',
    data: { subtype: store.getters.tasks[point.id].correctAnswer === true ? '-success' : store.getters.tasks[point.id].correctAnswer === false ? '-fail' : 'default' },
    position: {x: point.x, y: point.y},
    events: {
      click: () => {
        const node = getNodeElement(point.id)
        const nodePos = node.getBoundingClientRect()
        const { x: newRocketX, y: newRocketY } = getRelativePosition(nodePos.x, nodePos.y) 

        const dX = Math.abs(newRocketX - rocketX.value)
        const dY = Math.abs(newRocketY - rocketY.value)

        rocketAngle.value -= Math.atan(dY/dX) * 180 / Math.PI
        rocketX.value = newRocketX
        rocketY.value = newRocketY

        setTimeout(() => {
          emit('pointClick', {id: point.id})
        }, animationDurationSec * 1000)
      }
    }
  })),
  ...playgroundScheme.edges.map(([id1, id2]) => ({
    id: `e${id1}-${id2}`,
    source: id1,
    target: id2,
    animated: true,
    type: 'straight'
  })),
])

</script>

<template format="html">
  <div class="flow-wrapper" style="width: 100%; height: 100%; position: relative;">
    <VueFlow 
      v-model="elements" 
      :zoom-on-scroll="false"
      :zoom-on-pinch="false"
      :zoom-on-double-click="false"
      :pan-on-scroll="false"
      :pan-on-drag="false"
      :prevent-scrolling="true"
      :nodes-draggable="false"
      :nodes-connectable="false"
      :edges-updatable="false"
      :connect-on-click="false"
      :fit-view-on-init="true"
    >
      <template #node-point="props">
        <div style="position: relative; width: 50px; height: 50px;">
          <div style="position: absolute; top: 50%;">
            <point-default v-if="(store.getters.tasks[props.id] || {}).correctAnswer === null" />
            <point-success v-if="(store.getters.tasks[props.id] || {}).correctAnswer === true" />
            <point-fail v-if="(store.getters.tasks[props.id] || {}).correctAnswer === false" />
          </div>
        </div>
        <Handle id="bottom" type="source" :position="Position.Bottom" />
        <Handle id="bottom" type="target" :position="Position.Bottom" />
      </template>
      <template #node-rocket="props">
        <rocket />
      </template>
    </VueFlow>
    <rocket :style="{position: 'fixed', top: 0, left: 0, zIndex: 10, transform: `translate(${rocketX}px, ${rocketY}px) rotate(${rocketAngle}deg)`, transition: `transform ${animationDurationSec}s` }" />
  </div>
</template>

<style scoped>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';

.vue-flow__handle { 
  background: transparent; 
  border: none;
}
</style>
