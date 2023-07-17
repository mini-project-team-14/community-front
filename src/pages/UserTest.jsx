import React from 'react'

function UserTest({ user }) {
    const { username, password, nickname } = user || {};
    return (
        <div>
            아이디 : {username}
            <br />
            비밀번호 : {password}
            <br />
            이름 : {nickname}
        </div>
    )
}

export default UserTest;