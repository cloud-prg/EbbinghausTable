<script>
import {NDatePicker, NButton, NSpace, NInput} from 'naive-ui'

export default {
  name: 'ebhs-table',
  components: {
    NDatePicker,
    NButton,
    NSpace,
    NInput,
  },
}
</script>

<script setup>
import {reactive, ref, nextTick} from 'vue'
import * as moment from 'moment'
import "moment/dist/locale/zh-cn";
import {useMessage} from 'naive-ui'
import app from "../../App.vue";

const message = useMessage()
moment.suppressDeprecationWarnings = true // moment不提示警告

let {circleList, circleMap, dataSource} =
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
        '个月': {
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
          startTime: '09-28 00:59',
          content: '学会SLS',
          '5分钟': '-',
          '30分钟': '-',
          '2小时': '-',
          '1天': '-',
          '2天': '-',
          '4天': '-',
          '7天': '-',
          '15天': '-',
          '1个月': '-',
        }
      ]
    })

// 获取指定时间
const getAppointTime = (timeOption, targetDate) => {
  let res = moment(targetDate.split(' '));
  Object.keys(circleMap).forEach(key => {
    if (timeOption.search(key) !== -1) {
      // .add(2,'d').subtract(1,'months')
      if (['1天', '2天', '4天', '7天', '15天', '1个月'].includes(timeOption)) {
        res = res.add(timeOption.slice(0, timeOption.search(key)), circleMap[key]['unit']).subtract(1, 'M').format(circleMap[key]['format'])
      } else {
        res = res.add(timeOption.slice(0, timeOption.search(key)), circleMap[key]['unit']).format(circleMap[key]['format'])
      }
    }
  })
  return res;
}

// getAppointTime(timeOption, moment(item.startTime).format('YYYY MM DD HH mm'))
// 时间选择器 确认钩子
const handleConfirm = (value, index) => {
  let res = moment(value)
  dataSource[index].startTime = res
  circleList.forEach(item => {
    dataSource[index][item] = getAppointTime(item, res.format('YYYY MM DD HH mm'))
  })
  message.success(`时间已更新:  ${res.format('YYYY-MM-DD HH:mm')}`)
}


// 数据源添加 新项
const add = () => {
  dataSource.push({
    startTime: undefined,
    content: undefined,
  })
}

const handleConsole = () => {
  console.log('dataSource',dataSource)
}


</script>
<template>
  <div class="ebhs-table-container">
    <div class="ebhs-table">
      <header class="ebhs-table__title flex">
        <div class="ebhs-table__left flex w-15%">
          <span class="flex items-center border border-width-2 b-blue justify-center t-20 flex-basis-30%">序号</span>
          <span class="flex items-center border border-width-2 b-blue justify-center t-20 flex-basis-70%">学习日期</span>
        </div>
        <div class="ebhs-table__middle flex w-25%">
          <span class="flex items-center justify-center t-20 flex-1 border b-sky border-width-2">
            学习内容
          </span>
        </div>
        <div class="ebhs-table__right flex-col h-20 w-60%">
          <div class="upper flex h-40%">
            <span class="flex-basis-44% flex justify-center border b-sky border-width-2">短期记忆复习周期</span>
            <span class="flex-basis-55% flex justify-center border b-sky border-width-2">长期记忆复习周期</span>
          </div>
          <div class="bottom flex h-60%">
            <span v-for="(item,index) in circleList" :key="index"
                  class="flex-basis-100% flex items-center justify-center border b-sky border-width-2">{{
                item
              }}</span>
          </div>
        </div>
      </header>
      <!-- 主体 -->
      <div class="ebhs-table__body">
        <div v-for="(item , index) in dataSource" :key='index' class='ebhs-table__row flex'>
          <div class="ebhs-table__left flex w-15%">
            <span class="flex items-center justify-center t-20  flex-basis-30% border b-sky border-width-2">{{
                index + 1
              }}</span>
            <span class="flex items-center justify-center t-20  flex-basis-70% border b-sky border-width-2">
                <n-date-picker
                    type="datetime"
                    :default-formatted-value="moment(item.startTime).format('MM-DD HH:mm')"
                    format="MM-dd HH:mm"
                    @confirm="handleConfirm($event,index)"
                />
            </span>
          </div>
          <div class="ebhs-table__middle flex w-25%">
            <span class="flex items-center justify-center t-20 border b-sky flex-1 border-width-2">
              <n-input v-model:value="item.content" type="textarea" placeholder="Your study plan"/>
          </span>
          </div>
          <div class="ebhs-table__right flex w-60%">
            <span v-for="(timeOption,childIndex) in circleList" :key="childIndex"
                  class="flex-basis-100% flex items-center justify-center border b-sky border-width-2">{{
                item[timeOption]
              }}</span>
          </div>
        </div>
      </div>

      <!--   底部-->
      <footer class="ebhs-table__footer">
        <n-space>
          <n-button @click="add" type="success">
            添加
          </n-button>
          <n-button @click="()=>{}" type="info">
            导入表格
          </n-button>
          <n-button @click="()=>{}" type="warning">
            导出表格
          </n-button>
          <n-button @click="handleConsole" type="warning">
            打印表格
          </n-button>
        </n-space>


      </footer>
    </div>

  </div>
</template>


<style lang="scss" scoped>

 :deep(.n-input.n-input--textarea.n-input--resizable .n-input-wrapper) {
  min-height: 20px !important;
 }
.ebhs-table {
  border: 1px solid yellow;
}

.ebhs-table__title {
  border: 1px solid green;
  min-height: 40px;
  max-height: 120px;
}

.ebhs-table__left {
}

.ebhs-button {
  font-size: 16px;
}
</style>