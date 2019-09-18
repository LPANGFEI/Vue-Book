import Home from '@/views/Home.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/searching',
        name: 'searching',
        component: () => import('../views/Searching')
    },
    {
        path: '/bookshelf',
        name: 'bookshelf',
        component: () => import('../views/BookShelf')
    },
    {
        path: '/ranking',
        name: 'ranking',
        component: () => import('../views/Ranking'),
    },
    {
        path: '/classification',
        name: 'classification',
        component: () => import('../views/Classification')
    },
    {
        path: '/bookmore',
        name: 'bookmore',
        component: () => import('../views/BookMore')
    },
    {
        path: '/bookdetail',
        name: 'bookdetail',
        component: () => import('../views/BookDetail')
    },
    {
        path: '/reading',
        name: 'reading',
        component: () => import('../views/Reading')
    },
    {
        path: '/catalog',
        name: 'catalog',
        component: () => import('../views/Catalog')
    },
    {
        path: '*',
        redirect: '/'
    }
]

export default {
    scrollBehavior(to, from, savePosition) {
        return {
            x: 0,
            y: 0
        }

    },
    routes,
    mode: 'history'
}
