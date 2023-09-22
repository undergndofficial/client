import styled from '@emotion/styled';

export const Container = styled.div`
  position: absolute;
  top: 0.6rem;
  right: 8rem;
  display: inline-flex;
  flex-direction: column;
  border-radius: 1.875rem;
  background: #0c0c0f;
  padding: 1rem;
  gap: 0.8rem;
  max-height: 25rem;
`;

export const SearchInputForm = styled.form`
  display: flex;
  align-items: center;
  & input {
    width: 100%;
    color: var(--color-font);
    font-size: 1.1rem;
    font-weight: 700;
    background: #0c0c0f;
    border: none;
    padding: 0.5rem;
  }
  & button {
    width: 2rem;
    height: 2rem;
    background-color: transparent;
    border: none;
    z-index: 999;
    cursor: pointer;
  }
`;

export const TabWrapper = styled.div`
  display: flex;
  gap: 1.25rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem 1rem 1rem;
`;

export const TabDiv = styled.div<{ selected: boolean }>`
  border-radius: 3.0625rem;
  color: #666;
  font-weight: 700;
  text-align: center;
  padding: 1rem 2rem;
  cursor: pointer;
  ${(props) => props.selected && 'color: var(--color-font)'};
  ${(props) => props.selected && 'font-size: 1.1rem'};
  ${(props) => props.selected && 'background-color: #2F2F2F'};
`;
