var routeArr =[
    {
        path:'/',
        component:{
            template:`
            <div><h1>首页</h1></div>
            `
        }
    },
    {
        path: '/about',
        meta:{
            login_required:true
        },
        component: {
            template: `
            <div><h1>关于我们</h1></div>
            `
        }
    },
    {
        path: '/user/:name',
        meta: {
            login_required: true
        },
        component: {
            template: `
            <div>
                <div><h1>我是：{{$route.params.name}}</h1></div>
                <div><h1>我今年：{{$route.query.age}}</h1></div>
                <router-link :to="'/user/'+$route.params.name+'/more'">更多信息</router-link>
                <router-link to="more" append>更多信息2</router-link>
                <router-view></router-view>
            </div>
            `
        },
        children: [
            {
                path:'more',
                component:{
                    template:`
                    <div>
                        用户{{$route.params.name}}详细信息
                    </div>`
                }
            }
        ]

    },
    {
        path: '/other1',
        meta: {
            login_required: true
        },
        components: {
            top:{
                template: `
                <div>
                    <h1>我是第一层</h1>
                </div>
                `
            },
            middle: {
                template: `
                <div>
                    <h1>我是第二层</h1>
                </div>
                `
            }
        }
    },
    {
        path: '/other2',
        meta: {
            login_required: true
        },
        components: {
            top: {
                template: `
                <div>
                    <h1>love you</h1>
                </div>
                `
            },
            middle: {
                template: `
                <div>
                    <h1>love me</h1>
                </div>
                `
            }
        }
    },
]
// 传参取值
// <div><h1>我是：{{$route.params.name}}</h1></div>

// 路由取值
// <div> <h1>我今年：{{ $route.query.age }}</h1></div>

//子路由添加
// <router-link : to = "'/user/'+$route.params.name+'/more'" > 更多信息</router-link >
// <router-link to="more" append>更多信息2</router-link>
var router = new VueRouter({
    routes : routeArr
})
//导航钩子 此处代码，举例如果没有登陆，强制跳转
//to.matched
//meta 必须登陆标签
router.beforeEach(function (to,from,next) {
    var login = false;
    if(!login && to.matched.some(function(item){
        return item.meta.login_required
    })){
        next("/")
    }else{
        next()
    }
})
new Vue({
    el:'#app',
    router:router
})