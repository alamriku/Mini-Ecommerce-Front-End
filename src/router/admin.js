
import Dashboard from "../components/Admin/Dashboard";
import Home from "../components/Admin/Home";
import ProductsCreate from "../components/Admin/Product/Create"
import ProductsEdit from "../components/Admin/Product/Edit"
import ProductsIndex from "../components/Admin/Product/Index"
import AdminOrder from "../components/Admin/Order/Index"
import middleware from "./middleware/index"
const Admin = {
        path: '/admin',
        name: 'Dashboard',
        component: Dashboard,
        children : [
            {
               path:'/home',
               name: 'Home',
               component: Home,
                beforeEnter: middleware.admin
            },
            {
                path: '/products/create',
                name: 'Products.Create',
                component: ProductsCreate,
                beforeEnter: middleware.admin,
            },
            {
                path: '/products',
                name: 'Products',
                component: ProductsIndex,
                beforeEnter: middleware.admin
            },
            {
                path: '/products/:id',
                name: 'Products.Edit',
                component: ProductsEdit,
                beforeEnter: middleware.admin,
            },
            {
                path: '/orders/',
                name: 'AdminOrders',
                component: AdminOrder,
                beforeEnter: middleware.admin,
            }

        ],
        beforeEnter: middleware.admin

}

export default Admin