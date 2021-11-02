
export default {
    methods:{
        startLoading()
        {
            return this.$loading.show({
                // Optional parameters
                backgroundColor: '#ffffff',
                opacity: 0.98,
                container: this.fullPage ? null : this.$refs.formContainer,
                canCancel: true,
                onCancel: this.onCancel,
            });
        },
        stopLoading(load){
            load.hide()
        }
    }
}