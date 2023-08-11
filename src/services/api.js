import axios from 'axios';

export default axios.create({
  baseURL: 'https://api-contacts.pedagogico.cubos.academy',
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
});