import React, { useState } from 'react'
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
    const boardId = category.find(category => category.path === path).boardId;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [heartToggle, setHeartToggle] = useState(false);
    const [commentToggle, setCommentToggle] = useState(false);
    const [thumbUpToggle, setThumbUpToggle] = useState(false);
    const [commentId, setCommentId] = useState();
    const [comment, setComment] = useState("");
    const { aud } = jwt_decode(cookies.accessToken);

    const { data, isLoading, isError } = useQuery(
        ["posts", id],
        async () => {
            const response = await axios.get(
                `${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}`,
                {
                    headers: {
                        AccessToken: `Bearer ${cookies.accessToken}`,
                        RefreshToken: `Bearer ${cookies.refreshToken}`
                    }
                }
            )
            setHeartToggle(response.data.likesList.includes(aud))
            return response.data;
        },
        // {
        //     initialData: () => {
        //         return queryClient.getQueryData(["boards", boardId]);
        //     }
        // }
    );

    // 삭제
    const deletePost = async (id) => {
        await axios.delete(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}`,
            {
                headers: {
                    AccessToken: `Bearer ${cookies.accessToken}`,
                    RefreshToken: `Bearer ${cookies.refreshToken}`
                }
            }
        );
    }

    const deleteMutation = useMutation(deletePost, {
        onSuccess: () => {
            queryClient.invalidateQueries(["boards", boardId]);
        }
    })

    // 좋아요
    const likePost = async () => {
        await axios.post(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}/like`, null,
            {
                headers: {
                    AccessToken: `Bearer ${cookies.accessToken}`,
                    RefreshToken: `Bearer ${cookies.refreshToken}`
                }
            }
        )
    }

    // 댓글 좋아요
    const likeComment = async (commentId) => {
        await axios.post(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}/comments/${commentId}/like`, null,
            {
                headers: {
                    AccessToken: `Bearer ${cookies.accessToken}`,
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

    const toggleCommentMutation = useMutation(likeComment, {
        onSuccess: () => {
            queryClient.invalidateQueries(["posts"]);
        }
    })

    // 에러 메시지 발생 함수
    const getErrorMsg = (errorCode) => {
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

    // 댓글 작성, 수정
    const handleSubmitButtonClick = (event) => {
        event.preventDefault();

        // 댓글이 존재해야만 정상처리
        // "01" : 필수 입력 값 검증 실패 안내
        if (!comment) {
            return getErrorMsg("01");
        }

        const newComment = {
            comment
        }

        if (!commentToggle) {
            axios.post(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}/comments`, newComment,
                {
                    headers: {
                        AccessToken: `Bearer ${cookies.accessToken}`,
                        RefreshToken: `Bearer ${cookies.refreshToken}`
                    }
                }
            )
            alert("댓글 작성 성공");
        } else {
            axios.put(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}/comments/${commentId}`, newComment,
                {
                    headers: {
                        AccessToken: `Bearer ${cookies.accessToken}`,
                        RefreshToken: `Bearer ${cookies.refreshToken}`
                    }
                }
            )
            setCommentToggle(false);
            setCommentId();
            alert("댓글 수정 성공");
        }
        setComment("");
    }

    const handleUpdateButtonClick = () => {
        navigate(`/board/${path}/editor/${id}`);
    };

    const handleDeleteButtonClick = () => {
        if (window.confirm("정말로 게시글을 삭제하시겠습니까?")) {
            deleteMutation.mutate(id);
            alert("삭제 완료");
            navigate(-1);
        }
    };

    // 게시글 좋아요 토글
    const handleToggleButtonClick = () => {
        setHeartToggle(!heartToggle);

        toggleMutation.mutate();

        return heartToggle
    }

    // 댓글 수정 토글
    const handleCommentToggleButtonClick = (commentId) => {
        setCommentToggle(!commentToggle);
        const editComment = data.comments.find(comments => comments.commentId === commentId);
        if (commentToggle) {
            setCommentId();
            setComment("");
        } else {
            setCommentId(editComment.commentId);
            setComment(editComment.comment);
        }
    }

    // 댓글 삭제
    const handleCommentDeleteButtonClick = async (commentId) => {
        if (window.confirm("정말로 댓글을 삭제하시겠습니까?")) {
            await axios.delete(`${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}/posts/${id}/comments/${commentId}`,
                {
                    headers: {
                        AccessToken: `Bearer ${cookies.accessToken}`,
                        RefreshToken: `Bearer ${cookies.refreshToken}`
                    }
                }
            )
            alert("댓글 삭제 완료");
        }
    }

    // 댓글 좋아요
    const handleCommentLikeButtonClick = (commentId) => {
        setThumbUpToggle(!thumbUpToggle);
        toggleCommentMutation.mutate(commentId);

        return thumbUpToggle;
    }

    if (isLoading) {
        return <C.StSpan $size={"2rem"} $weight={"700"} $left={"20px"}>로딩 중..</C.StSpan>; // or you can render a loading spinner
    }
    if (isError) {
        return <C.StSpan $size={"2rem"} $weight={"700"} $left={"20px"} $color={"red"}>오류 발생</C.StSpan>; // or you can render an error message
    }

    return (
        <C.StMainSection>
            <D.StDetailContentSection>
                <D.StDetail>
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
                <D.StDetail $height={"300px"}>
                    {data.content}
                </D.StDetail>
                <D.StDetailButtonArea>
                    <D.StDetailButtonAreaChild>
                        <C.StButton $width={"50px"} $height={"30px"} $color={"gray"} onClick={() => navigate(-1)} $hover={"black"}>
                            목록
                        </C.StButton>
                    </D.StDetailButtonAreaChild>
                    {
                        (aud === data.nickname) && (
                            <D.StDetailButtonAreaChild>
                                <C.StButton $width={"50px"} $height={"30px"} onClick={handleUpdateButtonClick}>
                                    수정
                                </C.StButton>
                                <C.StButton $width={"50px"} $height={"30px"} $color={"gray"} $hover={"black"} onClick={handleDeleteButtonClick}>
                                    삭제
                                </C.StButton>
                            </D.StDetailButtonAreaChild>
                        )
                    }
                </D.StDetailButtonArea>
            </D.StDetailContentSection>
            <D.StFavorite>
                <D.StSvgBtn onClick={handleToggleButtonClick}>
                    <D.Favorite $heartToggle={heartToggle} />
                </D.StSvgBtn>
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
                                                    <D.StSvgBtn>
                                                        <D.StEditSvg alt="edit" $editToggle={comment.commentId === commentId} onClick={() => handleCommentToggleButtonClick(comment.commentId)} style={{ height: "1.25rem" }} />
                                                    </D.StSvgBtn>
                                                    <D.StSvgBtn>
                                                        <D.StDeleteSvg alt="delete" onClick={() => handleCommentDeleteButtonClick(comment.commentId)} style={{ height: "1.25rem" }} />
                                                    </D.StSvgBtn>
                                                </>
                                            )}
                                        </D.StCommentListSide>
                                        <D.StCommentListSide>
                                            <D.StSvgBtn>
                                                <D.StThumbUpSvg alt="thumbup" $thumbUpToggle={comment.likesList.includes(aud)} onClick={() => handleCommentLikeButtonClick(comment.commentId)} style={{ height: "1.25rem" }} />
                                            </D.StSvgBtn>
                                            <C.StSpan $color={(comment.likesList?.length > 0) ? "blue" : "gray"} $size={"1rem"} $weight={"500"} $trans={true}>
                                                {comment.likesList?.length}
                                            </C.StSpan>
                                        </D.StCommentListSide>
                                    </D.StCommentListItemBlock>
                                    <D.StCommentListItemBlock $width={"100%"} $align={"left"} $weight={"400"}>
                                        <C.StSpan>
                                            {comment.comment}
                                        </C.StSpan>
                                    </D.StCommentListItemBlock>
                                </D.StCommentListItem >
                            )
                        })
                    )}
                </D.StCommentList >
                <D.StCommentForm>
                    {
                        !commentToggle && (
                            <>
                                <C.StEditorInput $width={"100%"} $height={"40px"} $size={"1.125rem"} $weight={"500"} type="text" name="comment" value={comment} onChange={ChangeCommentHandler} placeholder="댓글 내용" />
                                <C.StButton $width={"70px"} $height={"40px"} $size={"1.125rem"} onClick={(event) => handleSubmitButtonClick(event)}>작성</C.StButton>
                            </>
                        ) || (
                            <>
                                <C.StEditorInput $width={"100%"} $height={"40px"} $size={"1.125rem"} $weight={"500"} type="text" name="comment" value={comment} onChange={ChangeCommentHandler} placeholder="댓글 내용" />
                                <C.StButton $width={"70px"} $height={"40px"} $size={"1.125rem"} onClick={(event) => handleSubmitButtonClick(event)}>수정</C.StButton>
                            </>
                        )
                    }
                </D.StCommentForm>
            </D.StDetailCommentSection >
        </C.StMainSection >
    )
}

export default DetailLayout