/** @format */

import empty from '../empty';

test('test empty matching', () => {
    expect(empty('')).toBe(true);
    expect(empty(null)).toBe(true);
    expect(empty(undefined)).toBe(true);
    expect(empty(false)).toBe(false);
    expect(empty('0')).toBe(false);
    expect(empty('something')).toBe(false);
    expect(empty('false')).toBe(false);
});
