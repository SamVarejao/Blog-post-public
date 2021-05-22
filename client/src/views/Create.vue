<template>
  <div class="wrapper">
    <div class="postGrid">
      <div class="titleDiv">
        <form v-on:submit="create">
          <input
            class="marginLeft"
            placeholder="Title"
            type="text"
            name="title"
            id="title"
            maxlength="50"
            required
          /><br />

          <button class="mdc-button mdc-button--raised btnScale">
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label">Create</span>
            <span class="mdc-button__touch"></span>
            <span type="submit" value="Create"></span>
          </button>
        </form>
      </div>
      <editor-menu-bar
        :editor="editor"
        v-slot="{ commands, isActive }"
        class="panel grd2"
      >
        <div>
          <button
            class="mdc-button mdc-button--outlined md-custom"
            @click="commands.undo"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span></span>
            <span class="material-icons md-customIcon">
              undo
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined  md-custom"
            @click="commands.redo"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              redo
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined btnIconScale md-custom"
            v-bind:class="{ active: isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
            title="Header 1"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <p class="tagBtnScale">&lt;h1&gt;</p>
          </button>

          <button
            class="mdc-button mdc-button--outlined btnIconScale md-custom"
            v-bind:class="{ active: isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
            title="Header 2"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <p class="tagBtnScale">&lt;h2&gt;</p>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            v-bind:class="{ active: isActive.bold() }"
            @click="commands.bold"
            title="Bold"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              format_bold
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            v-bind:class="{ active: isActive.italic() }"
            @click="commands.italic"
            title="Italic"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              format_italic
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            v-bind:class="{ active: isActive.strike() }"
            @click="commands.strike"
            title="Strike"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              strikethrough_s
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            v-bind:class="{ active: isActive.underline() }"
            @click="commands.underline"
            title="Underline"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              format_underlined
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined btnIconScale md-custom"
            v-bind:class="{ active: isActive.paragraph() }"
            @click="commands.paragraph"
            title="Paragraph"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <p class="tagBtnScale">¶</p>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            v-bind:class="{ active: isActive.bullet_list() }"
            @click="commands.bullet_list"
            title="Bullet list"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              format_list_bulleted
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            v-bind:class="{ active: isActive.ordered_list() }"
            @click="commands.ordered_list"
            title="Ordered list"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              format_list_numbered
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            v-bind:class="{ active: isActive.blockquote() }"
            @click="commands.blockquote"
            title="Blockquote"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              format_quote
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            v-bind:class="{ active: isActive.code() }"
            @click="commands.code"
            title="Code"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              code
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            v-bind:class="{ active: isActive.code_block() }"
            @click="commands.code_block"
            title="Code block"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              code
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            @click="commands.horizontal_rule"
            title="Horizontal rule"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              horizontal_rule
            </span>
          </button>

          <button
            class="mdc-button mdc-button--outlined md-custom"
            @click="showImagePrompt(commands.image)"
            title="Image"
          >
            <span class="mdc-button__ripple"></span>
            <span class="mdc-button__label"></span>
            <span class="mdc-button__touch"></span>
            <span class="material-icons md-customIcon">
              insert_photo
            </span>
          </button>
        </div>
      </editor-menu-bar>
    </div>

    <editor-content class="editor__content editorStyle" :editor="editor" />
  </div>
</template>

<script>
import router from "../router";
import axios from "axios";
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { MDCRipple } from "@material/ripple";

import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
} from "tiptap-extensions";

export default {
  name: "Create",
  components: {
    EditorContent,
    EditorMenuBar,
  },
  data() {
    return {
      error: "",
      html: null,
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
        ],
        content: `Tell the world what you think!`,
        onUpdate: ({ getHTML }) => {
          this.html = getHTML(); // Post content will be converted into HTML
        },
      }),
    };
  },
  methods: {
    create: function(e) {
      e.preventDefault();
      let title = e.target.elements.title.value;
      let content = this.html;

      let create = () => {
        let data = {
          title,
          content,
        };
        //The HTML code will be exported into the database
        axios
          .post("/api/posts", data)
          .then(() => {
            console.log("Creation successful");
            router.push("/");
          })
          .catch((error) => {
            this.error = error;
            console.log(error);
          });
      };
      create();
    },
    showImagePrompt: function(command) {
      const src = prompt("URL:");
      if (src !== null) {
        command({ src });
      }
    },
  },
  mounted() {
    this.ripple = [].map.call(
      document.querySelectorAll(".mdc-button"),
      function(el) {
        return new MDCRipple(el);
      }
    );
    console.log(this.ripple);
  },
  destroyed() {
    this.ripple.destroy();
  },
  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>
<style scoped>
.postGrid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 50% 50%;
  width: 100vw;
  height: 18rem;
  margin: 1rem 0rem 0rem 0rem;
}
.titleDiv {
  grid-row: 2;
  grid-column: 2 / span 9;
  font-size: 1.8rem;
  padding-top: 1rem;
}
.titleDiv > form {
  display: flex;
  flex-direction: column-reverse;
}
.titleDiv > form > input[type="text"] {
  font-family: Georgia, "Times New Roman", Times, serif;
  font-style: italic;
  color: gray;
  font-size: 2rem;
  font-weight: bold;
  width: 25rem;
}
.titleDiv > form > button {
  margin-left: auto;
}
.panel {
  grid-row: 1;
  grid-column: 4 / span 3;
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
.editorStyle {
  font-size: 1.6rem;
  width: 80%;
  height: 58vh;
  overflow-y: scroll;
  margin-left: 10%;
  text-align: justify;
  text-justify: inter-word;
  padding: 0.5rem;
}
.tagBtnScale {
  font-size: 130%;
  font-weight: bold;
}
@media only screen and (max-width: 800px) {
  .postGrid {
    height: 30rem;
  }
  .panel {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
  }
  .titleDiv {
    font-size: 1.3rem;
  }
}
@media only screen and (max-width: 500px) {
  .postGrid {
    height: 30rem;
  }
  .panel {
    grid-column: 3 / span 3;
  }
  .titleDiv {
    font-size: 1.3rem;
  }
  .titleDiv > form > button {
    margin-left: auto;
    margin-right: auto;
  }
  
}
@media only screen and (max-width: 350px) {
  .panel {
    grid-column: 2 / span 3;
  }
  
}
</style>
