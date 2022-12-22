import { createPinia, defineStore } from 'pinia'

export const useStore = defineStore('store',{
    state: () => { 
        return {
            count: 0,
            scroll: 0,
            cleanMessage: false,
            currentEmoji: {
              value: null
            },
            isDisplay: false,
            range: null,
        }
    },
    getters: {
        getCount: (state) => {
            return state.count
        },
        getScroll: (state) => {
            return state.scroll
        },
        getCleanMessage: (state) => {
            return state.cleanMessage
        },
        getCurrentEmoji: (state) => {
            return state.currentEmoji
        },
        getIsDisplay: (state) => {
            return state.isDisplay
        },
        getRange: (state) => {
            return state.range
        }
    },
    actions: {
        setCount(count:number){
            this.count = count
        },
        setScroll(scroll:number){
            this.scroll = scroll
        },
        setCleanMessage(cleanMessage:boolean){
            this.cleanMessage = cleanMessage
        },
        setCurrentEmoji(currentEmoji:any){
            this.currentEmoji = currentEmoji
        },
        setIsDisplay(isDisplay:boolean){
            this.isDisplay = isDisplay
        },
        setRange(range:any){
            this.range = range
        }
        
    }
})

export const store = createPinia()