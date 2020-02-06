import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

//未及时更新数据
// let re='/'
// if(sessionStorage.getItem('rank')){
//     let rank=sessionStorage.getItem('rank');
//     re='/'
//     if(rank==1||rank==2)
//     {
//     re='/goodslist'
//     }else if (rank==3){re='/admin'}
// }
// else {
//     re='/'
// }

// Object.defineProperties(obj, {
// 	rank: {
// 		configurable: true,
// 		set: function(newValue) {
// 			rank = newValue;
// 			console.log('你修改了name的值：'+rank)
// 		}
// 	}
// })

export default new Router({
    routes:
     [
        {
            path: '/',
            redirect: '/goodslist'
            // redirect: re
        },
        {
            path: '/',
            component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
            meta: { title: '自述文件' },
            children: [
                {
                    path: '/goodslist',
                    component: ()=> import('../components/page/lpage/goodslist.vue'),
                    meta: { title: '商品列表'},
                },
                // {
                //     path: '/applygoodslist',
                //     component: ()=>import('../components/page/lpage/applygoodslist.vue'),
                //     meta: {title: '申请统计'}
                // },
                {
                    path: '/receivegood',
                    component: () => import(/* webpackChunkName: "icon" */ '../components/page/wpage/receive.vue'),
                    meta: { title: '领用商品' }
                },
                {
                    path: '/applywares',
                    component: ()=>import('../components/page/wpage/applywares.vue'),
                    meta: { title: '申请商品' }
                },
                {
                    path: '/allapply',
                    name:'allapply',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/wpage/myapply.vue'),
                    meta: { title: '申请信息' }
                },
                {
                    path: '/mygoods',
                    name:'mygoods',
                    component: () => import(/* webpackChunkName: "tabs" */ '../components/page/wpage/mygoods.vue'),
                    meta: { title: '我的商品' }
                },
                {
                    // 申请列表:未下单
                    path: '/weixiadan',
                    component: () => import( '../components/page/lpage/applygoodslist.vue'),
                    name:'weixiadan',
                    meta: { title: '未下单' }
                },
                {
                    // 申请列表:已下单
                    path: '/yixiadan',
                    name:'yixiadan',
                    component: () => import('../components/page/lpage/applygoodslist.vue'),
                    meta: { title: '已下单' }
                },
                {
                    // 申请列表:已到货
                    path: '/yidaohuo',
                    name:'yidaohuo',
                    component: () => import('../components/page/lpage/zicanmanage.vue'),
                    meta: { title: '部门已申请商品' }
                },
                {
                    path: '/shoppingcar',
                    name:'shoppingcar',
                    component: ()=> import('../components/page/lpage/shoppingcar.vue'),
                    meta: {title: '购物车'}

                },
                //商品管理页
                {
                    path: '/goodsmanage',
                    name: 'goodsmanage',
                    component: ()=>import('../components/page/lpage/goodsmanage.vue'),
                    meta: {title: '商品管理'}
                },
                //商品详情页
                {
                    //需要传参
                    path:'/goodsdetail',
                    name: 'goodsdetail',
                    component: ()=>import('../components/page/lpage/goodsdetail'),
                    meta: {title: '商品详情'}
                },
                {
                    path: '/admin',
                    name: 'admin',
                    component: ()=>import('../components/page/wpage/admin.vue'),
                    meta: {title: '超级管理员'}
                },
            ]
        },


        {
            path: '/login',
            component: () => import(/* webpackChunkName: "login" */ '../components/page/Login.vue'),
            meta: {title: '登录'},
           
        },
        {
            path: '/register',
            component: () => import( '../components/page/wpage/register.vue'),
            meta: {title: '注册'},
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
});
