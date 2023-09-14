import { defineStore } from "pinia";
import { getHomeHotSuggests, getCategories, getHomeHouseList } from '@/services/index'
const useHomeStore = defineStore('home', {
  state: () => ({
    hotSuggests: [],
    categories: [],
    
    currentPage: 1,
    homeList: []
  }),
  actions: {
    fetchHotSuggestData() {
      getHomeHotSuggests().then(res => {
        this.hotSuggests = res.data
      })
    },
    fetchCategoriesData() {
      getCategories().then(res => {
        this.categories = res.data
      })
    },
    async fetchGetHouseListData() {
      const res = await getHomeHouseList(this.currentPage)
      this.homeList.push(...res.data)
      this.currentPage++
    }
  }
})

export default useHomeStore;
