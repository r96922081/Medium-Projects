package main

import (
	"fmt"
	"math"
	"strconv"
	"strings"
)

func check(b bool) {
	if !b {
		fmt.Println("check failed!")
	}
}

func naiveStringMatch(text string, pattern string) int {
	index := -1

	for i := 0; i <= len(text)-len(pattern); i++ {
		matched := true
		for j := 0; j < len(pattern) && i+j < len(text) && matched; j++ {
			if text[i+j] != pattern[j] {
				matched = false
			}
		}

		if matched {
			return i
		}
	}

	return index
}

func RabinKarpAlgorithm(text string, pattern string) int {
	modulo := int(math.Pow(2.0, 32-2)) - 1
	textBytes := []byte(text)
	patternBytes := []byte(pattern)
	alphabetSize := 128
	patternValue := 0
	patternSize := len(patternBytes)

	for i := 0; i < len(patternBytes); i++ {
		// (a + b) % c = (a%c + b%c) % c
		patternValue = ((patternValue*alphabetSize)%modulo + int(patternBytes[i])%modulo) % modulo
	}

	subTextValue := 0
	for i := 0; i < len(text); i++ {
		subTextValue = ((subTextValue*alphabetSize)%modulo + int(text[i])%modulo) % modulo

		if i-patternSize+1 < 0 {
			continue
		}

		subTextValue %= int(math.Pow(float64(alphabetSize), float64(patternSize)))

		// spurious hit. check it
		if subTextValue == patternValue {
			hit := true
			for j := 0; j < patternSize; j++ {
				if textBytes[i-patternSize+1+j] != patternBytes[j] {
					hit = false
					break
				}
			}

			if hit {
				return i - patternSize + 1
			}
		}
	}

	return -1
}

func getTransitionFunction(pattern string, firstLetter byte, alphabetSize int) [][]int {
	patternSize := len(pattern)
	patternByte := []byte(pattern)
	transitionFunction := make([][]int, patternSize)
	for i := 0; i < len(transitionFunction); i++ {
		transitionFunction[i] = make([]int, alphabetSize)
	}

	for state := 0; state < patternSize; state++ {
		currentPattern := []byte{}
		for i := 0; i < state; i++ {
			currentPattern = append(currentPattern, patternByte[i])
		}
		for i := byte(0); i < byte(alphabetSize); i++ {
			currentPattern = append(currentPattern, firstLetter+i)
			nextState := state + 1

			for {
				suffixMatchesPatternPrefix := true
				for j := 0; j < nextState; j++ {
					if currentPattern[len(currentPattern)-1-j] != patternByte[nextState-1-j] {
						suffixMatchesPatternPrefix = false
						break
					}
				}
				if suffixMatchesPatternPrefix {
					transitionFunction[state][i] = nextState
					break
				}
				nextState--
			}

			currentPattern = currentPattern[:len(currentPattern)-1]
		}
	}

	return transitionFunction
}

// Assume alphabet = {a, b, ... z}
func finiteStateAutomata(text string, pattern string) int {
	firstLetter := 'a'
	transitionFunction := getTransitionFunction(pattern, byte(firstLetter), 26)

	textByte := []byte(text)
	state := 0
	for i := 0; i < len(textByte); i++ {
		state = transitionFunction[state][textByte[i]-byte('a')]
		if state == len(pattern) {
			return i - len(pattern) + 1
		}
	}
	return -1
}

func getPrefixFunction(pattern string) []int {
	prefixFunction := make([]int, len(pattern))

	prefixFunction[0] = -1

	for n := 1; n < len(pattern); n++ {
		m := n - 1
		for m >= 0 && pattern[n] != pattern[prefixFunction[m]+1] {
			m = prefixFunction[m]
		}

		if m == -1 {
			prefixFunction[n] = -1
		} else {
			prefixFunction[n] = prefixFunction[m] + 1
		}
	}

	return prefixFunction
}

func KMP_Algorithm(text string, pattern string) int {
	state := 0
	prefixFunction := getPrefixFunction(pattern)

	for i := 0; i < len(text); i++ {
		for state >= 0 && pattern[state] != text[i] {
			if state == 0 {
				state = -1
			} else {
				state = prefixFunction[state-1] + 1
			}
		}

		state++

		if state == len(pattern) {
			return i - len(pattern) + 1
		}

	}

	return -1
}

type stringMatchAlgorithm func(string, string) int

func exhaustivelyTestStringMatchAlgorithm(algorithm stringMatchAlgorithm) {
	textLength := 3
	maxValue := 0

	for i := 0; i < textLength; i++ {
		maxValue += (textLength + 1) * (int)(math.Pow10(i))
	}

	for t := 0; t <= maxValue; t++ {
		for p := 0; p <= maxValue; p++ {
			text := strconv.Itoa(t)
			pattern := strconv.Itoa(p)
			check(strings.Index(text, pattern) == algorithm(text, pattern))
		}
	}
}

func main() {
	check(naiveStringMatch("abc", "bc") == 1)
	check(naiveStringMatch("abc", "cd") == -1)
	check(naiveStringMatch("abc", "c") == 2)
	exhaustivelyTestStringMatchAlgorithm(naiveStringMatch)

	check(RabinKarpAlgorithm("ab", "b") == 1)
	check(RabinKarpAlgorithm("abc", "ab") == 0)
	check(RabinKarpAlgorithm("abc", "bc") == 1)
	check(RabinKarpAlgorithm("abc", "cd") == -1)
	check(RabinKarpAlgorithm("abc", "c") == 2)
	exhaustivelyTestStringMatchAlgorithm(RabinKarpAlgorithm)

	check(finiteStateAutomata("abacbd", "abac") == 0)
	check(finiteStateAutomata("ab", "b") == 1)
	check(finiteStateAutomata("abc", "ab") == 0)
	check(finiteStateAutomata("abc", "bc") == 1)
	check(finiteStateAutomata("abc", "cd") == -1)
	check(finiteStateAutomata("abc", "c") == 2)
	check(finiteStateAutomata("ababac", "abac") == 2)
	check(finiteStateAutomata("ababaabac", "abac") == 5)

	check(KMP_Algorithm("ababac", "abac") == 2)
	check(KMP_Algorithm("abacbd", "abac") == 0)
	check(KMP_Algorithm("bacbababaacbababaca", "ababaca") == 12)
	check(KMP_Algorithm("ab", "b") == 1)
	check(KMP_Algorithm("abc", "ab") == 0)
	check(KMP_Algorithm("abc", "bc") == 1)
	check(KMP_Algorithm("abc", "cd") == -1)
	check(KMP_Algorithm("abc", "c") == 2)
	check(KMP_Algorithm("ababaabac", "abac") == 5)
	exhaustivelyTestStringMatchAlgorithm(KMP_Algorithm)
}
