<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { Schedule } from '../store';

const store = useStore();
const emits = defineEmits(['closeModal']);
const { data } = defineProps<{
    data: Schedule;
}>();
const date = ref(data.date);
const u = ref(data.u);
const z = ref(data.z);
const k = ref(data.k);

const dateIsEmpty = ref(false);
const uIsEmpty = ref(false);
const zIsEmpty = ref(false);
const kIsEmpty = ref(false);

const handleCancel = () => {
    emits('closeModal');
};

const handleSave = () => {
    if (date.value && u.value && z.value && k.value) {
        const newData = {
            key: data.key,
            date: date.value,
            u: u.value,
            z: z.value,
            k: k.value,
        };

        store.dispatch('updateItem', newData);
        emits('closeModal');
    } else {
        dateIsEmpty.value = !date.value;
        uIsEmpty.value = !u.value;
        zIsEmpty.value = !z.value;
        kIsEmpty.value = !k.value;
    }
};
</script>

<template>
    <div class="modal fade">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Edit item</h5>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="date">Date</label>
                        <input
                            class="form-control"
                            :class="{ 'is-invalid': dateIsEmpty }"
                            type="date"
                            v-model="date"
                            id="date"
                        />
                    </div>
                    <div class="form-group">
                        <label for="u">Umýva</label>
                        <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': uIsEmpty }"
                            list="names"
                            v-model="u"
                            id="u"
                        />
                    </div>
                    <div class="form-group">
                        <label for="z">Zametá</label>
                        <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': zIsEmpty }"
                            list="names"
                            v-model="z"
                            id="z"
                        />
                    </div>
                    <div class="form-group">
                        <label for="k">Ide s košom</label>
                        <input
                            type="text"
                            class="form-control"
                            :class="{ 'is-invalid': kIsEmpty }"
                            list="names"
                            v-model="k"
                            id="k"
                        />
                    </div>
                    <datalist id="names">
                        <option value="None" />
                        <option value="Marek" />
                        <option value="Karol" />
                        <option value="Tomáš" />
                        <option value="Roman" />
                        <option value="Lukáš" />
                        <option value="Dominik" />
                        <option value="Peťo" />
                        <option value="Braňo" />
                        <option value="Milan" />
                    </datalist>
                    <br />
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-6">
                                <p>
                                    {<br />
                                    &nbsp; key: "{{ data.key }}", <br />
                                    &nbsp; date: "{{ data.date }}", <br />
                                    &nbsp; u: "{{ data.u }}", <br />
                                    &nbsp; z: "{{ data.z }}", <br />
                                    &nbsp; k: "{{ data.k }}", <br />
                                    }
                                </p>
                            </div>
                            <div class="col-6">
                                <p>
                                    {<br />
                                    &nbsp; key: "{{ data.key }}", <br />
                                    &nbsp; date: "{{ date }}", <br />
                                    &nbsp; u: "{{ u }}", <br />
                                    &nbsp; z: "{{ z }}", <br />
                                    &nbsp; k: "{{ k }}", <br />
                                    }
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn secondary" @click="handleCancel">
                        Cancel
                    </button>
                    <button class="btn btn-primary" @click="handleSave">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
