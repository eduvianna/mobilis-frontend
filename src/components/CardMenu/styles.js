import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  min-width: 35vw;
  min-height: 100vh;
  background: rgba(166, 208, 98, 0.3);
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  box-shadow: 0 0rem 2rem rgba(0, 0, 0, 0.1);
`;

export const Header = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-top: 10vh;
`;

export const Menu = styled.div`
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h1 {
    margin-top: 60px;
    margin-bottom: 60px;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.2;
    color: rgba(108, 117, 125, 0.9);
  }

  button {
    width: 220px;
    margin: 25px 0 0;
    padding: 10px;
    height: 48px;
    background: #3b9eff;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 5px;
    font-size: 16px;
    transition: background 0.2s;

    a {
      color: #fff;
      font-size: 16px;
      font-weight: bold;
      text-decoration: none;
    }

    &:hover {
      background: ${darken(0.03, '#3b9eff')};
    }
  }
`;
