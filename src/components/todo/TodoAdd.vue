<template>
    <div class = "add-container">
        <section id = "addForm">
            <form id = "todo-list" @submit.prevent = "addRecord">
                <b-input class = "todo-input"
                         id = "todoTitle"
                         v-model = "title"
                         name = "todoTitle"
                         type = "text"
                         placeholder = "Enter ToDo..."
                         @keyup.enter = "addRecord"
                />
            </form>
        </section>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                title: '',
            }
        },
        methods: {
            addRecord() {
                this.$store.dispatch( 'addTodo', this.title.trim() );
                this.title = '';
            },
        }
    }
</script>

<style scoped>
    .add-container {
        width: 45rem;
        margin: auto;
        background-color: white;
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.25);
    }

    .todo-input {
        width: 100%;
        padding: 0.1rem;
        font-size: 1.5rem;
        outline: none;
        border-radius: 0.25rem;
        border: solid 1px lightgray;
        box-sizing: border-box;
    }
</style>
