/** @format */

const player = require('./player');

test('default player specs', () => {
    expect(player.getHuman()).toMatchSnapshot();
});

test('test setting super human', () => {
    player.setSuperHuman(true);
    expect(player.getHuman()).toMatchSnapshot();
});

test('test setting is lost', () => {
    player.setLost(true);
    expect(player.getHuman()).toMatchSnapshot();
});

test('test setting name', () => {
    player.setName('Tom');
    expect(player.getHuman()).toMatchSnapshot();
    expect(player.getHuman().name).toBe('Tom');
});
