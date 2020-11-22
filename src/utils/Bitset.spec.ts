import { Bitset } from "./Bitset";

describe('Bitset', () => {
  let bitset: Bitset;
  beforeEach(() => {
    bitset = new Bitset();
  })
  
  it('returns false if index is out of bounds', () => {
    expect(bitset.test(999)).toBe(false);
  });

  it('can test bits', () => {
    expect(bitset.test(0)).toBe(false);
    bitset.set(0);
    expect(bitset.test(0)).toBe(true);
  });

  it('can reset bits', () => {
    bitset.set(0);
    expect(bitset.test(0)).toBe(true);
    bitset.reset(0);
    expect(bitset.test(0)).toBe(false);
  });

  it('can flip bits', () => {
    expect(bitset.test(0)).toBe(false);
    bitset.flip(0);
    expect(bitset.test(0)).toBe(true);
    bitset.flip(0);
    expect(bitset.test(0)).toBe(false);
  });

  it('can perform bitwise and', () => {
    const b1 = new Bitset();
    const b2 = new Bitset();
    const b3 = new Bitset();

    b2.set(200);
    b2.and(b1);
    expect(b2.test(200)).toBe(false);

    b3.and(b2);
    expect(b3.test(200)).toBe(false);
  });

  test('can perform bitwise and not', () => {
    const b1 = new Bitset();
    const b2 = new Bitset();
    const numBits = b1.size();
    for (let i = 0; i < numBits; i += 2) {
      b1.set(i);
    }
    b2.setAll();
    b2.andNot(b1);
    for (let i = 0; i < numBits; i++) {
      expect(b2.test(i)).toBe(!b1.test(i));
    }
    
    b2.clear();
    b2.andNot(b1);
    expect(b2.allocatedIndices()).toBe(0);

    b1.clear();
    b2.setAll();
    b2.andNot(b1);
    for (let i = 0; i < numBits; i++) {
      expect(b2.test(i)).toBe(true);
    }
  });

  it('can perform bitwise or', () => {
    const b1 = new Bitset();
    const b2 = new Bitset();
    const b3 = new Bitset();

    b2.set(200);
    b1.or(b2);
    expect(b1.test(200)).toBe(true);

    b1.set(1024);
    b2.or(b1);
    expect(b2.test(1024)).toBe(true);

    b3.set(12);
    b2.or(b3);
    expect(b2.test(12)).toBe(true);
  });

  it('can perform bitwise xor', () => {
    const b1 = new Bitset();
    const b2 = new Bitset();
    const b3 = new Bitset();

    b2.set(200);
    b1.xor(b2);
    expect(b1.test(200)).toBe(true);

    b1.set(1024);
    b2.xor(b1);
    expect(b2.test(1024)).toBe(true);

    b3.set(12);
    b2.xor(b3);
    expect(b2.test(12)).toBe(true);

    b2.xor(b3);
    expect(b2.test(12)).toBe(false);
  });
});