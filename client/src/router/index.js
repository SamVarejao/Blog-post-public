import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Posts from "../views/Posts.vue";
import Create from "../views/Create.vue";
import UserPosts from "../views/UserPosts.vue";
import Post from "../views/Post.vue";
import Navbar_out from "../views/Navbar_out.vue";
import Navbar_in from "../views/Navbar_in.vue";
import axios from "axios";

Vue.use(VueRouter);

function routeGuardAuth(to, from, next) {
  // protect routes from logged in users

  axios
    .get("/api/safeguard") //makes a serverside call to check if the user is logged in
    .then((response) => {
      if (response.data.login == true) {
        next("/");
      } else {
        next();
      }
    });
}

function routeGuard(to, from, next) {
  // protect routes from non-logged in users
  function popUp() {
    alert("Please log in");
  }

  axios.get("/api/safeguard").then((response) => {
    if (response.data.login == true) {
      next();
    } else {
      next("/login");
      popUp();
    }
  });
}

const routes = [
  {
    path: "/login",
    name: "login",
    beforeEnter: routeGuardAuth,
    components: {
      a: Navbar_out,
      b: Login,
    },
  },
  {
    path: "/register",
    name: "register",
    beforeEnter: routeGuardAuth,
    components: {
      a: Navbar_out,
      b: Register,
    },
  },

  {
    path: "/",
    name: "main",
    beforeEnter: routeGuard,
    components: {
      a: Navbar_in,
      b: Posts,
    },
  },
  {
    path: "/post/:id",
    name: "post",
    beforeEnter: routeGuard,
    components: {
      a: Navbar_in,
      b: Post,
    },
  },
  {
    path: "/createpost",
    name: "createpost",
    beforeEnter: routeGuard,
    components: {
      a: Navbar_in,
      b: Create,
    },
  },
  {
    path: "/myposts",
    name: "myposts",
    beforeEnter: routeGuard,
    components: {
      a: Navbar_in,
      b: UserPosts,
    },
  },
  {
    path: "*",
    name: "*",
    beforeEnter: routeGuard,
    components: {
      a: Navbar_in,
      b: Posts,
    },
  },
];

const router = new VueRouter({
  // Removes # from url
  mode: "history",
  routes,
});

export default router;
