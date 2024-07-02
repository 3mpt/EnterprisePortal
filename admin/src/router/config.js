const routes = [{
    path: '/center',
    component: () => import('../views/center/Center.vue')
},
{
    path: '/index',
    component: () => import('../views/home/Home.vue')
},
{
    path: '/user-manage/adduser',
    component: () => import('../views/user-manage/UserAdd.vue')
},
{
    path: '/user-manage/userlist',
    component: () => import('../views/user-manage/UserList.vue')
},
{
    path: '/news-manage/addnews',
    component: () => import('../views/news-manage/NewsAdd.vue')
},
{
    path: '/news-manage/newslist',
    component: () => import('../views/news-manage/NewsList.vue')
},
{
    path: '/product-manage/addproduct',
    component: () => import('../views/product-manage/ProductAdd.vue')
},
{
    path: '/product-manage/productlist',
    component: () => import('../views/product-manage/ProductList.vue')
},
{
    path: '/',
    redirect: '/index'
},
{
    path: '/:pathMatch(.*)*',
    name: "notFound",
    component: () => import('../views/notfound/NotFound.vue')
}
]
export default routes