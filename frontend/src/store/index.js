import { createStore } from 'vuex'
import { $api } from './axios'

export default createStore({
    actions: {
        async getUsers(){
            const res = await $api.get('/users', {})
            return res
        },
        async postUser(ctx, { name, salary, pc, department }){
            const res = await $api.post('/users', { name, salary, pc, department })
            return res
        },
        async updateUserDepartment(ctx, { id, department }){
            const res = await $api.patch('/users', { id, department })
            return res
        },

        async getDepartments(){
            const res = await $api.get('/departments', {})
            return res
        },
        async postDepartment(ctx, name){
            const res = await $api.post('/departments', { name })
            return res
        },
        async deleteDepartments(ctx, ids){
            ids = ids.map(Number)
            const res = await $api.delete('departments', { data: { ids } })
            return res
        },

        async getPC(){
            const res = await $api.get('pc', {})
            return res
        },
        async postPC(ctx, name){
            const res = await $api.post('pc', { name })
            return res
        },
        async deletePCs(ctx, ids){
            ids = ids.map(Number)
            const res = await $api.delete('pc', { data: { ids } })
            return res
        }
    },
    state: {
    },
    mutations: {
    },
    getters: {
    }
})