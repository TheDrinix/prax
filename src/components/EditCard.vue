<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { Schedule } from '../store';
import EditModal from './EditModal.vue';
import RmvModal from './RmvModal.vue';

const store = useStore();
const props = defineProps<{
    data: Schedule;
}>();

let todayDate = computed(() => {
    return store.state.today;
});

const editModalIsVisible = ref(false);
const rmvModalIsVisible = ref(false);

const toggleModal = (e: Event, type?: string) => {
    const body = document.body;
    if (!editModalIsVisible.value && !rmvModalIsVisible.value) {
        body.className = 'modal-open';
        if (type === 'edit') {
            editModalIsVisible.value = true;
        } else if (type === 'rmv') {
            rmvModalIsVisible.value = true;
        }
    } else {
        body.className = '';
        editModalIsVisible.value = false;
        rmvModalIsVisible.value = false;
    }
};
</script>

<template>
    <div
        class="card mt-5 col-10 col-md-8 col-lg-3 offset-1 offset-md-2 offset-lg-0 bg-dark text-white"
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
        <div class="btn-group btn-group-small">
            <button
                class="btn btn-warning w-50"
                @click="toggleModal($event, 'edit')"
            >
                Edit
            </button>
            <button
                class="btn btn-danger w-50"
                @click="toggleModal($event, 'rmv')"
            >
                Remove
            </button>
        </div>
    </div>

    <EditModal
        :class="{
            show: editModalIsVisible,
            'shown-modal': editModalIsVisible,
        }"
        :data="props.data"
        @close-modal="toggleModal"
    />
    <RmvModal
        :class="{
            show: rmvModalIsVisible,
            'shown-modal': rmvModalIsVisible,
        }"
        :data="props.data"
        @close-modal="toggleModal"
    />
</template>

<style>
.shown-modal {
    display: block;
}
</style>
