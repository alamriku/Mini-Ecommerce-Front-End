<template>
    <div >
        <ul class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <li v-if="pagination.current_page > 1">
                <a href="javascript:void(0)" class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" aria-label="Previous" v-on:click.prevent="changePage(pagination.current_page - 1)">
                    <span aria-hidden="true">«</span>
                </a>
            </li>
            <li v-for="page in pagesNumber" v-bind:key="page" :class="{'active bg-red': page == pagination.current_page}" aria-current="page" >
                <a href="javascript:void(0)" v-on:click.prevent="changePage(page)" class="z-10 bg-indigo-50 border-indigo-500 text-indigo-600 relative inline-flex items-center px-4 py-2 border text-sm font-medium">{{ page }}</a>
            </li>
            <li v-if="pagination.current_page < pagination.last_page">
                <a href="javascript:void(0)" class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50" aria-label="Next" v-on:click.prevent="changePage(pagination.current_page + 1)">
                    <span aria-hidden="true">»</span>
                </a>
            </li>
        </ul>
    </div>

</template>
<script>
    export default{
        props: {
            pagination: {
                type: Object,
                required: true
            },
            offset: {
                type: Number,
                default: 4
            }
        },
        computed: {
            pagesNumber() {
                if (!this.pagination.to) {
                    return [];
                }
                let from = this.pagination.current_page - this.offset;
                if (from < 1) {
                    from = 1;
                }
                let to = from + (this.offset * 2);
                if (to >= this.pagination.last_page) {
                    to = this.pagination.last_page;
                }
                let pagesArray = [];
                for (let page = from; page <= to; page++) {
                    pagesArray.push(page);
                }
                return pagesArray;
            }
        },
        methods : {
            changePage(page) {
                this.pagination.current_page = page;
                this.$emit('paginate');
            }
        }
    }
</script>