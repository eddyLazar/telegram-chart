import { useToggleLines } from './Chart.hooks';

const mockSetState = jest.fn();

jest.mock('react', () => ({
  useState: initial => [initial, mockSetState]
}));

describe('useToggleLines()', () => {
  test('should return lines state', () => {
    const [state] = useToggleLines(['a', 'b']);
    expect(state).toEqual({
      a: true,
      b: true
    });
  });
  test('should call state callback when toggle line', () => {
    const [_, setState] = useToggleLines(['a', 'b']);
    setState('a');

    expect(mockSetState).toHaveBeenCalled();
    const newState = mockSetState.mock.calls[0][0]({ a: true, b: true });
    expect(newState).toEqual({
      a: false,
      b: true
    });
  });
});
