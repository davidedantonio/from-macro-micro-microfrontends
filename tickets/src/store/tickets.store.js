import { observable, action } from "mobx";
import axios from "axios";

const { APP_API } = process.env;
const client = axios.create({
  baseURL: APP_API,
  headers: { Authorization: `Bearer ${localStorage.getItem("@mf-tickets/token")}` }
})

class TicketsStore {
  @observable rows = [];
  @observable currentTicket = null;
  @observable opened = false;

  @action
  openModal () {
    this.opened = true;
  }

  @action
  closeModal () {
    this.opened = false;
  }

  @action
  async loadTickets () {
    try {
      const response = await client.get("/api/ticket");
      this.rows = response.data;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }

  @action
  async addTicket (ticket) {
    if (!ticket.subject || !ticket.body) {
      this.error = 'All fields are required!'
      return;
    }

    Object.assign(ticket, {
      creation_date: new Date()
    })

    try {
      await client.post(`/api/ticket`, ticket);
      await this.loadTickets();
      this.closeModal();
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }

  @action
  async getTicketInfo (id) {
    try {
      const response = await client.get(`/api/ticket/${id}`);
      this.currentTicket = response.data;
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }

  @action
  async resetTicketInfo () {
    this.currentTicket = null;
  }

  @action
  async deleteTicket () {
    try {
      await client.delete(`/api/ticket/${this.currentTicket._id}`);
      this.currentTicket = null;
      await this.loadTickets();
    } catch (e) {
      throw new Error(e.response.data.message);
    }
  }
}

export default TicketsStore;