<script>
export default {
  name: 'ebhs-table'
}
</script>

<script setup>
import {reactive, ref} from 'vue'

const {circleList} =
    reactive({
      circleList: [
        '5分钟',
        '30分钟',
        '12小时',
        '1天',
        '2天',
        '4天',
        '7天',
        '15天',
        '1个月'
      ]
    })

const props = defineProps({
  lang: {
    type: String,
    default: 'cn'
  }
})

</script>
<template>
  <div class="ebhs-table-container">
    <div class="ebhs-table">
      <div class="ebhs-table__title flex">
        <div class="ebhs-table__left flex w-15p">
          <span class="flex-center t-20 flex-1">序号</span>
          <span class="flex-center t-20 flex-2">学习日期</span>
        </div>
        <div class="ebhs-table__middle flex  w-45p">
          <span class="flex-center t-20 flex-1 bordered-blue border-width-2">
            学习内容
          </span>
        </div>
        <div class="ebhs-table__right flex-column h-80 w-40p">
          <div class="upper flex h-40p">
            <span class="flex-1 flex-center bordered-blue border-width-2">短期记忆复习周期</span>
            <span class="flex-2 flex-center bordered-blue border-width-2">长期记忆复习周期</span>
          </div>
          <div class="bottom flex h-60p">
            <span v-for="item in circleList" class="flex-column flex-1 flex-center bordered-blue border-width-2">{{
                item
              }}</span>
          </div>
        </div>
      </div>

      <div class="ebhs-table__body">
        <div class="ebhs-table__row flex">
          <div class="ebhs-table__left flex w-15p">
            <span class="flex-center t-20 flex-1 bordered-blue border-width-2">序号</span>
            <span class="flex-center t-20 flex-2 bordered-blue border-width-2">学习日期</span>
          </div>
          <div class="ebhs-table__middle flex w-45p">
            <span class="flex-center t-20 bordered-blue flex-1 border-width-2">
            学习内容
          </span>
          </div>
          <div class="ebhs-table__right flex w-40p">
            <span v-for="item in circleList" class="flex-column flex-1 flex-center bordered-blue border-width-2">{{
                item
              }}</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<style lang="scss" scoped>

.ebhs-table {
  border: 1px solid yellow;
}

.ebhs-table__title {
  border: 1px solid green;
  min-height: 40px;
  max-height: 120px;
}

.ebhs-table__left {
  span {
    border: 2px solid blue;
  }
}

</style>