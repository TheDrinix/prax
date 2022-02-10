import { createStore } from 'vuex';

export interface Schedule {
    key: string;
    date: string;
    u: string;
    z: string;
    k: string;
}

interface AccessToken {
    key?: string;
    token: string;
    expiresAt?: number;
    isFromCookie?: boolean;
}

export default createStore({
    state: {
        schedule: [] as Schedule[],
        accessToken: {} as AccessToken,
        today: '',
    },
    mutations: {
        loadSchedule(state, data) {
            state.schedule = data;
        },
        loadToken(state) {
            const cookies = document.cookie;
            const cookiesArray = cookies.split(';');
            let token: string = '';
            cookiesArray.forEach((cookie: string) => {
                if (cookie.startsWith('token=')) {
                    token = cookie.substring(6);
                }
            });
            state.accessToken = {
                token,
                isFromCookie: true,
            };
        },
        setToken(state, data) {
            state.accessToken = data;
            document.cookie = `token=${data.token}; expires=${new Date(
                data.expiresAt
            ).toUTCString()}`;
        },
        addNewItem(state, data: Schedule) {
            const schedule = state.schedule;
            schedule.push(data);
            const sorted = schedule.sort((a: Schedule, b: Schedule) => {
                const aDate = Date.parse(a.date);
                const bDate = Date.parse(b.date);
                return aDate > bDate ? -1 : 1;
            });
            state.schedule = sorted;
        },
        removeItem(state, key: string) {
            const filtered = state.schedule.filter((item) => item.key !== key);
            state.schedule = filtered;
        },
        updateItem(state, payload: Schedule) {
            const index = state.schedule.findIndex(
                (item) => item.key === payload.key
            );
            state.schedule[index] = payload;
        },
        getTodayDate(state) {
            const today = new Date();
            const day = today.getUTCDate();
            const month = today.getUTCMonth() + 1;
            const year = today.getUTCFullYear();

            state.today = `${year}-${month < 10 ? '0' + month : month}-${
                day < 10 ? '0' + day : day
            }`;
        },
    },
    actions: {
        async loadSchedule() {
            const response = await fetch('http://localhost:3001/schedule');
            const jsonResponse = await response.json();
            const sorted: Schedule[] = jsonResponse.items.sort(
                (a: Schedule, b: Schedule) => {
                    const aDate = Date.parse(a.date);
                    const bDate = Date.parse(b.date);
                    return aDate > bDate ? -1 : 1;
                }
            );
            this.commit('loadSchedule', sorted);
        },
        async addNewItem(store, data) {
            const body = JSON.stringify(data);
            const token = store.state.accessToken.token;

            const response = await fetch(
                'http://localhost:3001/addNewSchedule',
                {
                    method: 'POST',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );
            if (response.ok) {
                const jsonResponse = await response.json();
                console.log(jsonResponse);
                store.commit('addNewItem', jsonResponse);
            }
        },
        async removeItem(store, key: string) {
            const body = JSON.stringify({
                key,
            });

            const token = store.state.accessToken.token;

            const response = await fetch(
                'http://localhost:3001/removeSchedule',
                {
                    method: 'DELETE',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );
            if (response.ok) {
                this.commit('removeItem', key);
            }
        },
        async updateItem(store, payload: Schedule) {
            const body = JSON.stringify(payload);
            const token = store.state.accessToken.token;

            const response = await fetch(
                'http://localhost:3001/updateSchedule',
                {
                    method: 'PUT',
                    body,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: token,
                    },
                }
            );

            if (response.ok) {
                this.commit('updateItem', payload);
            }
        },
    },
    modules: {},
});
