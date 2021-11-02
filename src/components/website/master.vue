<template>
    <div class="flex flex-col h-screen">
    <nav-component></nav-component>
        <div class="flex-1 overflow-y-auto p-5">
            <router-view></router-view>
        </div>
    <footer class="py-5 bg-gray-700 text-center text-white">
        All Right Reserved.
    </footer>
    </div>
</template>

<script>
    import NAV from "../../components/partials/nav";
    export default {
        components:{
            'nav-component': NAV,
        },
    }
</script>

<style scoped>

</style>