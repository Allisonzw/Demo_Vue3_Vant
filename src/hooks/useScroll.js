import { onMounted, onUnmounted, ref } from "vue"

export default function useScroll(reachBottomCB) {
  const isReachBottom = ref(false)
  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  const scrollListenerHandler = () => {
    clientHeight.value = document.documentElement.clientHeight
    scrollTop.value = document.documentElement.scrollTop
    scrollHeight.value = document.documentElement.scrollHeight
    if (clientHeight.value + scrollTop.value >= scrollHeight.value - 10) {
      console.log("滚动到底部了")
      isReachBottom.value = true
      if (reachBottomCB) reachBottomCB()
    }
  }
  
  onMounted(() => {
    window.addEventListener("scroll", scrollListenerHandler)
  })
  
  onUnmounted(() => {
    window.removeEventListener("scroll", scrollListenerHandler)
  })
  return { isReachBottom, clientHeight, scrollTop, scrollHeight }
}
