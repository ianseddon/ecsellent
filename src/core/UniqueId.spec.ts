import { UniqueId } from "./UniqueId";

class DummyClass {}
class OtherDummyClass {}

class BaseClass {}
class FirstClass extends BaseClass {}
class OtherFirstClass extends BaseClass {}
class SecondClass extends BaseClass {}

describe('UniqueId', () => {
  it('generates an id for classes with no base class', () => {
    const id1 = UniqueId.forClass(DummyClass);
    const id2 = UniqueId.forClass(OtherDummyClass);
    
    expect(id1).not.toBe(id2);
    expect(UniqueId.forClass(DummyClass)).toBe(id1);
    expect(UniqueId.forClass(OtherDummyClass)).toBe(id2);
  });

  it('generates the same ids for the same class', () => {
    const id1 = UniqueId.forClass(FirstClass);
    const id2 = UniqueId.forClass(FirstClass);

    expect(id1).toBe(id2);
  });

  it('generates different ids for different classes', () => {
    const id1 = UniqueId.forClass(FirstClass);
    const id2 = UniqueId.forClass(OtherFirstClass);
    const id3 = UniqueId.forClass(SecondClass);

    expect(id1).not.toBe(id2);
    expect(id1).not.toBe(id3);
    expect(id2).not.toBe(id3);
  });

  it('groups classes by parentage', () => {
    expect(UniqueId.forClass(FirstClass).getBaseIndex())
      .toBe(UniqueId.forClass(BaseClass).getIndex());
    expect(UniqueId.forClass(OtherFirstClass).getBaseIndex())
      .toBe(UniqueId.forClass(BaseClass).getIndex());
    expect(UniqueId.forClass(SecondClass).getBaseIndex())
      .toBe(UniqueId.forClass(BaseClass).getIndex());
  });
});