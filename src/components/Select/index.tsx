/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Container } from './style';
import ReactSelect, { SingleValue, ActionMeta } from 'react-select';
import { SelectOptionType } from 'types/common';

const customStyles: any = {
  control: (provided: any) => ({
    ...provided,
    padding: '0 0 0 1rem',
    border: '2px solid #666',
    background: '#4a4a4a',
    color: 'var(--color-font)',
    height: '2.3rem',
    borderRadius: '0.625rem',
    boxShadow: 'none',
    ':hover': {
      border: '2px solid #666',
    },
  }),
  option: (provided: any, { isSelected }: { isSelected: boolean }) => ({
    ...provided,
    padding: '0.6rem',
    // borderTop: '2px solid #666',
    background: '#4a4a4a',
    cursor: 'pointer',
    color: isSelected ? '#858585' : 'var(--color-font)',
    ':hover': {
      ...provided[':hover'],
      backgroundColor: 'black',
    },
  }),
  indicatorSeparator: (provided: any) => ({
    ...provided,
    display: 'none',
  }),
  singleValue: (provided: any) => ({
    ...provided,
    color: 'var(--color-font)',
  }),
  input: (provided: any) => ({
    ...provided,
    color: 'var(--color-font)',
  }),
  menu: (provided: any) => ({
    ...provided,
    background: '#4a4a4a',
  }),
};

function Select({
  onChange,
  options,
  placeholder,
  width,
  value,
}: {
  onChange: (
    newValue: SingleValue<{ label: string; value: string }>,
    actionMeta: ActionMeta<{ label: string; value: string }>,
  ) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
  width?: string;
  value?: SelectOptionType;
}) {
  return (
    <Container width={width}>
      <ReactSelect
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        styles={customStyles}
        value={value}
      />
    </Container>
  );
}

export default Select;
