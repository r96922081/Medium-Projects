package bitoperator;

import module.Util;
import org.junit.jupiter.api.Test;

import java.util.List;

public class TestBitsWriter {
    @Test
    void test1() {
        BitsWriter bw = new BitsWriter();
        bw.write(new Bits(0xff, 7));
        bw.write(new Bits(0, 8));
        bw.write(new Bits(0xff, 2));
        Util.Pair<Integer, List<Byte>> p = bw.getBytesAndClear();
        assert (p.first == 17);
        assert (p.second.size() == 3);

        List<Byte> bytes = p.second;
        assert (bytes.get(0).byteValue() == (byte) 0xfe);
        assert (bytes.get(1).byteValue() == (byte) 0x1);
        assert (bytes.get(2).byteValue() == (byte) 0x80);
    }

    @Test
    void test2() {
        BitsWriter bw = new BitsWriter();
        bw.write(new Bits(0xff, 8));
        Util.Pair<Integer, List<Byte>> p = bw.getBytesAndClear();
        assert (p.first == 8);
        assert (p.second.size() == 1);
    }

    @Test
    void test3() {
        BitsWriter bw = new BitsWriter();
        bw.write(new Bits(0xffff, 13));
        bw.write(new Bits(0xfff, 12));
        Util.Pair<Integer, List<Byte>> p = bw.getBytesAndClear();
        assert (p.first == 25);
        assert (p.second.size() == 4);
    }
}
