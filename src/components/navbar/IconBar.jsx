import React from 'react';
import styled from 'styled-components';

import {
  AiFillInstagram,
  AiFillHome,
  AiOutlineHeart,
  AiOutlinePlusSquare,
} from 'react-icons/ai';
import { BiLogIn, BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

import ROUTER from '../../constants/router';

export default function IconBar({ showLoginIcon }) {
  return (
    <IconContainer>
      <Title>
        <AiFillInstagram id='Jaranghalem' />
        <TitleText>
          <span>Jaranghalam</span>
        </TitleText>
      </Title>
      {showLoginIcon && (
        <TabIcon>
          <Home id='홈'>
            <AiFillHome />
          </Home>
          <Like id='좋아요'>
            <AiOutlineHeart />
          </Like>
          <Add id='추가'>
            <AiOutlinePlusSquare />
          </Add>
        </TabIcon>
      )}
      <Login>
        {showLoginIcon ? (
          <Link to={ROUTER.PATH.LOGIN}>
            <BiLogIn />
          </Link>
        ) : (
          <Link to={ROUTER.PATH.BACK}>
            <BiArrowBack />
          </Link>
        )}
      </Login>
    </IconContainer>
  );
}

const IconContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: ${props => props.theme.screen.tablet_v}) {
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-size: ${props => props.theme.fontSize.medium};
  }
`;

const Title = styled.div`
  display: flex;
`;

const TitleText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  font-family: 'Satisfy', cursive;

  @media (min-width: ${props => props.theme.screen.tablet_v}) {
    display: none;
  }
`;

const TabIcon = styled.div`
  display: flex;
  margin: 10vh 0;
  gap: 3rem;
  flex-direction: column;

  @media (max-width: ${props => props.theme.screen.tablet_v}) {
    margin: 0;
    flex-direction: row;
  }
`;

const Home = styled.span`
  cursor: pointer;
`;

const Like = styled(Home)``;

const Add = styled(Home)``;

const Login = styled(Home)``;