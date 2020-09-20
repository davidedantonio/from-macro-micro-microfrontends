import Vue from "vue";
import App from "./App.vue";
Vue.config.productionTip = false;

Vue.component("Hello", {
  render(createElem) {
    return createElem("p", "Hello from vue module component");
  },
});

Vue.component("UserInput", {
  data() {
    return {
      subreddit: "vuejs",
      posts: [],
    };
  },
  render(createElem) {
    console.log("render");
    var self = this;
    return createElem("div", [
      createElem("input", {
        style: {
          marginRight: "1rem",
        },
        domProps: {
          value: self.subreddit,
        },
        on: {
          input: function(event) {
            self.subreddit = event.target.value;
            self.$emit("input", event.target.value);
          },
        },
      }),
      createElem("button", {
        domProps: {
          innerText: "Select subreddit",
        },
        on: {
          click: function(event) {
            fetch(`https://www.reddit.com/r/${self.subreddit}.json`)
              .then((response) => response.json())
              .then((json) => {
                self.posts = json.data.children.map((child) => child.data);
              });
          },
        },
      }),
      self.posts.length
        ? createElem(
            "ul",
            {
              style: {
                padding: "0",
                margin: "0",
                marginTop: "1rem",
              },
            },
            self.posts.map((post) =>
              createElem(
                "li",
                {
                  style: {
                    listStyle: "none",
                    padding: "8px",
                    marginBottom: "6px",
                    boxShadow:
                      "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
                  },
                },
                post.title
              )
            )
          )
        : createElem("p", "select subreddit"),
    ]);
  },
});

const app = () =>
  new Vue({
    render: function(h) {
      const renderTemplate = this._c || h;
      return renderTemplate(App);
    },
  });

export default app;
