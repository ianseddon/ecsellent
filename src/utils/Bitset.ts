/**
 * A bitset used for fast comparisons.
 */
export class Bitset {
  private data: Int32Array;

  constructor(bits = 64) {
    this.data = new Int32Array(Math.max(2, Math.ceil(bits / 32)));
  }

  /**
   * Check if the given bit position is set.
   *
   * @param position The bit position.
   */
  test(position: number) : boolean {
    const index = this.positionToIndex(position);
    // If out of range, return false.
    if (index >= this.data.length) {
      return false;
    }
    return (this.data[index] & (1 << (position & 0x1f))) !== 0;
  }

  /**
   * Set the given bit position.
   *
   * @param position The bit position.
   */
  set(position: number) : Bitset {
    const index = this.positionToIndex(position);
    this.allocate(index);
    this.data[index] |= 1 << (position & 0x1f);

    return this;
  }

  /**
   * Set all bits.
   */
  setAll() : Bitset {
    this.data.fill(-1);

    return this;
  }

  /**
   * Reset the given bit.
   *
   * @param position The bit position.
   */
  reset(position: number) : Bitset {
    const index = this.positionToIndex(position);
    // If in range, reset.
    if (index <= this.data.length) {
      this.data[index] &= ~(1 << (position & 0x1f));
    }
    return this;
  }

  /**
   * Reset all bits.
   */
  clear() : Bitset {
    this.data.fill(0);
    return this;
  }

  /**
   * Flip the bit at the given position.
   *
   * @param position The bit position.
   */
  flip(position: number) : Bitset {
    const index = this.positionToIndex(position);
    this.allocate(index);
    this.data[index] ^= 1 << (index & 0x1f);
    return this;
  }

  /**
   * Count the number of bits set.
   */
  count() : number {
    for (let index = this.data.length - 1; index >= 0; index--) {
      const data = this.data[index];
      if (data === 0) {
        continue;
      }
      for (let bit = 31; bit >= 0; bit--) {
        if ((data & (1 << (bit & 0x1f))) !== 0) {
          return this.indexToBitPosition(index) + bit + 1;
        }
      }
    }
    return 0;
  }

  /**
   * Get the size of the bitset in bits.
   */
  size() : number {
    return this.indexToBitPosition(this.data.length);
  }

  /**
   * Whether all bits are set.
   */
  all() : boolean {
    throw new Error('Not yet implemented');
  }

  /**
   * Whether no bits are set.
   */
  none() : boolean {
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i] !== 0) {
        return false;
      }
    }
    return true;
  }

  /**
   * Perform a bitwise AND against another bitset.
   *
   * @param other The other bitset.
   */
  and(other: Bitset) : this {
    const commonIndices = Math.min(this.data.length, other.data.length);
    for (let i = 0; commonIndices > i; i++) {
      this.data[i] &= other.data[i];
    }

    if (this.data.length > commonIndices) {
      for (let i = 0, s = this.data.length; s > i; i++) {
        this.data[i] = 0;
      }
    }

    return this;
  }

  /**
   * Resets all bits that are set in the other bitset.
   *
   * @param other The other bitset.
   */
  andNot(other: Bitset) : this {
    const commonIndices = Math.min(this.data.length, other.data.length);
    for (let i = 0; i < commonIndices; i++) {
      this.data[i] &= ~other.data[i];
    }
    return this;
  }

  /**
   * Perform a bitwise OR against another bitset.
   *
   * @param other The other bucket.
   */
  or(other: Bitset) : this {
    const commonIndices = Math.min(this.data.length, other.data.length);
    for (let i = 0; commonIndices > i; i++) {
      this.data[i] |= other.data[i];
    }

    if (commonIndices < other.data.length) {
      this.allocate(other.data.length);
      for (let i = commonIndices, s = other.data.length; s > i; i++) {
        this.data[i] = other.data[i];
      }
    }
    return this;
  }

  /**
   * Perform a bitwise XOR against another bitset.
   *
   * @param other The other bitset.
   */
  xor(other: Bitset) : this {
    const commonIndices = Math.min(this.data.length, other.data.length);

    for (let i = 0; commonIndices > i; i++) {
      this.data[i] ^= other.data[i];
    }

    if (commonIndices < other.data.length) {
      this.allocate(other.data.length);
      for (let i = commonIndices, s = other.data.length; s > i; i++) {
        this.data[i] = other.data[i];
      }
    }

    return this;
  }

  /**
   * Check if the other bitset shares any set bits with this one.
   *
   * @param other The other bitset.
   */
  intersects(other: Bitset) : boolean {
    for (let i = Math.min(this.data.length, other.data.length) - 1; i >= 0; i--) {
      if ((this.data[i] & other.data[i]) !== 0) {
        return true;
      }
    }
    return false;
  }

  /**
   * Check if the other bitset contains all bits set in this bitset.
   *
   * @param other The other bitset.
   */
  containsAll(other: Bitset): boolean {
    for (let i = this.data.length; i < other.data.length; i++) {
      if (other.data[i] !== 0) {
        return false;
      }
    }
    for (let i = Math.min(this.data.length, other.data.length) - 1; i >= 0; i--) {
      if ((this.data[i] & other.data[i]) !== other.data[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Return the number of allocated indices.
   */
  allocatedIndices() : number {
    for (let i = this.data.length - 1; i >= 0; i--) {
      if (this.data[i] !== 0) {
        return i + 1;
      }
    }
    return 0;
  }

  /**
   * Ensure the given index is allocated and can have bits set.
   *
   * @param index The index to allocate.
   */
  private allocate(index: number) {
    if (index <= this.data.length) {
      return;
    }

    const data = new Int32Array(index + 1);
    data.set(this.data);
    this.data = data;
  }

  /**
   * Convert a bit position to an index for the data array.
   *
   * @param position The bit position.
   */
  private positionToIndex(position: number) {
    return position >> 5;
  }

  /**
   * Convert an index to a bit position.
   * @param index The index.
   */
  private indexToBitPosition(index: number) {
    return index << 5;
  }
}