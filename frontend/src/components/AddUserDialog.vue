<template>
<button @click="addUser1">Add user</button>
<div :class="{dialog_container: true, closed:dialog_closed}" @click="closeDialog()">
    <dialog ref="dialog" @click.prevent.stop>
        <div class="dialog_content">
            <table>
                <tr>
                    <td>
                        User name:
                    </td>
                    <td><input style="width: 300px;" v-model="username"></td>
                </tr>
                <tr>
                    <td>
                        Salary:
                    </td>
                    <td>
                        <input @keypress="onlyNumber" v-model.number="salary" style="width: 300px;">
                    </td>
                </tr>
                <tr>
                    <td>
                        Computer:
                    </td>
                    <td>
                        <Multiselect
                        class="multiselect"
                        v-model="selectedPC"
                        :options="computersObj"
                        :searchable="true"/>
                    </td>
                </tr>
                <tr>
                    <td>
                        Department:
                    </td>
                    <td>
                        <Multiselect
                        class="multiselect"
                        v-model="selectedDepartment"
                        :options="departmentsObj"
                        :searchable="true"/>
                    </td>
                </tr>
            </table>
            <button @click="addUser2">Add user</button>
        </div>
    </dialog>
</div>
</template>
<script>
import { mapActions } from 'vuex'
import Multiselect from '@vueform/multiselect'
export default {
    components: {
        Multiselect,
    },
    props: {
        update: Function
    },
    data(){
        return {
            computersObj      : {},
            departments       : [],
            departmentsObj    : {},
            selectedPC        : null,
            selectedDepartment: null,
            dialog_closed     : true,
            username          : '',
            salary            : 0
        }
    },
    methods: {
        ...mapActions(['getUsers', 'getDepartments', 'getPC', 'postUser', 'updateUserDepartment']),
        addUser1(){
            this.$refs.dialog.show()
            this.dialog_closed = false
        },
        async addUser2(){
            try{
                await this.postUser({ name: this.username, salary: this.salary, pc: Number(this.selectedPC) || null, department: Number(this.selectedDepartment) || null } )
                this.salary = 0
                this.username = ''
                this.selectedDepartment = null
                this.selectedPC = null
            }
            catch(e){
                alert(e.response.data.error)
            }
            finally{
                this.closeDialog()
                this.updateDialog()
                this.update()
            }
        },
        closeDialog(){
            this.$refs.dialog.close()
            this.dialog_closed = true
        },
        onlyNumber ($event) {
            let keyCode = ($event.keyCode ? $event.keyCode : $event.which)
            if ((keyCode < 48 || keyCode > 57) && keyCode !== 46) {
                $event.preventDefault()
            }
        },
        async updateDialog(){
            const departments = await this.getDepartments()
            this.departments = departments.data.departments
            this.departmentsObj = {}
            for(let dep of this.departments){
                this.departmentsObj[dep.id] = dep.name
            }

            const computers = (await this.getPC()).data.pc
            this.computersObj = {}
            for(let comp of computers){
                if(!comp.inuse){
                    this.computersObj[comp.id] = comp.name
                }
            }
        }
    },
    async mounted(){
        this.updateDialog()
    },
}
</script>


<style src="@vueform/multiselect/themes/default.css"></style>
<style  lang="scss">
@import '../vars.scss';
.dialog_container{
    &.closed{
        background: rgba(0,0,0,0);
        z-index: -100;
    }
    background: rgba(0,0,0,0.5);
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    dialog{
        border-radius: 10px;
        background-color: $light;
        $dialog-height: 168px;
        height: $dialog-height;
        width: 420px;
        top: calc(50% - $dialog-height/2);
        .multiselect {
            width: 308px;
        }
        table{
            border: none;
            background: $light;
            td{
                border: none;
            }
        }
        input, .multiselect-search{
            background: $dark !important;
        }
        .multiselect{
            border: 1px solid black;
            .is-selected{
                background-color: $light;
            }
        }
    }
    button{
        width: 100%;
    }
}
.dialog_content{
    width: 420px;
}

</style>
