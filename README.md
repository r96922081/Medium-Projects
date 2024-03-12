1. [HuffmanTreeCompression](#HuffmanTreeCompression)
2. [RDBMS](#RDBMS)


# HuffmanTreeCompression
- ~0.64 compression ratio for text file
- Compress file: Compressor.compress("huffman_wiki.txt", "huffman_wiki.txt_compressed")
- Decompress file: Decompressor.decompress("huffman_wiki.txt_compressed", "huffman_wiki.txt_decompressed")

# RDBMS
- A prototype relational DB backed BTree
- Table is stored in disk
- Index column is stored in BTree in disk
- SQL syntax is very limited now
\
\
input:\
![](https://r96922081.github.io/images/rdbms_input.png)
\
output:\
![](https://r96922081.github.io/images/rdbms_output.png)