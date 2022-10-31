<template>
    <header>
        <select v-model="selected">
            <option v-for="opt in options" v-bind:key="opt">
                {{ opt }}
            </option>
        </select>
    </header>
    <main>
        <UserPart v-if="selected=='Users'">
        </UserPart>
        <DirectoryPart v-if="selected=='PC'" header="computer" row-name="pc" get-action="getPC" post-action="postPC" remove-action="deletePCs">
        </DirectoryPart>
        <DirectoryPart v-if="selected=='Departments'" header="department"
            row-name="departments" get-action="getDepartments" post-action="postDepartment" remove-action="deleteDepartments">
        </DirectoryPart>
    </main>
</template>

<script>
import UserPart from './UserPart.vue'
import DirectoryPart from './DirectoryPart.vue'
export default {
    components: {
        UserPart,
        DirectoryPart,
    },
    data(){
        return {
            selected: 'Users',
            options : ['Users', 'PC', 'Departments']
        }
    },
    methods: {
    },
    async mounted(){
    },
}
</script>
<style lang="scss">
@import '../vars.scss';
$header-height: 49px;
header{
    background: $dark;
    height: $header-height;
    select{
        height: 100%;
        font-size: 30px;
        background: $light;
        option[selected] {
            background: blue;
        }

    }
}
main{
    background: $light;
    min-height: calc(100% - $header-height);
}
table{
  margin-left:5px;
  border: 1px solid black;
  th {
    border: 1px solid black;
    font-size: bold;
  }
  td {
    border: 1px solid black;
  }
  td select{
    width: 100%;
  }
}
</style>