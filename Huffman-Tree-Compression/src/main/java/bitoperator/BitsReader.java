package bitoperator;

import java.util.ArrayList;
import java.util.List;

public class BitsReader {
    List<Byte> bytes = new ArrayList<>();

    Bits residual = new Bits();

    Bits currentReadByte = new Bits();

    public BitsReader(int bitCount, List<Byte> bytes) {
        residual = new Bits();

        this.bytes.addAll(bytes);

        if (bitCount % 8 != 0) {
            byte b = this.bytes.remove(this.bytes.size() - 1);
            for (int i = 0; i < bitCount % 8; i++)
                writeBit(residual, ((b & (1 << (7 - i))) == 0) ? 0 : 1);
        }
    }

    private void writeBit(Bits b1, int b2) {
        if (b1.size == 32)
            throw new Error();
        b1.value <<= 1;
        b1.value |= b2;
        b1.size++;
    }

    public int readBit() {
        if (currentReadByte.size == 0) {
            if (!bytes.isEmpty()) {
                byte b = this.bytes.remove(0);
                currentReadByte.size = 8;
                currentReadByte.value = b;
            } else {
                currentReadByte = residual.clone();
                residual = new Bits();
            }
        }

        if (currentReadByte.size == 0)
            return -1;

        return currentReadByte.readBit();
    }
}
