import { hourCounter } from '../src/util/time';

test('Test that an array of objects is returned', () => {
  const newHourCounter = hourCounter({ total: 24 });
  expect(newHourCounter).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        hour: expect.any(Number),
        minute: expect.any(Number)
      })
    ])
  );
});

test('test the length of the objects', () => {
  const newHourCounter = hourCounter({ total: 24 });
  expect(newHourCounter.length).toEqual(48);
});
