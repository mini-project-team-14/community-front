import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import "../styles/Editor.css"
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useCategoryContext } from '../assets/context/CategoryContext';
import BoardLayout from '../components/Board/BoardLayout';

function Board() {
    const [cookies, ,] = useCookies(['login']);
    const category = useCategoryContext();
    const { path } = useParams();
    const navigate = useNavigate();
    const [boardId, setBoardId] = useState(null);
    
    // path가 바뀔 때 마다 boardID 변경
    useEffect(() => {
        setBoardId(category.find(category => category.path === path).boardId);
    }, [path]);

    const { data, isLoading, isError } = useQuery(
        {
            queryKey: ["boards", boardId], // "boards"와 boardId가 바뀔 때마다 수행?
            queryFn: (
                async () => {
                    // console.log("board", boardId);
                    const response = await axios.get(
                        `${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}`,
                        {
                            headers: { Authorization: cookies.login }
                        }
                    )
                    // console.log(response);
                    // console.log(response.data);
                    return response.data;
                }
            )
        },
        {
            enabled: !!path
        }
    );

    if (isLoading) {
        return <h1>로딩중</h1>
    }
    if (isError) {
        return <h1>오류발생</h1>
    }

    return (
        <>
            <div className="board-container">
                <table className="table">
                    <tbody>
                        <tr>
                            <th>제목</th>
                            <th>글쓴이</th>
                            <th>작성시간</th>
                            <th>댓글 수</th>
                            <th>좋아요</th>
                        </tr>
                        {
                            data?.length === 0 ? (
                                <tr><td>작성된 글이 없습니다.</td></tr>
                            ) : (
                                data?.map((item) => {
                                    return (
                                        <tr key={item.postId} onClick={() => navigate(`./${item.postId}`)}>
                                            <td>{item.title}</td>
                                            <td>{item.nickname}</td>
                                            <td>{item.createdAt}</td>
                                            <td>{item.comments.length}</td>
                                            <td>{item.likesList.length}</td>
                                        </tr>
                                    );
                                })
                            )
                        }
                    </tbody>
                </table>
                <button onClick={() => navigate("./editor")}>작성</button>
            </div>
            <BoardLayout />
        </>
    )
}

export default Board