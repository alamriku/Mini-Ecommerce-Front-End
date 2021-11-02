<template>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div class="flex flex-col md:flex-row -mx-4">
            <div class="md:flex-1 px-4">
                <div class="h-64 md:h-80 rounded-lg bg-white-100 mb-4">
                    <div class="h-64 md:h-80 rounded-lg bg-white-100 mb-4 flex items-center justify-center">
                        <img :src="getImage(product.image)" class="h-64 md:h-80 w-100 rounded-lg">
                    </div>
                </div>
            </div>
            <div class="md:flex-1 px-4">
                <h2 class="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">{{ product.name }}</h2>
                <div class="flex items-center space-x-4 my-4">
                    <div>
                        <div class="rounded-lg bg-gray-100 flex py-2 px-3">
                            <span class="text-indigo-400 mr-1 mt-1">$</span>
                            <span class="font-bold text-indigo-600 text-3xl">{{ product.price }}</span>
                        </div>
                    </div>
                    <div class="flex-1" v-if="product.qty > 0">
                        <p class="text-green-500 text-xl font-semibold">Stock-IN</p>
                        <p class="text-red-400 text-sm" >{{ product.qty }}</p>
                    </div>
                    <div class="flex-1" v-else>
                        <p class="text-red-500 text-xl font-semibold">Stock-Out</p>
                    </div>
                </div>

                <p class="text-gray-500">{{ product.description }}</p>

                <div class="flex py-4 space-x-4">
                    <div class="relative">
                        <div class="text-center left-0 pt-2 right-0 absolute block text-xs uppercase text-gray-400 tracking-wide font-semibold">Qty</div>
                        <select v-model="form.qty" class="cursor-pointer appearance-none rounded-xl border border-gray-200 pl-4 pr-8 h-14 flex items-end pb-1">
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </select>

                    </div>

                    <button v-if="product.qty > 0" @click="order()" :disabled="isActive" type="button" :class="isActive ? 'cursor-not-allowed' : '' " class="h-14 px-6 py-2 font-semibold rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white">
                        Order
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import toastMixin from "../../../mixins/toastMixin";
    import loaderMixin from "../../../mixins/loaderMixin";

    export default {
        name: "Show",
        data() {
          return {
              form:{
                  userId: '',
                  productId: '',
                  qty: 1,
                  purchasePrice: '',
              },
              isActive: false,
          }
        },
        mixins:[toastMixin,loaderMixin],
        methods: {
            getImage(imagePath){
                return process.env.VUE_APP_URL+'/' + imagePath
            },
             async getProduct() {
                 const load = this.startLoading()
                 await this.$store.dispatch('WEBSITE_PRODUCT', this.$route.params.name )
                 this.stopLoading(load)
            },
            async order() {
                try {
                    const load = this.startLoading()
                     this.isActive = true

                    if(!this.isAuthenticated){
                        await this.$router.push({ name: 'Login'})
                    }
                    this.setPayload()
                    const response = await this.$store.dispatch('MAKE_ORDER', this.form)
                    if(response.status === 200){
                        this.successToast(response.data.message);
                    }
                   this.isActive = false
                    this.stopLoading(load)
                } catch (e) {
                    switch (e.response.status) {
                        case(422) : this.validationToast(e.response.data.errors)
                            break;
                        case(401) : this.unauthenticatedToast(e.response.data.error.message)
                            break;
                        default: console.log('server error')
                            break;
                    }
                }
            },
            setPayload() {
                this.form.userId = this.user.id
                this.form.productId = this.product.id
                this.form.purchasePrice = this.product.price
            },
        },
        computed: {
            product(){
                return this.$store.getters.WEBSITE_PRODUCT
            },
            isAuthenticated(){
                return this.$store.getters.IS_AUTHENTICATED
            },
            user() {
                return this.$store.getters.USER
            }
        },
        async created() {
            await this.getProduct()
        }
    }
</script>

<style scoped>

</style>