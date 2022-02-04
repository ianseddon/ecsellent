/**
 * A bitset used for fast comparisons.
 */
export declare class Bitset {
    private data;
    constructor(bits?: number);
    /**
     * Check if the given bit position is set.
     *
     * @param position The bit position.
     */
    test(position: number): boolean;
    /**
     * Set the given bit position.
     *
     * @param position The bit position.
     */
    set(position: number): Bitset;
    /**
     * Set all bits.
     */
    setAll(): Bitset;
    /**
     * Reset the given bit.
     *
     * @param position The bit position.
     */
    reset(position: number): Bitset;
    /**
     * Reset all bits.
     */
    clear(): Bitset;
    /**
     * Flip the bit at the given position.
     *
     * @param position The bit position.
     */
    flip(position: number): Bitset;
    /**
     * Count the number of bits set.
     */
    count(): number;
    /**
     * Get the size of the bitset in bits.
     */
    size(): number;
    /**
     * Whether all bits are set.
     */
    all(): boolean;
    /**
     * Whether no bits are set.
     */
    none(): boolean;
    /**
     * Perform a bitwise AND against another bitset.
     *
     * @param other The other bitset.
     */
    and(other: Bitset): this;
    /**
     * Resets all bits that are set in the other bitset.
     *
     * @param other The other bitset.
     */
    andNot(other: Bitset): this;
    /**
     * Perform a bitwise OR against another bitset.
     *
     * @param other The other bucket.
     */
    or(other: Bitset): this;
    /**
     * Perform a bitwise XOR against another bitset.
     *
     * @param other The other bitset.
     */
    xor(other: Bitset): this;
    /**
     * Check if the other bitset shares any set bits with this one.
     *
     * @param other The other bitset.
     */
    intersects(other: Bitset): boolean;
    /**
     * Check if the other bitset contains all bits set in this bitset.
     *
     * @param other The other bitset.
     */
    containsAll(other: Bitset): boolean;
    /**
     * Return the number of allocated indices.
     */
    allocatedIndices(): number;
    /**
     * Ensure the given index is allocated and can have bits set.
     *
     * @param index The index to allocate.
     */
    private allocate;
    /**
     * Convert a bit position to an index for the data array.
     *
     * @param position The bit position.
     */
    private positionToIndex;
    /**
     * Convert an index to a bit position.
     * @param index The index.
     */
    private indexToBitPosition;
}
