<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { Schedule } from '../store';

const store = useStore();
const props = defineProps<{
    data: Schedule;
}>();

let todayDate = computed(() => {
    return store.state.today;
});
</script>

<template>
    <div
        class="card col-10 col-md-4 col-lg-3 top-space bg-dark text-white"
        :class="{ 'is-today': todayDate === data.date }"
        style="padding: 0"
    >
        <div class="card-header">{{ props.data.date }}</div>
        <ul class="list-group list-group-flush">
            <li class="list-group-item bg-secondary text-white">
                U: {{ props.data.u }}
            </li>
            <li class="list-group-item bg-secondary text-white">
                Z: {{ props.data.z }}
            </li>
            <li class="list-group-item bg-secondary text-white">
                K: {{ props.data.k }}
            </li>
        </ul>
    </div>
</template>

<style></style>
