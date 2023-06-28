import type { User } from "@/models/User"
import axios from '@/axios/axios'

export default(
    {
        Login(email:string, password:string) {
            return axios.post<User>('User/Login', {email: email, password:password}, {withCredentials: true})
        },

        Logout() {
            return axios.post('User/Logout', {}, {withCredentials: true})
        },

        GetUser() {
            return axios.get<User>('User/Login', {withCredentials: true})
        }
    }
)