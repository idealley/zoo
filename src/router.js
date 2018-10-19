import Vue from "vue";
import Router from "vue-router";
import AL from "./views/AnimalsTypesList.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: AL
    },
    {
      path: "/details/:slug",
      name: "details",
      component: () =>
        import(/* webpackChunkName: "AnimalsList" */ "./views/AnimalsList.vue")
    }
  ]
});
