import * as C from '../../styles/CommonStyle'
import Logo from '../../assets/images/logo500.png'
import RtanWelcome from '../../assets/images/rtan-welcome.png'
import StyledLink from '../../styles/LinkStyle';

function LoginForm() {
    return (
        <C.StContainer>
            <C.StContentWrapper>
                <C.StContentSection>
                    <img alt="logo" src={Logo} style={{ width: "250px" }} />
                    <img alt="rtanWelcome" src={RtanWelcome} />
                    <C.StP size={"1.5rem"}>
                        이노캠 커뮤니티에
                        <br />
                        오신 것을 환영합니다 😎
                    </C.StP>
                </C.StContentSection>
                <C.StLoginForm>
                    <C.StInput type="text" placeholder="아이디" />
                    <C.StInput type="password" placeholder="비밀번호" />
                    <C.StButton onClick={(event) => {event.preventDefault()}} weight={"700"}>로그인</C.StButton>
                    <StyledLink to={`/signup`} color="#00ADB5">
                        <C.StSignupLink>
                            회원가입
                        </C.StSignupLink>
                    </StyledLink>
                </C.StLoginForm>
            </C.StContentWrapper>
        </C.StContainer>
    )
}

export default LoginForm;