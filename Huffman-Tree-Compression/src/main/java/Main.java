public class Main {
    public static void main(String[] args) throws Exception {
        Compressor.compress("huffman_wiki.txt", "huffman_wiki.txt_compressed");
        Decompressor.decompress("huffman_wiki.txt_compressed", "huffman_wiki.txt_decompressed");
    }
}