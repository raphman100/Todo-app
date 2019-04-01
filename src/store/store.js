import Vue from "vue";
import Vuex from "vuex";
import mutations from '@/store/mutation-types';
import actions from '@/store/action-types';

Vue.use( Vuex );

const LOCAL_STORAGE_KEY = "todo_list";

const Helpers = {
    getTodoLocalStorage() {
        return JSON.parse( localStorage.getItem( LOCAL_STORAGE_KEY ) );
    },
    setTodoLocalStorage( todos ) {
        localStorage.setItem( LOCAL_STORAGE_KEY, JSON.stringify( todos ) );
    },
};

export default new Vuex.Store( {
    state: {
        headers: {
            main: 'Todos',
            sub: 'My list of things to do!',
        },
        todos: [],
        visibility: 'all',
        modalVisible: false,
        modalComponent: null,
    },
    getters: {
        myMainHeader: state => {
            return state.headers.main;
        },
        mySubHeader: state => {
            return state.headers.sub;
        },
        filteredTodosActive: state => {
            return state.todos.filter( t => !t.isDone );
        },
        filteredTodosCompleted: state => {
            return state.todos.filter( t => t.isDone );
        },
        filteredTodos: ( state, getters ) => {
            if ( state.visibility === 'active' ) {
                return getters.filteredTodosActive;
            } else if ( state.visibility === 'completed' ) {
                return getters.filteredTodosCompleted;
            } else {
                return state.todos;
            }
        },
        cntActive: ( state, getters ) => {
            return getters.filteredTodosActive.length;
        },
        hasActive: ( state, getters ) => {
            return getters.cntActive !== 0;
        },
        hasCompleted: ( state, getters ) => {
            return getters.cntCompleted !== 0;
        },
        cntCompleted: ( state, getters ) => {
            return getters.filteredTodosCompleted.length;
        },
        cntTodos: ( state, getters ) => {
            if ( state.visibility === 'active' ) {
                return getters.cntActive;
            } else if ( state.visibility === 'completed' ) {
                return getters.cntCompleted;
            } else {
                return state.todos.length;
            }
        },
        visibilityType: state => {
            return state.visibility === 'all'
                ? 'Total'
                : state.visibility === 'active'
                    ? 'Active'
                    : 'Completed';
        },
        isAllRecs: state => {
            return state.visibility === 'all';
        },
        isActiveRecs: state => {
            return state.visibility === 'active';
        },
        isCompletedRecs: state => {
            return state.visibility === 'completed';
        },
        nextIndex: state => {
            let lid = state.todos.map( item => item.index ).sort();
            return lid && lid.length && lid.length > 0
                ? ( lid[ lid.length - 1 ] + 1 )
                : 1;
        },
        isModalVisible: state => {
            return state.modalVisible;
        },
    },
    mutations: {
        [ mutations.SET_TODOS ]( state, todos ) {
            state.todos = todos;

        },
        [ mutations.SET_VISIBILITY ]( state, visibility ) {
            state.visibility = visibility;
        },
        [ mutations.ADD_TODO ]( state, todo ) {
            state.todos.push( todo );
            Helpers.setTodoLocalStorage( state.todos );
        },
        [ mutations.UPDATE_TODO ]( state, { index, title, isDone } ) {
            const indexToUpdate = state.todos.findIndex( ( item ) => item.index === index );
            state.todos[ indexToUpdate ].isDone = isDone;
            state.todos[ indexToUpdate ].title = title;
            Helpers.setTodoLocalStorage( state.todos );
        },
        [ mutations.REMOVE_TODO ]( state, index ) {
            state.todos = state.todos.filter( ( item ) => item.index !== index );
            Helpers.setTodoLocalStorage( state.todos );
        },
        [ mutations.REMOVE_ALL_COMPLETED ]( state ) {
            state.todos = state.todos.filter( ( item ) => item.isDone !== true );
            Helpers.setTodoLocalStorage( state.todos );
            state.modalVisible = false;
        },
        [ mutations.SHOW_MODAL ]( state, componentName ) {
            state.modalVisible = true;
            state.modalComponent = componentName;
        },
        [ mutations.HIDE_MODAL ]( state ) {
            state.modalVisible = false;
        },
    },
    actions: {
        async [ actions.initAllThings ]( context ) {
            await context.dispatch( 'initTodos' );
        },
        async [ actions.initTodos ]( context ) {
            if ( !Helpers.getTodoLocalStorage() ) {
                Helpers.setTodoLocalStorage( [] );
            } else {
                await context.commit( 'SET_TODOS', Helpers.getTodoLocalStorage() );
            }
        },
        [ actions.setVisibility ]( context, visibility ) {
            context.commit( 'SET_VISIBILITY', visibility );
        },
        async [ actions.addTodo ]( context, title ) {
            await context.commit( 'ADD_TODO', { index: context.getters.nextIndex, title, isDone: false } );
        },
        async [ actions.updateTodo ]( context, todo ) {
            await context.commit( 'UPDATE_TODO', todo );
            if ( !context.getters.hasCompleted || !context.getters.hasActive ) {
                context.commit( 'SET_VISIBILITY', 'all' );
            }
        },
        async [ actions.removeTodo ]( context, index ) {
            await context.commit( 'REMOVE_TODO', index );
            if ( context.getters.cntCompleted === 0 ) {
                context.commit( 'SET_VISIBILITY', 'all' );
            }
        },
        async [ actions.removeAllCompleted ]( context ) {
            await context.commit( 'REMOVE_ALL_COMPLETED' );
            if ( context.getters.cntCompleted === 0 ) {
                context.commit( 'SET_VISIBILITY', 'all' );
            }
        },
        [ actions.showModal ]( context, componentName ) {
            context.commit( 'SHOW_MODAL', componentName );
        },
        [ actions.hideModal ]( context ) {
            context.commit( 'HIDE_MODAL' );
        },
    },
} );
