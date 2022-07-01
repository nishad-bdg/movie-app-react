// Libraries
import axios from 'axios'

// Store
// import store from 'Store'

// Config
import config from '../config/axios.config'

const axiosInstance = axios.create(config)

export default axiosInstance
