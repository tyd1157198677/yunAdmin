import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    redirect: '/home' //这里用重定向设置默认选中的路由,即点击'/'路径时把'/about' 替换为'/'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页'
    },
    children: [
      //权限管理on
      {
        path: 'permission', 
        name: 'permission',
        component: () => import('@/views/permission/RoleMangement.vue'),
        meta: {
          title: '权限管理'
        },
        redirect: 'permission/ManagementRole',
        children: [
          {
            path: 'ManagementRole', 
            name: 'ManagementRole',
            component: () => import('@/views/permission/ManagementRole.vue'),
            meta: {
              title: '角色管理'
            },
          },
          {
            path: 'ManagementStaff', 
            name: 'ManagementStaff',
            component: () => import('@/views/permission/ManagementStaff.vue'),
            meta: {
              title: '员工管理'
            },
          },
          {
            path: 'addRole', //添加角色
            name: 'AddRole',
            component: () => import('@/views/permission/AddRole.vue'),
            meta: {
              title: '添加角色'
            },
          },
          {
            path: 'AddStaff', //添加角色
            name: 'AddStaff',
            component: () => import('@/views/permission/AddStaff.vue'),
            meta: {
              title: '添加员工'
            },
          },
        ],
      },
      
      
      //权限管理off


      //客户管理on
      {
        path: 'customer', //用户管理
        name: 'customer',
        component: () => import('@/views/customer/ManagementCustomer.vue'),
        meta: {
          title: '用户管理'
        },
        redirect: 'customer/userList',
        children: [
          {
            path: 'userList', //用户列表
            name: 'userList',
            component: () => import('@/views/customer/UserList.vue'),
            meta: {
              title: '用户列表'
            },
          },
          {
            path: 'userDetail', //用户详情
            name: 'userDetail',
            component: () => import('@/views/customer/UserDetail.vue'),
            meta: {
              title: '用户详情'
            },
    
          },
          {
            path: 'AddEmployees', 
            name: 'AddEmployees',
            component: () => import('@/views/customer/AddEmployees.vue'),
            meta: {
              title: '添加员工'
            },
          },
          {
            path: 'AddUser', 
            name: 'AddUser',
            component: () => import('@/views/customer/AddUser.vue'),
            meta: {
              title: '添加用户'
            }
          },
          {
            path: 'AgentMangement',
            name: 'AgentMangement',
            component: (res) =>
            require(['@/views/customer/AgentMangement'], res),
                // import ('@/views/customer/AgentMangement.vue'),
            meta: {
                title: '代理商管理',
                btnPermissions: ['1', '2', '3'],
            }
        },
        {
            path: 'TeacherMangement',
            name: 'TeacherMangement',
            component: (res) =>
            require(['@/views/customer/TeacherMangement'], res),
                // import ('@/views/customer/TeacherMangement.vue'),
            meta: {
                title: '讲师管理',
                btnPermissions: ['1', '2'],
            }
        },
        {
            path: 'PresidentMangement',
            name: 'PresidentMangement',
            component: (res) =>
            require(['@/views/customer/PresidentMangement'], res),
                // import ('@/views/customer/PresidentMangement.vue'),
            meta: {
                title: '总裁管理',
                btnPermissions: ['1', '2'],
            }
        },
        {
            path: 'PromoterMangement',
            name: 'PromoterMangement',
            component: (res) =>
            require(['@/views/customer/PromoterMangement'], res),
                // import ('@/views/customer/PromoterMangement.vue'),
            meta: {
                title: '推广员管理',
                btnPermissions: ['3'],
            }
        }
        ],
      },
      
      //客户管理off
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) =>{
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      var title = to.meta.title
      console.log(title.substr(title.length-4))
      if (title.substr(0, 1) == '>') {
          title = title.substr(title.length-4);
      }
      document.title = title
  }
  next()
})
export default router