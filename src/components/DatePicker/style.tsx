import styled from '@emotion/styled';

export const Container = styled.div<{ error?: boolean }>`
  .datePicker {
    width: 100%;
    padding: 0 1.25rem;
    border: 2px solid #666;
    background: #4a4a4a;
    color: #fff;
    height: 2.3rem;
    border-radius: 0.625rem;
    cursor: pointer;
  }
  .react-datepicker {
    border: 2px solid #666;
    color: var(--color-font);
    border-radius: 0.625rem;
    padding: 0.5rem;
    .react-datepicker__day--outside-month {
      cursor: default;
      visibility: hidden;
    }
  }
  .react-datepicker__triangle {
    display: none;
  }
  .calenderWrapper {
    background-color: #4a4a4a;
  }
  .react-datepicker__header {
    color: #fff;
    background-color: #4a4a4a;
    border-bottom: solid 1px #666;
  }
  .react-datepicker__day-name {
    color: #fff;
  }
  .selectedDay,
  .unselectedDay {
    color: #fff;
    border-radius: 50%;
    font-weight: 400;
    background-color: transparent;
  }
  .selectedDay {
    background-color: #000;
    font-weight: 600;
  }
`;

export const CalendarHeaderDiv = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1.5rem 0.5rem 1.5rem;
  box-sizing: border-box;
  color: #fff;
  & span {
    font-weight: 700;
  }
  & button {
    background: none;
    border: none;
    cursor: pointer;
    color: #fff;
  }
`;
