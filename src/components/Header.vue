<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';

const router = useRouter();
const route = useRoute();
const store = useStore();
const isHomePage = computed(() => {
    return route.path === '/';
});

const handleClick = () => {
    if (isHomePage.value) {
        const token = store.state.accessToken;
        if (token.token) {
            if (token.expiresAt < Date.now() || token.isFromCookie) {
                router.push('/edit');
                return;
            }
        }
        router.push('/login');
    } else {
        router.push('/');
    }
};
</script>

<template>
    <div class="container-fluid">
        <h1 class="white col-8 col-md-4 col-lg-3">Prax rozvrh</h1>
        <button
            class="btn btn-primary offset-1 offset-md-6 offset-lg-8 col-3 col-md-2 col-lg-1"
            @click="handleClick"
        >
            {{ isHomePage ? 'Edit' : 'Back' }}
        </button>
    </div>
</template>

<style>
.white {
    color: white;
    display: inline-block;
}
</style>
