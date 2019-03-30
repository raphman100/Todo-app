<template>
    <div id="info-container">
        <div id="left">
            <div class="todo-count">
                <span>{{ cntTodos }}</span> {{ visibilityType }} {{ cntTodos | pluralize }}
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
            pluralize( n ) {
                return n === 1 ? 'Item' : 'Items';
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
    }

    .todo-count span {
        font-weight: bold;
    }

    .table {
        display: table;
        margin: 0 auto;
    }

    .make-bold {
        font-weight: bold;
    }

    ul#horizontal-list {
        list-style: none;
    }

   ul#horizontal-list li {
        display: inline;
        padding: 1.0rem;
    }

    ul#horizontal-list li a {
        color: brown;
    }

    .removeCompleted {
        text-align: right;
    }

     .destroy {
        font-size: 0.80rem;
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
