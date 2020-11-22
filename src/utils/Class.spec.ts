import { getClass, getClassDepth, getParentClass } from "./Class";

class BaseClass {}
class FirstClass extends BaseClass {}
class OtherFirstClass extends BaseClass {}
class SecondClass extends FirstClass {}

describe('getClass', () => {
  it('gets the class of an object', () => {
    expect(getClass(new BaseClass)).toBe(BaseClass);
    expect(getClass(new FirstClass)).toBe(FirstClass);
  });
});

describe('getParentClass', () => {
  it('gets the parent class of an object', () => {
    expect(getParentClass(FirstClass)).toBe(BaseClass);
    expect(getParentClass(SecondClass)).toBe(FirstClass);
  });

  it('gets parent classes at a given depth', () => {
    expect(getParentClass(SecondClass, 2)).toBe(BaseClass);
  });
});

describe('getClassDepth', () => {
  it('returns zero for classes with no parent', () => {
    expect(getClassDepth(BaseClass)).toBe(0);
  });

  it('returns the number of parents for a given class', () => {
    expect(getClassDepth(BaseClass)).toBe(0);
    expect(getClassDepth(FirstClass)).toBe(1);
    expect(getClassDepth(OtherFirstClass)).toBe(1);
    expect(getClassDepth(SecondClass)).toBe(2);
  });
});