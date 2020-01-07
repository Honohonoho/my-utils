class EventHub {
  private cache: { [key: string]: Array<(data: unknown) => void> } = {}
  on(eventName: string, fn: (data: any)=> void) {
    this.cache[eventName] = this.cache[eventName] || []
    this.cache[eventName].push(fn)
  }
  emit(eventName: string, data?: unknown) {
    if (this.cache[eventName] === undefined) return
    this.cache[eventName].forEach(fn => fn(data))
  }
  undescribe(eventName: string, fn: (data: unknown) => void) {
    this.cache[eventName] = this.cache[eventName] || []
    let index = indexOf(this.cache[eventName], fn)
    if (index === -1) return
    this.cache[eventName].splice(index, 1)
  }
}

export default EventHub

function indexOf (array, item) {
  if (array === undefined) return -1
  let index = -1
  for (let i = 0; i < array.length; i++) {
    if (array[i] === item) {
      index = i
      break;
    }
  }
  return index
}