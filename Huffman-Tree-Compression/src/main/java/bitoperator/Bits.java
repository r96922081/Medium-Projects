package bitoperator;

import java.util.Objects;

public class Bits {
    public int value = 0;
    public int size = 0;

    public Bits() {
    }

    public Bits(int value, int size) {
        this.value = value;
        this.size = size;
    }

    public void addBit(int b) {
        if (size == 32)
            throw new Error();
        value <<= 1;
        value |= b;
        size++;
    }

    public int readBit() {
        if (size == 0)
            throw new Error();

        size--;
        int b2 = 1 << size;
        if ((b2 & value) == 0)
            return 0;
        return 1;
    }

    public Bits clone() {
        Bits b = new Bits();
        b.value = this.value;
        b.size = this.size;
        return b;
    }

    @Override
    public String toString() {
        Bits b2 = this.clone();
        String str = "";
        while (b2.size > 0) {
            str += b2.readBit();
        }

        return str;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Bits that = (Bits) o;
        return value == that.value && size == that.size;
    }

    @Override
    public int hashCode() {
        return Objects.hash(value, size);
    }
}
