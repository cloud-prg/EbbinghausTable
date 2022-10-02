<script>
import { NDatePicker, NButton, NSpace, NInput, NPopconfirm, NIcon } from 'naive-ui'

export default {
  name: 'ebhs-table',
  components: {
    NDatePicker,
    NButton,
    NSpace,
    NInput,
    NPopconfirm,
    NIcon
  },
}
</script>
  
<script setup>
import { reactive, ref, getCurrentInstance } from 'vue'
import * as XLSX from "xlsx"
import { useMessage } from 'naive-ui'
import ExportJsonExcel from "js-export-excel"

const instance = getCurrentInstance()

const { appContext } = instance
const { config } = appContext
const { globalProperties } = config
const { $moment: moment } = globalProperties;
const message = useMessage()
const excelRef = ref(null)

// beforeMoment.suppressDeprecationWarnings = true // moment不提示警告

// 假数据
const mockDataSource = {
  startTime: '01-01 00:00',
  content: '',
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

let { circleList, circleMap } = reactive({
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
      format: '[今天]HH:mm'
    },
    '小时': {
      unit: 'hours',
      format: '[今天]HH:mm'
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
})

// 数据源
let dataSource = ref([{ ...mockDataSource }])

// 获取指定时间
const getAppointTime = (timeOption, value) => {
  let res
  Object.keys(circleMap).forEach(key => {
    if (timeOption.search(key) !== -1) {
      res = (moment(value).add(timeOption.slice(0, timeOption.search(key)), circleMap[key]['unit']).format(circleMap[key]['format']))
    }
  })
  return res
}

// 时间选择器 确认钩子
const handleConfirm = (value, index) => {
  dataSource.value[index].startTime = moment(value).format('YYYY-MM-DD HH:mm')
  circleList.forEach(item => {
    dataSource.value[index][item] = getAppointTime(item, value)
  })
  message.success(`时间已更新:  ${moment(value).format('YYYY-MM-DD HH:mm')}`)
}

// 数据源添加 新项
const add = () => {
  dataSource.value.push({ ...mockDataSource })
}

// 导出表格
const handleExport = () => {
  // 直接导出文件
  let option = {};
  option.fileName = `${moment().format('YYYY[年]MM[月]DD[日]HH[时]mm[分]')}-记忆时间表`;
  option.datas = [
    {
      sheetData: dataSource.value,
      sheetName: "记忆安排表",
      sheetFilter: Object.keys(dataSource.value[0]),
      sheetHeader: Object.keys(dataSource.value[0]),
      columnWidths: [7, 15, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    },
  ];
  let toExcel = new ExportJsonExcel(option); //new
  toExcel.saveExcel(); //保存
}

// 导入表格
const onChange = (event) => {
  const file = event.target.files[0];
  readerExcel(file)

  // 清除数据
  excelRef.value.value = null
}

// 读取对应表格文件
const readerExcel = (file) => {
  const fileReader = new FileReader();
  // 以二进制的方式读取表格内容
  fileReader.readAsBinaryString(file);

  // 表格内容读取完成
  fileReader.onload = (event) => {
    try {
      const fileData = event.target.result;
      const workbook = XLSX.read(fileData, {
        type: "binary",
      });
      // 表格是有序列表，因此可以取多个 Sheet，这里取第一个 Sheet
      const wsname = workbook.SheetNames[0];
      // 将表格内容生成 json 数据
      dataSource.value = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]);
      instance.ctx.$forceUpdate()
    } catch (e) {
      console.log(e);
      return false;
    }
  };
};

// 测试钩子
const handleTest = () => {
}

