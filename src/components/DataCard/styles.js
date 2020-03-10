import styled from 'styled-components';

export const Container = styled.div`
  width: 280px;
  height: 96px;
  margin: 12px 12px;
  border-radius: 6px;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.02);
  transition: 0.3s;
  padding: 20px 15px;
  background: #fff;

  border: 1px solid rgba(0, 0, 0, 0.08);
`;

export const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    text-align: left;
    max-width: 120px;
    width: 120px;

    strong {
      display: block;
      color: rgba(0, 0, 0, 0.7);
      font-size: 14px;
    }
    span {
      display: block;
      margin-top: 2px;
      font-size: 12px;
      color: #999;
    }
  }
  svg {
    color: rgba(0, 0, 0, 0.7);
  }
  > strong {
    text-align: right;
    width: 70px;
    max-width: 70px;
    display: block;
    font-size: 28px;
    color: #00ab66;
  }
`;

export const InfoTime = styled.span`
  display: block;
  text-align: right;
  font-size: 12px;
  color: #999;
  margin-top: 2%;
`;
