import React from "react";
import ReactDOM from "react-dom"
import App from "./App";

const {
  APP_NAV,
  APP_SHELL,
  APP_AUTH,
  APP_USERS,
  APP_TICKETS
} = process.env;

const urls = [ APP_NAV, APP_SHELL, APP_AUTH, APP_USERS, APP_TICKETS ];
const token = localStorage.getItem("@mf-tickets/token")
for (let url of urls) {
  //let script = document.createElement("script");
  let src = `${url}${token ? `?access_token=${token}` : ''}`;
  url = url.replace('http://localhost:9999/', '')
  console.log(url.replace('.js', ''))
  document.getElementById('s-' + url.replace('.js', '')).src = src;
}

ReactDOM.render(<App />, document.getElementById("root"));