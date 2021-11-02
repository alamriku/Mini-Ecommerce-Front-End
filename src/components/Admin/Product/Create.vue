<template>
    <div id="product">
       <breadcrumb first="Home" second="Products" third="Create"></breadcrumb>
        <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <div class="w-full space-y-8 my-16">
                <form class="mt-2 space-y-6" @submit.prevent="onSubmit" enctype="multipart/form-data">
                    <div class="flex flex-wrap">
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                    Product Name
                                </label>
                                <input type="text" v-model="form.name" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Product">
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                    Price
                                </label>
                                <input type="number" v-model="form.price" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="price">
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                    Quantity
                                </label>
                                <input type="number" v-model="form.qty" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" placeholder="Quantity">
                            </div>
                        </div>
                        <div class="w-full lg:w-6/12 px-4">
                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                    Image
                                </label>
                                <input type="file" v-on:change="handleFileUpload"
                                       ref="inputImage" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" value="Jesse">
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-wrap">
                        <div class="w-full lg:w-12/12 px-4">
                            <div class="relative w-full mb-3">
                                <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" htmlfor="grid-password">
                                    Description
                                </label>
                                <textarea type="text" v-model="form.description" class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" rows="4" placeholder="Product description"></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center">
                        <button type="submit"
                                class="group relative w-24 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
    import Breadcrumb from "../Partial/Breadcrumb";
    import toastMixin from "../../../mixins/toastMixin";
    import loaderMixin from "../../../mixins/loaderMixin";
    export default {
        name: "Create",
        components:{
            Breadcrumb
        },
        data() {
            return {
                form:{
                    name: '',
                    price: '',
                    qty: '',
                    description: '',
                    image: '',
                },
            }
        },
        mixins: [toastMixin,loaderMixin],
        methods: {
            async onSubmit() {
                try {
                    const load = this.startLoading()
                    const formData = this.formData()
                    const response = await this.$store.dispatch('STORE_PRODUCT', formData)
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
            formData(){
                const formData = new FormData()
                if (this.form.image !== '' || this.form.image !== null) {
                    formData.append('image', this.form.image)
                }
                formData.append('name', this.form.name);
                formData.append('price', this.form.price);
                formData.append('qty', this.form.qty);
                formData.append('description', this.form.description);
                return formData
            },
            handleFileUpload(e) {
                this.form.image = e.target.files[0]
            }
        },
    }
</script>

<style scoped>

</style>