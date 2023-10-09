import styled from '@emotion/styled';
import { IoStarSharp } from 'react-icons/io5';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StarWrapper = styled.div`
  display: flex;
  gap: 4px;
  cursor: pointer;
  align-items: center;
  position: relative;
`;

export const StarIcon = styled(IoStarSharp)<{ rate?: number }>`
  color: ${(props) =>
    props.rate ? `var(--color-star${props.rate})` : 'var(--color-star5)'};
`;

export const BackButton = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  cursor: pointer;
  width: 1.4rem;
  height: 1.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StarRateDiv = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  & div {
    position: absolute;
    font-size: 0.7rem;
    font-weight: 700;
    color: black;
    padding-top: 4px;
  }
`;

export const CommentInput = styled.div`
  margin-top: 0.6rem;
  display: flex;
  gap: 0.6rem;
  height: 2.5rem;
`;

export const CommentListDiv = styled.div`
  margin-top: 1.8rem;
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const WriterInfoDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

export const ProfileImageDiv = styled.div`
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;
  /* background-size: contain;
  background-repeat: no-repeat;
  background-position: center; */
  background-color: grey; // 임시
  margin-right: 10px;
`;

export const WriterDiv = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  gap: 0.4rem;
  align-items: end;
  & span {
    font-size: 0.5rem;
  }
`;

export const ContentDiv = styled.div`
  margin-top: 1rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const CommentInfoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const CommentToolWrapper = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background-color: white;
  display: flex;
  padding: 0.5rem 0.75rem;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.125rem;
  color: #7b7b7b;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 400;
  justify-content: center;
  & div {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
  }
`;

export const CommentContainer = styled.div`
  position: relative;
`;
