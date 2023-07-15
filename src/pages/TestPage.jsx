import React from 'react'
import { useQuery } from 'react-query'
import { addUser, getUsers } from '../api/users';
import "../styles/Editor.css"

function TestPage() {

    const { isLoading, isError, data } = useQuery("users", getUsers);

    if (isLoading) {
        return <h1>로딩중</h1>
    }

    if (isError) {
        return <h1>오류발생</h1>
    }
    return (
        <div className="main-section">
            {data.map((item) => {
                return (
                    <div key={item.username}>
                        아이디: {item.username}, 비밀번호: {item.password}, 닉네임: {item.nickname}
                    </div>
                )
            })}
        </div>
    )
}

export default TestPage