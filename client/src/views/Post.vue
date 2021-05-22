<template>
  <div class="postGrid">
    <div class="articleDiv">
      <div class="header">
        <h1>{{ post.title }}</h1>
        <div>
          <img :src="avatar" alt="" srcset="" />
          <p>{{ post.author }}</p>
          <p class="grey">{{ post.date }}</p>
        </div>
      </div>
      <!--HTML code parser -->
      <div class="article" ref="article" v-html="this.post.content"></div>
    </div>

    <div class="controlBar">
      <div class="likeDiv">
        <p>{{ post.points }}</p>
      </div>
      <button
        class="like-button mdc-button mdc-button--outlined btnScale customTheme"
        v-bind:class="{ active: this.isActive }"
        @click="likePost()"
      >
        <span class="mdc-button__ripple"></span>
        <span class="mdc-button__label">Like</span>
        <span class="mdc-button__touch"></span>
      </button>
      <div class="buttonBox" v-if="checkAuthor()">
        <button
          class="delete-button mdc-button mdc-button--raised btnScale dangerTheme"
          @click="deletePost(post._id)"
        >
          <span class="mdc-button__ripple"></span>
          <span class="mdc-button__label">Delete</span>
          <span class="mdc-button__touch"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
import axios from "axios";
import router from "../router";
import { MDCRipple } from "@material/ripple";

export default {
  name: "post",
  data() {
    return { post: "null", isActive: false, avatar: "null" };
  },
  methods: {
    deletePost: function() {
      const url = `/api/posts/${this.$route.params.id}`;
      if (
        confirm("Once deleted your post cannot be recovered. Are you sure?")
      ) {
        axios
          .delete(url)
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    likePost: function() {
      const url = `/api/posts/${this.$route.params.id}`;
      axios
        .post(url, { data: this.post.points })
        .then((response) => {
          this.post.points = response.data.points;
          const toggle = this.isActive == true ? false : true;
          this.isActive = toggle;
        })

        .catch((error) => {
          console.log(error);
        });
    },
    checkAuthor: function() {
      if (this.post.authorID == localStorage.getItem("Id")) {
        return true;
      } else {
        return false;
      }
    },
    getPostData: function() {
      PostService.getPosts(`/api/posts/${this.$route.params.id}`)
        .then((response) => {
          this.post = response.data.posts;
          this.isActive = response.data.hasPoint;
        })
        .then(() => {
          //In short, because i could not find a way to target the img elements within the .article div with css
          //i had to target them by iterating throught the NodeList with js apply the CSS properties
          let article = document.querySelectorAll(".article");

          const l = article[0].children.length;
          for (let i = 0; i < l; i++) {
            let articleImg = article[0].children[i].children[0];
            if (articleImg == undefined) {
              continue;
            }

            article[0].children[i].children[0].style.cssText +=
              "max-width: 60vw; max-height: 60vh; display:block; margin:auto";
          }
        });
    },
    getAuthAvatar: function() {
      PostService.getPosts(`/api/authAvatar/${this.post.authorID}`).then(
        (response) => {
          this.avatar = response.data;
        }
      );
    },
  },
  created() {
    try {
      this.getPostData().then(() => {
        this.checkAuthor();
      });
    } catch (err) {
      console.error(err);
      this.error = err.message;
    }
  },
  updated() {
    this.getAuthAvatar();
    //ripple is in updated() this time around because querySelectorAll won´t list all the buttons if the post
    //isn´t loaded into the DOM
    this.ripple = [].map.call(
      document.querySelectorAll(".mdc-button"),
      function(el) {
        return new MDCRipple(el);
      }
    );
  },
};
</script>

<style scoped>
/* NOTE: The style for the img within the .article div can be found 
in the getPostData function*/

.postGrid {
  height: 100%;
  display: grid;
  grid-template-rows: 82vh auto;
  grid-template-columns: 100%;
}

.articleDiv {
  grid-row: 1;
  overflow-y: scroll;
  font-size: 1.6rem;
}
.header {
  margin: 5rem;
  height: 10rem;
}
.header > div {
  display: flex;
  justify-content: center;
}
.header > h1 {
  display: flex;
  justify-content: center;
}
.header > div > p {
  margin-left: 1.5rem;
  margin-top: auto;
  margin-bottom: auto;
  font-weight: bold;
}
.header > div > img {
  padding-top: 1rem;
  padding-bottom: 1rem;
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
}
.grey {
  color: grey;
}
.article {
  margin: 0 7vw;
}
.controlBar {
  display: flex;
  align-items: center;
  border-top: 2px solid black;
  grid-row: 2;
}
.likeDiv {
  font-size: 1.8rem;
  margin-left: 1rem;
  margin-right: 2rem;
}
.active {
  color: rgb(54, 255, 47);
}

@media only screen and (max-width: 1024px) {
  .header > div > img {
    padding-top: 1rem;
    padding-bottom: 1rem;
    height: 4rem;
    width: 4rem;
  }
}
@media only screen and (max-width: 768px) {
  .articleDiv {
    font-size: 1.3rem;
  }
  .header {
    margin: 3rem auto 1.5rem auto;
  }
  .postGrid {
    grid-template-rows: 80vh auto;
  }
}
@media only screen and(max-width: 425px) {
  .postGrid {
    overflow-x: hidden;
  }
}
</style>
