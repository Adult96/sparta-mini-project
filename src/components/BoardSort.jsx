import React from 'react';
import styled from 'styled-components';
import Button from '../elements/Button';

export default function BoardSort({ click }) {
  return (
    <BoardListSort>
      <Button click={click} width='4rem' height='1.5rem' type='sort'>
        Recent
      </Button>
      <Button click={click} width='4rem' height='1.5rem' type='sort'>
        Popular
      </Button>
    </BoardListSort>
  );
}

const BoardListSort = styled.div`
  display: flex;
  gap: 1rem;
  margin: 1rem 0rem 0rem 1rem;
`;