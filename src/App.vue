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
        <transition name="fade" mode="out-in">
            <component :is="Component" />
        </transition>
    </router-view>
</template>

<style>
body {
    width: 100%;
    min-height: 100vh;
    background: #fff;
    background-image: url('/src/assets/low-poly-grid-haikei.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
}

.is-today {
    border: solid 2px lime !important;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

/* .moveUp-enter-active {
    animation: fadeIn 1s ease-in-out;
}
@keyframes fadeIn {
    0% {
        opacity: 0;
    }
    50% {
        opacity: 0.5;
    }
    100% {
        opacity: 1;
    }
}

.moveUp-leave-active {
    animation: moveUp 0.3s ease-in;
}
@keyframes moveUp {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(-400px);
    }
} */
</style>
