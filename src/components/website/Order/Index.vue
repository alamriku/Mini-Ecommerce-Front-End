<template>
    <div id="products" class="overflow-x-auto">
        <t-table :headers="['ID', 'Price', 'Quantity','Status','Image','Action']"
                 :data="orders">
            <template v-slot:row="props">
                <tr :class="[props.trClass, props.rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
                    <td :class="props.tdClass">{{ props.row.external_id }}</td>
                    <td :class="props.tdClass">{{ props.row.purchase_price }}</td>
                    <td :class="props.tdClass">{{ props.row.qty }}</td>
                    <td :class="props.tdClass">
                        <span class="inline-flex items-center m-2 px-3 py-1 bg-red-200 hover:bg-red-300 rounded-full text-sm font-semibold text-red-600">
                            <svg class="w-4 h-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/></svg>
                            <span class="ml-1">
                             {{ getOrderStatus(props.row.status) }}
                            </span>
                        </span>
                    </td>
                    <td :class="props.tdClass"><img :src="getImage(props.row.image)" class="w-12 h-12 rounded-full shadow-lg"></td>
                    <td :class="props.tdClass" v-if="getOrderStatus(props.row.status) === 'PENDING'">
                        <router-link :to="{ name:'Products.Edit', params: { id:props.row.id }}" class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Edit
                        </router-link>
                        <a @click="destroy(props.row.id)" class="ml-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                            Delete
                        </a>
                    </td>
                </tr>
            </template>
        </t-table>
        <pagination :pagination="pagination"
                    @paginate="next()"
                    :offset="4"></pagination>
    </div>
</template>

<script>
    import Pagination from "../../Pagination/Index"
    import ORDER_STATUS from "../../../ORDER_STATUS";
    export default {
        name: "Index",
        components:{
            Pagination
        },
        methods:{
            async next(){
                const orders = await this.$store.dispatch('WEBSITE_PAGINATE', { resource:'orders', page:this.pagination.current_page })
                await this.$store.commit('ORDERS',orders.data)
                await this.$store.commit('SET_PAGINATION', orders)
            },
            async getOrders(){
                await this.$store.dispatch('ORDERS')
            },
            getOrderStatus(status){
                return ORDER_STATUS[status];
            },
            getImage(imagePath){
                return process.env.VUE_APP_URL+'/' + imagePath
            },
        },
        computed:{
            orders(){
                return this.$store.getters.ORDERS
            },
            pagination(){
                return this.$store.getters.WEBSITE_PAGINATE
            }
        },
        async created() {
            await this.getOrders()
        },
    }
</script>

<style scoped>

</style>