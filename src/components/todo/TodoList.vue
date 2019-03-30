<template>
    <section class = "list-container">
        <div>
            <ul>
                <li v-for = "todo in filteredTodos" :key = "todo.index">
                    <TodoListItem :myRec = "todo"/>
                </li>
            </ul>
        </div>
        <TodoFooter/>
    </section>
</template>

<script>
    import { mapActions, mapGetters, mapState } from 'vuex';
    import TodoListItem from "@/components/todo/TodoListItem";
    import TodoFooter from "@/components/todo/TodoFooter";

    export default {
        components: {
            TodoFooter,
            TodoListItem,
        },
        computed: {
            ...mapGetters( [
                'filteredTodos',
                'cntCompleted',
                'cntTodos',
                'visibilityType',
                'hasCompleted',
                'isActiveRecs',
            ] ),
            ...mapState( [
                'modalVisible',
                'modalComponent'
            ] ),
        },
        methods: {
            ...mapActions( [
                'removeAllCompleted',
                'hideModal',
                'showModal',
            ] ),
            removeAllCompletedRecs() {
                console.log( 'In removeAllCompletedRecs' );
                this.showModal();
            }
        },
    }
</script>

<style scoped>
    .list-container {
        width: 45rem;
        margin: 0.5rem 0.5rem 1.0rem 0.5rem;
        background-color: white;
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.25);
    }

    .todo-count span {
        font-weight: bold;
    }
</style>

