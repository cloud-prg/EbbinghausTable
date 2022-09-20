<script>
export default {
  name: 'ebhs-header'
}
</script>

<script setup>
import {ref} from 'vue'

const props = defineProps({
  lang: {
    type: String,
    default: 'cn'
  }
})

</script>
<template>
  <header class="ebhs-header flex-sb-x pb-10">
    <div class="ebhs-img-container flex-1">
      <img
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-66b9a10d26a53f63f6a141557240f87b_b.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666278668&t=161b8a0ee696dfd22566d5228f3cb4fa"
          class="ebhs-img"/>
    </div>
    <div class="ebhs-description flex-2 flex-column">
        <span>
          <span class="is-bold">定义:</span> 信息输入大脑后，遗忘也就随之开始了。遗忘率随时间的流逝而先快后慢，特别是在刚刚识记的短时间里，遗忘最快，这就是著名的艾宾浩斯遗忘曲线。
        </span>
      <span>
          <span class="is-bold">记忆种类及记忆周期:</span> 人的记忆周期分为短期记忆和长期记忆两种。
          第一个记忆周期是 5分钟
          第二个记忆周期是30分钟
          第三个记忆周期是12小时
          这三个记忆周期属于短期记忆的范畴。
          下面是几个比较重要的周期。
          第四个记忆周期是 1天
          第五个记忆周期是 2天
          第六个记忆周期是 4天
          第七个记忆周期是 7天
          第八个记忆周期是15天
        </span>
    </div>
  </header>
</template>


<style lang="scss" scoped>

.ebhs-header {
  min-height: 170px;
}

.ebhs-img-container {
  //width: 25%;
  //border: 1px solid #f0f0f0;
}

.ebhs-img {
  width: 100%;
  max-width: 450px;
  min-width: 350px;
  height: 100%;
  max-height: 300px;
  min-height: 200px;

}

.ebhs-description {
  padding-top: 10px;
  margin: 0 10px;
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 1.4;

  span + span{
    margin-top: 80px;
  }
}



</style>