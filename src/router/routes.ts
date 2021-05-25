import { RouteConfig } from 'vue-router'

const routes: RouteConfig[] = [
  {
    path: '/',
    component: () => import('pages/LoginPage/Login.vue')
  },
  {
    path: '/SignUp',
    component: () => import('pages/SignUpPage/SignUp.vue')  
  },
  {
    path: '/Home',
    component: () => import('pages/Customer/HomeUserPage/HomeUser.vue'),
    children: [
      { path: '/TestPage', component: () => import('pages/TestPage/TestPage.vue') },
      { path: '/UserProfile', component: () => import('pages/Customer/UserProfilePage/UserProfile.vue') },
      { path: '/ShoppingCart', component: () => import('components/ShoppingCart.vue') },
      { path: '/ProductsPage', component: () => import('pages/Customer/ProductsPage/ProductsPage.vue') },
      { path: '/SingleProduct', component: () => import('pages/Customer/SingleProductPage/SingleProduct.vue') },
      { path: '/Checkout', component: () => import('pages/Customer/CheckoutPage/Checkout.vue') }
    ]
  },
  {
    path: '/HomeManager',
    component: () => import('pages/Manager/HomeManagerPage/HomeManager.vue'),
    children: [
      { path: '/Colores', component: () => import('pages/Manager/ColoresPage/Colores.vue') },
      { path: '/DashboardManager', component: () => import('pages/Manager/DashboardManagerPage/DashboardManager.vue') },
      { path: '/StaffManager', component: () => import('pages/Manager/StaffManagerPage/StaffManager.vue') },
      { path: '/Categorias', component: () => import('pages/Manager/CategoriasPage/Categorias.vue') },
      { path: '/Tallas', component: () => import('pages/Manager/TallasPage/Tallas.vue') },
      { path: '/Marcas', component: () => import('pages/Manager/MarcasPage/Marcas.vue') },
      { path: '/Zapatillas', component: () => import('pages/Manager/ZapatillasPage/Zapatillas.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
