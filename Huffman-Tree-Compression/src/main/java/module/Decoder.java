package module;

import huffman.HuffmanTreeNode;

public class Decoder {
    HuffmanTreeNode root;
    HuffmanTreeNode current;

    public Decoder(HuffmanTreeNode root) {
        this.root = root;
        current = root;
    }

    public Byte readBit(int bit) {
        if (bit == 0)
            current = current.left;
        else
            current = current.right;

        if (current.b != null) {
            Byte b = current.b;
            current = root;
            return b;
        } else {
            return null;
        }
    }
}
