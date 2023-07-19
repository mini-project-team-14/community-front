import React, { useEffect, useState } from 'react'
import Thumbup from '../../assets/images/icon/thumbup.png'
import Delete from '../../assets/images/icon/delete.png'
import Edit from '../../assets/images/icon/edit.png'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import * as C from '../../styles/CommonStyle';
import * as D from '../../styles/DetailStyle';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import { useCategoryContext } from '../../assets/context/CategoryContext';

function DetailLayout() {
    const [cookies, ,] = useCookies(['login']);
    const { path, id } = useParams();
    const category = useCategoryContext();
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [clicked, setClicked] = useState(false);
    const [commentToggle, setCommentToggle] = useState(false);
    const [boardId, setBoardId] = useState(null);
    const [comment, setComment] = useState("");
    const { aud } = jwt_decode(cookies.accessToken);
    // const { aud } = jwt_decode(cookies.login);

    useEffect(() => {
        setBoardId(category.find(category => category.path === path).boardId);
    }, [path]);
    // console.log("detail", boardId);

    const { data, isLoading, isError } = useQuery(["posts", boardId],
        async () => {
            // console.log("detail", boardId);
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${cookies.accessToken}`,
                        RefreshToken: `Bearer ${cookies.refreshToken}`
                    }
                }
            )
            // console.log(response)
            // console.log(response.data.likesList.includes(aud))
            setClicked(response.data.likesList.includes(aud))
            return response.data;
        },
        {
            initialData: () => {
                return queryClient.getQueryData(["posts", id]);
            }
        }
    );

    // 삭제
    const deletePost = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                    RefreshToken: `Bearer ${cookies.refreshToken}`
                }
            }
        );
    }

    const deleteMutation = useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(["boards"]);
        }
    })

    // 좋아요
    const likePost = async () => {
        await axios.post(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}/like`, null,
            {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                    RefreshToken: `Bearer ${cookies.refreshToken}`
                }
            }
        )
    }

    const toggleMutation = useMutation(likePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    })

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

    // handleCommentSubmit // form 태그 내부에서의 submit이 실행된 경우 호출되는 함수
    const handleSubmitButtonClick = (event) => {
        // submit의 고유 기능인, 새로고침(refresh)을 막아주는 역할
        event.preventDefault();

        // 댓글이 존재해야만 정상처리
        // "01" : 필수 입력값 검증 실패 안내
        if (!comment) {
            return getErrorMsg("01", { comment });
        }

        const newComment = {
            comment
        }

        axios.post(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}/comments`, newComment,
            {
                headers: {
                    Authorization: `Bearer ${cookies.accessToken}`,
                    RefreshToken: `Bearer ${cookies.refreshToken}`
                }
            }
        )
        setComment("");
        alert("작성 성공");
    }

    const handleUpdateButtonClick = () => {
        navigate(`/board/${path}/editor/${id}`);
    };

    const handleDeleteButtonClick = () => {
        deleteMutation.mutate(id);
        alert("삭제 완료");
        navigate(-1);
    };

    const handleToggleButtonClick = () => {
        setClicked(!clicked);

        toggleMutation.mutate();

        return clicked
    }

    const handleCommentToggleButtonClick = () => {
        setCommentToggle(!commentToggle);
    }

    if (isLoading) {
        return <C.StSpan $size={"2rem"} $weight={"700"} $left={"20px"}>로딩중</C.StSpan>; // or you can render a loading spinner
    }

    if (isError) {
        return <C.StSpan $size={"2rem"} $weight={"700"} $color={"red"} $left={"20px"} >오류 발생</C.StSpan>; // or you can render an error message
    }

    return (
        <C.StMainSection>
            <D.StDetailContentSection>
                <D.StDetail $bottom={"5px"}>
                    <D.StDetailTitleItemArea>
                        <D.StDetailTitleItemTop>
                            {data.title}
                        </D.StDetailTitleItemTop>
                        <D.StDetailTitleItemBottom>
                            <D.StCommentListSide>
                                <C.StSpan>
                                    {data.nickname}
                                </C.StSpan>
                                <C.StSpan $color={"gray"} $size={"0.875rem"} $weight={"400"}>
                                    {data.createdAt}
                                </C.StSpan>
                            </D.StCommentListSide>
                            <D.StCommentListSide>
                                <C.StSpan $color={"#00ADB5"}>
                                    댓글 {data.comments?.length}
                                </C.StSpan>
                                <C.StSpan $color={"red"}>
                                    좋아요 {data.likesList?.length}
                                </C.StSpan>
                            </D.StCommentListSide>
                        </D.StDetailTitleItemBottom>
                    </D.StDetailTitleItemArea>
                </D.StDetail>
                <D.StDetail height={"300px"}>
                    {data.content}
                </D.StDetail>
                <D.StDetailButtonArea>
                    <D.StDetailButtonAreaChild>
                        <C.StButton $width={"50px"} $height={"30px"} $color={"gray"} onClick={() => navigate(-1)} $hover={"black"}>
                            목록
                        </C.StButton>
                    </D.StDetailButtonAreaChild>
                    <D.StDetailButtonAreaChild>
                        <C.StButton $width={"50px"} $height={"30px"} onClick={handleUpdateButtonClick}>
                            수정
                        </C.StButton>
                        <C.StButton $width={"50px"} $height={"30px"} $color={"gray"} $hover={"black"} onClick={handleDeleteButtonClick}>
                            삭제
                        </C.StButton>
                    </D.StDetailButtonAreaChild>
                </D.StDetailButtonArea>
            </D.StDetailContentSection>
            <D.StFavorite>
                <D.FavoriteBtn onClick={handleToggleButtonClick}>
                    <D.Favorite $clicked={clicked} />
                </D.FavoriteBtn>
                {data.likesList?.length}
            </D.StFavorite>
            <D.StDetailCommentSection>
                <C.StSpan $weight={"500"}>
                    댓글 {data.comments.length}
                </C.StSpan>
                <D.StCommentList>
                    {data.comments?.length === 0 ? (
                        <div>작성된 댓글이 없습니다.</div>
                    ) : (
                        data.comments?.map((comment) => {
                            const isCurrentUser = aud === comment.nickname;
                            return (
                                <D.StCommentListItem key={comment.commentId} $border={"#d4d4d4"}>
                                    <D.StCommentListItemBlock $width={"100%"} $min={"70px"} $weight={"700"}>
                                        <D.StCommentListSide>
                                            <C.StSpan $color={"#00ADB5"} $weight={"500"}>
                                                {comment.nickname}
                                            </C.StSpan>
                                            <C.StSpan $color={"gray"} $size={"0.875rem"}>
                                                {comment.createdAt}
                                            </C.StSpan>
                                            {isCurrentUser && (
                                                <>
                                                    <img alt="edit" src={Edit} onClick={() => handleCommentToggleButtonClick(comment.commentId)} style={{ height: "1.25rem" }} />
                                                    <img alt="delete" src={Delete} style={{ height: "1.25rem" }} />
                                                </>
                                            )}
                                        </D.StCommentListSide>
                                        <D.StCommentListSide>
                                            <img alt="thumbup" src={Thumbup} style={{ height: "1.25rem" }} />
                                            <C.StSpan $color={"gray"} $size={"0.875rem"}>
                                                0
                                            </C.StSpan>
                                        </D.StCommentListSide>
                                    </D.StCommentListItemBlock>
                                    <D.StCommentListItemBlock $width={"100%"} $align={"left"} $weight={"400"}>
                                        <C.StSpan>
                                            {comment.comment}
                                        </C.StSpan>
                                    </D.StCommentListItemBlock>
                                </D.StCommentListItem>
                            )
                        })
                    )}
                </D.StCommentList>
                <D.StCommentForm>
                    <C.StEditorInput $width={"100%"} $height={"40px"} $size={"1.125rem"} $weight={"500"} type="text" name="comment" value={comment} onChange={ChangeCommentHandler} placeholder="댓글 내용" />
                    {
                        commentToggle && (
                            <C.StButton $width={"70px"} $height={"40px"} $size={"1.125rem"} onClick={(event) => handleSubmitButtonClick(event)}>작성</C.StButton>
                        ) || (
                            <C.StButton $width={"70px"} $height={"40px"} $size={"1.125rem"} onClick={(event) => handleSubmitButtonClick(event)}>수정</C.StButton>
                        )
                    }
                </D.StCommentForm>
            </D.StDetailCommentSection>
        </C.StMainSection >
    )
}

export default DetailLayout