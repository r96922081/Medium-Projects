import bitoperator.Bits;
import bitoperator.BitsReader;
import huffman.HuffmanTree;
import huffman.HuffmanTreeNode;
import module.Decoder;
import module.Serializer;
import module.Util;

import java.io.BufferedOutputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Decompressor {
    private static void decompressFile(String outputFile, HuffmanTreeNode root, int bitCount, byte[] compressedContent) throws Exception {
        try (FileOutputStream fileOutputStream = new FileOutputStream(outputFile);
             BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(fileOutputStream)) {

            List<Byte> byteList = new ArrayList<>();
            for (int i = 0; i < compressedContent.length; i++) {
                byteList.add(compressedContent[i]);
            }

            BitsReader br = new BitsReader(bitCount, byteList);
            Decoder decoder = new Decoder(root);

            int bit = br.readBit();
            while (bit != -1) {
                Byte b = decoder.readBit(bit);
                if (b != null)
                    bufferedOutputStream.write(b);
                bit = br.readBit();
            }
        }
    }

    private static byte[] readFile(String inputFile) throws Exception {
        return Files.readAllBytes(Paths.get(inputFile));
    }

    private static Util.Triple<Map<Byte, Bits>, Integer, byte[]> getContent(byte[] compressedContent) throws Exception {
        return new Serializer().deserialize(compressedContent);
    }

    private static HuffmanTreeNode getHuffmanTree(Map<Byte, Bits> code) {
        return HuffmanTree.getTree(code);
    }

    public static void decompress(String inputFile, String outputFile) throws Exception {
        byte[] compressedContent = readFile(inputFile);

        Util.Triple<Map<Byte, Bits>, Integer, byte[]> ret = getContent(compressedContent);
        Map<Byte, Bits> code = ret.first;
        int bitCount = ret.second;
        byte[] compressedContent2 = ret.third;

        HuffmanTreeNode root = getHuffmanTree(code);

        decompressFile(outputFile, root, bitCount, compressedContent2);
    }


}
