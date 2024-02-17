package huffman;

import bitoperator.Bits;
import org.junit.jupiter.api.Test;

import java.util.*;

public class TestHuffmanTree {
    @Test
    void testGetCode1() {
        Map<Byte, Integer> count = new HashMap<>();
        Map<Byte, Bits> code = HuffmanTree.getCode(count);
        assert (code.size() == 0);
    }

    @Test
    void testGetCode2() {
        Map<Byte, Integer> count = new HashMap<>();
        count.put((byte) 0x01, 1);
        Map<Byte, Bits> code = HuffmanTree.getCode(count);
        assert (code.size() == 1);

        Bits b = code.get((byte) 0x01);
        assert (b.size == 1);
        assert (b.value == 0);
    }

    @Test
    void testGetCode3() {
        Map<Byte, Integer> count = new HashMap<>();
        count.put((byte) 0x01, 1);
        count.put((byte) 0x02, 2);
        Map<Byte, Bits> code = HuffmanTree.getCode(count);
        assert (code.size() == 2);

        Bits b = code.get((byte) 0x01);
        assert (b.size == 1);
        assert (b.value == 0);

        b = code.get((byte) 0x02);
        assert (b.size == 1);
        assert (b.value == 1);
    }

    @Test
    void testGetCode4() {
        // fibonacci number creates the longest bit count
        long[] fibs = {1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144};

        List<Integer> data = new ArrayList<>();
        for (int i = 0; i < fibs.length; i++) {
            for (int j = 0; j < fibs[i]; j++) {
                data.add(i);
            }
        }

        checkSizeAndPrefix(data);
    }

    void checkSizeAndPrefix(List<Integer> dataInt) {
        List<Byte> data = dataInt.stream().map(i -> (byte) (int) i).toList();
        Set<Byte> dataSet = new HashSet<>(data);
        Map<Byte, Bits> codeMap = HuffmanTree.getCode(data);

        assert (codeMap.size() == dataSet.size());
        List<Bits> allBits = new ArrayList<>(codeMap.values());

        for (int i = 0; i < allBits.size(); i++) {
            Bits bit1 = allBits.get(i);
            for (int j = 0; j < allBits.size(); j++) {
                Bits bit2 = allBits.get(j);
                if (bit1 != bit2) {
                    assert (!bit1.toString().startsWith(bit2.toString()));
                    assert (!bit2.toString().startsWith(bit1.toString()));
                }
            }
        }
    }

    @Test
    void testGetTree1() {
        Map<Byte, Bits> code = new HashMap<>();

        HuffmanTreeNode root = HuffmanTree.getTree(code);
        assert (root == null);
    }

    @Test
    void testGetTree2() {
        Map<Byte, Bits> code = new HashMap<>();
        code.put((byte) 0x00, new Bits(0, 1));
        code.put((byte) 0x01, new Bits(1, 1));


        HuffmanTreeNode root = HuffmanTree.getTree(code);
        assert (root.left.b == (byte) 0x00);
        assert (root.right.b == (byte) 0x01);
    }

    @Test
    void testGetTree3() {
        Map<Byte, Bits> code = new HashMap<>();
        code.put((byte) 0x00, new Bits(0, 1)); // 0
        code.put((byte) 0x02, new Bits(2, 2)); // 10
        code.put((byte) 0x03, new Bits(3, 2)); // 11

        HuffmanTreeNode root = HuffmanTree.getTree(code);
        assert (root.left.b == (byte) 0x00);
        assert (root.right.b == null);
        assert (root.right.left.b == (byte) 0x02);
        assert (root.right.right.b == (byte) 0x03);
    }

    @Test
    void testGetTree4() {
        Map<Byte, Bits> code = new HashMap<>();
        code.put((byte) 4, new Bits(4, 3)); // 100
        code.put((byte) 10, new Bits(10, 4)); // 1010
        code.put((byte) 11, new Bits(11, 4)); // 1011

        HuffmanTreeNode root = HuffmanTree.getTree(code);
        assert (root.right.left.left.b == (byte) 4);
        assert (root.right.left.right.left.b == (byte) 10);
        assert (root.right.left.right.right.b == (byte) 11);
    }
}
