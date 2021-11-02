<template>
  <div class="leading-normal tracking-normal " id="main-body">
    <div class="flex flex-wrap">

      <Sidebar />

      <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen bg" :class="sideBarOpen ? 'overlay' : ''" id="main-content">

        <Navbar />

        <div class="p-6 bg-gray-100 mb-20 bg">
          <router-view />
        </div>

        <Footer />

      </div>
    </div>
  </div>
</template>
<style>
  .bg{
    background-color: #F7FAFC !important;
  }
</style>
<script>
import { mapState } from 'vuex'

import Sidebar from '../../components/Admin/Partial/Sidebar'
import Navbar from '../../components/Admin/Partial/Navbar'
import Footer from '../../components/Admin/Partial/Footer'

export default {
  name: 'Dashboard',
  computed: {
    ...mapState(['sideBarOpen'])
  },
  components: {
    Sidebar,
    Navbar,
    Footer
  }
}
</script>
