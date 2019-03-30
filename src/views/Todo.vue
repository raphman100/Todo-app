<template>
    <section class = "container">
        <header>
            <TodoHeader/>
        </header>
        <div>
            <TodoAdd/>
        </div>
        <div>
            <TodoList/>
        </div>
        <div class = "info">
            <p>Double-click to edit a todo</p>
        </div>

    </section>
</template>

<script>
    import TodoHeader from '@/components/todo/TodoHeader';
    import TodoList from '@/components/todo/TodoList';
    import TodoAdd from '@/components/todo/TodoAdd';

    export default {
        name: 'Todo',
        data() {
            return {
                activeCnt: 0,
                completedCnt: 0,
                totalCnt: 0,
            };
        },
        components: {
            TodoList,
            TodoHeader,
            TodoAdd,
        },
        mounted: function () {
            this.$store.dispatch( "initAllThings" );
        },
    }
</script>


<style scoped>
    .container {
        width: 48rem;
        margin: auto;
        background-color: white;
        border-radius: 0.5rem;
        padding: 1rem;
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.25);
    }
    .info {
        margin: 1.0rem 0 0.5rem 0;
        color: #bfbfbf;
        font-size: 0.75rem;
        text-shadow: 0 0.25rem 0 rgba(255, 255, 255, 0.5);
        text-align: center;
    }
</style>
