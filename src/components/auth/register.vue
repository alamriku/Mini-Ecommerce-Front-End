<template>
    <div class="flex items-center justify-center py-2 px-4 sm:px-6 lg:px-8 my-24">
        <div class="max-w-md w-full space-y-8">
            <div>
                <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
            </div>
            <form class="mt-2 space-y-6" @submit.prevent="onSubmit">
                <input type="hidden" name="remember" value="true" />
                <div class="rounded-md shadow-sm -space-y-px">
                    <div>
                        <label for="Name" class="sr-only">Name</label>
                        <input id="Name" v-model="name" type="text" autocomplete="Name" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Name" />
                    </div>
                    <div>
                        <label for="email-address" class="sr-only">Email address</label>
                        <input id="email-address" v-model="email" type="email" autocomplete="email"  class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
                    </div>
                    <div>
                        <label for="password" class="sr-only">Password</label>
                        <input id="password" v-model="password" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
                    </div>
                    <div>
                        <label for="password-confirmed" class="sr-only">Confirm Password</label>
                        <input id="password-confirmed" v-model="password_confirmation" type="password" autocomplete="current-password" required="" class="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Confirm Password" />
                    </div>
                </div>
                <div>
                    <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Sign up
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import repository from "../../api/repository";
    import toastMixin from "../../mixins/toastMixin";
    export default {
        data(){
          return {
              name:'',
              email:'',
              password:'',
              password_confirmation:'',
          }
        },
        mixins:[toastMixin],
        methods:{
            async onSubmit() {
                try {
                    const inputs = {
                        name: this.name,
                        email: this.email,
                        password: this.password,
                        password_confirmation: this.password_confirmation,
                    };
                    const { data } = await repository.register(inputs)
                    await this.$store.dispatch('SET_STATUS', 'success')
                    await this.$store.dispatch('SET_STORAGE', data)
                    await this.$router.push({ name:'Items' })
                } catch (e) {
                    if (e.response.status === 422) {
                        this.validationToast(e.response.data.errors)
                    }
                }
            }
        }
    }
</script>