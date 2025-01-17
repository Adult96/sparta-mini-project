import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import formatAgo from '../utils/formatDate';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import Button from '../elements/Button';
import Comment from './Comment';
import formatLike from '../utils/formatLike';
import { useDispatch, useSelector } from 'react-redux';
import { __getComment } from '../utils/redux/modules/comment/getComment';
import { postLike } from '../utils/api/like';
import { editMy, __getMy } from '../utils/redux/modules/my/getMy';
import { editHomeLike } from '../utils/redux/modules/home/getHome';
import Storage from '../utils/localStorage';
import { __getDetail } from '../utils/redux/modules/home/getDetail';
import { __getLike } from '../utils/redux/modules/like/getLike';
import { useLocation } from 'react-router-dom';
import ROUTER from '../constants/router';

export default React.memo(function BoardDetail({
  board: {
    id,
    userNickName,
    title,
    content,
    imageUrl,
    createdAt,
    modifiedAt,
    isLiked,
    postLikeCount,
    // commentList,
  },
  onBackClick,
}) {
  const { pathname } = useLocation();
  const cntRef = useRef(postLikeCount);
  const [likeClick, setLikeClick] = useState(false);
  const [likeClickHeart, setLikeClickHeart] = useState(false);
  const [likeDetailClick, setLikeDetailClick] = useState(false);
  const [showComment, setShowComment] = useState(false);

  const dispatch = useDispatch();
  const loginName = Storage.getUserName();
  const path = pathname === ROUTER.PATH.MY ? true : false;

  const { getComment, isLoading, isError } = useSelector(
    state => state.getComment,
  );

  useEffect(() => {
    dispatch(__getComment(id));
    setLikeClick(isLiked ? true : false);
    setLikeClickHeart(isLiked ? true : false);
    setLikeDetailClick(false);
    cntRef.current = postLikeCount;
  }, [dispatch, id]);

  useEffect(() => {
    return () => setShowComment(false);
  }, [title, content, imageUrl, createdAt]);

  useEffect(() => {
    if (getComment.length === 0) {
      setShowComment(false);
    }
  }, [getComment.length]);

  const setDate = (createDate, modifiedDate) => {
    return formatAgo(createDate, modifiedDate);
  };

  const setformatLike = cnt => {
    return formatLike(cnt);
  };

  const handleShowComment = () => {
    setShowComment(state => !state);
  };

  const handleLike = async postId => {
    if (likeClick) {
      cntRef.current = likeDetailClick
        ? cntRef.current + 1
        : cntRef.current - 1;
    } else if (!likeClick) {
      cntRef.current = likeDetailClick
        ? cntRef.current - 1
        : cntRef.current + 1;
    }

    await postLike(postId);
    if (pathname === ROUTER.PATH.MY) {
      await dispatch(editMy({ postId, likeCnt: cntRef.current }));
    } else if (pathname === ROUTER.PATH.HOME) {
      await dispatch(
        editHomeLike({
          postId,
          likeCnt: cntRef.current,
        }),
      );
    } else {
      await dispatch(__getLike());
    }
    dispatch(__getDetail(postId));
    setLikeClickHeart(state => !state);
    setLikeDetailClick(state => !state);
  };

  return (
    <>
      <DetailContainer>
        <Header>
          <TitleText>
            <h3>{userNickName}</h3>
            <Date>{setDate(createdAt, modifiedAt)}</Date>
          </TitleText>
          <Button width="4rem" height="1.5rem" type="sort" click={onBackClick}>
            Back
          </Button>
        </Header>
        <Img srcImg={imageUrl} />
        {likeClickHeart ? (
          <Heart onClick={() => handleLike(id)} loginName={loginName}>
            <AiFillHeart />
          </Heart>
        ) : (
          <HeartEmpty onClick={() => handleLike(id)} loginName={loginName}>
            <AiOutlineHeart />
          </HeartEmpty>
        )}
        <Like>{setformatLike(cntRef.current)}</Like>
        <Title>{title}</Title>
        <Content>{content}</Content>
        {getComment.length ? (
          <Button click={handleShowComment} height="1.5rem" type="sort">
            {showComment
              ? `댓글 가리기`
              : `댓글 ${getComment.length}개 모두보기`}
          </Button>
        ) : (
          <Comment
            id={id}
            comment={getComment}
            loginName={loginName}
            path={path}
          />
        )}
        {showComment && (
          <Comment
            id={id}
            comment={getComment}
            loginName={loginName}
            path={path}
          />
        )}
      </DetailContainer>
    </>
  );
});

const DetailContainer = styled.div`
  position: sticky;
  top: 0;
  right: 0;
  width: 70rem;
  height: 100%;
  max-height: 50rem;
  padding: 3rem 1rem 1rem 1rem;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
    border-radius: 6px;
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: transparent;
  }

  @media (max-width: 600px) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    max-height: 100%;
    padding: 1rem;
    background-color: ${props => props.theme.bg};
    z-index: 10000;
  }

  @media (min-width: 1024px) {
    width: 60rem;
  }

  @media (min-width: 1200px) {
    width: 50rem;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.3rem;
  margin: 1rem 0;
`;

const TitleText = styled.div`
  display: flex;
  gap: 0.3rem;
`;

const Date = styled.h4`
  color: ${props => props.theme.dateColor};
`;

const Img = styled.img`
  height: 0;
  width: 100%;
  padding-bottom: 100%;
  border-radius: 0.5rem;
  object-fit: cover;
  background-image: url(${props => props.srcImg});
  background-size: 100% 100%;
`;

const Like = styled.h4`
  margin: 1rem 0;
`;

const Title = styled.h4`
  display: -webkit-box;

  height: 1.08rem;
  white-space: normal;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const Content = styled.p`
  word-spacing: 1px;
  line-height: 1.35rem;
`;

const Heart = styled.div`
  margin-top: 1rem;
  font-size: ${props => props.theme.fontSize.medium};
  color: ${props => props.theme.color.red};
  :hover {
    transform: scale(1.2);
  }

  ${props =>
    props.loginName
      ? css`
          display: inline-block;
        `
      : css`
          display: none;
        `}
`;

const HeartEmpty = styled.div`
  margin-top: 1rem;
  font-size: ${props => props.theme.fontSize.medium};
  :hover {
    color: ${props => props.theme.color.ligth_pink};
    transform: scale(1.2);
  }
  ${props =>
    props.loginName
      ? css`
          display: inline-block;
        `
      : css`
          display: none;
        `}
`;
