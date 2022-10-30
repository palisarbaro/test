<template>
    <div class="directory">
        <br>
        <div class="form">
            <label>{{header.capitalizeFirstLetter()}} name: </label>
            <input v-model="newRow">
            <br>
            <button @click="addRow">Add {{header}}</button>

        </div>
        <br>
        <table v-if="loaded">
        <th v-for="coloumnName in tableHeader" v-bind:key="coloumnName">
            {{coloumnName}}
        </th>
        <th>
            <button @click="removeAll()">remove all</button>
        </th>
        <tr v-for="row in data" v-bind:key="row.id">
            <td>
            {{row.id}}
            </td>
            <td>
            {{row.name}}
            </td>
            <td>
                <button :disabled="row.inuse" @click="removeOne(row.id)">remove</button>
            </td>
        </tr>
        </table>
        <div v-else>
            Loading...
        </div>
    </div>
</template>
<script>
export default {
    components: {
    },
    props: {
        header      : String,
        rowName     : String,
        getAction   : String,
        postAction  : String,
        removeAction: String
    },
    data(){
        return {
            loaded     : false,
            tableHeader: ['id', 'name'],
            data       : [],
            newRow     : ''

        }
    },
    methods: {
        async updateList(){
            this.loaded = false
            const res = await this.$store.dispatch(this.getAction)
            this.data = res.data[this.rowName]
            this.loaded = true
        },
        async addRow(){
            try{
                await this.$store.dispatch(this.postAction, this.newRow)
                this.newRow = ''
                await this.updateList()
            }
            catch(e){
                alert(e.response.data.error)
            }
        },
        async removeOne(id){
            try{
                await this.$store.dispatch(this.removeAction, [id])
                await this.updateList()
            }
            catch(e){
                alert(e.response.data.error)
            }
        },
        async removeAll(){
            try{
                const ids = this.data.filter((obj)=>!obj.inuse).map((obj)=>obj.id)
                await this.$store.dispatch(this.removeAction, ids)
                await this.updateList()
            }
            catch(e){
                alert(e.response.data.error)
            }
        }
    },
    async mounted(){
        await this.updateList()
    },
}
</script>
<style scope lang="scss">
@import '../vars.scss';
.directory{
    .form{
        background: $dark;
        width: 213px;
        border: 1px solid black;
        margin-bottom: 5px;
        margin-left: 5px;
        border-radius: 5px;
        padding: 5px;
        input {
            background:  $light;
        }
        button{
            margin-top: 5px;
            margin-bottom: 5px;
        }
    }
    button{
        background: $dark;
        width: 100%;
    }
}
</style>