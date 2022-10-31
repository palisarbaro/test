<template>
    <div class="users">
        <AddUserDialog :update="update"></AddUserDialog>
        <table class="user-table" v-if="loaded">
        <th v-for="coloumnName in tableHeader" v-bind:key="coloumnName">
            {{coloumnName}}
        </th>
        <tr v-for="user in users" v-bind:key="user.id">
            <td>
                {{user.id}}
            </td>
            <td>
                {{user.name}}
            </td>
            <td>
                {{user.salary}}
            </td>
            <td>
                {{user.computer?.name}}
            </td>
            <td>
                <select v-model="user.department.id" @change="departmentChanged(user.id,$event)">
                    <option v-for="dep in departments" v-bind:key="dep.id" :value="dep.id">
                        {{dep.name}}
                    </option>
                </select>
            </td>
        </tr>
        </table>
        <div v-else>
            Loading...
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import AddUserDialog from './AddUserDialog.vue'
export default {
    components: {
        AddUserDialog
    },
    data(){
        return {
            loaded     : false,
            tableHeader: ['id', 'name', 'salary', 'computer', 'department'],
            departments: [],
            users      : [],
        }
    },
    methods: {
        ...mapActions(['getUsers', 'getDepartments', 'updateUserDepartment']),
        async departmentChanged(id, option){
            const department = Number(option.target.value)
            option.target.disabled = true
            await this.updateUserDepartment({ id, department })
            option.target.disabled = false
        },
        async update(){
            this.loaded = false
            const users = await this.getUsers()
            this.users = users.data.users

            const departments = await this.getDepartments()
            this.departments = departments.data.departments
            this.departmentsObj = {}
            for(let dep of this.departments){
                this.departmentsObj[dep.id] = dep.name
            }
            this.loaded = true
        },
    },
    async mounted(){
        this.update()
    },
}
</script>


<style  lang="scss">
@import '../vars.scss';
.users{
    table, select{
        background: $dark;
    }
    button{
        margin-left: 5px;
        background: $dark;
        border-radius: 5px;
        margin-top: 5px;
        margin-bottom: 5px;
    }
}
</style>
