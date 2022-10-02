<script>
export default {
  name: 'ebhs-header'
}
</script>

<script setup>
const props = defineProps({
  lang: {
    type: String,
    default: 'cn'
  }
})

</script>
<template>
  <header class="ebhs-header flex justify-between pb-2">
    <div class="ebhs-img-container flex-basis-20%">
      <figure>
        <img
            alt="艾宾浩斯曲线"
          src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic4.zhimg.com%2Fv2-66b9a10d26a53f63f6a141557240f87b_b.jpg&refer=http%3A%2F%2Fpic4.zhimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666278668&t=161b8a0ee696dfd22566d5228f3cb4fa" />
      </figure>
    </div>
    <div class="ebhs-description flex flex-basis-80% flex-col pl-70px">
      <span class="mt-2">
        <span class="is-bold">定义:</span> 信息输入大脑后，遗忘也就随之开始了。遗忘率随时间的流逝而先快后慢，特别是在刚刚识记的短时间里，遗忘最快，这就是著名的艾宾浩斯遗忘曲线。
      </span>
      <span class="mt-17">
        <span class="is-bold">记忆种类及记忆周期:</span>
        人的记忆周期分为<strong>短期记忆</strong>和<strong>长期记忆</strong>两种。
        第一个记忆周期是 5分钟
        、第二个记忆周期是30分钟
        、第三个记忆周期是12小时
        、这三个记忆周期属于短期记忆的范畴
        、下面是几个长期记忆(<strong>比较重要</strong>)的周期
        、第四个记忆周期是 1天
        、第五个记忆周期是 2天
        、第六个记忆周期是 4天
        、第七个记忆周期是 7天
        、第八个记忆周期是15天
      </span>
    </div>
  </header>
</template>


<style lang="scss" scoped>
.ebhs-header {
  min-height: 170px;
}

.ebhs-img-container {
  width: 200px;
  figure {
    position: relative;
    padding-bottom: 100%;
    width: calc(100% + 70px);

    img {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
    }
  }


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

}
</style>