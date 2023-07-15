import React, { useState } from 'react'
import Logo from '../assets/images/logo500.png'
import RtanHi from '../assets/images/rtan-hi.png'
import '../styles/signup.css'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { addUser, getUsers } from '../api/users'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const queryClient = useQueryClient();
    const mutation = useMutation(addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
            console.log("성공하였습니다.");
        }
    })
    const { data } = useQuery("users", getUsers);
    const navigate = useNavigate();

    // 컴포넌트 내부에서 사용할 state 3개(아이디, 비밀번호, 이름) 정의
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");

    // 에러 메시지 발생 함수
    const getErrorMsg = (errorCode, params) => {
        switch (errorCode) {
            case "01":
                return alert(
                    `[필수 입력 값 검증 실패 안내]\n\n아이디, 비밀번호와 닉네임은 모두 입력돼야 합니다.\n입력값을 확인해주세요.`
                );
            case "02":
                return alert(
                    `[아이디 중복 안내]\n\n입력하신 아이디(${params.username})는 이미 사용중인 아이디입니다.`
                );
            default:
                return `시스템 내부 오류가 발생하였습니다. 고객센터로 연락주세요.`;
        }
    };

    // 입력값을 감지하는 함수
    const onChangeHandler = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value)
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        } else {
            setNickname(event.target.value)
        }
    };

    // form 태그 내부에서의 submit이 실행된 경우 호출되는 함수
    const handleSubmitButtonClick = (event) => {
        // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역함
        // event.preventDefault();

        // 아이디, 비밀번호, 이름이 모두 존재해야만 정상처리(하나라도 없는 경우 오류 발생)
        // "01" : 필수 입력값 검증 실패 안내
        if (!username || !password || !nickname) {
            return getErrorMsg("01", { username, password });
        }

        // 이미 존재하는 아이디면 오류
        const validationArr = data.filter(
            (item) => item.username === username
        );

        // "02" : 아이디 중복 안내
        if (validationArr.length > 0) {
            return getErrorMsg("02", { username });
        }

        // 추가하려는 user를 newUser라는 객체로 새로 만듦
        const newUser = {
            username,
            password,
            nickname
        };

        // mutate
        mutation.mutate(newUser);
        // state 초기화
        setUsername("");
        setPassword("");
        setNickname("");
        alert("가입을 환영합니다");
        navigate("/");
    };

    return (
        <div className="wrapper">
            <div className="contentWrapper">
                <div className="logo-section">
                    <img alt="logo" src={Logo} style={{ width: "250px" }} />
                </div>
                <div className="image-section">
                    <img alt="rtanWelcome" src={RtanHi} style={{ height: "100px" }} />
                </div>
                <div>
                    <p>반갑습니다!</p>
                    <p className="smallp">완주까지 함께하는 이노캠</p>
                </div>
                <div className="signup-section">
                    <div className="username-form">
                        <div className="username-label">
                            <label>아이디</label>
                        </div>
                        <div className="username-input">
                            <input
                                className="input"
                                name="username"
                                type="text"
                                placeholder="아이디를 입력해주세요."
                                value={username}
                                onChange={onChangeHandler}
                            />
                            <button>중복확인</button>
                        </div>
                    </div>
                    <div className="password-form">
                        <div className="password-label">
                            <label>비밀번호</label>
                        </div>
                        <div>
                            <input
                                className="input"
                                name="password"
                                type="password"
                                placeholder="비밀번호를 입력해주세요."
                                value={password}
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>
                    <div className="nickname-form">
                        <div className="nickname-label">
                            <label>이름</label>
                        </div>
                        <div>
                            <input
                                className="input"
                                name="nickname"
                                type="text"
                                placeholder="이름을 입력해주세요."
                                value={nickname}
                                onChange={onChangeHandler}
                            />
                        </div>
                    </div>
                    <button onClick={handleSubmitButtonClick}>회원가입</button>
                </div>
            </div>
        </div>
    )
}

export default Signup