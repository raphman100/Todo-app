<template>
    <section class = "todo-input">
        <b-checkbox
            type = "is-success"
            size = "is-medium"
            v-model = "todoIsDone"></b-checkbox>

        <section>
            <span :class = "{ 'completed': todoIsDone }"
                  v-if = "!showField( 'todoTitle' )"
                  @dblclick = "focusField( 'todoTitle' )"
            >{{ todoTitle }}</span>
            <input v-model = "todoTitle"
                   v-if = "showField( 'todoTitle' )"
                   v-focus
                   id = "todo-title"
                   type = "text"
                   @focus = "focusField( 'todoTitle' )"
                   @keyup.enter = "blurField"
                   @blur = "blurField"/>
        </section>
        <button class = "btn btn-danger destroy" @click = "removeTodoRec" v-if = "todoIsDone">
            <icon name = "trash"/>
        </button>
    </section>
</template>

<script>
    export default {
        name: "TodoListItem",
        props: {
            myRec: {
                type: Object,
                required: false,
            }
        },
        directives: {
            focus: {
                inserted( el ) {
                    el.focus();
                },
            },
        },
        data() {
            return {
                todoIsDone: this.myRec.isDone,
                todoTitle: this.myRec.title,
                todoIndex: this.myRec.index,
                editField: '',
            };
        },
        methods: {
            updateTodoRec() {
                this.$store.dispatch( 'updateTodo', {
                    index: this.todoIndex,
                    title: this.todoTitle,
                    isDone: this.todoIsDone,
                } );
            },
            removeTodoRec() {
                this.$store.dispatch( 'removeTodo', this.todoIndex );
            },
            focusField( field ) {
                //if ( event && event.target ) this.$nextTick( () => event.target.focus() );
                this.editField = field;
            },
            blurField() {
                this.updateTodoRec();
                this.editField = '';
            },
            showField( field ) {
                return ( this.todoTitle === '' || this.editField === field );
            },
        },
        watch: {
            todoIsDone() {
                this.updateTodoRec();
            }
        }

    }
</script>

<style scoped>
    .todo-input {
        width: 100%;
        padding: 0.1rem;
        font-size: 1.25rem;
        outline: none;
        border-radius: 0.25rem;
        border: solid 1px lightgray;
        box-sizing: border-box;
        text-align: left;
        display: flex;
    }

    #todo-title {
        width: 37rem;
        font-size: 1.25rem;
        display: flex;
    }

    .destroy {
        font-size: 1.0rem;
        color: brown;
        background-color: bisque;
        text-align: center;
        margin-left: auto;
        float: right;
    }

    /*The .completed is being used but IDE not showing it as used*/
    .completed {
        text-decoration: line-through;
        color: #555;
    }

    .destroy:hover {
        cursor: pointer;
    }
</style>

