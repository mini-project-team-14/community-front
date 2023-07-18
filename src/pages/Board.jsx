import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { getPosts } from "../api/posts";
import { useQuery } from "react-query";
import Header from "../components/common/Header";
import StyledLink from "../styles/LinkStyle";

function Board() {
  const navigate = useNavigate();
  const handleRowClick = (itemId) => {
    navigate(`/detail/${itemId}`);
  };
  const { isLoading, isError, data } = useQuery("posts", getPosts);
  if (isLoading) {
    return <h1>로딩중</h1>;
  }
  if (isError) {
    return <h1>오류발생</h1>;
  }
  return (
    <>
      <div className="board-container">
        <table className="table">
          <tr>
            <th>제목</th>
            <th>글쓴이</th>
            <th>작성시간</th>
            <th>댓글</th>
            <th>좋아요</th>
          </tr>
          {data.map((item) => {
            return (
              <tr onClick={() => handleRowClick(item.id)} key={item.id}>
                <td>{item.title}</td>
                <td>{item.username}</td>
                <td>{item.createdAt}</td>
                <td>{item.comments.length}</td>
                <td>{item.countLikes.length}</td>
              </tr>
            );
          })}
        </table>
        <button onClick={() => navigate("/editor")}>작성</button>
      </div>
    </>
  );
}

export default Board;
