package module;

public class TestSerializer {

    /*
    void testData(List<Integer> dataInt) throws Exception {
        List<Byte> data = dataInt.stream().map(i -> (byte) (int) i).toList();
        Map<Byte, BitsWrapper> codeMap1 = HuffmanTree.build(data);

        BitsWriter bw = new BitsWriter();
        for (int i = 0; i < data.size(); i++) {
            bw.write(codeMap1.get(data.get(i)));
        }
        Util.Pair<Integer, List<Byte>> ret1 = bw.getBytesAndClear();
        int bitCount1 = ret1.first;
        List<Byte> bytes1 = ret1.second;

        Serializer s = new Serializer();
        byte[] serializedBytes = s.serialize(codeMap1, bitCount1, bytes1);
        Util.Triple<Map<Byte, BitsWrapper>, Integer, byte[]> ret2 = s.deserialize(serializedBytes);

        Map<Byte, BitsWrapper> codeMap2 = ret2.first;
        int bitCount2 = ret2.second;
        byte[] bytes2 = ret2.third;

        assert (codeMap1.equals(codeMap2));
        assert (bitCount1 == bitCount2);

        List<Byte> bytes2List = new ArrayList<>();
        for (int i = 0; i < bytes2.length; i++)
            bytes2List.add(bytes2[i]);

        assert (bytes1.equals(bytes2List));
    }

    @Test
    void test1() throws Exception {
        testData(Arrays.asList(0x11, 0x22, 0x33, 0x11, 0x22));
        testData(Arrays.asList(0x11, 0x11, 0x11, 0x22, 0x33, 0x11, 0x22, 0x22, 0x33));
    }

    @Test
    void test2() throws Exception {
        Map<Byte, BitsWrapper> codeMap = new HashMap<>();
        codeMap.put((byte) 1, new BitsWrapper(0xffff, 16));

        Serializer s = new Serializer();
        byte[] serializedBytes = s.serialize(codeMap, 16, Arrays.asList((byte) 0xff, (byte) 0xff));
        Util.Triple<Map<Byte, BitsWrapper>, Integer, byte[]> ret2 = s.deserialize(serializedBytes);

        Map<Byte, BitsWrapper> codeMap2 = ret2.first;
        int bitCount2 = ret2.second;
        byte[] bytes3 = ret2.third;

        assert (codeMap.equals(codeMap2));
        assert (16 == bitCount2);
        assert (bytes3[0] == (byte) 0xff);
        assert (bytes3[1] == (byte) 0xff);

    }


    @Test
    void test3() throws Exception {
        Random r = new Random();
        r.setSeed(0);

        List<Integer> data = new ArrayList<>();

        for (int i = 0; i < 100000; i++) {
            data.add(r.nextInt() % 256);
        }

        testData(data);

    }*/
}
