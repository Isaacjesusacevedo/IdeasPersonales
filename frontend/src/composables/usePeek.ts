import { ref } from 'vue'

const stack = ref<string[]>([])

export function usePeek() {
  const open = (id: string) => {
    if (stack.value.length >= 3) stack.value.shift()
    stack.value.push(id)
  }
  const closeTop = () => { stack.value.pop() }
  const closeAll = () => { stack.value = [] }
  return { stack, open, closeTop, closeAll }
}