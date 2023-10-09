import styled from '@emotion/styled';
import theme from 'styles/theme';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.75rem;
  justify-content: center;
  align-items: center;
`;

export const TitleDiv = styled.div`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
  word-break: keep-all;
`;

export const BoardTable = styled.table`
  border-top: 2px solid #535353;
  border-collapse: collapse;
  width: 100%;
  /* 테이블 행 */
  & th {
    font-weight: 400;
    padding: 0.9rem 1rem;
    word-break: keep-all;
  }
  /* 테이블 바디 */
  & tbody {
    & tr {
      cursor: pointer;
      & th:nth-of-type(2),
      & td:nth-of-type(2) {
        text-align: left;
      }
    }
  }
  /* 테이블 비율 */
  & th:nth-of-type(1),
  & td:nth-of-type(1) {
    width: 2rem;
  }
  & th:nth-of-type(3),
  & td:nth-of-type(3) {
    width: 5rem;
    @media ${theme.device.tablet}, ${theme.device.phone} {
      display: none;
    }
  }
  & th:nth-of-type(4),
  & td:nth-of-type(4) {
    width: 5rem;
    @media ${theme.device.tablet}, ${theme.device.phone} {
      display: none;
    }
  }
`;
