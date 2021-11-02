<template>
    <div ref="formContainer">
        <div class="relative m-3 flex flex-wrap mx-auto justify-center">
            <router-link :to="{ name:'ProductShow', params:{ name:product.name} }" v-for="product in products" v-bind:key="product.id" class="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                <div class="overflow-x-hidden rounded-2xl relative">
                    <img class="h-40 rounded-2xl w-full object-cover" :src="getImage(product.image)">
                </div>
                <div class="mt-4 pl-2 mb-2 flex justify-between ">
                    <div>
                        <p class="text-lg font-semibold text-gray-900 mb-0">{{ product.name }}</p>
                        <p class="text-md text-gray-800 mt-0">${{ product.price }}</p>
                    </div>
                    <div class="flex flex-col-reverse mb-1 mr-4 group cursor-pointer" v-if="product.qty > 0">
                        {{ product.qty }} Stock-In
                    </div>
                    <div class="flex flex-col-reverse mb-1 mr-4 group cursor-pointer" v-else>
                        <span class="text-red-600">Stock-Out</span>
                    </div>
                </div>
            </router-link>
        </div>
        <pagination  :pagination="pagination"
                    @paginate="next()"
                    :offset="4"></pagination>
        <router-view></router-view>
    </div>
</template>

<script>
    import Pagination from "../../Pagination/Index"
    import loaderMixin from "../../../mixins/loaderMixin";
    export default {
        components:{
            Pagination,
        },
        mixins:[loaderMixin],
        methods: {
            async getProducts() {
                const load = this.startLoading()
                await this.$store.dispatch('WEBSITE_PRODUCTS')
                this.stopLoading(load)
            },
            async next(){
                const load = this.startLoading()
                const products = await this.$store.dispatch('WEBSITE_PAGINATE', { resource:'products', page:this.pagination.current_page })
                await this.$store.commit('WEBSITE_PRODUCTS',products.data)
                await this.$store.commit('SET_PAGINATION', products)
                this.stopLoading(load)
            },
            getImage(imagePath){
                return process.env.VUE_APP_URL+'/' + imagePath
            },
        },
        computed:{
            products(){
                return this.$store.getters.WEBSITE_PRODUCTS
            },
            pagination(){
                return this.$store.getters.WEBSITE_PAGINATE
            }
        },
        async created(){
            await this.getProducts()
        }
    }
</script>

<style scoped>

</style>