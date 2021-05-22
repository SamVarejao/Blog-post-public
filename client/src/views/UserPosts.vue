<template>
  <div class="wrapper">
    <p>{{ error }}</p>
    <div class="sideDiv">
      <div class="userDiv">
        <h4>
          My Posts
        </h4>
      </div>
      <div class="panel">
        <select v-model="selected" @change="orderPosts">
          <option disabled value="">Sort by:</option>
          <option value="1">Title -A-Z</option>
          <option value="2">Title -Z-A</option>
          <option value="3">Date -Oldest</option>
          <option value="4">Date -Newest</option>
        </select>
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

    {{ error }}
  </div>
</template>

<script>
import PostService from "../PostService";
import axios from "axios";
import router from "../router";
import PostBox from "../components/PostBox.vue";
//import { MDCRipple } from "@material/ripple";

export default {
  name: "posts",
  data() {
    return { posts: null, error: "", selected: "" };
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
    deletePost: function(id) {
      const url = "/api/posts/" + id;
      axios
        .delete(url)
        .then(() => {
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    try {
      PostService.getPosts("/api/myposts/")
        .then((response) => {
          this.posts = response.data;
        })
        .then(() => {
          this.orderDateD();
        });
    } catch (err) {
      this.error = err.message;
    }
  } /*
  mounted() {
    this.ripple = [].map.call(
      document.querySelectorAll(".mdc-button"),
      function(el) {
        return new MDCRipple(el);
      }
    );
  },
  destroyed() {
    this.ripple.destroy;
  },*/,
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
  width: 25rem;
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
  text-align: left;
  padding-left: 1rem;
  padding-bottom: 0.3rem;
}
.postList {
  float: right;
  margin-right: 2rem;
  overflow-y: scroll;
  height: 90vh;
  width: 40vw;
}
.panel {
  display: block;
  height: 2.5rem;
  width: 20rem;
  margin-top: 10rem;
}

@media only screen and (max-width: 1024px) {
  .sideDiv {
    width: 25rem;
    margin-left: 5rem;
  }
  .userDiv {
    width: 20rem;
  }

  .panel {
    margin-top: 5rem;
  }
}

@media only screen and (max-width: 768px) {
  .sideDiv {
    width: 20rem;
  }
  .panel {
    display: inline-block;
    width: 15rem;
    text-align: center;
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
    text-align: center;
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
