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

// 수정
const updatePost = async (id, updatePost) => {
    await axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`, updatePost)
}

// 삭제
const deletePost = async (id) => {
    await axios.delete(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`);
}

// // 댓글 추가
// const addComment = async (id, newComment) => {
//     await axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`, newComment);
//     console.log(id, newComment);
// }

export { getPosts, addPost, updatePost, deletePost };