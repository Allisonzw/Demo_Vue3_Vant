import axios from 'axios'

import { TIMEOUT } from './config'
import useMainStore from '@/stores/modules/main'
import { closeToast, showLoadingToast } from 'vant'
import { getAssetURL } from "@/utils/load_assets.js"
const BASE_URL = import.meta.env.VITE_BASE_URL
const mainStore = useMainStore()
class HYRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })

    this.instance.interceptors.request.use(config => {
      mainStore.isLoading = true
      // 试用vant组件自定义图片加载
      // showLoadingToast({
      //   message: '加载中',
      //   icon: getAssetURL('home/full-screen-loading.gif'),
      //   forbidClick: true
      // })
      return config
    }, err => {
      return err
    })

    this.instance.interceptors.response.use(res => {
      // closeToast()
      mainStore.isLoading = false
      return res
    }, err => {
      // showFailToast('加载失败');
      // closeToast()
      mainStore.isLoading = false
      return err
    })
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
      }).catch(err => {
        reject(err)
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)


