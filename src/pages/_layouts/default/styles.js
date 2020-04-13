import styled from 'styled-components';
import backgroundMobilis from '~/assets/bg-mobilis.jpg';

export const Wrapper = styled.div`
  min-height: 100%;
  background-image: url(${backgroundMobilis});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;
