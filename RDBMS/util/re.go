package util

import (
	"strings"
)

func operatorPrecedence(op string) int {
	switch op {
	case "|":
		return 1
	case ".":
		return 2
	case "*", "+", "?":
		return 3
	default:
		panic("")
	}
}

func isOperator(c string) bool {
	return c == "|" || c == "." || c == "*" || c == "+" || c == "?" || c == "(" || c == ")"
}

func popOneOperator(operatorStack *[]string, postfixStack *[]string) {
	operator := (*operatorStack)[len(*operatorStack)-1]
	*operatorStack = (*operatorStack)[:len(*operatorStack)-1]

	if operator == "|" || operator == "." {
		b := (*postfixStack)[len(*postfixStack)-1]
		a := (*postfixStack)[len(*postfixStack)-2]
		(*postfixStack) = (*postfixStack)[:len(*postfixStack)-2]
		*postfixStack = append(*postfixStack, a+b+operator)
	} else {
		a := (*postfixStack)[len(*postfixStack)-1]
		(*postfixStack) = (*postfixStack)[:len(*postfixStack)-1]
		*postfixStack = append(*postfixStack, a+operator)
	}
}

func ReToPostfix(re string) string {
	re2 := AugmentReWithDot(re)
	operatorStack := []string{}
	postfixStack := []string{}

	for _, c := range strings.Split(re2, "") {
		if c == "(" {
			operatorStack = append(operatorStack, c)
		} else if c == ")" {
			for operatorStack[len(operatorStack)-1] != "(" {
				popOneOperator(&operatorStack, &postfixStack)
			}
			operatorStack = operatorStack[:len(operatorStack)-1]
		} else if isOperator(c) {
			for len(operatorStack) > 0 && operatorStack[len(operatorStack)-1] != "(" && operatorPrecedence(operatorStack[len(operatorStack)-1]) >= operatorPrecedence(c) {
				popOneOperator(&operatorStack, &postfixStack)
			}
			operatorStack = append(operatorStack, c)
		} else {
			postfixStack = append(postfixStack, c)
		}
	}

	for len(operatorStack) > 0 {
		popOneOperator(&operatorStack, &postfixStack)
	}

	if len(postfixStack) != 1 {
		panic("")
	}

	return postfixStack[0]
}

func AugmentReWithDot(re string) string {
	augmentedRe := ""

	prevC := "|"
	for _, c2 := range re {
		c := string(c2)
		if (!isOperator(c) || c == "(") && (prevC != "(" && prevC != "|") {
			augmentedRe += "."
		}
		augmentedRe += c
		prevC = c
	}

	return augmentedRe
}

type State struct {
	input string
	out1  *State
	out2  *State
}

func NewState(input string) *State {
	s := &State{}
	s.input = input

	return s
}

type Frag struct {
	s    *State
	out1 *State
	out2 *State
}

func NewFrag(s *State) *Frag {
	f := &Frag{}
	f.s = s

	return f
}

func CompileNFA(rePostfix string) *State {
	FragStack := make([]*Frag, 0)

	for _, c2 := range rePostfix {
		c := string(c2)
		if !isOperator(c) {
			f := NewFrag(NewState(c))
			FragStack = append(FragStack, f)
		} else {
			if c == "." {
				f2 := FragStack[len(FragStack)-1]
				f1 := FragStack[len(FragStack)-2]
				FragStack = FragStack[2:]
				f1.s.out1 = f2.s
				f1.out1 = f2.out1
				FragStack = append(FragStack, f1)
			}
		}
	}

	if len(FragStack) != 1 {
		panic("")
	}

	return FragStack[0].s
}
