package test

import (
	"fmt"
	"rdbms/util"
	"testing"
)

/*
	    op      precedence
		+ * ?        3
		. (concate)  2
		|            1
		()
*/

func UtAugmentReWithDot(t *testing.T) {
	AssertTrue(t, util.AugmentReWithDot("ab") == "a.b")
	AssertTrue(t, util.AugmentReWithDot("abc") == "a.b.c")
	AssertTrue(t, util.AugmentReWithDot("a+b") == "a+.b")
	AssertTrue(t, util.AugmentReWithDot("ab*c") == "a.b*.c")
	AssertTrue(t, util.AugmentReWithDot("a(bc)?d") == "a.(b.c)?.d")
	AssertTrue(t, util.AugmentReWithDot("ab|cd") == "a.b|c.d")
	AssertTrue(t, util.AugmentReWithDot("ab+c|d") == "a.b+.c|d")
	AssertTrue(t, util.AugmentReWithDot("hi(f(ab|cd|e)|g)") == "h.i.(f.(a.b|c.d|e)|g)")
	AssertTrue(t, util.AugmentReWithDot("d((ab)c)e") == "d.((a.b).c).e")
	AssertTrue(t, util.AugmentReWithDot("d(c(ab))e") == "d.(c.(a.b)).e")
}

func UtReToPostfix(t *testing.T) {
	AssertTrue(t, util.ReToPostfix("ab") == "ab.")
	AssertTrue(t, util.ReToPostfix("abc") == "ab.c.")
	AssertTrue(t, util.ReToPostfix("a+b") == "a+b.")
	AssertTrue(t, util.ReToPostfix("ab*c") == "ab*.c.")
	AssertTrue(t, util.ReToPostfix("a(bc)?d") == "abc.?.d.")
	AssertTrue(t, util.ReToPostfix("ab|cd") == "ab.cd.|")
	AssertTrue(t, util.ReToPostfix("ab|c*d+") == "ab.c*d+.|")
	AssertTrue(t, util.ReToPostfix("a(cd|ef)?g") == "acd.ef.|?.g.")
	AssertTrue(t, util.ReToPostfix("a((cd|ef)g+h)i") == "acd.ef.|g+.h..i.")
}

func TestRe(t *testing.T) {
	//UtAugmentReWithDot()
	//UtReToPostfix()
	util.CompileNFA("ab.")
	fmt.Println("RE Test")
}
