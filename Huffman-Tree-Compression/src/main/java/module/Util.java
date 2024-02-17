package module;

public class Util {

    public static class Pair<A, B> {
        public A first;
        public B second;

        public Pair(A first, B second) {
            this.first = first;
            this.second = second;
        }
    }

    public static class Triple<A, B, C> {
        public A first;
        public B second;
        public C third;

        public Triple(A first, B second, C third) {
            this.first = first;
            this.second = second;
            this.third = third;
        }
    }

    public static class Quadruple<A, B, C, D> {
        public A first;
        public B second;
        public C third;
        public D fourth;

        public Quadruple(A first, B second, C third, D fourth) {
            this.first = first;
            this.second = second;
            this.third = third;
            this.fourth = fourth;
        }
    }
}
