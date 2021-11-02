<template>
    <div>
        <nav class="bg-white shadow dark:bg-gray-800">
            <div
                    class="container px-6 py-3 mx-auto md:flex md:justify-between md:items-center"
            >
                <div class="flex items-center justify-between">
                    <div>
                        <router-link :to="{ name:'Items'}" class="text-xl font-bold text-gray-800 dark:text-white md:text-2xl hover:text-gray-700 dark:hover:text-gray-300">Brand</router-link>
                    </div>

                    <!-- Mobile menu button -->
                    <div class="flex md:hidden">
                        <button
                                type="button"
                                class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                                aria-label="toggle menu"
                        >
                            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                                <path
                                        fill-rule="evenodd"
                                        d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                                ></path>
                            </svg>
                        </button>
                    </div>
                </div>

                <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
                <div class="items-center md:flex">
                    <div class="flex flex-col md:flex-row md:mx-6">
                        <router-link v-if="IS_ADMIN && IS_AUTHENTICATED" :to="{ name: 'Dashboard'}" class="my-1 text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Dashboard</router-link>
                        <router-link v-if="IS_AUTHENTICATED" :to="{ name: 'Orders'}" class="my-1 text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Orders</router-link>
                        <router-link v-if="!IS_AUTHENTICATED" to="/login" class="my-1 text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Login</router-link>
                        <a v-if="IS_AUTHENTICATED" @click.prevent="logOut()" class="my-1 text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Logout</a>
                        <router-link v-if="!IS_AUTHENTICATED" to="/register" class="my-1 text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 md:mx-4 md:my-0">Register</router-link>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'
    import repository from "../../api/repository";
    export default {
        computed: {
            ...mapGetters([
                'IS_AUTHENTICATED',
                'IS_ADMIN'
            ]),
        },
        methods:{
            async logOut() {
                await repository.logout()
                await this.$store.dispatch('LOGOUT')
                await this.$router.push({ name:'Login' })
                console.log(this.IS_AUTHENTICATED)
            }
        },
        created() {
            console.log(this.IS_AUTHENTICATED)
            console.log(this.IS_ADMIN)
        }
    }
</script>

<style scoped>

</style>