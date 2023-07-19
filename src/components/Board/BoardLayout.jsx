import React, { useEffect, useState } from 'react'
// import { styled } from 'styled-components'
import * as C from '../../styles/CommonStyle'
import * as D from '../../styles/DetailStyle'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import "../../styles/Editor.css"
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useCategoryContext } from '../../assets/context/CategoryContext';

function BoardLayout() {
  const [cookies, ,] = useCookies(['login']);
  const category = useCategoryContext();
  const { path } = useParams();
  const navigate = useNavigate();
  const [boardId, setBoardId] = useState(1);

  // path가 바뀔 때 마다 boardID 변경
  useEffect(() => {
    setBoardId(category.find(category => category.path === path).boardId);
  }, [path, category]);

  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ["boards", boardId], // "boards"와 boardId가 바뀔 때마다 수행?
      queryFn: (
        async () => {
          // console.log("board", boardId);
          const response = await axios.get(
            `${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}`,
            {
              headers: { Authorization: cookies.login }
            }
          )
          // console.log(response);
          // console.log(response.data);
          return response.data;
        }
      )
    },
    {
      enabled: !!path
    }
  );

  if (isLoading) {
    return <h1>로딩중</h1>
  }
  if (isError) {
    return <h1>오류발생</h1>
  }

  return (
    <C.StMainSection>
      
      <D.StDetailContentSection $gap={"10px"}>
      {
        data.length === 0 ? (
          <div>작성된 글이 없습니다.</div>
        ) : (
          data.map((item) => {
            return (
              <D.StDetail key={item.postId} $bottom={"5px"} onClick={() => navigate(`./${item.postId}`)}>
                <D.StDetailTitleItemArea>
                  <D.StDetailTitleItemTop>
                    {item.title}
                  </D.StDetailTitleItemTop>
                  <D.StDetailTitleItemBottom>
                    <D.StCommentListSide>
                      <C.StSpan>
                        {item.nickname}
                      </C.StSpan>
                      <C.StSpan $color={"gray"} $size={"0.875rem"} $weight={"400"}>
                        {item.createdAt}
                      </C.StSpan>
                    </D.StCommentListSide>
                    <D.StCommentListSide>
                      <C.StSpan $color={"#00ADB5"}>
                        댓글 {item.comments?.length}
                      </C.StSpan>
                      <C.StSpan $color={"red"}>
                        좋아요 {item.likesList?.length}
                      </C.StSpan>
                    </D.StCommentListSide>
                  </D.StDetailTitleItemBottom>
                </D.StDetailTitleItemArea>
              </D.StDetail>
            )
          })
        )
      }      
      </D.StDetailContentSection>
    </C.StMainSection>
  )
}

export default BoardLayout


      {/* <StTable>
        <StTHead>
          <StTr>
            <StTh $width="55%">제목</StTh>
            <StTh $width="10%">작성자</StTh>
            <StTh $width="20%">작성시간</StTh>
            <StTh $width="30px">댓글</StTh>
            <StTh $width="30px">좋아요</StTh>
          </StTr>
        </StTHead>
        <StTbody>
          <StTr>
            <StTd $width="55%">아무튼 제목임</StTd>
            <StTd $width="10%">김OO</StTd>
            <StTd $width="20%">2023-07-19 오후 4:21</StTd>
            <StTd $width="30px">1</StTd>
            <StTd $width="30px">0</StTd>
          </StTr>
          <StTr>
            <StTd $width="55%">아무튼 제목임</StTd>
            <StTd $width="10%">김OO</StTd>
            <StTd $width="20%">2023-07-19 오후 4:21</StTd>
            <StTd $width="30px">1</StTd>
            <StTd $width="30px">0</StTd>
          </StTr>
          <StTr>
            <StTd $width="55%">아무튼 제목임</StTd>
            <StTd $width="10%">김OO</StTd>
            <StTd $width="20%">2023-07-19 오후 4:21</StTd>
            <StTd $width="30px">1</StTd>
            <StTd $width="30px">0</StTd>
          </StTr>
        </StTbody>
      </StTable> */}
      {/* <div className="board-container">
        <table className="table">
          <tbody>
            <tr>
              <th>제목</th>
              <th>글쓴이</th>
              <th>작성시간</th>
              <th>댓글 수</th>
              <th>좋아요</th>
            </tr>
            {
              data?.length === 0 ? (
                <tr><td>작성된 글이 없습니다.</td></tr>
              ) : (
                data?.map((item) => {
                  return (
                    <tr key={item.postId} onClick={() => navigate(`./${item.postId}`)}>
                      <td>{item.title}</td>
                      <td>{item.nickname}</td>
                      <td>{item.createdAt}</td>
                      <td>{item.comments.length}</td>
                      <td>{item.likesList.length}</td>
                    </tr>
                  );
                })
              )
            }
          </tbody>
        </table>
        <button onClick={() => navigate("./editor")}>작성</button>
      </div> */}

// const StTable = styled.table`
//   border-radius: 10px;
//   /* background-color: white; */
  
//   text-align: center;

//   box-sizing: border-box;
//   padding: 0;
//   margin: 0;
// `
// const StTHead = styled.thead`
//   border-bottom: 1px solid black;
//   /* background-color: #d4d4d4; */
// `
// const StTbody = styled.tbody`
//   border-bottom: 1px solid black;
// `
// const StTr = styled.tr`
//   width: inherit;
//   height: auto;
//   min-height: 30px;
//   background-color: white;

//   box-sizing: border-box;
// `
// const StTh = styled.th`
//   width: ${({ $width }) => $width};
//   border-collapse: collapse;
//   border-bottom: 1px solid black;
// `

// const StTd = styled.td`
//   width: ${({ $width }) => $width};
//   border-collapse: collapse;
//   border-bottom: 1px solid black;

//   &:last-child {
//     /* border-bottom: 1px solid black; */
//   }
// `