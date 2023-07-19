import * as C from '../../styles/CommonStyle'
import Logo from '../../assets/images/logo500.png'
import RtanWelcome from '../../assets/images/rtan-welcome.png'
import StyledLink from '../../styles/LinkStyle';
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import jwt_decode from "jwt-decode"

function LoginForm() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [cookies, setCookie, removeCookie] = useCookies(['accessToken']);
    // const [setCookie] = useCookies(['login']);
    // const { data } = useQuery("users", getUsers);

    // 입력값을 감지하는 함수
    const onChangeHandler = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value)
        } else {
            setPassword(event.target.value)
        }
    };

    // 에러 메시지 발생 함수
    const getErrorMsg = (errorCode, params) => {
        switch (errorCode) {
            case "01":
                return alert(
                    `[필수 입력 값 검증 실패 안내]\n\n아이디, 비밀번호와 닉네임은 모두 입력돼야 합니다.\n입력값을 확인해주세요.`
                );
            case "02":
                return alert(
                    `[아이디 중복 안내]\n\n입력하신 아이디(${params.username})가 존재하는 아이디입니다.`
                );
            default:
                return `시스템 내부 오류가 발생하였습니다. 고객센터로 연락주세요.`;
        }
    };

    const loginUser = async (body) => {
        await axios.post(`${process.env.REACT_APP_BACK_SERVER_URL}/api/user/login`, body)
            .then(response => {
                // accessToken, refreshToken 방식
                // console.log(response.headers.accesstoken)
                // console.log(response.headers.accesstoken.split(" ")[1]);
                const accessToken = response.headers.accesstoken.split(" ")[1];
                const refreshToken = response.headers.refreshtoken.split(" ")[1];

                // 쿠키에 저장
                setCookie('accessToken', accessToken);
                setCookie('refreshToken', refreshToken);
                
                alert("로그인 성공!");
                navigate(`/board/free`);
            }).catch(error => {
                console.log(error.response);
                alert("로그인 실패!")
            })
    }

    // form 태그 내부에서의 submit이 실행된 경우 호출되는 함수
    const handleSubmitButtonClick = (event) => {
        // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역함
        event.preventDefault();

        let body = {
            username,
            password
        }

        loginUser(body);

        // 아이디, 비밀번호, 이름이 모두 존재해야만 정상처리(하나라도 없는 경우 오류 발생)
        // "01" : 필수 입력값 검증 실패 안내
        if (!username || !password) {
            return getErrorMsg("01", { username, password });
        }

        // state 초기화
        setUsername("");
        setPassword("");
    };

    return (
        <C.StContainer>
            <C.StContentWrapper>
                <C.StContentSection>
                    <img alt="logo" src={Logo} style={{ width: "250px" }} />
                    <img alt="rtanWelcome" src={RtanWelcome} />
                    <C.StP $size={"1.5rem"}>
                        이노캠 커뮤니티에
                        <br />
                        오신 것을 환영합니다 😎
                    </C.StP>
                </C.StContentSection>
                <C.StLoginForm>
                    <C.StInput name="username" type="text" value={username} onChange={onChangeHandler} placeholder="아이디" />
                    <C.StInput name="password" type="password" value={password} onChange={onChangeHandler} placeholder="비밀번호" />
                    <C.StButton onClick={handleSubmitButtonClick} $size={"1.25rem"} $weight={"700"}>로그인</C.StButton>
                    <StyledLink to={`/signup`} $color="#00ADB5">
                        회원가입
                    </StyledLink>
                    <StyledLink to={`/board/free`} $color="#00ADB5">
                        게시판(임시)
                    </StyledLink>
                </C.StLoginForm>
            </C.StContentWrapper>
        </C.StContainer>
    )
}

export default LoginForm;