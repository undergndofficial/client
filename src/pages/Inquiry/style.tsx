import styled from '@emotion/styled';
import theme from 'styles/theme';
import Button from 'components/Button';

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
`;

export const BoardTable = styled.table`
  border-top: 2px solid #535353;
  border-collapse: collapse;
  width: 100%;
  /* 테이블 행 */
  & th {
    font-weight: 400;
    padding: 0.9rem 1rem;
  }
  /* 테이블 바디 */
  & tbody {
    & tr {
      cursor: pointer;
      & th:nth-of-type(3),
      & td:nth-of-type(3) {
        text-align: left;
      }
    }
  }
  /* 테이블 비율 */
  & th:nth-of-type(1),
  & td:nth-of-type(1) {
    width: 2rem;
  }
  & th:nth-of-type(2),
  & td:nth-of-type(2) {
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
  & th:nth-of-type(5),
  & td:nth-of-type(5) {
    width: 5rem;
    @media ${theme.device.tablet}, ${theme.device.phone} {
      display: none;
    }
  }
`;
export const WriteButton = styled(Button)`
  border-radius: 0.875rem;
  font-size: 0.875rem;
  font-weight: 400;
  align-self: end;
  margin-bottom: -2.8rem;
`;

export const StatusDot = styled.div<{ color: string }>`
  display: inline-block;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  width: 10px;
  height: 10px;
  margin: 0 8px 1px 0;
`;
