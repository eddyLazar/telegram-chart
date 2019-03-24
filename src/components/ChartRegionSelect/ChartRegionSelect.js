import React, { useState, useRef } from 'react';
import { Rect } from 'react-konva';
import theme from '../../theme';

export default ({ width = 0, height = 0, onChange = () => ({}) }) => {
  const [regionWidth, setRegionWidth] = useState(theme.regionSelector.minWidth);
  const leftSideRef = useRef(null);
  const rightSideRef = useRef(null);
  const regionRef = useRef(null);

  const getSidesBounds = () => [
    leftSideRef.current.absolutePosition().x,
    rightSideRef.current.absolutePosition().x
  ];

  const initialLeftSideX = width - theme.regionSelector.minWidth;
  const [leftSideX, setLeftSideX] = useState(initialLeftSideX);

  const handleLeftSideDrag = e => {
    const newX = e.target.x();
    setLeftSideX(newX);
    const [l, r] = getSidesBounds();
    setRegionWidth(r - l);
    setFogPosition();
  };

  const handleDragEnd = () => {
    console.log('hello world');

    const [left, right] = getSidesBounds();
    onChange([left, right]);
  };

  const leftSide = (
    <Rect
      ref={leftSideRef}
      draggable
      x={initialLeftSideX}
      y={0}
      width={theme.regionSelector.moveCornerWidth}
      height={height}
      fill={theme.regionSelector.sidesColor}
      dragBoundFunc={p => {
        if (p.x >= width - theme.regionSelector.minWidth) {
          return { x: leftSideX, y: 0 };
        }

        if (p.x <= 0) {
          return { x: 0, y: 0 };
        }
        return { x: p.x, y: 0 };
      }}
      onDragMove={handleLeftSideDrag}
      onDragEnd={handleDragEnd}
    />
  );

  const initialRightSideX = width;
  const [rightSideX, setRightSideX] = useState(initialRightSideX);

  const handleRightSideDrag = e => {
    const newX = e.target.x();
    setRightSideX(newX);
    const [l, r] = getSidesBounds();
    setRegionWidth(r - l);
    setFogPosition();
  };

  const rightSide = (
    <Rect
      ref={rightSideRef}
      draggable
      x={initialRightSideX - theme.regionSelector.moveCornerWidth}
      y={0}
      width={theme.regionSelector.moveCornerWidth}
      height={height}
      fill={theme.regionSelector.sidesColor}
      dragBoundFunc={p => {
        if (p.x >= width - theme.regionSelector.moveCornerWidth) {
          return { x: width - theme.regionSelector.moveCornerWidth, y: 0 };
        }

        return { x: p.x, y: 0 };
      }}
      onDragMove={handleRightSideDrag}
      handleDragEnd={handleDragEnd}
      onDragEnd={handleDragEnd}
    />
  );

  const [leftFogWidth, setLeftFogWidth] = useState(initialLeftSideX);

  const leftFog = (
    <Rect
      x={0}
      y={0}
      width={leftFogWidth + theme.regionSelector.moveCornerWidth}
      height={height}
      fill={theme.regionSelector.fogColor}
    />
  );

  const [rightFogX, setRightFogX] = useState(initialRightSideX);
  const [rightFogWidth, setRightFogWidth] = useState(0);

  const rightFog = (
    <Rect
      x={rightFogX}
      y={0}
      width={rightFogWidth}
      height={height}
      fill={theme.regionSelector.fogColor}
    />
  );

  const region = (
    <Rect
      ref={regionRef}
      x={leftSideX + theme.regionSelector.moveCornerWidth}
      y={0}
      width={regionWidth}
      height={height}
      strokeWidth={1}
      draggable
      dragBoundFunc={p => {
        const maxX = width - regionWidth;
        if (p.x >= maxX) {
          return {
            x: maxX,
            y: 0
          };
        }

        const minX = theme.regionSelector.moveCornerWidth;

        if (p.x <= minX) {
          return {
            x: minX,
            y: 0
          };
        }

        return { x: p.x, y: 0 };
      }}
      onDragMove={e => {
        setFogPosition();
        const x = e.target.x();
        leftSideRef.current.x(x - theme.regionSelector.moveCornerWidth);
        rightSideRef.current.x(
          x + regionWidth - theme.regionSelector.moveCornerWidth
        );
      }}
      onDragEnd={handleDragEnd}
    />
  );

  const setFogPosition = () => {
    const [leftSideX, rightSideX] = getSidesBounds();

    setLeftFogWidth(leftSideX);

    setRightFogX(rightSideX);
    setRightFogWidth(width - rightSideX);
  };

  return (
    <React.Fragment>
      {leftFog}
      {rightFog}
      {region}
      {leftSide}
      {rightSide}
    </React.Fragment>
  );
};
