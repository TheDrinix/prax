<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

const store = useStore();
const router = useRouter();

const password = ref('');
let wasWrong = ref(false);

const login = async () => {
    let bodyContent = JSON.stringify({
        password: password.value,
    });

    const response = await fetch('https://prax-api.thedrinix.me/auth', {
        method: 'POST',
        body: bodyContent,
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        store.commit('setToken', jsonResponse.access_token);
        router.push('/edit');
    } else {
        wasWrong.value = true;
        password.value = '';
    }
};
</script>
<template>
    <div class="container" style="margin-top: 1.5rem; height: 100vh">
        <div class="row">
            <h2
                class="offset-md-2 offset-lg-3 col-md-8 col-lg-6 text-center white"
            >
                Login to access edit page
            </h2>
        </div>
        <div class="row m-2 justify-content-center" style="height: 4rem">
            <div class="alert alert-danger" v-if="wasWrong">
                <p>You entered a <strong>wrong password!</strong></p>
            </div>
        </div>
        <div class="row mt-4">
            <form
                action=""
                @submit.prevent="login"
                class="offset-md-2 offset-lg-3 col-md-8 col-lg-6"
            >
                <div class="container">
                    <div class="row">
                        <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            class="col-12 form-control"
                            :class="{ 'is-invalid': wasWrong }"
                            v-model="password"
                        />
                    </div>
                    <div class="row" style="height: 1rem"></div>
                    <div class="row">
                        <input
                            type="submit"
                            value="Login"
                            class="btn btn-primary col-md-4 col-lg-2 offset-md-4 offset-lg-5"
                        />
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<style></style>
