<script setup lang="ts">
import { useStore } from 'vuex';
import { Schedule } from '../store';

const store = useStore();
const emits = defineEmits(['closeModal']);
const { data } = defineProps<{
    data: Schedule;
}>();

const handleCancel = () => {
    emits('closeModal');
};

const handleRemove = () => {
    store.dispatch('removeItem', data.key);
    emits('closeModal');
};
</script>

<template>
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">
                        Do you want to remove this item?
                    </h5>
                </div>
                <div class="modal-body">
                    <p>{</p>
                    <p>&nbsp; Key: "{{ data.key }}"</p>
                    <p>&nbsp; Date: "{{ data.date }}"</p>
                    <p>&nbsp; U: "{{ data.u }}"</p>
                    <p>&nbsp; Z: "{{ data.z }}"</p>
                    <p>&nbsp; K: "{{ data.k }}"</p>
                    <p>}</p>
                </div>
                <div class="modal-footer">
                    <button class="btn secondary" @click="handleCancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" @click="handleRemove">
                        Remove
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
