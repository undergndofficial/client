import React from 'react';
import { CheckBoxDiv } from './style';

function Checkbox({ checked }: { checked: boolean }) {
  return <CheckBoxDiv>{checked && '✓'}</CheckBoxDiv>;
}

export default Checkbox;
