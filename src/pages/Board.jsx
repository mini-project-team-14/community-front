import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getPosts } from '../api/posts';
import { useQuery } from 'react-query';

const category = [
    {
        boardId: 1,
        name: "free"
    },
    {
        boardId: 2,
        name: "spring"
    },
    {
        boardId: 3,
        name: "react"
    },
    {
        boardId: 4,
        name: "team"
    }
]

function Board() {
    const navigate = useNavigate();
    const { name } = useParams();
    const { isLoading, isError, data } = useQuery("posts", getPosts);
    const [boardId, setBoardId] = useState();

    useEffect(() => {
        if (name) {
            const temp = category.filter((board) => {
                return board.name === name;
            });
            setBoardId(temp[0].boardId || 1);
        } else {
            // alert("잘못된 경로로 접근했습니다.");
            setBoardId(1);
            navigate("/board/free");
        }
    }, [name]);

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
                    {data.filter((item) => {
                        return item.boardId === boardId;
                    }).map((item) => {
                        return (
                            <li key={item.id}>
                                제목: {item.title}, 작성자: {item.username}, 작성시간: {item.createdAt}, 댓글수: {item.comments.length}, 좋아요수: {item.countLikes.length}
                                <button onClick={() => navigate(`/board/${name}/detail/${item.id}`)}>상세</button>
                            </li>
                        )
                    })}
                </ul>
                <button onClick={() => navigate("./editor")}>작성</button>
            </div>
        </>
    )
}

export default Board