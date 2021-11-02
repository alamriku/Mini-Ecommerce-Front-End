<template>
    <div id="products" >
        <breadcrumb first="Home" second="Products"></breadcrumb>
        <t-table
                :headers="['ID', 'Name', 'Price', 'Quantity', 'Description', 'Image','Action']"
                :data="products"
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
                        {{ row.id }}
                    </td>
                    <td :class="[tdClass]">
                        {{ row.name }}
                    </td>
                    <td :class="tdClass">
                        <a class="text-gray-600 hover:underline"
                        >{{ row.price }}</a>
                    </td>
                    <td :class="tdClass">
                        <a class="text-gray-600 hover:underline"
                        >{{ row.qty }}</a>
                    </td>
                    <td :class="tdClass">
                        <a class="text-gray-600 hover:underline"
                        >{{ row.description }}</a>
                    </td>
                    <td :class="tdClass">
                        <img :src="getImage(row.image)" class="w-12 h-12 rounded-full shadow-lg">
                    </td>
                    <td :class="[tdClass, 'text-right']">
                        <t-dropdown>
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
    export default {
        name: "Index",
        components: {
            Breadcrumb,
            Pagination,
        },

        computed: {
            products () {
                return this.$store.getters.products
            },
            pagination() {
                return this.$store.getters.PAGINATION
            },
        },
        mixins: [toastMixin],
        methods:{
            getImage(imagePath){
                return process.env.VUE_APP_URL+'/' + imagePath
            },
            async next(){
                await this.$store.dispatch('PAGINATE', this.pagination.current_page)
            },
            async items(){
                await this.$store.dispatch('PRODUCTS')
            },
            getOrderStatus(status){
                return ORDER_STATUS[status];
            },
            destroy(product) {
                this.$toasted.error("Are you sure you want to delete this?",{
                    theme: 'outline',
                    position: 'top-center',
                    dontClose : true,
                    action : [
                        {
                            text: 'Yes',
                            onClick : (e, toastObject) => {
                                this.$store.dispatch('DESTROY', product)
                                toastObject.goAway(0);
                                this.successToast('Product Deleted successfully')
                            }
                        },
                        {
                            text: 'No',
                            onClick : (e, toastObject) => {
                                toastObject.goAway(0);
                            },
                        }
                    ],
                });
            }
        },
        async beforeMount() {
            await this.items()
        },
    }
</script>

<style scoped>

</style>
