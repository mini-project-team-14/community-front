import React, { useState } from 'react'
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as C from '../../styles/CommonStyle';
import * as E from '../../styles/EditorStyle';
import * as D from '../../styles/DetailStyle';
import { addComment, getComments } from '../../api/comments';
import { getPosts } from '../../api/posts';

function EditorForm({ username = "asdf" }) {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const mutation = useMutation(addComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("comments");
        }
    })
    
    const result = useQueries([
        {
            queryKey: ["posts"],
            queryFn: getPosts
        },
        {
            queryKey: ["comments"],
            queryFn: getComments
        },
    ])

    // 컴포넌트 내부에서 사용할 state 1개 (내용) 정의
    const [comment, setComment] = useState("");
    const { isLoading, isError, data } = useQuery("comments", getComments);

    if (isLoading) {
        return <h1>로딩중</h1>
    }
    if (isError) {
        return <h1>오류발생</h1>
    }

    // 에러 메시지 발생 함수
    const getErrorMsg = (errorCode, params) => {
        switch (errorCode) {
            case "01":
                return alert(
                    `[필수 입력 값 검증 실패 안내]\n댓글 내용을 입력해주세요.`
                );
            default:
                return `시스템 내부 오류가 발생하였습니다. 고객센터로 연락주세요.`;
        }
    };

    // 입력값을 감지하는 함수
    const ChangeCommentHandler = (event) => {
        setComment(event.target.value)
    };

    // form 태그 내부에서의 submit이 실행된 경우 호출되는 함수
    const handleSubmitButtonClick = (event) => {
        // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역함
        event.preventDefault();

        // 아이디, 비밀번호, 이름이 모두 존재해야만 정상처리(하나라도 없는 경우 오류 발생)
        // "01" : 필수 입력값 검증 실패 안내
        if (!comment) {
            return getErrorMsg("01", { comment });
        }

        // 추가하려는 user를 newUser라는 객체로 새로 만듦
        const newComment = {
            comment,
            username: "김OO",
            createdAt: "2023-07-17"
        };

        // mutate
        mutation.mutate(newComment);
        // state 초기화
        setComment("");
        alert("작성 성공");
    };

    return (
        <C.StMainSection>
            {
                result[0].data.filter((item) => {
                    return item.id === id;
                }).map((item) => {
                    return (
                        <D.StDetailContentSection key={item.id}>
                            <D.StDetail>
                                <D.StDetailTitleItemArea>
                                    <D.StDetailTitleItemTop>
                                        {item.title}
                                    </D.StDetailTitleItemTop>
                                    <D.StDetailTitleItemBottom>
                                        {item.username}　[{item.createdAt}]
                                    </D.StDetailTitleItemBottom>
                                </D.StDetailTitleItemArea>
                                <D.StDetailTitleButtonArea>
                                    <C.StButton width={"70px"}>
                                        수정
                                    </C.StButton>
                                    <C.StButton width={"70px"} color={"black"}>
                                        삭제
                                    </C.StButton>
                                </D.StDetailTitleButtonArea>
                            </D.StDetail>
                            <D.StDetail height={"300px"}>
                                {item.content}
                            </D.StDetail>
                        </D.StDetailContentSection>
                    )
                })
            }
            <D.StDetailCommentSection>
                댓글 {data.length}
                <D.StCommentList>
                    <D.StCommentListItem>
                        <D.StCommentListItemBlock width={"70px"} min={"70px"}>
                            작성자
                        </D.StCommentListItemBlock>
                        <D.StCommentListItemBlock width={"90%"} align="left">
                            내용
                        </D.StCommentListItemBlock>
                        <D.StCommentListItemBlock width={"100px"} min={"100px"}>
                            작성일자
                        </D.StCommentListItemBlock>
                    </D.StCommentListItem>
                    {
                        data.map((item) => {
                            return (
                                <D.StCommentListItem key={item.id} border={"#d4d4d4"}>
                                    <D.StCommentListItemBlock width={"70px"} min={"70px"}>
                                        {item.username}
                                    </D.StCommentListItemBlock>
                                    <D.StCommentListItemBlock width={"90%"} align="left">
                                        {item.comment}
                                    </D.StCommentListItemBlock>
                                    <D.StCommentListItemBlock width={"100px"} min={"100px"}>
                                        {item.createdAt}
                                    </D.StCommentListItemBlock>
                                </D.StCommentListItem>
                            )
                        })
                    }
                </D.StCommentList>
                <D.StCommentForm>
                    <C.StEditorInput width={"100%"} height={"40px"} size={"1.125rem"} type="text" name="comment" value={comment} onChange={ChangeCommentHandler} placeholder="댓글 내용" />
                    <C.StButton width={"70px"} height={"40px"} size={"1.125rem"} onClick={handleSubmitButtonClick}>작성</C.StButton>
                </D.StCommentForm>
            </D.StDetailCommentSection>
        </C.StMainSection>
    )
}

export default EditorForm