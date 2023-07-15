// axios 요청이 들어가는 모든 모듈
import axios from "axios";

// 조회
const getPosts = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/posts`);
    return response.data;
}

// 추가
const addPost = async (newPost) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/posts`, newPost);
}

export { getPosts, addPost };