<template>
  <div id="app" class=" grid">
    <div id="navbar" class="a">
      <router-view name="a" />
    </div>
    <div id="content" class="b">
      <router-view name="b" />
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@use "@material/button";
@use "@material/card";
@import url("https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp");

@include button.core-styles;

@include card.core-styles;
//controlls scale of icon images inside buttons
.material-icons.md-customIcon {
  font-size: 250%;
}
//controlls the size of the buttons
.mdc-button.md-custom {
  width: 100%;
  height: 100%;
}

.active {
  --mdc-theme-primary: rgb(255, 225, 156);
  --mdc-theme-on-primary: rgb(100, 33, 33);
}
.customTheme {
  --mdc-theme-primary: rgb(109, 8, 168);
  --mdc-theme-on-primary: white;
}
.dangerTheme {
  --mdc-theme-primary: rgb(177, 14, 14);
  --mdc-theme-on-primary: white;
}

.btnScale {
  width: 10rem;
  height: 3rem;
  font-size: 1.3rem;
  font-weight: bold;
}

html {
  font-size: 62.5%; // 62.5% of 16px(default)= 10px. Ergo 1rem will be 10px
}
html,
body {
  margin: 0px;
  height: 100%;
  width: 100%;
  position: fixed;
}
.grid {
  // Main layout
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-rows: 7.5rem auto;
  grid-template-columns: 100%;
}
.a {
  grid-row: 1;
  z-index: 1;
}
.b {
  grid-row: 2;
  display: inline-block;
}

a,
a:focus {
  text-decoration: none;
  color: inherit;
}
form > input > button,
input[type="submit"] {
  cursor: pointer;
}
form > input > button,
input[type="text"],
input[type="password"],
input[type="email"] {
  border: 0px;
  border-left: 1.7px solid black;
  border-bottom: 1.7px solid black;
  background-color: rgba(0, 0, 0, 0) ;
}
textarea:focus,
input:focus {
  outline: none;
}
code {
  color: white;
  padding: 2px;
}
blockquote {
  background-color: #ffff004d;
}
.onHover:hover {
  color: rgb(109, 8, 168);
}

//FONT STYLE
h1 {
  font-family: Georgia, "Times New Roman", Times, serif;
  margin: 0px;
  color: rgb(100, 33, 33);
}
h2 {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  margin: 0px;
  color: rgb(100, 33, 33);
}
h3 {
  font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
}
p {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}

@media only screen and(max-width: 650px) {
  .grid {
    // Main layout
    display: grid;
    grid-template-rows: 9rem auto;
  }
  .b {
    overflow-y:scroll;
    overflow-x: hidden;
  }
}
</style>
