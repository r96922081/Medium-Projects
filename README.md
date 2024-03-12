1. [HuffmanTreeCompression](#HuffmanTreeCompression)
2. [RDBMS](#RDBMS)
3. [Static-Web-Page]Static Web Page (#Static Web Page)


# HuffmanTreeCompression
- ~0.64 compression ratio for text file
- Compress file: Compressor.compress("huffman_wiki.txt", "huffman_wiki.txt_compressed")
- Decompress file: Decompressor.decompress("huffman_wiki.txt_compressed", "huffman_wiki.txt_decompressed")

# RDBMS
- A relational DB prototype backed by BTree
- The purpose is to learn how to use BTree to store data in disk
- Index column is stored in BTree in disk
- SQL syntax is very restricted now
\
\
input:\
![](https://r96922081.github.io/images/rdbms_input.png)
\
output:\
![](https://r96922081.github.io/images/rdbms_output.png)

# Static-Web-Page
- Use html, css, javascript to create basic layout
- Trans-compile ts to js
- Use go to dynamically added folders' content into html
- https://r96922081.github.io/my_static_page.html
\
\
![](https://r96922081.github.io/images/my_static_page.png)
- Build code
    - [Step 1] A go program that traverses [pages] folder recursively and creates a type script file that added those hierarchal folders' content into html 
    - ![](https://r96922081.github.io/images/static_page_folders.png)
    - [Step 2] Transcompile type script to java script