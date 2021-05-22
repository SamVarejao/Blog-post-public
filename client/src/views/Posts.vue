<template>
  <div class="wrapper">
    <p>{{ error }}</p>
    <div class="sideDiv">
      <div class="panel">
        <form v-on:submit="search">
          <input type="text" placeholder="Search Post..." name="search" />
          <button
            ref="searchBtn"
            class="mdc-button mdc-button--raised btnScale customTheme"
          >
            <span type="submit" value="Search" name="search"></span>
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"><p>Search</p></span>
            <span class="mdc-button__touch"></span>
          </button>
        </form>

        <select v-model="selected" @change="orderPosts">
          <option disabled value="">Sort by:</option>
          <option value="1">Title -A-Z</option>
          <option value="2">Title -Z-A</option>
          <option value="3">Date -Oldest</option>
          <option value="4">Date -Newest</option>
        </select>
      </div>
      <div class="userDiv">
        <h4>
          Welcome, {{ user.name }}<span class="tag">@{{ user.nameTag }}</span>
        </h4>
        <div class="avatarDiv">
          <img :src="user.avatar" alt="" srcset="" />
          <label for="avatar"><p>Change avatar</p></label>
          <input
            ref="fileSelec"
            type="file"
            id="avatar"
            name="avatar"
            accept="image/png, image/jpeg, image/jpg"
            style="display:none"
            @change="loadFile"
          />
        </div>
      </div>
    </div>
    <div class="postList">
      <post-box
        v-for="(post, index) in posts"
        v-bind:key="index"
        v-bind:title="post.title"
        v-bind:author="post.author"
        v-bind:date="post.date"
        v-bind:link="post._id"
      >
      </post-box>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
import PostBox from "../components/PostBox.vue";
import axios from "axios";
import router from "../router";

export default {
  name: "Posts",
  data() {
    return { posts: null, error: "", selected: "", user: "null" };
  },
  components: { PostBox },
  methods: {
    orderPosts: function() {
      switch (this.selected) {
        case "1":
          this.orderTitleA();
          break;
        case "2":
          this.orderTitleD();
          break;
        case "3":
          this.orderDateA();
          break;
        case "4":
          this.orderDateD();
          break;
      }
    },
    orderTitleA: function() {
      // sort by title, ascending
      function sortTitleAsc(a, b) {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      }
      return this.posts.sort(sortTitleAsc);
    },
    orderTitleD: function() {
      // sort by title, descending
      function sortTitleDsc(a, b) {
        if (a.title < b.title) {
          return 1;
        }
        if (a.title > b.title) {
          return -1;
        }
        return 0;
      }
      return this.posts.sort(sortTitleDsc);
    },
    orderDateA: function() {
      // sort by date, oldest to newest
      function sortDateAsc(a, b) {
        let dateA = new Date(a.date),
          dateB = new Date(b.date);
        return dateA - dateB;
      }
      return this.posts.sort(sortDateAsc);
    },
    orderDateD: function() {
      // sort by date, newest to oldest
      function sortDateDsc(a, b) {
        let dateA = new Date(a.date),
          dateB = new Date(b.date);

        return dateB - dateA;
      }
      return this.posts.sort(sortDateDsc);
    },
    getUserData: function() {
      PostService.getPosts("/api/user")
        .then((response) => {
          this.user = response.data.user;
          localStorage.setItem("Id", response.data.user.id);
        })
        .catch((errors) => {
          console.log(errors);
          router.push("/register");
        });
    },
    loadFile: function() {
      let file = this.$refs.fileSelec.files[0];

      const reader = new FileReader(); //new instance of FileReader()

      reader.readAsDataURL(file);

      reader.onload = function(event) {
        const imgElement = document.createElement("img");
        imgElement.src = event.target.result;

        imgElement.onload = function(e) {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 300;

          const scaleSize = MAX_WIDTH / e.target.width;
          canvas.width = MAX_WIDTH;
          canvas.height = e.target.height * scaleSize;

          const ctx = canvas.getContext("2d");

          ctx.drawImage(e.target, 0, 0, canvas.width, canvas.height);

          let newAvatar = ctx.canvas.toDataURL(e.target, "image/jpeg");

          let data = { newAvatar };
          axios.post("/api/avatar", data).catch((error) => {
            console.log(error);
          });
        };
      };
    },
    search: function(e) {
      e.preventDefault();

      let query = e.target.elements.search.value;

      console.log(query);
      PostService.getPosts(`/api/posts?search=${query}`)
        .then((response) => {
          this.posts = response.data;
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    try {
      PostService.getPosts("/api/posts/")
        .then((response) => {
          this.posts = response.data;
        })
        .then(() => {
          this.getUserData();
        })
        .then(() => {
          this.orderDateD();
        });
    } catch (err) {
      this.error = err.message;
    }
  },
};
</script>
<style scoped>
.sideDiv {
  display: inline-block;
  width: 40rem;
  margin-left: 10rem;
}
.userDiv {
  display: inline-block;
  padding: 0rem;
  font-size: 1.8rem;
  font-weight: bold;
  margin: 0rem 0rem;
  text-align: center;
}
.userDiv > h4 {
  border: 0px;
  border-left: 1.5px solid black;
  border-bottom: 1.5px solid black;
  padding-left: 0.3rem;
  padding-bottom: 0.3rem;
}
.avatarDiv > img {
  width: 20rem;
  height: 20rem;
  border-radius: 50%;
}
.avatarDiv > label > p {
  font-weight: light;
  font-size: 1.2rem;
  text-align: center;
  border-bottom: 1px solid black;
  cursor: pointer;
}
.avatarDiv > label > p:hover {
  color: rgb(94, 23, 136);
}
.tag {
  color: rgb(94, 23, 136);
}
.postList {
  float: right;
  margin-right: 2rem;
  overflow-y: scroll;
  height: 90vh;
  width: 40vw;
}
.panel {
  display: inline-block;
  height: 2.5rem;
  width: 55rem;
  margin-top: 5rem;
  margin-bottom: 5rem;
}

.panel > form > button {
  margin-left: 1rem;
}

@media only screen and (max-width: 1024px) {
  .sideDiv {
    width: 25rem;
    margin-left: 5rem;
  }
  .panel {
    margin-top: 5rem;
  }
}

@media only screen and (max-width: 768px) {
  .avatarDiv > img {
    width: 13rem;
    height: 13rem;
  }
  .sideDiv {
    width: 20rem;
  }
  .userDiv {
    font-size: 1.5rem;
  }
  .panel {
    display: inline-block;
    width: 15rem;
    text-align: center;
  }
  .panel > form {
    margin-left: 0rem;
    margin-top: 0rem;
  }
  .panel > form > button {
    margin-top: 1rem;
  }
}

@media only screen and (max-width: 550px) {
  .sideDiv {
    display: inline-block;
    width: 100vw;
    margin: 0px;
    padding-bottom: 2rem;
    border-bottom: 2px solid black;
  }
  .panel {
    display: inline-block;
    text-align: left;
    height: 2.5rem;
    width: 55rem;
    margin-top: 3rem;
    margin-left: 1.2rem;
    height: 5rem;
  }
  .userDiv {
    padding: 0rem;
    font-size: 1rem;
    width: 80vw;
    margin-left: 10vw;
  }
  .userDiv > h4 {
    border-left: 0px;
  }
  .postList {
    float: none;
    overflow: visible;
    margin-top: 0rem;
    margin-left: 5vw;
    margin-right: 5vw;
    height: 80vh;
    width: 90vw;
  }
}
</style>
