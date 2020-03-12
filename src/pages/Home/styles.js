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
    margin-top: 30px;
    margin-bottom: 30px;
    font-size: 1.8rem;
    font-weight: 600;
    line-height: 1.2;
    color: rgba(0, 0, 0, 0.7);
  }

  h2 {
    margin: 60px 120px;
    font-size: 1.4rem;
    font-weight: 300;
    line-height: 1.4;
    color: #6c757d;
  }

  button {
    max-width: 196px;
    margin: 10px 0 0;
    padding: 10px;
    height: 48px;
    background: #3b9eff;
    font-weight: bold;
    color: #fff;
    border: 0;
    border-radius: 40px;
    font-size: 16px;
    transition: background 0.2s;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);

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
