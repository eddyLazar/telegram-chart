import React from 'react';
import theme from '../theme';

const styles = {
  container: {
    borderTop: `1px solid ${theme.colors.border}`,
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: theme.xAxisHeight * -1,
    height: theme.xAxisHeight
  },
  block: {
    borders: '1px solid white'
  }
};

export default ({ max = 0, min = 0, formatter = x => x, steps = 6 }) => {
  const stepValue = (max - min) / 6;

  return (
    <div style={styles.container}>
      <div style={styles.block}>{formatter(min)}</div>
      <div style={styles.block}>{formatter(countStep(min, stepValue, 1))}</div>
      <div style={styles.block}>{formatter(countStep(min, stepValue, 2))}</div>
      <div style={styles.block}>{formatter(countStep(min, stepValue, 3))}</div>
      <div style={styles.block}>{formatter(countStep(min, stepValue, 4))}</div>
      <div style={styles.block}>{formatter(countStep(min, stepValue, 5))}</div>
      <div style={styles.block}>{formatter(max)}</div>
    </div>
  );
};

const countStep = (min = 0, stepValue = 0, number = 0) =>
  parseInt(min + stepValue * number);
