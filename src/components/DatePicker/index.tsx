import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import React from 'react';
import { Container, CalendarHeaderDiv } from './style';
import { MdArrowBackIos } from 'react-icons/md';
import { MdArrowForwardIos } from 'react-icons/md';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

const DatePicker = ({
  selectedDate,
  setSelectedDate,
  error,
  placeholder,
}: {
  placeholder?: string;
  selectedDate: Date | null;
  setSelectedDate: (value: Date | null) => void;
  error?: boolean;
}) => {
  const { t } = useTranslation();
  const dayMap: { [key: string]: string } = {
    Sunday: t('sun'),
    Monday: t('mon'),
    Tuesday: t('tue'),
    Wednesday: t('wed'),
    Thursday: t('thr'),
    Friday: t('fri'),
    Saturday: t('sat'),
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
