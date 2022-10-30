import { createApp } from 'vue'
import App from './App.vue'
import store from './store'

String.prototype.capitalizeFirstLetter = function() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}


const app = createApp(App)
app.use(store)
app.mount('#app')
