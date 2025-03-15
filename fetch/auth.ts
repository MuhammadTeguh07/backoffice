import axios from "axios";

require('dotenv').config();

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL
// export const REGISTER = `${BASE_URL}user/insert`

export function authLogin(email: string, password: string) {
    return axios.post(`${BASE_URL}/api/auth/login`,
        {
            email: email,
            password: password,
        },
    );
}

export function authRegister(name: string, email: string, password: string) {
    return axios.post(`${BASE_URL}/api/user/insert`,
        {
            name: name,
            email: email,
            password: password,
        },
    );
}

export function verifyToken(token: string) {
    return axios.get(`${BASE_URL}/api/auth/verifyToken`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
}