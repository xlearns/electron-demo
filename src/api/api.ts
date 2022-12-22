import axios from './index'

// console.log(import.meta.env.VITE_BASE_URL, 8999)
// export const getArticleList = (params: object) => {
//   return axios.request({ method: 'post', url: '/articleList', data: params  })
// }
export const getlogin = (params: object) => {
  return axios.post( 'http://localhost:3000/login', params)
}
export const getChatList = (params: object) => {
  return axios.get( 'http://localhost:3000/chatList', { params })
}
export const getClassifyIdList = (params: object) => {
  return axios.get( '/artClassifyList', { params })
}
// export const getArticleList = (params: object) => {
//   return axios.post( '/articleList', params)
// }