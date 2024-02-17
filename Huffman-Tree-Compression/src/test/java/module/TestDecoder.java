package module;

import bitoperator.Bits;
import huffman.HuffmanTree;
import huffman.HuffmanTreeNode;
import org.junit.jupiter.api.Test;

import java.util.HashMap;
import java.util.Map;

public class TestDecoder {
    @Test
    void testReadBit1() {
        Map<Byte, Bits> code = new HashMap<>();
        code.put((byte) 0x00, new Bits(0, 1)); // 0
        code.put((byte) 0x02, new Bits(2, 2)); // 10
        code.put((byte) 0x03, new Bits(3, 2)); // 11

        HuffmanTreeNode root = HuffmanTree.getTree(code);
        Decoder decoder = new Decoder(root);
        assert (decoder.readBit(1) == null);
        assert (decoder.readBit(0) == (byte) 2);
        assert (decoder.readBit(1) == null);
        assert (decoder.readBit(1) == (byte) 3);
        assert (decoder.readBit(0) == (byte) 0);
    }

    @Test
    void testReadBit2() {
        Map<Byte, Bits> code = new HashMap<>();
        code.put((byte) 4, new Bits(4, 3)); // 100
        code.put((byte) 10, new Bits(10, 4)); // 1010
        code.put((byte) 11, new Bits(11, 4)); // 1011

        HuffmanTreeNode root = HuffmanTree.getTree(code);
        Decoder decoder = new Decoder(root);
        assert (decoder.readBit(1) == null);
        assert (decoder.readBit(0) == null);
        assert (decoder.readBit(1) == null);
        assert (decoder.readBit(1) == (byte) 11);
    }
}
