import { ChunkPipe } from './chunk.pipe';

describe('ChunkPipe', () => {
  let pipe: ChunkPipe;

  beforeEach(() => {
    pipe = new ChunkPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should split an array into chunks of the specified size', () => {
    const inputArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const chunkSize = 3;
    const result = pipe.transform(inputArray, chunkSize);

    expect(result).toEqual([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
  });

  it('should handle an empty array and return an empty array', () => {
    const inputArray: any[] = [];
    const chunkSize = 3;
    const result = pipe.transform(inputArray, chunkSize);

    expect(result).toEqual([]);
  });

  it('should handle a null array and return an empty array', () => {
    const inputArray: any[] = null;
    const chunkSize = 3;
    const result = pipe.transform(inputArray, chunkSize);

    expect(result).toEqual([]);
  });

  it('should handle undefined array and return an empty array', () => {
    const inputArray: any[] = undefined;
    const chunkSize = 3;
    const result = pipe.transform(inputArray, chunkSize);

    expect(result).toEqual([]);
  });

  it('should handle chunkSize larger than array length and return the whole array', () => {
    const inputArray = [1, 2, 3, 4, 5];
    const chunkSize = 10;
    const result = pipe.transform(inputArray, chunkSize);

    expect(result).toEqual([inputArray]);
  });
});
