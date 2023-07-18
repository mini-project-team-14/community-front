import React, { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid"
import { addPost, getPosts, updatePost } from '../../api/posts';
import * as C from '../../styles/CommonStyle';
import * as E from '../../styles/EditorStyle';
import axios from 'axios';

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

function EditorForm() {
    const queryClient = useQueryClient();
    const { name, id } = useParams();
    const navigate = useNavigate();
    const { data } = useQuery("posts", getPosts)
    const mutation = useMutation(addPost, {
        onSuccess: () => {
            queryClient.invalidateQueries("posts");
        }
    })
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

    // console.log(thisData);
    // 컴포넌트 내부에서 사용할 state 2개(제목, 내용) 정의
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (id) {
            let target = data.filter((item) => {
                return item.id === id
            })
            setTitle(target[0].title);
            setContent(target[0].content);
        }
    }, [])

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
        event.preventDefault();

        // 아이디, 비밀번호, 이름이 모두 존재해야만 정상처리(하나라도 없는 경우 오류 발생)
        // "01" : 필수 입력값 검증 실패 안내
        if (!title || !content) {
            return getErrorMsg("01", { title, content });
        }

        // 추가하려는 user를 newUser라는 객체로 새로 만듦
        const newPost = {
            boardId,
            id: uuidv4(),
            title,
            content,
            nickname: "김OO",
            createdAt: "2023-07-17",
            modifiedAt: "",
            comments: [],
            countLikes: []
        };

        // mutate
        mutation.mutate(newPost);
        // state 초기화
        setTitle("");
        setContent("");
        alert("작성 성공");
        navigate(-1);
    };

    const handleUpdateButtonClick = (event) => {
        // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역함
        event.preventDefault();

        // 아이디, 비밀번호, 이름이 모두 존재해야만 정상처리(하나라도 없는 경우 오류 발생)
        // "01" : 필수 입력값 검증 실패 안내
        if (!title || !content) {
            return getErrorMsg("01", { title, content });
        }

        // 수정하려는 내용을 담은 updatePost를 객체로 새로 만듦
        const updatePost = {
            title,
            content
        }
        axios.patch(`${process.env.REACT_APP_SERVER_URL}/posts/${id}`, updatePost)

        // mutate
        // updateMutation.mutate({id});
        // state 초기화
        setTitle("");
        setContent("");
        alert("수정 성공");
        navigate(-1);
    };

    const handleCancelButtonClick = (event) => {
        // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역함
        event.preventDefault();

        // 이전 화면으로 이동
        navigate(-1);
    };

    if (id) {
        return (
            <C.StMainSection>
                <E.StEditorForm>
                    <E.StEditorInputSection>
                        <C.StEditorInput type="text" name="title" value={title} placeholder="제목" onChange={onChangeHandler} />
                        <C.StEditorTextarea type="text" name="content" value={content} placeholder="내용" onChange={onChangeHandler} />
                    </E.StEditorInputSection>
                    <E.StEditorButtonSection>
                        <C.StButton width={"70px"} height={"40px"} size={"1.125rem"} color={"gray"} hovercolor={"black"} onClick={handleCancelButtonClick}>취소</C.StButton>
                        <C.StButton width={"70px"} height={"40px"} size={"1.125rem"} onClick={handleUpdateButtonClick}>수정</C.StButton>
                    </E.StEditorButtonSection>
                </E.StEditorForm>
            </C.StMainSection>
        )
    } else {
        return (
            <C.StMainSection>
                <E.StEditorForm>
                    <E.StEditorInputSection>
                        <C.StEditorInput type="text" name="title" value={title} placeholder="제목" onChange={onChangeHandler} />
                        <C.StEditorTextarea type="text" name="content" value={content} placeholder="내용" onChange={onChangeHandler} />
                    </E.StEditorInputSection>
                    <E.StEditorButtonSection>
                        <C.StButton width={"70px"} height={"40px"} size={"1.125rem"} color={"gray"} hovercolor={"black"} onClick={handleCancelButtonClick}>취소</C.StButton>
                        <C.StButton width={"70px"} height={"40px"} size={"1.125rem"} onClick={handleSubmitButtonClick}>작성</C.StButton>
                    </E.StEditorButtonSection>
                </E.StEditorForm>
            </C.StMainSection>
        )
    }
}

export default EditorForm