import React, { useState } from 'react'
import '../styles/Editor.css'
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid"
import { addPost } from '../api/posts';

function Editor() {
    const queryClient = useQueryClient();
    const mutation = useMutation(addPost, {
        onSuccess: () => {
            queryClient.invalidateQueries("posts");
        }
    })
    const navigate = useNavigate();

    // 컴포넌트 내부에서 사용할 state 2개(제목, 내용) 정의
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    // 에러 메시지 발생 함수
    const getErrorMsg = (errorCode, params) => {
        switch (errorCode) {
            case "01":
                return alert(
                    `[필수 입력 값 검증 실패 안내]\n\n제목과 내용은 모두 입력돼야 합니다.\n입력값을 확인해주세요.`
                );
            default:
                return `시스템 내부 오류가 발생하였습니다. 고객센터로 연락주세요.`;
        }
    };

    // 입력값을 감지하는 함수
    const onChangeHandler = (event) => {
        if (event.target.name === "title") {
            setTitle(event.target.value)
        } else {
            setContent(event.target.value)
        }
    };

    // form 태그 내부에서의 submit이 실행된 경우 호출되는 함수
    const handleSubmitButtonClick = (event) => {
        // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역함
        // event.preventDefault();

        // 아이디, 비밀번호, 이름이 모두 존재해야만 정상처리(하나라도 없는 경우 오류 발생)
        // "01" : 필수 입력값 검증 실패 안내
        if (!title || !content) {
            return getErrorMsg("01", { title, content });
        }

        // 추가하려는 user를 newUser라는 객체로 새로 만듦
        const newPost = {
            id: uuidv4(),
            title,
            content,
            username: "asdf",
            createdAt:"",
            modifiedAt:"",
            comments:[],
            countLikes:[]
        };

        // mutate
        mutation.mutate(newPost);
        // state 초기화
        setTitle("");
        setContent("");
        alert("작성 성공");
        navigate("/board");
    };

    return (
        <div className="main-section">
            <div className="editor-section">
                <div className="input-section">
                    <div className="title-section">
                        <label>제목</label>
                        <input type="text" name="title" value={title} onChange={onChangeHandler} />
                    </div>
                    <div className="content-section">
                        <label>내용</label>
                        <textarea type="text" name="content" value={content} onChange={onChangeHandler} />
                    </div>
                </div>
                <div className="button-section">
                    <button className="button1" onClick={handleSubmitButtonClick}>작성</button>
                    {/* <button className="button2">삭제</button> */}
                </div>
            </div>
        </div>
    )
}

export default Editor