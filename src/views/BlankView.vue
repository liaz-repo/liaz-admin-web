<template>
    <div></div>
</template>
  
<script>
import router from '@/router';

export default {
    name: 'BlankView',
    created() {
        //处理css样式污染问题
        if (window.performance.navigation.type == window.performance.navigation.TYPE_RELOAD) {
            router.push('/home');
        } else {
            router.go(0);
        }
    }
}
</script>
  
<style scoped></style>