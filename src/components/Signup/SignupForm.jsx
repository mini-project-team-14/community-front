import Logo from '../../assets/images/logo500.png'
import RtanHi from '../../assets/images/rtan-hi.png'
import { useMutation, useQueryClient } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import * as C from '../../styles/CommonStyle'
import * as S from '../../styles/SignupStyle'
import StyledLink from '../../styles/LinkStyle'
import axios from 'axios'

function SignupForm() {
    const queryClient = useQueryClient();
    const [check, setCheck] = useState(false); // 중복확인
    const [username, setUsername] = useState(""); // 아이디
    const [password, setPassword] = useState(""); // 비밀번호
    const [nickname, setNickname] = useState(""); // 이름

    const getErrorMsg = (errorCode, params) => {
        switch (errorCode) {
            case "01":
                return alert(
                    `[필수 입력 값 검증 실패 안내]\n아이디, 비밀번호와 닉네임은 모두 입력돼야 합니다.\n입력값을 확인해주세요.`
                );
            case "02":
                return alert(
                    `[아이디 중복 안내]\n입력하신 아이디\n"${params.username}" 은/는\n이미 사용중인 아이디입니다.`
                );
            case "03":
                return alert(
                    `[아이디 검증 안내]\n아이디 중복 확인을 먼저하세요.`
                );
            case "04":
                return alert(
                    `[필수 입력 값 검증 실패 안내]\n아이디를 입력해주세요.`
                );
            case "05":
                return alert(
                    `[아이디 검증 안내]\n아이디는 영어 소문자와 숫자만 사용가능 합니다.\n아이디는 2~15글자 사이여야 합니다.`
                )
            case "06":
                return alert(
                    `[아이디 검증 안내]\n아이디는 영어 소문자와 숫자만 사용가능 합니다.`
                )
            case "07":
                return alert(
                    `[아이디 검증 안내]\n아이디는 2~15글자 사이여야 합니다.`
                )
            case "08":
                return alert(
                    `[비밀번호 검증 안내]\n비밀번호는 4글자 이상이어야 합니다.`
                )
            case "09":
                return alert(
                    `[이름 검증 안내]\n이름은 한글과 영어만 사용가능 합니다.`
                )
            case "10":
                return alert(
                    `[이름 검증 안내]\n이름은 2~15글자 사이여야 합니다.`
                )
            case "11":
                return alert(
                    `[비밀번호 검증 안내]\n비밀번호는 4글자 이상이어야 합니다.\n[이름 검증 안내]\n이름은 한글과 영어만 사용가능 합니다.\n이름은 2~15글자 사이여야 합니다.`
                )
            case "12":
                return alert(
                    `[비밀번호 검증 안내]\n비밀번호는 4글자 이상이어야 합니다.\n[이름 검증 안내]\n이름은 한글과 영어만 사용가능 합니다.`
                )
            case "13":
                return alert(
                    `[비밀번호 검증 안내]\n비밀번호는 4글자 이상이어야 합니다.\n[이름 검증 안내]\n이름은 2~15글자 사이여야 합니다.`
                )
            case "14":
                return alert(
                    `[이름 검증 안내]\n이름은 한글과 영어만 사용가능 합니다.\n이름은 2~15글자 사이여야 합니다.`
                )
            default:
                return `시스템 내부 오류가 발생하였습니다.`;
        }
    };

    const checkId = async (username) => {
        await axios.post(`${process.env.REACT_APP_BACK_SERVER_URL}/api/user/signup/check`, { username })
            .then(() => {
                alert("사용가능한 아이디입니다!")
                setCheck(true); // 사용가능한 아이디면 아이디 중복확인 체크 완료
            }).catch((error) => {
                const msg = error.response.data.message.split(" ");
                if (msg.length === 2) {
                    if (msg.includes("username_rule", "username_length")) {
                        getErrorMsg("05");
                    }
                } else {
                    if (msg.includes("username_rule")) {
                        getErrorMsg("06");
                    } else if (msg.includes("username_length")) {
                        getErrorMsg("07");
                    } else {
                        getErrorMsg("02", { username });
                    };
                }
                setCheck(false); // 사용불가능한 아이디면 아이디 중복확인 다시 해야됨
            });
    }

    const handleCheckButtonClick = (event) => {
        event.preventDefault();
        if (!username) {
            return getErrorMsg("04");
        }
        checkId(username);
    }

    const addUser = async (newUser) => {
        await axios.post(`${process.env.REACT_APP_BACK_SERVER_URL}/api/user/signup`, newUser)
            .then(() => {
                alert("회원가입 성공!")
                navigate("/");
            }).catch((error) => {
                const msg = error.response.data.message.split(" ");
                if (msg.length === 3) {
                    getErrorMsg("11")
                } else if (msg.length === 2) {
                    if (msg.includes("password_length", "nickname_rule")) {
                        getErrorMsg("12")
                    } else if (msg.includes("password_length", "nickname_length")) {
                        getErrorMsg("13")
                    } else {
                        getErrorMsg("14")
                    }
                } else {
                    if (msg.includes("password_length")) {
                        getErrorMsg("08");
                    } else if (msg.includes("nickname_rule")) {
                        getErrorMsg("09");
                    } else {
                        getErrorMsg("10");
                    };
                }
            });
    }

    const mutation = useMutation(addUser, {
        onSuccess: () => {
            queryClient.invalidateQueries("users");
        }
    })

    const navigate = useNavigate();

    // 입력값을 감지하는 함수
    const onChangeHandler = (event) => {
        if (event.target.name === "username") {
            setUsername(event.target.value);
            setCheck(false); // 아이디가 바뀔때마다 중복확인 새로해야함
        } else if (event.target.name === "password") {
            setPassword(event.target.value)
        } else {
            setNickname(event.target.value)
        }
    };

    const handleSubmitButtonClick = (event) => {
        event.preventDefault();
        // 아이디, 비밀번호, 이름이 모두 존재해야만 정상처리(하나라도 없는 경우 오류 발생)
        // "01" : 필수 입력값 검증 실패 안내
        if (!username || !password || !nickname) {
            return getErrorMsg("01", { username, password });
        }

        if (check === false) {
            return getErrorMsg("03"); // 아이디 중복확인 안하면 중복확인 메세지 출력
        }

        const newUser = {
            username,
            password,
            nickname
        };

        mutation.mutate(newUser);
    };

    return (
        <C.StContainer>
            <C.StContentWrapper>
                <C.StContentSection>
                    <img alt="logo" src={Logo} style={{ width: "250px" }} />
                    <img alt="rtanHi" src={RtanHi} style={{ height: "126px" }} />
                    <S.StContentText>
                        <C.StP $size={"1.5rem"}>반갑습니다!</C.StP>
                        <C.StP $size={"1.25rem"}>완주까지 함께하는 이노캠</C.StP>
                    </S.StContentText>
                </C.StContentSection>
                <C.StLoginForm>
                    <S.StUsernameForm>
                        <C.StInput
                            name="username"
                            type="text"
                            placeholder="아이디"
                            value={username}
                            onChange={onChangeHandler}
                        />
                        <C.StButton $width={"40%"} $size={"1rem"} onClick={handleCheckButtonClick}>중복확인</C.StButton>
                    </S.StUsernameForm>
                    <C.StInput
                        name="password"
                        type="password"
                        placeholder="비밀번호"
                        value={password}
                        onChange={onChangeHandler}
                    />
                    <C.StInput
                        name="nickname"
                        type="text"
                        placeholder="이름"
                        value={nickname}
                        onChange={onChangeHandler}
                    />
                    <C.StButton $size={"1.25rem"} $weight={"700"} onClick={handleSubmitButtonClick}>회원가입</C.StButton>
                    <StyledLink to={`/`} $color="#00ADB5">
                        로그인하기
                    </StyledLink>
                </C.StLoginForm>
            </C.StContentWrapper>
        </C.StContainer>
    )
}

export default SignupForm;