package bitoperator;

import module.Util;

import java.util.ArrayList;
import java.util.List;

public class BitsWriter {
    List<Byte> bytes = new ArrayList<>();

    Bits residual = new Bits();

    public Util.Pair<Integer, List<Byte>> getBytesAndClear() {
        int bitCount = bytes.size() * 8 + residual.size;
        if (residual.size != 0)
            bytes.add((byte) (residual.value << (8 - residual.size)));

        return new Util.Pair<Integer, List<Byte>>(bitCount, bytes);
    }

    private void writeBit(Bits b1, int b2) {
        if (b1.size == 32)
            throw new Error();
        b1.value <<= 1;
        b1.value |= b2;
        b1.size++;
    }

    public void write(Bits b) {
        int value = b.value;
        int valueSize = b.size;

        while (valueSize > 0) {
            int writeSize = Math.min(8 - residual.size, valueSize);
            for (int i = 0; i < writeSize; i++) {
                if ((value & (1 << (valueSize - 1 - i))) == 0)
                    writeBit(residual, 0);
                else
                    writeBit(residual, 1);
            }

            if (residual.size == 8) {
                bytes.add((byte) residual.value);
                residual.size = 0;
                residual.value = 0;
            }
            valueSize -= writeSize;
        }
    }
}
