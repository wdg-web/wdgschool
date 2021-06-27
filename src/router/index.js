import Vue from 'vue'
import VueRouter from 'vue-router'

const Login = () =>
    import ('../views/login/Login.vue')
const Register = () =>
    import ('../views/register/Register.vue')
const Send = () =>
    import ('../views/send/Send.vue')
const LostFound = () =>
    import ('../views/lost-found/LostFound.vue')
const LostFoundItem = () =>
    import ('../views/lost-found-item/LostDetailItem.vue')
const SecondHand = () =>
    import ('../views/secondhand/SecondHand.vue')
const Cart = () =>
    import ('../views/cart/Cart.vue')

const Profile = () =>
    import ('../views/profile/Profile.vue')
const Address = () =>
    import ('../views/profile/address/Address.vue')
const AddressEdit = () =>
    import ('../views/profile/address/AddressEdit.vue')
const OrderDetail = () =>
    import ('../views/profile/orderDetail/OrderDetail.vue')
const OrderList = () =>
    import ('../views/profile/orderDetail/OrderList.vue')
const Message = () =>
    import ('../views/profile/message/Message.vue')
const MessageDetail = () =>
    import ('../views/profile/message/MessageDetail.vue')
const RleaseLost = () =>
    import ('../views/profile/release/RleaseLost.vue')
const RleaseSecond = () =>
    import ('../views/profile/release/RleaseSecond.vue')

const GoodsItem = () =>
    import ('../views/secondhand-item/GoodsItem.vue')
const GoodsClassify = () =>
    import ('../views/secondhand/goodsClassify/GoodsClassify.vue')
const Order = () =>
    import ('../views/secondhand/order/Order.vue')
const Pay = () =>
    import ('../views/secondhand/order/Pay.vue')
const Search = () =>
    import ('../views/secondhand/search/Search.vue')

// 1.安装插件
Vue.use(VueRouter)

// 2.创建router
// 配置映射关系
const routes = [{
        path: '',
        redirect: '/login',
        meta: {
            showTab: false
        }
    },
    {
        path: '/login',
        component: Login,
        meta: {
            showTab: false
        }
    },
    {
        path: '/register',
        component: Register,
        meta: {
            showTab: false
        }
    },
    {
        path: '/send',
        component: Send,
        meta: {
            showTab: true
        }
    },
    {
        path: '/lostFound',
        component: LostFound,
        meta: {
            showTab: true
        }
    },
    {
        path: '/lostFoundItem',
        component: LostFoundItem,
        meta: {
            showTab: false
        }
    },
    {
        path: '/secondhand',
        component: SecondHand,
        meta: {
            showTab: true
        }
    },
    {
        path: '/cart',
        component: Cart,
        meta: {
            showTab: true
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            showTab: true
        },
        // children: [{
        //         path: 'address',
        //         component: Address,
        //         meta: {
        //             showTab: false
        //         },
        //     },
        //     {
        //         path: 'addressEdit',
        //         component: AddressEdit,
        //         meta: {
        //             showTab: false
        //         },
        //     }
        // ]
    },
    {
        path: '/address',
        component: Address,
        meta: {
            showTab: false
        },
    },
    {
        path: '/addressEdit',
        component: AddressEdit,
        meta: {
            showTab: false
        },
    },
    {
        path: '/orderDetail',
        component: OrderDetail,
        meta: {
            showTab: false
        },
    },
    {
        path: '/orderList',
        component: OrderList,
        meta: {
            showTab: false
        },
    },
    {
        path: '/message',
        component: Message,
        meta: {
            showTab: false
        },
    },
    {
        path: '/messageDetail',
        component: MessageDetail,
        meta: {
            showTab: false
        },
    },
    {
        path: '/rleaseLost',
        component: RleaseLost,
        meta: {
            showTab: false
        },
    },
    {
        path: '/rleaseSecond',
        component: RleaseSecond,
        meta: {
            showTab: false
        },
    },

    {
        path: '/goodsitem',
        component: GoodsItem,
        meta: {
            showTab: false
        }
    },
    {
        path: '/goodsclassify',
        component: GoodsClassify,
        meta: {
            showTab: false
        }
    },
    {
        path: '/order',
        component: Order,
        meta: {
            showTab: false
        }
    },
    {
        path: '/pay',
        component: Pay,
        meta: {
            showTab: false
        }
    },
    {
        path: '/search',
        component: Search,
        meta: {
            showTab: false
        }
    },
]
const router = new VueRouter({
    routes,
    mode: 'hash'
        // mode: 'history'
})

export default router