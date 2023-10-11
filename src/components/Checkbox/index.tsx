import React from 'react';
import { CheckBoxDiv } from './style';

function Checkbox({ checked }: { checked: boolean }) {
  return (
    <CheckBoxDiv>
      <div>{checked && '⦁'}</div>
    </CheckBoxDiv>
  );
}

export default Checkbox;
