import React, { useState, useEffect } from 'react';
import { Rect } from 'react-konva';
import theme from '../../theme';

export default ({ width = 0, height = 0, onChange = () => ({}) }) => {
  const [selectedRegionX, setSelectedRegionX] = useState(
    width - theme.regionSelector.minWidth
  );

  const [selectedRegionWidth, setSelectedRegionWidth] = useState(
    theme.regionSelector.minWidth
  );

  const maxRegionX = width - selectedRegionWidth;
  const minRegionX = 0;

  const leftFogRegion = (
    <Rect
      x={0}
      y={0}
      width={selectedRegionX}
      height={height}
      fill="#f5f5dc5e"
      stroke="black"
      strokeWidth={1}
    />
  );

  const rightFogRegionX = selectedRegionX + selectedRegionWidth;

  const rightFogRegion = (
    <Rect
      x={rightFogRegionX}
      y={0}
      width={width - rightFogRegionX}
      height={height}
      fill="#f5f5dc5e"
      stroke="black"
      strokeWidth={1}
    />
  );

  const handleDragMove = e => {
    const newX = e.target.x();
    setSelectedRegionX(newX);
  };

  return (
    <React.Fragment>
      {leftFogRegion}
      {rightFogRegion}
      <Rect
        draggable
        x={width - theme.regionSelector.minWidth}
        y={0}
        width={theme.regionSelector.minWidth}
        height={height}
        stroke="black"
        strokeWidth={1}
        dragBoundFunc={p => {
          if (p.x >= maxRegionX) {
            return { x: selectedRegionX, y: 0 };
          }

          if (p.x <= minRegionX) {
            return { x: 0, y: 0 };
          }
          return { x: p.x, y: 0 };
        }}
        onDragMove={handleDragMove}
        onDragEnd={() => {
          onChange([selectedRegionX, selectedRegionX + selectedRegionWidth]);
        }}
      />
    </React.Fragment>
  );
};
