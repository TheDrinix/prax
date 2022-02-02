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
    <router-view v-slot="{ Component }">
        <transition name="fade" mode="in-out">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style>
body {
    width: 100%;
    min-height: 100vh;
    background: #fff;
    background-image: url('/src/assets/5570834.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
}

.is-today {
    border: solid 2px lime !important;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
