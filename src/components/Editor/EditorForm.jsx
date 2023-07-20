import React, { useState } from 'react'
import { useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as C from '../../styles/CommonStyle';
import * as E from '../../styles/EditorStyle';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useCategoryContext } from '../../assets/context/CategoryContext';

function EditorForm() {
    const queryClient = useQueryClient();
    const category = useCategoryContext();
    const { path, id } = useParams();
    const boardId = category.find(category => category.path === path).boardId;
    const navigate = useNavigate();
    const [cookies, ,] = useCookies(['login']);
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const isEdit = !!id;

    const { data, isLoading, isError } = useQuery(
        ["posts", id],
        {
            queryFn: async () => {
                const response = await axios.get(
                    `${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}`,
                    {
                        headers: {
                            AccessToken: `Bearer ${cookies.accessToken}`,
                            RefreshToken: `Bearer ${cookies.refreshToken}`
                        }
                    }
                )
                setTitle(response.data.title);
                setContent(response.data.content);
                return response.data;
            },
            enabled: isEdit,
        }
    );

    // 에러 메시지 발생 함수
    const getErrorMsg = (errorCode) => {
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

    const addPost = async (newPost) => {
        try {
            await axios.post(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts`, newPost,
                {
                    // headers: { Authorization: cookies.login }
                    headers: {
                        AccessToken: `Bearer ${cookies.accessToken}`,
                        RefreshToken: `Bearer ${cookies.refreshToken}`
                    }
                }
            );
            alert("작성 성공!");
            navigate(`/board/${path}`);
        } catch (error) {
            console.log(error.response);
            alert("작성 실패!");
        }
    }

    const updatePostData = async (updatePost) => {
        try {
            axios.put(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}`, updatePost,
                {
                    headers: {
                        AccessToken: `Bearer ${cookies.accessToken}`,
                        RefreshToken: `Bearer ${cookies.refreshToken}`
                    }
                }
            )
            alert("수정 성공!");
            queryClient.invalidateQueries(["posts", id]);
            navigate(-1);
        } catch (error) {
            console.log(error.response);
            alert("수정 실패!");
        }
    }

    // form 태그 내부에서의 submit이 실행된 경우 호출되는 함수
    const handleButtonClick = (event) => {
        // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역함
        event.preventDefault();

        // 아이디, 비밀번호, 이름이 모두 존재해야만 정상처리(하나라도 없는 경우 오류 발생)
        // "01" : 필수 입력값 검증 실패 안내
        if (!title || !content) {
            return getErrorMsg("01", { title, content });
        }

        const post = {
            title,
            content
        };

        if (isEdit) {
            updatePostData(post); // 수정 모드일 경우 수정 API 호출
        } else {
            addPost(post); // 작성 모드일 경우 작성 API 호출
        }
    };

    const handleCancelButtonClick = (event) => {
        // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역할
        event.preventDefault();

        // 이전 화면으로 이동
        navigate(-1);
    };

    if (isLoading) {
        return <C.StSpan $size={"2rem"} $weight={"700"} $left={"20px"}>로딩 중..</C.StSpan>
    }
    if (isError) {
        return <C.StSpan $size={"2rem"} $weight={"700"} $left={"20px"} $color={"red"}>오류 발생</C.StSpan>
    }

    return (
        <C.StMainSection>
            <E.StEditorForm>
                <E.StEditorInputSection>
                    <C.StEditorInput type="text" name="title" value={title} placeholder="제목" onChange={onChangeHandler} />
                    <C.StEditorTextarea type="text" name="content" value={content} placeholder="내용" onChange={onChangeHandler} />
                </E.StEditorInputSection>
                <E.StEditorButtonSection>
                    <C.StButton $width={"70px"} $height={"40px"} $size={"1.125rem"} $color={"gray"} $hover={"black"} onClick={handleCancelButtonClick}>취소</C.StButton>
                    <C.StButton $width={"70px"} $height={"40px"} $size={"1.125rem"} onClick={handleButtonClick}>{isEdit ? "수정" : "작성"}</C.StButton>
                </E.StEditorButtonSection>
            </E.StEditorForm>
        </C.StMainSection>
    )
}

export default EditorForm