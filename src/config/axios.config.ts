import { backendUrl } from "../constants"

const config = {
  baseURL: backendUrl,
  // `headers` are custom headers to be sent
  headers: {
    // 'X-Requested-With': 'XMLHttpRequest'
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

export default config
