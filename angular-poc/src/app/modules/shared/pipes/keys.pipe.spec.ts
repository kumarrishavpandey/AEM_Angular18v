import { KeysPipe } from './keys.pipe';

describe('KeysPipe', () => {
  let pipe: KeysPipe;

  beforeEach(() => {
    pipe = new KeysPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform an object into an array of keys', () => {
    const inputObject = { key1: 'value1', key2: 'value2', key3: 'value3' };
    const result = pipe.transform(inputObject);

    expect(result).toEqual(['key1', 'key2', 'key3']);
  });

  it('should return an empty array for an empty object', () => {
    const inputObject = {};
    const result = pipe.transform(inputObject);

    expect(result).toEqual([]);
  });
});
