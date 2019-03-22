import React from 'react';
import Checkbox from 'antd/lib/checkbox';
import 'antd/lib/checkbox/style';

const defaultProps = {
  color: '',
  checked: true,
  onChange: () => ({}),
  name: '',
  disabled: true
};

export default (props = defaultProps) => (
  <Checkbox
    checked={props.checked}
    onChange={props.onChange}
    disabled={props.disabled}>
    {props.name}
  </Checkbox>
);
