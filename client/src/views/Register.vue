<template>
  <div class="wrapper">
    <div class="formDiv">
      <h2 class="title">Sign Up</h2>
      <form v-on:submit="register">
        <div>
          <label><h3>Username:</h3> </label>
        </div>
        <div>
          <input
            type="text"
            name="username"
            id="username"
            maxlength="10"
            required
          />
        </div>
        <div>
          <label><h3>E-mail:</h3> </label>
        </div>
        <div>
          <input type="email" name="email" id="email" autofocus required />
        </div>
        <div>
          <label><h3>Password:</h3> </label>
        </div>
        <div>
          <input type="password" name="password" id="password" required />
        </div>
        <div>
          <label><h3>Confirm password:</h3></label>
        </div>
        <div>
          <input
            type="password"
            name="password2"
            id="password2"
            class="maintainHeight"
            required
          />
        </div>
        <div>
          <button
            ref="registerBtn"
            class="mdc-button mdc-button--raised btnScale customTheme"
          >
            <span type="submit" value="Register"></span>
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"><p>Sign Up</p> </span>
            <span class="mdc-button__touch"></span>
          </button>
        </div>
        <div>
          <ul>
            <li v-for="(error, index) in errors" :key="index">
              {{ error }}
            </li>
          </ul>
        </div>
        <div></div>
      </form>
    </div>

    <div class="introDiv">
      <h2>
        If you can blog it, you can post it!
      </h2>
      <p>
        Join a community of writters from all walks of life and share your
        story, thoughts or know-how.
      </p>
    </div>
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
import { MDCRipple } from "@material/ripple";

export default {
  name: "Register",
  data() {
    return { errors: null };
  },
  methods: {
    register: function(e) {
      e.preventDefault();

      let username = e.target.elements.username.value;
      let password = e.target.elements.password.value;
      let email = e.target.elements.email.value;
      let password2 = e.target.elements.password2.value;

      let register = () => {
        let data = {
          username,
          email,
          password,
          password2,
        };

        axios
          .post("/api/register", data)
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            this.errors = error.response.data[0];
          });
      };
      register();
    },
  },
  mounted() {
    this.ripple = new MDCRipple(this.$refs.registerBtn);
  },
  destroyed() {
    this.ripple.destroy();
  },
};
</script>
<style scoped>
.wrapper {
  height: 100%;
  width: 100%;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    125deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(255, 255, 255, 1) 35%,
    rgb(255, 225, 156) 35%
  );
  display: flex;
}
.introDiv {
  display: inline-block;
  font-size: 2.3rem;
  height: 30rem;
  width: 65rem;
  margin-left: 40%;
  margin-right: 5%;
  margin-top: 10rem;
}
.btnScale {
  width: 10rem;
  height: 3.5rem;
  font-size: 1rem;
  font-weight: bold;
}
.formDiv {
  height: 50rem;
  width: 24.5rem;
  font-size: 2rem;
  margin: 1rem 0 0 5rem;
  padding: 0;
}
.title {
  padding-left: 1rem;
  font-weight: bold;
  font-style: italic;
  color: gray;
}
form {
  display: grid;
  grid-template-rows: repeat(5, auto);
  grid-template-columns: 100%;
  height: 100%;
}
form > div > input {
  margin-left: 8rem;
}
form > div > button {
  margin-left: 9rem;
}
h2 {
  margin: 2rem 0rem;
}
p {
  font-weight: light;
}

@media only screen and (max-width: 1124px) {
  .wrapper {
    background: linear-gradient(
      125deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 45%,
      rgb(255, 225, 156) 45%
    );
  }

  .introDiv {
    font-size: 2rem;
    margin-top: 10rem;
  }
}
@media only screen and (max-width: 900px) {
  .introDiv {
    font-size: 1.8rem;
    margin-left: 20%;
    margin-right: 2%;
  }
  .formDiv {
    height: 30rem;
    width: 24.5rem;
    font-size: 1.5rem;
    margin: 1.5rem 0 0 3rem;
    padding: 0;
  }
}
@media only screen and (max-width: 700px) {
  .introDiv {
    font-size: 1.4rem;
  }
}
@media only screen and (max-width: 501px) {
  .wrapper {
    height: 100%;
    width: 100%;
    background: rgb(255, 255, 255);
    background: linear-gradient(
      125deg,
      rgba(255, 255, 255, 1) 0%,
      rgba(255, 255, 255, 1) 35%,
      rgb(255, 225, 156) 35%
    );
    display: block;
    overflow-y: hidden;
    overflow-x: hidden;
  }
  .introDiv {
    display: block;
    width: 100vw;
    font-size: 1.2rem;
    margin: 0rem;
    padding-left: 1rem;
  }
  .formDiv {
    display: block;
    font-size: 1rem;
    margin: 0rem;
    padding-left: 1rem;
  }

  form {
    display: grid;
    grid-template-rows: repeat(5, auto);
    grid-template-columns: 100%;
    height: 100%;
  }
}
</style>
