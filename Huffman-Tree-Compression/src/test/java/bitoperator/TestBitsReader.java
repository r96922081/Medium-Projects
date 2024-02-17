package bitoperator;

import org.junit.jupiter.api.Test;

import java.util.Arrays;

public class TestBitsReader {
    @Test
    void test1() {
        BitsReader br = new BitsReader(10, Arrays.asList((byte) 0x7f, (byte) 0x80));
        assert (br.readBit() == 0);
        assert (br.readBit() == 1);
        assert (br.readBit() == 1);
        assert (br.readBit() == 1);
        assert (br.readBit() == 1);
        assert (br.readBit() == 1);
        assert (br.readBit() == 1);
        assert (br.readBit() == 1);
        assert (br.readBit() == 1);
        assert (br.readBit() == 0);
    }
}