</script>
<template>
  <div class="ebhs-table-container">
    <div class="ebhs-table">
      <header class="ebhs-table__title flex">
        <div class="ebhs-table__left flex w-20%">
          <span class="flex items-center border border-width-2 b-sky  justify-center t-20 flex-basis-20%">操作🛠</span>
          <span
            class="flex items-center border border-width-2 b-sky border-l-none justify-center t-20 flex-basis-10%">序号</span>
          <span
            class="flex items-center border border-width-2 b-sky border-l-none justify-center t-20 flex-basis-70%">学习日期📅</span>
        </div>
        <div class="ebhs-table__middle flex w-20%">
          <span class="flex items-center justify-center t-20 flex-1 border b-sky  border-width-2 border-l-none">
            学习内容📚
          </span>
        </div>
        <div class="ebhs-table__right flex-col h-20 w-60%">
          <div class="upper flex h-40%">
            <span
              class="flex-basis-44.4% flex justify-center border b-sky border-width-2 border-l-none">短期记忆复习周期⏳</span>
            <span
              class="flex-basis-55.6% flex justify-center border b-sky border-width-2 border-l-none">长期记忆复习周期⏰</span>
          </div>
          <div class="bottom flex h-60%">
            <span v-for="(item,index) in circleList" :key="index"
              class="flex-basis-100% flex items-center justify-center border b-sky border-width-2 border-l-none border-t-none">{{
              item
              }}</span>
          </div>
        </div>
      </header>
      <!-- 主体 -->
      <div class="ebhs-table__body">
        <div v-for="(item , index) in dataSource" :key='index' class='ebhs-table__row flex'>
          <div class="ebhs-table__left  flex w-20%">
            <span
              class="flex items-center border border-width-2 b-sky border-t-none justify-center t-20 flex-basis-20%">
              <n-popconfirm @positive-click="()=>{dataSource.splice(index,1)}" @negative-click="()=>{}"
                positive-text="确认删除" negative-text="取消">
                <template #trigger>
                  <n-button size='small' type="error">删除</n-button>
                </template>
                确认要删除当前行吗？
              </n-popconfirm>
            </span>
            <span
              class="flex items-center border border-width-2 b-sky border-t-none border-l-none justify-center t-20 flex-basis-10%">{{
              index + 1
              }}</span>

            <span
              class="flex items-center border border-width-2 b-sky border-t-none border-l-none justify-center t-20 flex-basis-70%">
              <n-date-picker class="select-none" :input-readonly="true" type="datetime"
                :default-formatted-value="moment(item.startTime).format('MM-DD HH:mm')" format="MM-dd HH:mm"
                @confirm="handleConfirm($event,index)" />
            </span>

          </div>
          <div class="ebhs-table__middle flex w-20%">
            <span
              class="flex items-center justify-center t-20 border b-sky border-t-none border-l-none flex-1 border-width-2">
              <n-input v-model:value="item.content" type="textarea" placeholder="Your study plan" />
            </span>
          </div>
          <div class="ebhs-table__right flex w-60%">
            <span v-for="(timeOption,childIndex) in circleList" :key="childIndex"
              class="ebhs-time-item flex-basis-100% flex items-center justify-center border b-sky border-t-none border-l-none border-width-2">{{
              item[timeOption]
              }}</span>
          </div>
        </div>
      </div>
      <!--   底部-->
      <footer class="ebhs-table__footer">
        <n-space>
          <n-button size='large' @click="add" type="success">
            添加➕
          </n-button>
          <n-button size='large' type="info" class="relative w-auto h-auto p-0">
            <label for="file" class="cursor-pointer p-12.5px">导入表格📤</label>
          </n-button>
          <n-popconfirm @positive-click="handleExport" @negative-click="()=>{}" positive-text="确认" negative-text="取消">
            <template #trigger>
              <n-button size='large' type="warning">
                下载📩
              </n-button>
            </template>
            确定下载该表格？
          </n-popconfirm>
          <!-- <n-button size='large' @click="handleTest">测试打印</n-button> -->
        </n-space>
        <input type="file" ref="excelRef"
          accept=".csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          @change="onChange" id="file" name="file" class="excel display-none" />
      </footer>
    </div>
  </div>
</template>
  
  
<style lang="scss" scoped>
:deep(.n-input.n-input--textarea.n-input--resizable .n-input-wrapper) {
  min-height: 20px !important;
}

.ebhs-table__title {
  min-height: 40px;
  max-height: 120px;
}

.ebhs-button {
  font-size: 16px;
}

.ebhs-time-item {
  font-size: 16px;

  &:hover {
    background-color: rgba(44, 150, 120, 0.6);
    color: white;
    transition: all .15s ease;
  }
}
</style>