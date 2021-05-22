<template>
  <div class="wrapper">
    <router-link :to="{ name: 'post', params: { id: link } }">
      <div class="mdc-card mdc-card--outlined border">
        <h1>{{ title }}</h1>
        <p>by: {{ author }}</p>
        <p>{{ date }}</p>
      </div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: ["title", "author", "date", "link"],
};
</script>
<style scoped>
.wrapper {
  text-align: center;
}
.border {
  height: 15rem;
  width: 100%;
  margin: 5px;
}
p {
  font-size: 1.8rem;
}
h3 {
  font-size: 2rem;
  font-weight: bold;
}

@media only screen and (max-width: 1024px) {
  .border {
    height: 15rem;
    margin: 5px;
  }
}
@media only screen and (max-width: 768px) {
  .border {
    height: 13rem;
    margin: 5px;
  }
  p {
    font-size: 1.3rem;
  }
  h3 {
    font-size: 1.8rem;
  }
}
@media only screen and(max-width: 425px) {
}
</style>
