import bitoperator.Bits;
import bitoperator.BitsWriter;
import huffman.HuffmanTree;
import module.Serializer;
import module.Util;

import java.io.BufferedOutputStream;
import java.io.DataOutputStream;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class Compressor {
    private static List<Byte> readFile(String inputFile) throws Exception {
        byte[] fileBytes = Files.readAllBytes(Paths.get(inputFile));
        List<Byte> byteList = new ArrayList<>();
        for (byte b : fileBytes) {
            byteList.add(b);
        }

        return byteList;
    }

    private static Map<Byte, Bits> getCode(List<Byte> byteList) {
        return HuffmanTree.getCode(byteList);
    }

    private static Util.Pair<Integer, List<Byte>> serialize(List<Byte> content, Map<Byte, Bits> code) {
        BitsWriter bw = new BitsWriter();
        for (Byte b : content) {
            bw.write(code.get(b));
        }

        return bw.getBytesAndClear();
    }

    private static void writeFile(String outputFile, int bitCount, List<Byte> compressedContent, Map<Byte, Bits> code) throws Exception {
        Serializer s = new Serializer();
        byte[] compressedFile = s.serialize(code, bitCount, compressedContent);
        try (DataOutputStream dos = new DataOutputStream(new BufferedOutputStream(new FileOutputStream(outputFile)))) {
            dos.write(compressedFile);
        }
    }

    public static void compress(String inputFile, String outputFile) throws Exception {
        List<Byte> content = readFile(inputFile);
        Map<Byte, Bits> code = getCode(content);

        Util.Pair<Integer, List<Byte>> p = serialize(content, code);
        int bitCount = p.first;
        List<Byte> compressedContent = p.second;

        writeFile(outputFile, bitCount, compressedContent, code);
    }


}
