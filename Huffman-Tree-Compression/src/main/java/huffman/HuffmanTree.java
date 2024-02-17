package huffman;

import bitoperator.Bits;

import java.util.*;

public class HuffmanTree {

    public static Map<Byte, Bits> getCode(Map<Byte, Integer> count) {
        if (count.size() == 0) {
            return new HashMap<Byte, Bits>();
        } else if (count.size() == 1) {
            HashMap<Byte, Bits> code = new HashMap<Byte, Bits>();
            code.put(count.keySet().iterator().next(), new Bits(0, 1));
            return code;
        }

        PriorityQueue<HuffmanTreeNode> q = new PriorityQueue<>(new MyComparator());
        for (Byte b : count.keySet()) {
            q.add(new HuffmanTreeNode(b, count.get(b)));
        }

        while (q.size() > 1) {
            HuffmanTreeNode c1 = q.poll();
            HuffmanTreeNode c2 = q.poll();
            HuffmanTreeNode parent = new HuffmanTreeNode(null, c1.count + c2.count);
            if (c1.count <= c2.count) {
                parent.left = c1;
                parent.right = c2;
            } else {
                parent.left = c2;
                parent.right = c1;
            }
            q.add(parent);
        }

        HuffmanTreeNode root = q.poll();
        return assignCode(root);
    }

    public static Map<Byte, Bits> getCode(List<Byte> data) {
        Map<Byte, Integer> count = new HashMap<>();
        for (int i = 0; i < data.size(); i++) {
            byte b = data.get(i);
            if (count.containsKey(b)) {
                count.put(b, count.get(b) + 1);
            } else {
                count.put(b, 1);
            }
        }

        return getCode(count);
    }

    private static void assignCode2(Map<Byte, Bits> codeMap, HuffmanTreeNode node) {
        if (node.left == null && node.right == null) {
            codeMap.put(node.b, node.code);
        }

        if (node.left != null) {
            node.left.code = node.code.clone();
            node.left.code.addBit(0);
            assignCode2(codeMap, node.left);
        }

        if (node.right != null) {
            node.right.code = node.code.clone();
            node.right.code.addBit(1);
            assignCode2(codeMap, node.right);
        }
    }

    private static Map<Byte, Bits> assignCode(HuffmanTreeNode node) {
        Map<Byte, Bits> codeMap = new HashMap<>();
        assignCode2(codeMap, node);
        return codeMap;
    }

    public static HuffmanTreeNode getTree(Map<Byte, Bits> code) {
        return getNode("", code);
    }

    private static HuffmanTreeNode getNode(String bitPrefix, Map<Byte, Bits> code) {
        if (code.isEmpty())
            return null;

        HuffmanTreeNode n = new HuffmanTreeNode();

        Map<Byte, Bits> leftCode = new HashMap<>();
        Map<Byte, Bits> rightCode = new HashMap<>();
        String leftCodePrefix = bitPrefix + "0";
        String rightCodePrefix = bitPrefix + "1";
        for (Byte key : code.keySet()) {
            Bits bits = code.get(key);
            if (bits.toString().equals(bitPrefix)) {
                n = new HuffmanTreeNode();
                n.b = key;
                return n;
            } else if (bits.toString().startsWith(leftCodePrefix)) {
                leftCode.put(key, bits);
            } else {
                rightCode.put(key, bits);
            }
        }

        n.left = getNode(leftCodePrefix, leftCode);
        n.right = getNode(rightCodePrefix, rightCode);

        return n;
    }

    private static class MyComparator implements Comparator<HuffmanTreeNode> {
        @Override
        public int compare(HuffmanTreeNode a, HuffmanTreeNode b) {
            if (a.count == b.count)
                return 0;
            if (a.count < b.count)
                return -1;
            return 1;
        }
    }
}
