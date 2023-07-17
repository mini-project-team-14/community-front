// axios 요청이 들어가는 모든 모듈
import axios from "axios";

// 조회
const getLinks = async () => {
    const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/links`);
    return response.data;
}

export { getLinks };