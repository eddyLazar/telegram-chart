import { useState } from 'react';

export const useToggleLines = (dataKeys = ['']) => {
  const initial = {};
  for (const dataKey of dataKeys) {
    initial[dataKey] = true;
  }
  const [activeLines, setActiveLines] = useState(initial);

  const toggleLine = (dataKey = '') => {
    setActiveLines(prevActiveLines => {
      const curr = prevActiveLines[dataKey];
      return {
        ...prevActiveLines,
        [dataKey]: !curr
      };
    });
  };
  return [activeLines, toggleLine];
};
