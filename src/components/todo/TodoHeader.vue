<template>
    <section>
        <div>
            <h1 class = "theHeader">{{ myMainHeader }}</h1>
            <span class = "theSubHeader">{{ mySubHeader }}</span>
        </div>
    </section>
</template>

<script>
    import { mapState, mapGetters } from 'vuex';

    export default {
        name: "TodoHeader",
        computed: {
            ...mapState( [ 'headers' ] ),
            ...mapGetters( [ 'myMainHeader', 'mySubHeader' ] ),
        },
    }
</script>

<style scoped>
    .theHeader {
        color: brown;
        font-size: 3rem;
        font-weight: bold;
        text-align: center;
    }

    .theSubHeader {
        color: brown;
        font-size: 1rem;
        font-style: italic;
        text-align: center;
    }
</style>
