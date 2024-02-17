package huffman;

import bitoperator.Bits;

public class HuffmanTreeNode {

    public Byte b;
    public int count;

    public HuffmanTreeNode left = null;
    public HuffmanTreeNode right = null;

    public Bits code = new Bits();

    public HuffmanTreeNode() {
    }

    public HuffmanTreeNode(Byte b, int count) {
        this.b = b;
        this.count = count;
    }
}
