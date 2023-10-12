import styled from '@emotion/styled';
import theme from 'styles/theme';
import CommonButton from 'components/Button';

export const Container = styled.div`
  display: flex;
  gap: 3.75rem;
  justify-content: center;
  align-items: start;
  padding: 1rem 5rem;
  box-sizing: border-box;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    width: 100%;
    padding: 1rem;
    flex-direction: column;
  }
`;

export const TitleDiv = styled.div`
  color: #fff;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const MenuWrapper = styled.div`
  font-size: 1.125rem;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  width: 12.5rem;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    width: 100%;
  }
`;

export const ContentDiv = styled.div`
  flex-grow: 1;
  height: 100%;
  align-items: start;
  line-height: 1.5;
  white-space: pre-line;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    width: 100%;
  }
  & div {
    font-size: 1.75rem;
    font-weight: 500;
  }
`;

export const MenuTitleDiv = styled.div`
  color: #fff;
  text-align: center;
`;

export const MenuDiv = styled.div`
  display: flex;
  padding: 0.75rem 0.375rem;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  border-radius: 1.125rem;
  background-color: black;
  width: 12.5rem;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    width: 100%;
  }
  position: relative;
  z-index: 999;
`;

export const SubMenuDiv = styled.div<{ selected: boolean }>`
  color: black;
  width: 100%;
  box-sizing: border-box;
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
  font-weight: 400;
  cursor: pointer;
  :hover {
    background-color: #c7c7c7;
  }
  /* ${(props) => !props.selected && ':hover { background-color: #c7c7c7; }'}
  ${(props) => props.selected && 'background-color: black; color: white'}; */
`;

export const SubMenuWrapper = styled.div<{ selected: boolean }>`
  ${(props) =>
    !props.selected
      ? 'max-height: 0; transition: max-height 0.7s cubic-bezier(0, 1, 0, 1);'
      : 'max-height: 100vh; transition: max-height 2s;'};
  overflow: hidden;
  box-sizing: border-box;
  background: #fff;
  border-bottom-left-radius: 1.125rem;
  border-bottom-right-radius: 1.125rem;
  & :last-child {
    border-bottom-left-radius: 1.125rem;
    border-bottom-right-radius: 1.125rem;
  }
  /* & :first-child {
    padding-top: 1.5rem;
    margin-top: -1rem;
  } */
`;

export const NoContentDiv = styled(ContentDiv)`
  display: flex;
  padding-top: 5rem;
  color: #fff;
  text-align: center;
  font-size: 1.3rem;
  font-weight: 500;
  @media ${theme.device.tablet}, ${theme.device.phone} {
    justify-content: center;
  }
`;

export const Button = styled(CommonButton)`
  border-radius: 0.875rem;
  font-size: 0.875rem;
  font-weight: 400;
`;
