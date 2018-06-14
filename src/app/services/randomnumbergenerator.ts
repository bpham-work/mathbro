export class RandomNumberGenerator {
  public static getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  public static getRandomMultipleUpTo(num: number): number {
    const multiples = RandomNumberGenerator.getMultiplesUpTo(num);
    return multiples[RandomNumberGenerator.getRandomInt(0, multiples.length - 1)];
  }

  private static getMultiplesUpTo(num: number): number[] {
    const result: number[] = [1, num];
    for (let i = 2; i <= num / 2; i++) {
      if (num % i === 0) {
        result.push(i);
      }
    }
    return result;
  }
}
