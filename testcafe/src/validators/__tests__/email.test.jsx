/** @format */

import email from '../email';

test('test email matching', () => {
    expect(email('222222222')).toBe(true);
    expect(email('111111111@asdfasdfas')).toBe(true);
    expect(email('testing@domain.com')).toBe(false);
});
