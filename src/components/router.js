import { createRouter, createWebHistory } from 'vue-router';
import CifradoEscitala from './CifradoEscitala.vue';
import DocumentacionComponent from './DocumentacionComponent.vue';
import CesarCipher from './CesarCipher.vue';
import ComparacionExtra from './ComparacionExtra.vue';
import CifradoRC5 from './CifradoRC5.vue';
import CifradoEdDSA from './CifradoEdDSA.vue';
import tigerHash from './tigerHash.vue';
const routes = [
    {
        path: '/',
        redirect: '/CifradoRC5', 
    },
    {
        path: '/CifradoEscitala',
        name: 'CifradoEscitala',
        component: CifradoEscitala,
    },
    {
        path: '/documentacion',
        name: 'Documentacion',
        component: DocumentacionComponent,
    },
    {
        path: '/CifradoCesar',
        name: 'CesarCipher',
        component: CesarCipher,
    },
    {
        path: '/comparacion',
        name: 'ComparacionExtra',
        component: ComparacionExtra,
    },
    {
        path: '/CifradoRC5',
        name: 'CifradoRC5',
        component: CifradoRC5,
    },
    {
        path: '/CifradoEdDSA',
        name: 'CifradoEdDSA',
        component: CifradoEdDSA,
    },
    {
        path: '/HashTiger',
        name: 'HashTiger',
        component: tigerHash,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
