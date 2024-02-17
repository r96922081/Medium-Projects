package module;

import bitoperator.Bits;

import java.io.*;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class Serializer {
    public byte[] serialize(Map<Byte, Bits> codeMap, int bitCount, List<Byte> bytes) throws Exception {
        try (ByteArrayOutputStream baos = new ByteArrayOutputStream(); DataOutputStream dos = new DataOutputStream(new BufferedOutputStream(baos))) {
        /*
           ---------
           1.
           int: key count
           ---------
           2.
           byte: key1 byte
           int: key1 bit count
           int: key1 bits (written in byte)
           ... key n
           ----------
           3.
           int: bit count
           ----------
           4.
           bytes[] (length = ceil(bit count/8))
           ----------
         */

        /*
        1.
        int: key count
         */
            dos.writeInt(codeMap.size());

        /*
       2.
       byte: key1 byte
       int: key1 bit count
       int: key1 bits (written in byte)
       ... key n
         */
            for (byte b : codeMap.keySet()) {
                dos.writeByte(b);
                Bits bw2 = codeMap.get(b);
                dos.writeInt(bw2.size);
                dos.writeInt(bw2.value);
            }

        /*
       3.
       int: bit count
         */
            dos.writeInt(bitCount);

        /*
       4.
       bytes[] (length = ceil(bit count/8))
         */
            byte[] bytes2 = new byte[bytes.size()];
            for (int i = 0; i < bytes.size(); i++)
                bytes2[i] = bytes.get(i);
            dos.write(bytes2);

            dos.flush();

            return baos.toByteArray();
        }
    }

    public Util.Triple<Map<Byte, Bits>, Integer, byte[]> deserialize(byte[] compressedBytes) throws Exception {
        try (DataInputStream dis = new DataInputStream(new ByteArrayInputStream(compressedBytes))) {
            /*
               ---------
               int: key count
               ---------
               byte: key1 byte
               int: key1 bit count
               int: key1 bits
               ---------
               ... key2 ...
               ----------
               int: bit count
               ----------
               bytes[] (length = ceil(bit count/8))
               ----------
             */

            Map<Byte, Bits> code = new HashMap();
            int keyCount = dis.readInt();
            for (int i = 0; i < keyCount; i++) {
                byte b = dis.readByte();
                int size = dis.readInt();
                int value = dis.readInt();
                Bits bw = new Bits(value, size);
                code.put(b, bw);
            }

            int bitCount = dis.readInt();
            byte[] bytes = new byte[(bitCount + 7) / 8];
            dis.read(bytes, 0, bytes.length);

            return new Util.Triple<>(code, bitCount, bytes);
        }
    }
}
