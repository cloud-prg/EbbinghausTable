<script>
export default {
  name: 'ebhs-table'
}
</script>

<script setup>
import {reactive, ref} from 'vue'
import * as moment from 'moment'
import "moment/dist/locale/zh-cn";

const {circleList, circleMap, dataSource} =
    reactive({
      // 记忆周期列表
      circleList: [
        '5分钟',
        '30分钟',
        '2小时',
        '1天',
        '2天',
        '4天',
        '7天',
        '15天',
        '1个月'
      ],
      // 时间段映射表
      circleMap: {
        '分钟': {
          unit: 'minutes',
          format: '[今天]hh:mm'
        },
        '小时': {
          unit: 'hours',
          format: '[今天]hh:mm'
        },
        '月': {
          unit: 'months',
          format: 'MM[月]DD[日]'
        },
        '天': {
          unit: 'days',
          format: 'MM[月]DD[日]'
        },
      },
      // 数据源
      dataSource: [
        {
          start: moment(),
          content: '学会SLS',
        }
      ]
    })

// 获取指定时间
function getAppointTime(timeOption, targetDate = (moment().format('YYYY MM DD HH mm'))) {
  let res = "";
  console.log(targetDate.split(' '))
  Object.keys(circleMap).forEach(key => {
    if (timeOption.search(key) !== -1) {
      res = moment(targetDate.split(' '))
          .add(timeOption.slice(0, timeOption.search(key)), circleMap[key]['unit'])
          .format(circleMap[key]['format'])
      console.log('res', res)
    }

  })

  return res;
}

</script>
<template>
  <div class="ebhs-table-container">
    <div class="ebhs-table">
      <div class="ebhs-table__title flex">
        <div class="ebhs-table__left flex w-15p">
          <span class="flex-center t-20 flex-1">序号</span>
          <span class="flex-center t-20 flex-2">学习日期</span>
        </div>
        <div class="ebhs-table__middle flex  w-25p">
          <span class="flex-center t-20 flex-1 bordered-blue border-width-2">
            学习内容
          </span>
        </div>
        <div class="ebhs-table__right flex-column h-80 w-60p">
          <div class="upper flex h-40p">
            <span class="flex-1 flex-center bordered-blue border-width-2">短期记忆复习周期</span>
            <span class="flex-2 flex-center bordered-blue border-width-2">长期记忆复习周期</span>
          </div>
          <div class="bottom flex h-60p">
            <span v-for="(item,index) in circleList" :key="index"
                  class="flex-column flex-1 flex-center bordered-blue border-width-2">{{
                item
              }}</span>
          </div>
        </div>
      </div>
      <div class="ebhs-table__body">
        <div v-for="(item , index) in dataSource" :key='index' class='ebhs-table__row flex'>
          <div class="ebhs-table__left flex w-15p">
            <span class="flex-center t-20 flex-1 bordered-blue border-width-2">{{ index + 1 }}</span>
            <span class="flex-center t-20 flex-2 bordered-blue border-width-2">{{
                item.start.format('MM[月]DD[日] h:mm')
              }}</span>
          </div>
          <div class="ebhs-table__middle flex w-25p">
            <span class="flex-center t-20 bordered-blue flex-1 border-width-2">
            {{ item.content }}
          </span>
          </div>
          <div class="ebhs-table__right flex w-60p">
            <span v-for="(timeOption,childIndex) in circleList" :key="childIndex"
                  class="flex-column flex-1 flex-center bordered-blue border-width-2">{{
                getAppointTime(timeOption, item.start.format('YYYY MM DD HH mm'))
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