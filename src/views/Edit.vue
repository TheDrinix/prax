<script setup lang="ts">
import { ref, computed, Ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import EditCard from '../components/EditCard.vue';

const store = useStore();
const token = ref(store.state.accessToken);

let data = computed(() => {
    return store.state.schedule;
});

const date = ref('');
const u = ref('');
const z = ref('');
const k = ref('');

const dateIsEmpty = ref(false);
const uIsEmpty = ref(false);
const zIsEmpty = ref(false);
const kIsEmpty = ref(false);

const handleSubmit = () => {
    if (date.value && u.value && z.value && k.value) {
        const newData = {
            date: date.value,
            u: u.value,
            z: z.value,
            k: k.value,
        };
        store.dispatch('addNewItem', newData);
        date.value = '';
        u.value = '';
        z.value = '';
        k.value = '';
    } else {
        dateIsEmpty.value = !date.value;
        uIsEmpty.value = !u.value;
        zIsEmpty.value = !z.value;
        kIsEmpty.value = !k.value;
    }
};
</script>

<template>
    <div class="container">
        <div class="row">
            <form
                @submit.prevent="handleSubmit"
                class="text-white offset-1 col-10 offset-md-3 col-md-6"
            >
                <div class="form-group">
                    <label for="date">Dátum</label>
                    <input
                        type="date"
                        name="date"
                        id="date"
                        class="form-control"
                        v-model="date"
                    />
                </div>
                <div class="form-group">
                    <label for="u">Umýva:</label>
                    <input
                        type="text"
                        name="u"
                        id="u"
                        class="form-control"
                        list="names"
                        v-model="u"
                    />
                </div>
                <div class="form-group">
                    <label for="z">Zametá:</label>
                    <input
                        type="text"
                        name="z"
                        id="z"
                        class="form-control"
                        list="names"
                        v-model="z"
                    />
                </div>
                <div class="form-group">
                    <label for="k">Ide s košom:</label>
                    <input
                        type="text"
                        name="k"
                        id="k"
                        class="form-control"
                        list="names"
                        v-model="k"
                    />
                </div>
                <div class="form-group row">
                    <input
                        type="reset"
                        value="Discard"
                        class="btn btn-danger col-4 offset-1 col-lg-2 offset-lg-3"
                    />
                    <input
                        type="submit"
                        value="Add"
                        class="btn btn-primary col-4 offset-2 col-lg-2 offset-lg-2"
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
            </form>
        </div>
    </div>
    <hr />
    <div class="container">
        <div
            class="row mt-lg-4 justify-content-lg-between"
            v-for="i in Math.ceil(data.length / 3)"
        >
            <EditCard
                :data="item"
                v-for="item in data.slice((i - 1) * 3, i * 3)"
            />
        </div>
    </div>
</template>
