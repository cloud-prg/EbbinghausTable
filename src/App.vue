<script setup lang="ts">
import grapshImg from './assets/graph.jpg'
</script>

<template>
  <div class="container">
    <header class="ebhs-header">
      <div class="ebhs-img-container">
        <img :src="grapshImg" class="ebhs-img" />
      </div>
      <div class="ebhs-description">
        <span>
          &nbsp; &nbsp;
          <span class="is-bold">定义:</span>
          信息输入大脑后，遗忘也就随之开始了。遗忘率随时间的流逝而先快后慢，特别是在刚刚识记的短时间里，遗忘最快，这就是著名的艾宾浩斯遗忘曲线。遵循艾宾浩斯遗忘曲线所揭示的记忆规律，对所学知识及时进行复习，这种记忆方法即为艾宾浩斯记忆法。
          对所学知识和记忆效果及时进行复习和自测是艾宾浩斯记忆法的主要方式。艾宾浩斯记忆法也是遗忘曲线；一个小时后就会遗忘；在一个小时内回想就可以记住那个东西；最好一天之后再回想；下一次三天之后再回想就可以了。
        </span>
        <span>
          &nbsp; &nbsp;
          <span class="is-bold">记忆种类及记忆周期:</span>
          人的记忆周期分为短期记忆和长期记忆两种。 第一个记忆周期是 5分钟 第二个记忆周期是30分钟 第三个记忆周期是12小时
          这三个记忆周期属于短期记忆的范畴。 下面是几个比较重要的周期。 第四个记忆周期是 1天 第五个记忆周期是 2天
          第六个记忆周期是 4天 第七个记忆周期是 7天 第八个记忆周期是15天
        </span>
      </div>
    </header>
    <main class="ebhs-main">
      <div class="ebhs-table-container">
      </div>
    </main>
  </div>
</template>

<style lang="scss" scoped>
.container {
  margin: 10px 20px;
}

.ebhs-header {
  display: flex;
  justify-content: space-between;
  height: 270px;
}

.ebhs-img-container {
  width: 25%;
  height: 100%;
}

.ebhs-img {
  width: 100%;
  height: 105%;
}

.ebhs-description {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 10px;
  font-size: 20px;
  letter-spacing: 2px;
  line-height: 1.6;
}

.ebhs-main {
  margin-top: 10px;
}

.is-bold {
  font-weight: bold;
}
</style>
