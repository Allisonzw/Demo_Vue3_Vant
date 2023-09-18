
<template>
  <div class="detail top-page">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <div class="main" v-if="mainPart">
      <detail-swiper :swipe-data="mainPart.topModule.housePicture.housePics"/>
      <detail-infos :top-infos="mainPart.topModule" />
      <detail-facility name="设施" :ref="getSectionRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"/>
      <detail-landlord name="房东" :ref="getSectionRef" :landlord="mainPart.dynamicModule.landlordModule"/>
      <detail-comment name="评论" :ref="getSectionRef" :comment="mainPart.dynamicModule.commentModule"/>
      <detail-notice name="须知" :ref="getSectionRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"/>
      <detail-map />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getDetailInfos } from '@/services/index.js'

import DetailSwiper from './components/detail_01-swipe.vue'
import DetailInfos from './components/detail_02-infos.vue'
import DetailFacility from './components/detail_03-facility.vue'
import DetailLandlord from './components/detail_04-landlord.vue'
import DetailComment from './components/detail_05-comment.vue'
import DetailNotice from "./components/detail_06-notice.vue"
import DetailMap from './components/detail_07-map.vue'
import { showDialog } from 'vant';

const route = useRoute()
const router = useRouter()

const detailInfos = ref({})
const mainPart = computed(() => detailInfos.value.mainPart)
getDetailInfos(route.params.id).then(res => {
  if(!res) {
    showDialog({
      message: '该内容暂无数据',
    }).then(() => {
      router.back()
    });
  } else {
    detailInfos.value = res.data
  }
})

const onClickLeft = () => {
  router.back()
}
</script>

<style scoped>

</style>