import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  flex-direction: row;
`;

export const Card = styled.div`
  position: relative;
  margin: 40px 30px;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border: 1px solid rgba(0, 0, 0, 0.05);
  border-radius: 0.375rem;
  background-color: #fff;
  background-clip: border-box;
  box-shadow: 0 0rem 1rem rgba(0, 0, 0, 0.05);

  &:first-of-type {
    border-bottom: 0;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  &:last-of-type {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`;

export const CardHeader = styled.div`
  margin-bottom: 0;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  background-color: #fff;
  cursor: pointer;

  h5 {
    font-size: 1.0125rem;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 1.5rem;
    transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    transform: translateY(-50%);
  }

  &[aria-expanded='true'] {
    svg {
      top: 6%;
      transform: rotate(180deg);
    }
  }

  &[aria-expanded='false']:after {
    svg {
      transform: rotate(180deg);
    }
  }

  &:first-child {
    border-radius: calc(0.375rem - 1px) calc(0.375rem - 1px) 0 0;
  }
`;

export const CardBody = styled.div`
  padding: 1.5rem;
  flex: 1 1 auto;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardMonitoring = styled.div`
  min-width: 65vw;
  min-height: 100vh;
  background: linear-gradient(147deg, #fdfbfb, #ebedee);
`;
