import { createRouter, createWebHashHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Edit from '../views/Edit.vue';

const routes = [
    {
        path: '/',
        component: Home,
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/edit',
        component: Edit,
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

export default router;
