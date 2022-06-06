import axios from 'axios'

const auth = axios.create({
  // baseURL: 'http://localhost:3000',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default auth
