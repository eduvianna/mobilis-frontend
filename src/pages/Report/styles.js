import styled from 'styled-components';
import 'react-dates/lib/css/_datepicker.css';

import { darken } from 'polished';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-direction: row;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  min-width: 65vw;
  flex-direction: column;
  align-items: center;

  form {
    position: relative;
    padding: 5px;
    display: flex;
    width: 900px;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.05);
    border-radius: 0.375rem;
    background-color: #fff;
    background-clip: border-box;
    box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.05);

    select {
      text-align: center;
      background: rgba(0, 0, 0, 0.1);
      border: 0;
      border-radius: 4px;
      height: 44px;
      padding: 0 15px;
      color: #000;
      margin: 0 8px;
      font-size: 16px;
      width: 23%;

      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }

    button {
      height: 44px;
      background: #3b9eff;
      font-weight: bold;
      color: #fff;
      border: 0;
      border-radius: 4px;
      font-size: 16px;
      padding: 0 15px;
      transition: background 0.2s;
      margin-left: 15px;

      &:hover {
        background: ${darken(0.03, '#3b9eff')};
      }
    }
  }
`;

export const CardChart = styled.div`
  max-width: 900px;
  margin: 50px auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  transition: 0.3s;
  padding: 5px 15px;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
  background-color: #fff;
  background-clip: border-box;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.05);
`;
