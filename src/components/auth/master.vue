<template>
    <div class="flex flex-col h-screen">
        <nav-component></nav-component>
        <router-view></router-view>

        <footer class="py-5 bg-gray-700 text-center text-white">
            All Right Reserved.
        </footer>
    </div>
</template>

<script>
    import NAV from "../../components/partials/nav";
    export default {
        name: "master",
        components:{
            'nav-component': NAV,
        },
    }
</script>

<style scoped>

</style>