<script setup lang="ts">
import { useStore } from 'vuex';
import Header from './components/Header.vue';

const store = useStore();
store.dispatch('loadSchedule');
store.commit('loadToken');
store.commit('getTodayDate');
</script>

<template>
    <Header />
    <router-view></router-view>
</template>

<style>
.is-today {
    border: solid 2px lime;
}
</style>
