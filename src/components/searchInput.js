import React, { useRef, useState } from 'react';
import { TxtInput } from './common';
import { Button } from './common';

export default function SerachInput({ setSearchVal }) {
  const textInputRef = useRef(null);
  const [textValue, setTextValue] = useState('');
  return (
    <>
      <TxtInput
        type='text'
        ref={textInputRef}
        onChange={(e) => setTextValue(e.target.value)}
        value={textValue}
        onKeyPress={(e) => e.key === 'Enter' && setSearchVal(textValue)}
        // onFocus={() => (focusToggleCb ? focusToggleCb(true) : null)}
        // onBlur={() => (focusToggleCb ? focusToggleCb(false) : null)}
      />
      <Button onClick={(e) => setSearchVal(textValue)}>Search!</Button>
    </>
  );
}
