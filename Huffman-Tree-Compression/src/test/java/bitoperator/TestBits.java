package bitoperator;

import org.junit.jupiter.api.Test;

public class TestBits {
    @Test
    void test1() {
        Bits b = new Bits();
        b.addBit(1);
        b.addBit(1);
        b.addBit(1);
        assert (b.size == 3);
        assert (b.value == 7);
        b.addBit(0);
        b.addBit(1);
        assert (b.readBit() == 1);
        assert (b.readBit() == 1);
        assert (b.readBit() == 1);
        assert (b.readBit() == 0);

        b.addBit(0);
        assert (b.readBit() == 1);
        assert (b.readBit() == 0);
        assert (b.size == 0);
    }

    @Test
    void test2() {
        Bits b = new Bits(5, 3);
        assert (b.readBit() == 1);
        assert (b.readBit() == 0);
        assert (b.readBit() == 1);
    }

    @Test
    void test3() {
        Bits b = new Bits(0, 0);
        for (int i = 0; i < 19; i++)
            b.addBit(1);
        b.addBit(0);

        for (int i = 0; i < 19; i++)
            assert (b.readBit() == 1);
        assert (b.readBit() == 0);
    }
}
