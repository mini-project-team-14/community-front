import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getPosts } from '../api/posts';
import { useQuery } from 'react-query';

function Board() {
    const navigate = useNavigate();
    const { isLoading, isError, data } = useQuery("posts", getPosts);
    if (isLoading) {
        return <h1>로딩중</h1>
    }
    if (isError) {
        return <h1>오류발생</h1>
    }
    return (
        <>
            <div className="main-section">
                <ul>
                {data.map((item) => {
                    return (
                        <li key={item.id}>
                            제목: {item.title}, 작성자: {item.username}, 작성시간: {item.createdAt}, 댓글수: {item.comments.length}, 좋아요수: {item.countLikes.length}
                            <button onClick={() => navigate(`/detail/${item.id}`)}>상세</button>
                        </li>
                    )
                })}
                </ul>
                <button onClick={() => navigate("/editor")}>작성</button>
            </div>
        </>
    )
}

export default Board