// axios 요청이 들어가는 모든 모듈
import axios from "axios";

// 조회
const getComments = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments`);
    return response.data;
}

// 추가
const addComment = async (newComment) => {
    await axios.post(`${process.env.REACT_APP_SERVER_URL}/comments`, newComment);
}

export { getComments, addComment };