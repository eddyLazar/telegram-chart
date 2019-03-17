import React from 'react';
import theme from '../theme';

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    height: '100%',
    position: 'absolute',
    top: 0,
    flexDirection: ' column',
    alignItems: 'bottom'
  },
  block: {
    borderTop: `1px solid ${theme.colors.border}`,
    flex: 1,
    // display: 'flex',
    // alignItems: 'flex-e',
    paddingBottom: 12
  },
  stepContainer: {
    marginTop: -24
  }
};

export default ({ max = 0, steps = 5 }) => {
  const stepValue = max / steps;

  return (
    <div style={styles.container}>
      <div style={styles.block}>
        <div style={styles.stepContainer}>{stepValue * 5}</div>
      </div>
      <div style={styles.block}>
        <div style={styles.stepContainer}>{stepValue * 4}</div>
      </div>
      <div style={styles.block}>
        <div style={styles.stepContainer}>{stepValue * 3}</div>
      </div>
      <div style={styles.block}>
        <div style={styles.stepContainer}>{stepValue * 2}</div>
      </div>
      <div style={styles.block}>
        <div style={styles.stepContainer}>{stepValue * 1}</div>
      </div>
    </div>
  );
};

const countStep = (min = 0, stepValue = 0, number = 0) =>
  parseInt(min + stepValue * number);
