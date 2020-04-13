import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 15vh;
`;

export const Content = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    color: rgba(0, 10, 10, 0.8);
    font-size: 38px;
    line-height: 1.5;
    font-weight: 700;
    margin: 50px 5px 24px;
    padding: 10px;
    font-family: 'Libre Baskerville', serif;
  }

  h2 {
    margin: 60px 120px;
    font-size: 26px;
    font-weight: 300;
    line-height: 1.4;
    color: rgba(0, 10, 10, 0.8);
    font-family: 'Libre Baskerville', serif;
  }

  button {
    max-width: 260px;
    margin: 10px 0 0;
    padding: 10px 20px;
    height: 64px;
    background: ${darken(0.02, '#3b9e')};
    color: #fff;
    border: 0;
    border-radius: 10px;
    transition: background 0.2s;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    color: #fff;
    font-size: 22px;
    font-weight: 400;
    text-decoration: none;

    &:hover {
      background: ${darken(0.1, '#3b9e')};
    }
  }
`;
