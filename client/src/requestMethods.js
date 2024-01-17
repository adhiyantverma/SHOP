import axios from "axios";

const BASE_URL = "http://localhost:3000/api/"
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0Zjc0MTQxOGI5MTg2YjA2MGYyNzY5YyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY5NzQ1OTUwNiwiZXhwIjoxNjk3NzE4NzA2fQ.0-vkUv2YCeQ6TD-91GcMJmEZeAknArLeGHVuQIpng1A";


export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    header: {token:`Bearer ${TOKEN}`},  // this is suppose to be jwt but we are using manual TOKEN fow now
});