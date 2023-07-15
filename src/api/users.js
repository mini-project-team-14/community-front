// axios 요청이 들어가는 모든 모듈
import axios from "axios";

// 조회
const getUsers = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/users`);
    return response.data;
}

// 추가
const addUser = async (newUser) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/users`, newUser);
}

export { getUsers, addUser };