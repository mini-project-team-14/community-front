import React from 'react'
import Logo from '../assets/images/logo500.png'
import RtanWelcome from '../assets/images/rtan-welcome.png'
import '../styles/login.css'

function Login() {
    return (
        <div className="wrapper">
            <div className="contentWrapper">
                <div className="logo-section">
                    <img alt="logo" src={Logo} style={{ width: "250px" }} />
                </div>
                <div className="image-section">
                    <img alt="rtanWelcome" src={RtanWelcome} />
                </div>
                <p>
                    이노캠 커뮤니티에
                    <br />
                    오신 것을 환영합니다 😎
                </p>
                <div className="login-section">
                    <div className="username-form">
                        <div className="username-label">
                            <label>아이디</label>
                        </div>
                        <div className="username-input">
                            <input className="input" type="text" placeholder="아이디를 입력해주세요."></input>
                        </div>
                    </div>
                    <div className="password-form">
                        <div className="password-label">
                            <label>비밀번호</label>
                        </div>
                        <div>
                            <input className="input" type="password" placeholder="비밀번호를 입력해주세요."></input>
                        </div>
                    </div>
                    <button onclick="">로그인</button>
                    <a href="/signup">회원가입</a>
                </div>
            </div>
        </div>
    )
}

export default Login