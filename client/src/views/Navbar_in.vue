<template>
  <div id="nav" class=" nav">
    <div></div>
    <div class="grd1">
      <router-link to="/" class="header ">
        <img src="..\assets\icons\logo.png" alt="" srcset="" class="mainIcon" />
        <h1>Bitpages</h1></router-link
      >
    </div>
    <div></div>
    <div class="onHover grd2">
      <router-link to="/createpost">
        <span class="material-icons"> post_add </span>
      </router-link>
    </div>
    <div class="onHover grd2">
      <router-link to="/">
        <span class="material-icons-outlined">
          home
        </span>
      </router-link>
    </div>

    <div class="onHover grd2">
      <router-link to="/myposts">
        <h3>My Posts</h3>
      </router-link>
    </div>
    <div class="grd2">
      <button
        ref="logoutBtn"
        class="mdc-button mdc-button--outlined btnScale customTheme wideBtn"
        @click="logout"
      >
        <span class="mdc-button__ripple"></span>
        <span class="mdc-button__label">Logout</span>
        <span class="mdc-button__touch"></span>
      </button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import router from "../router";
import { MDCRipple } from "@material/ripple";

export default {
  name: "Navbar_in",
  methods: {
    logout: function() {
      axios.get("/api/logout").then(() => {
        console.log("Log out successful");
        localStorage.removeItem("Id");
        router.push("/login");
      });
    },
  },
  mounted() {
    this.ripple = new MDCRipple(this.$refs.logoutBtn);
  },
  destroyed() {
    this.ripple.destroy();
  },
};
</script>
<style scoped>
.mainIcon {
  width: 6.5rem;
  height: 6.5rem;
}
.header {
  display: flex;
  align-items: center;
  font-size: 2rem;
}
.nav {
  height: 98%;
  display: grid;
  grid-template-columns: 2% 10% auto 10% 10% 10% 10%;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid black;
  margin: 0px;
  font-size: 1.6rem;
}

@media only screen and (max-width: 1024px) {
  .nav {
    grid-template-columns: 2% 15% auto 25% 10% 10% 15%;
  }
}
@media only screen and (max-width: 768px) {
  .nav {
    font-size: 1.4rem;
  }
  .header {
    font-size: 1.6rem;
  }
}
@media only screen and (max-width: 550px) {
  .mainIcon {
    width: 3.5rem;
    height: 3.5rem;
  }
  .header {
    display: flex;
    align-items: center;
    font-size: 1.5rem;
  }
  .nav {
    height: 98%;
    display: grid;
    grid-template-columns: 25% 25% 25% 25%;
    grid-template-rows: auto 40%;
    row-gap: 3px solid black;
    align-items: center;
    text-align: center;
    font-size: 1.3rem;
  }
  .grd2 {
    grid-row: 2;
  }
  .wideBtn {
    width: 7rem;
    height: 2.5rem;
    font-size: 0.9rem;
  }
}
</style>
