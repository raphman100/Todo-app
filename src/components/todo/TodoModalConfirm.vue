<template>
    <div class="modal-backdrop">
        <div class="modal"
             role="dialog"
        >
            <section>
                <header
                    class="modal-header"
                    id="modalTitle"
                >
                    <slot name="header">
                        Remove Completed Todos
                    </slot>
                </header>
                <section
                    class="modal-body"
                    id="modalDescription"
                >
                    <slot name="body">
                        Do you really want to remove
                        <span>{{ cntCompleted }}</span> {{ cntCompleted | pluralize( 'Todo') }}?
                    </slot>
                </section>
                <footer class="modal-footer">
                    <slot name="footer">
                        <button
                            type="button"
                            class="btn-todo"
                            @click="removeAllCompleted"
                            aria-label="Remove Completed and Close Modal"
                        >
                            Remove Completed
                        </button>
                        <button
                            type="button"
                            class="btn-todo"
                            @click="hideModal"
                            aria-label="Close Modal"
                        >
                            Cancel
                        </button>
                    </slot>
                </footer>
            </section>
        </div>
    </div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "TodoHeader",
        computed: {
            ...mapGetters( [
                'cntCompleted',
            ] ),
        },
        methods: {
            ...mapActions( [
                'hideModal',
                'removeAllCompleted',
            ] ),
        },
        filters: {
            pluralize( n, str ) {
                return n === 1 ? str : str + 's';
            },
        },
    }
</script>

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(0, 0, 0, 0.75);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal {
        overflow-x: auto;
        width: 45rem;
        height: 20rem;
        margin: 10.0rem auto;
        background-color: white;
        border-radius: 0.5rem;
        box-shadow: 0 0 2rem rgba(0, 0, 0, 0.25);
        padding: 1rem;
        display: flex;
        flex-direction: column;
    }

    .modal-header,
    .modal-footer {
        font-size: 2.0rem;
        padding: 1.0rem;
        display: flex;
    }

    .modal-header {
        border-bottom: 0.1rem solid bisque;
        color: brown;
        font-weight: bold;
        justify-content: space-between;
    }

    .modal-footer {
        border-top: 1px solid bisque;
        justify-content: flex-end;
    }

    .modal-body {
        color: brown;
        font-size: 1.5rem;
        font-style: italic;
        position: relative;
        padding: 1.0rem 0.5rem;
    }

    .modal-body span {
        font-weight: bold;
    }

    .btn-todo {
        font-size: 1.0rem;
        padding: 0.3rem;
        margin: 1.0rem auto;
        cursor: pointer;
        font-weight: bold;
        color: brown;
        background: bisque;
    }

</style>
