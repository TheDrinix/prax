<script setup lang="ts">
import Card from '../components/Card.vue';
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
let data = computed(() => {
    return store.state.schedule;
});
</script>
<template>
    <div class="container">
        <div class="row" v-for="i in Math.ceil(data.length / 2)">
            <Card
                v-for="(item, index) in data.slice((i - 1) * 2, i * 2)"
                class="offset-1"
                :class="[
                    index % 2 == 0 ? 'offset-md-1' : 'offset-md-2',
                    index % 2 == 0 ? 'offset-lg-1' : 'offset-lg-4',
                ]"
                :data="item"
            />
        </div>
    </div>
</template>

<style>
.top-space {
    margin-top: 2rem;
}
</style>
