<template>
    <div id="products" >
        <breadcrumb first="Home" second="Orders"></breadcrumb>
        <t-table
                :headers="['ID','User','Product', 'Price', 'Quantity','Status', 'Image','Action']"
                :data="orders"
                :responsive="true"
                :responsive-breakpoint="520"
        >
            <template slot="tbody" slot-scope="{ tbodyClass, trClass, tdClass, thClass, renderResponsive, data }">
                <template v-if="renderResponsive">
                    <tbody v-for="(row, rowIndex) in data"
                           :key="rowIndex"
                           :class="[tbodyClass, rowIndex % 2 === 0 ? 'bg-gray-100' : '']"
                    >
                    <tr :class="trClass">
                        <th class="text-sm font-semibold text-gray-600 uppercase">
                            Name
                        </th>
                        <td :class="[tdClass, 'relative']">
                            <t-dropdown class="absolute top-0 right-0">
                                <template slot="button">
                                    <svg version="1.1" viewBox="0 0 16 16" class="text-gray-600 fill-current svg-icon svg-fill" heigth="20" style="width: 20px;"><path pid="0" d="M13 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 13 7zM8 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 8 7zM3 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 3 7z" /></svg>
                                </template>
                                <router-link :to="{ name:'Products.Edit', params: { id:row.id }}" class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-blue-500">
                                    Edit
                                </router-link>
                                <a @click="destroy(row.id)" class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-blue-500">
                                    Delete
                                </a>
                            </t-dropdown>
                            {{ row.name }}
                        </td>
                    </tr>
                    <tr :class="trClass">
                        <th class="text-sm font-semibold text-gray-600 uppercase">
                            Price
                        </th>
                        <td :class="[tdClass, 'td-overflow']">
                            <a class="text-gray-600 hover:underline"
                            >{{ row.price }}</a>
                        </td>
                    </tr>
                    <tr :class="trClass">
                        <th class="text-sm font-semibold text-gray-600 uppercase">
                            Quantity
                        </th>
                        <td :class="[tdClass, 'td-overflow']">
                            <a class="text-gray-600 hover:underline"
                            >{{ row.qty }}</a>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </template>
            <template slot="row" slot-scope="{ trClass, tdClass, rowIndex, row }">
                <tr :class="[trClass, rowIndex % 2 === 0 ? 'bg-gray-100' : '']">
                    <td :class="[tdClass]">
                        {{ row.external_id }}
                    </td>
                    <td :class="[tdClass]">
                        {{ row.user.name }}
                    </td>
                    <td :class="[tdClass]">
                        {{ row.product.name }}
                    </td>
                    <td :class="[tdClass]">
                        {{ row.purchase_price }}
                    </td>
                    <td :class="tdClass">
                        <a class="text-gray-600 hover:underline"
                        >{{ row.qty }}</a>
                    </td>
                    <td :class="tdClass">
                        <a class="text-red-600 hover:underline"
                        >{{ getOrderStatus(row.status) }}</a>
                    </td>
                    <td :class="tdClass">
                        <img :src="getImage(row.image)" class="w-12 h-12 rounded-full shadow-lg">
                    </td>
                    <td :class="[tdClass, 'text-left']">
                        <t-dropdown>
                            <template slot="button">
                                <svg version="1.1" viewBox="0 0 16 16" class="text-gray-600 fill-current svg-icon svg-fill" heigth="20" style="width: 20px;"><path pid="0" d="M13 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 13 7zM8 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 8 7zM3 7a2 2 0 1 1 .001 3.999A2 2 0 0 1 3 7z" /></svg>
                            </template>
                            <a v-if="getOrderStatus(row.status) !== 'APPROVED'" @click="updateOrderStatus({ status:'APPROVED', orderId: row.id })" class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-blue-500 cursor-pointer"  >
                                APPROVED
                            </a>
                            <a v-if="getOrderStatus(row.status) !== 'REJECTED'" @click="updateOrderStatus({ status:'REJECTED', orderId: row.id })" class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-red-500 cursor-pointer" >
                                REJECTED
                            </a>
                            <a v-if="getOrderStatus(row.status) !== 'PROCESSING'" @click="updateOrderStatus({ status:'PROCESSING', orderId: row.id })" class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-green-500 cursor-pointer" >
                                PROCESSING
                            </a>
                            <a v-if="getOrderStatus(row.status) !== 'SHIPPED'" @click="updateOrderStatus({ status:'SHIPPED', orderId: row.id })" class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-yellow-500 cursor-pointer" >
                                SHIPPED
                            </a>
                            <a v-if="getOrderStatus(row.status) !== 'DELIVERED'" @click="updateOrderStatus({ status:'DELIVERED', orderId: row.id })"  class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-purple-500 cursor-pointer" >
                                DELIVERED
                            </a>
                            <a v-if="getOrderStatus(row.status) !== 'PENDING'" @click="updateOrderStatus({ status:'PENDING', orderId: row.id })" class="block w-full px-4 py-2 text-left text-gray-800 hover:text-white hover:bg-gray-500 cursor-pointer" >
                                PENDING
                            </a>
                        </t-dropdown>
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

    import Breadcrumb from "../Partial/Breadcrumb"
    import Pagination from "../../Pagination/Index"
    import toastMixin from "../../../mixins/toastMixin";
    import ORDER_STATUS from "../../../ORDER_STATUS";
    import loaderMixin from "../../../mixins/loaderMixin";
    export default {
        name: "Index",
        data(){
          return {
              orderStatus: ORDER_STATUS
          }
        },
        components: {
            Breadcrumb,
            Pagination,
        },
        computed: {
            orders(){
                return this.$store.getters.ORDERS
            },
            pagination(){
                return this.$store.getters.WEBSITE_PAGINATE
            }
        },
        mixins: [toastMixin,loaderMixin],
        methods:{
            async next(){
                const load = this.startLoading()
                const orders = await this.$store.dispatch('WEBSITE_PAGINATE', { resource:'orders', page:this.pagination.current_page })
                await this.$store.commit('ORDERS',orders.data)
                await this.$store.commit('SET_PAGINATION', orders)
                this.stopLoading(load)
            },
            async getOrders(){
                const load = this.startLoading()
                await this.$store.dispatch('ADMIN_ORDERS')
                this.stopLoading(load)
            },
            getOrderStatus(status){
                return ORDER_STATUS[status]
            },
            async updateOrderStatus(payload){
                try{
                    const load = this.startLoading()
                    const response = await this.$store.dispatch('ADMIN_ORDER_STATUS_UPDATE', payload)
                    await this.getOrders()
                    this.stopLoading(load)
                    if(response.status === 200){
                        this.successToast(response.data.message);
                    }
                } catch (e) {
                    switch (e.response.status) {
                        case(422) : this.validationToast(e.response.data.errors)
                            break;
                        case(401) : this.unauthenticatedToast(e.response.data.error.message)
                            break;
                    }
                }

            },
            getImage(imagePath){
                return process.env.VUE_APP_URL+'/' + imagePath
            },
        },
        async created() {
            await this.getOrders()
        },
    }
</script>

<style scoped>

</style>
