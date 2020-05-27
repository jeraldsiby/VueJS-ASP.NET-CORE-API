// Vue imports
import Vue from "vue";
import Router from "vue-router";

// 3rd party imports
import Auth from "@okta/okta-vue";
import FoodRecords from "@/components/FoodRecords";

// our own imports
import Hello from "@/components/Hello";

Vue.use(Auth, {
  issuer: "https://dev-715224.okta.com/oauth2/default",
  client_id: "0oad5t3ezzmOlWupK4x6",
  redirect_uri: "http://localhost:8080/implicit/callback",
  scope: "openid profile email"
});

Vue.use(Router);

let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Hello",
      component: Hello
    },
    {
      path: "/implicit/callback",
      component: Auth.handleCallback()
    },
    {
      path: "/food-records",
      name: "FoodRecords",
      component: FoodRecords,
      meta: {
        requiresAuth: true
      }
    }
  ]
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router;
