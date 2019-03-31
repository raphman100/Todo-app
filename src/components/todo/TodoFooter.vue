<template>
    <div id="info-container">
        <div id="left">
            <div class="todo-count">
                <span>{{ cntTodos }}</span> {{ visibilityType }} {{ cntTodos | pluralize( 'Item' ) }}
            </div>
        </div>
        <div id="center">
            <div class="table">
                <ul id="horizontal-list">
                    <li><a @click="setVisibility( 'all' )"
                           :class="{ 'make-bold': isAllRecs }">All</a></li>
                    <li v-if="cntActive">
                        <a @click="setVisibility( 'active' )"
                           :class="{ 'make-bold': isActiveRecs }">Active</a></li>
                    <li v-else>Active</li>
                    <li v-if="cntCompleted">
                        <a @click="setVisibility( 'completed' )"
                           :class="{ 'make-bold': isCompletedRecs }">Completed</a></li>
                    <li v-else>Completed</li>
                </ul>
            </div>
        </div>
        <div id="right">
            <div v-if="hasCompleted && !isActiveRecs" class="removeCompleted">
                <button class="destroy" @click="showModal">
                    Remove Completed
                    <icon name="trash"/>
                </button>
                <TodoModalConfirm
                    :myCompleted="cntCompleted"
                    v-show="isModalVisible"
                    @close="hideModal"
                />
            </div>
<!--            This space is necessary to keep the line from shifting if the button isn't displayed -->
            <div v-else class="removeCompleted">&nbsp;</div>
        </div>
    </div>
</template>
<script>
    import { mapActions, mapGetters } from 'vuex';
    import TodoModalConfirm from "@/components/todo/TodoModalConfirm";

    export default {
        name: 'TodoFooter',
        computed: {
            ...mapGetters( [
                'cntTodos',
                'cntCompleted',
                'cntActive',
                'visibilityType',
                'hasCompleted',
                'hasActive',
                'isAllRecs',
                'isActiveRecs',
                'isCompletedRecs',
                'isModalVisible',
            ] ),
        },
        components: {
            TodoModalConfirm,
        },
        methods: {
            ...mapActions( [
                'showModal',
                'hideModal',
                'setVisibility',
            ] ),
        },
        filters: {
            pluralize( n, str ) {
                return n === 1 ? str : str + 's';
            },
        },
    }
</script>
<style scoped>
    #info-container {
        width: 100%;
        text-align: center;
        margin-top: 1.0rem;
        margin-bottom: 0.5rem;
    }

    #left {
        float: left;
        width: 25%;
    }

    #center {
        display: inline-block;
        margin: 0 auto;
        width: 50%;
    }

    #right {
        float: right;
        width: 25%;
    }

    .todo-count {
        padding-top: 0.1rem;
        color: brown;
        text-align: left;
        font-size: 1.1rem;
    }

    .todo-count span {
        font-weight: bold;
        font-size: 1.2rem;
    }

    .table {
        display: table;
        margin: 0 auto;
    }

     /* Keep this class, it is used even though it doesn't look like it */
    .make-bold {
        font-weight: bold;
    }

    ul#horizontal-list {
        list-style: none;
    }

   ul#horizontal-list li {
        display: inline;
        padding: 1.0rem;
       font-size: 1.3rem;
    }

    ul#horizontal-list li a {
        color: brown;
    }

    .removeCompleted {
        text-align: right;
    }

     .destroy {
        font-size: 0.8rem;
        color: brown;
        background-color: bisque;
        font-weight: bold;
        text-align: center;
    }

    .destroy:hover {
        cursor: pointer;
    }

    [v-cloak] {
        display: none;
    }
</style>
