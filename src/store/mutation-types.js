// Mutation String Constants
// According to our style guide, these MUST be in ALL UPPERCASE
// Format: STRING_MUTATION_CONSTANT = 'STRING_MUTATION_CONSTANT';
// If mutation is tied specifically to action, should have exact same name, just UPPER_CASE instead of camel case.
export default {
    /**
     * Local state mutations
     */
    SET_TODOS: 'SET_TODOS',
    SET_VISIBILITY: 'SET_VISIBILITY',
    ADD_TODO: 'ADD_TODO',
    UPDATE_TODO: 'UPDATE_TODO',
    REMOVE_TODO: 'REMOVE_TODO',
    REMOVE_ALL_COMPLETED: 'REMOVE_ALL_COMPLETED',
    SHOW_MODAL: 'SHOW_MODAL',
    HIDE_MODAL: 'HIDE_MODAL',
};
