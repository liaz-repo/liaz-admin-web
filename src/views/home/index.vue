<template>
  <div class="wrapper">
    <HeaderView/>
    <MaintainerView/>
    <FooterView/>
  </div>
</template>

<script>
import HeaderView from "@/components/header/index.vue";
import MaintainerView from "@/components/maintainer/index.vue";
import FooterView from "@/components/footer/index.vue";

export default {
  name: 'HomeView',
  components: {
    HeaderView,
    MaintainerView,
    FooterView
  }
}
</script>

<style scoped>
</style>