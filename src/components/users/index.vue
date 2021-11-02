<template>
    <div></div>
</template>

<script>
    import repository from "../../api/repository";
    export default {
        name: "index",
        async mounted() {
            const users = await repository.users()
            console.log(users);
        }
    }
</script>

<style scoped>

</style>