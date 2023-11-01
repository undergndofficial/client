import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { Container, CalendarHeaderDiv } from './style';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import dayjs from 'dayjs';

const DatePicker = ({
  selectedDate,
  setSelectedDate,
  error,
  placeholder,
}: {
  placeholder?: string;
  selectedDate: Date | null;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date | null>>;
  error?: boolean;
}) => {
  const dayMap: { [key: string]: string } = {
    Sunday: '일',
    Monday: '월',
    Tuesday: '화',
    Wednesday: '수',
    Thursday: '목',
    Friday: '금',
    Saturday: '토',
  };

  return (
    <Container error={error}>
      <ReactDatePicker
        formatWeekDay={(nameOfDay) => dayMap[nameOfDay]}
        dateFormat="yyyy-MM-dd"
        shouldCloseOnSelect
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="datePicker"
        calendarClassName="calenderWrapper"
        placeholderText={placeholder}
        dayClassName={(d) => {
          if (selectedDate) {
            return new Date(d).toDateString() ==
              new Date(selectedDate).toDateString()
              ? 'selectedDay'
              : 'unselectedDay';
          }
          return 'unselectedDay';
        }}
        renderCustomHeader={({
          date,
          decreaseMonth,
          increaseMonth,
          prevMonthButtonDisabled,
          nextMonthButtonDisabled,
        }) => (
          <CalendarHeaderDiv>
            <button
              type="button"
              onClick={decreaseMonth}
              disabled={prevMonthButtonDisabled}
            >
              <MdArrowBackIos />
            </button>
            <span>{dayjs(date).format('YYYY년 M월')}</span>
            <button
              type="button"
              onClick={increaseMonth}
              disabled={nextMonthButtonDisabled}
            >
              <MdArrowForwardIos />
            </button>
          </CalendarHeaderDiv>
        )}
      />
    </Container>
  );
};

export default DatePicker;
