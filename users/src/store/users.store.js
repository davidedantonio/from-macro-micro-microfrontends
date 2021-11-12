import { observable, action } from "mobx";
import axios from "axios";

const { APP_API } = process.env;
const client = axios.create({
  baseURL: APP_API,
  headers: { Authorization: `Bearer ${localStorage.getItem("@mf-tickets/token")}` }
});

class UsersStore {
  @observable rows = [];
  @observable currentUser = null;
  @observable error = null;
  @observable count = 0;

  @action
  async loadUsers () {
    try {
      const response = await client.get("/api/user");
      this.rows = response.data;
    } catch (e) {
      console.log(e)
    }
  }

  @action
  async loadUsersCount () {
    try {
      const response = await client.get("/api/user/count");
      this.count = response.data.count;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }

  @action
  async getUserInfo (id) {
    try {
      const response = await client.get(`/api/user/${id}`);
      this.currentUser = response.data;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }

  @action
  async deleteUser () {
    try {
      await client.delete(`/api/user/${this.currentUser._id}`);
      this.currentUser = null;
      await this.loadUsers();
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }

  @action
  async addUser (user) {
    if (!user.username || !user.fullName || !user.password) {
      throw new Error('All fields are required!')
    }

    try {
      this.error = null;
      await client.post(`/api/user`, user);
      await this.loadUsers();
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }

  @action
  resetUserInfo () {
    this.currentUser = null;
  }
}


export default UsersStore;