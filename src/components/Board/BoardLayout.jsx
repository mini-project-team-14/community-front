import React from 'react'
import * as C from '../../styles/CommonStyle'
import * as D from '../../styles/DetailStyle'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useCategoryContext } from '../../assets/context/CategoryContext';

function BoardLayout() {
  const [cookies, ,] = useCookies(['login']);
  const category = useCategoryContext();
  const { path } = useParams();
  const boardId = category.find(category => category.path === path).boardId;
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  // console.log(queryClient);
  
  const { data, isLoading, isError } = useQuery(
    {
      queryKey: ["boards", boardId],
      queryFn: (
        async () => {
          const response = await axios.get(
            `${process.env.REACT_APP_BACK_SERVER_URL}/api/boards/${boardId}`,
            {
              headers: { 
                AccessToken: `Bearer ${cookies.accessToken}`,
                RefreshToken: `Bearer ${cookies.refreshToken}`
              }
            }
          )
          return response.data;
        }
      )
    },
    {
      refetchOnMount: 'always',
      initialData: () => {
        return queryClient.invalidateQueries(["boards", boardId]);
      },
      enabled: !!path
    }
  );

  if (isLoading) {
    return <C.StSpan $size={"2rem"} $weight={"700"} $left={"20px"}>로딩 중..</C.StSpan>
  }

  if (isError) {
    return <C.StSpan $size={"2rem"} $weight={"700"} $left={"20px"} $color={"red"}>오류 발생</C.StSpan>
  }

  return (
    <C.StMainSection>      
      <D.StDetailContentSection $gap={"10px"}>
      {
        data.length === 0 ? (
          <D.StDetail>
            작성된 글이 없습니다.
          </D.StDetail>
        ) : (
          data.map((item) => {
            return (
              <D.StDetail key={item.postId} $cursor={true}onClick={() => navigate(`./${item.postId}`)}>
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