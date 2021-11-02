import toastOptions from "../toastOptions/options";

const toastMixin = {
     methods: {
       successToast: function(message){
           this.$toasted.success(message, toastOptions.toastOptions)
       },
       validationToast: function(errors) {
           for(const error in errors){
               this.$toasted.error(errors[error], toastOptions.toastOptions)
           }
       },
       unauthenticatedToast: function(message) {
           this.$toasted.error(message, toastOptions.toastOptions)
       },
   }
};
export default toastMixin