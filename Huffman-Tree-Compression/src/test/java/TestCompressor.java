import org.junit.jupiter.api.Test;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

public class TestCompressor {

    private static String readStringFromFile(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        byte[] fileBytes = Files.readAllBytes(path);

        return new String(fileBytes, StandardCharsets.UTF_8);
    }

    void testFile(String inputFile) throws Exception {
        Compressor.compress(inputFile, inputFile + "_compressed");
        Decompressor.decompress(inputFile + "_compressed", inputFile + "_decompressed");

        String input = readStringFromFile(inputFile);
        String answer = readStringFromFile(inputFile + "_decompressed");
        assert (input.equals(answer));
    }

    @Test
    void test1() throws Exception {
        testFile("1.txt");
        testFile("2.txt");
        testFile("3.txt");
        testFile("huffman_wiki.txt");
        testFile("1.png");
    }
}
