import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents",
    headers: {
        'Content-Type': 'application/json'
    }
})
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("access_token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})
// axiosClient.interceptors.response.use((response) => response, (error) => {
//     if (error.response.status == 401) {
//         localStorage.removeItem('access_token')
//         //window.location.href = '/';
//     }
//     return Promise.reject(error)
// })
export default axiosClient