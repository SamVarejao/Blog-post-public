<template>
  <div
    id="nav"
    class="
  nav"
  >
    <div></div>
    <div>
      <router-link to="/login" class="header">
        <img src="..\assets\icons\logo.png" alt="" srcset="" class="mainIcon" />
        <h1>Bitpages</h1></router-link
      >
    </div>
    <div class="grd2"></div>
    <div class="onHover grd2">
      <router-link to="/login"><h3>Login</h3> </router-link>
    </div>
    <div class="onHover grd2">
      <router-link to="/register"><h3>Sign up</h3> </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "Navbar_out",
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
  grid-template-columns: 2% 10% auto 10% 10% 10% ;
  align-items: center;
  text-align: center;
  border-bottom: 2px solid black;
  margin: 0px;
  font-size: 1.6rem;
}

@media only screen and (max-width: 1024px) {
  .nav {
    grid-template-columns: 2% 10% auto 10% 10% 10% ;
  }
}
@media only screen and (max-width: 768px) {
  .nav {
    grid-template-columns: 2% 15% auto 15% 15% 15% ;
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
    grid-template-columns: 25% 25% 25%;
    row-gap: 3px solid black;
    grid-template-rows: auto 40%;
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
