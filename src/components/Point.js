import React from 'react';
import { Circle } from 'react-konva';

export default ({ x = 0, y = 0, color = 'black' }) => <Circle x={x} y={y} fill={color} radius={5} />;
