package main

import (
	"fmt"
	"log"
	"os"
)

func accept_a_function(a func(int, int)) {
	a(1, 1)
}
func passed_function(a int, b int) {
	fmt.Println(a, b)
}
func demo_pass_function() {
	accept_a_function(passed_function)
}

func demo_closure() {
	s := "hi"
	f := func() {
		fmt.Println(s) // bind s here
	}
	f()
}

func demo_defer() {
	defer fmt.Println("world")
	fmt.Println("hello")
} // ends printing hello world

type Base struct {
	b int
}
type Derived struct {
	Base
	d int
}

func demo_inheritance() {
	d := Derived{}
	fmt.Println(d.b)
}

type AI interface {
	f1()
}

type A struct {
}

type B struct {
}

func (a A) f1() {
	fmt.Println("A implements AI's f1()")
}

func (b B) f1() {
}

func demo_type_assertions() {
	var ai AI = A{}

	a, ok := ai.(A)
	fmt.Println(ok) // true
	fmt.Println(a)

	b, ok := ai.(B)
	fmt.Println(ok) // false
	fmt.Println(b)  // b will be the zero value of type B
}

func demo_interface() {
	var a AI = A{}
	a.f1()
}

func demo_error_handling() {
	file, err := os.Open("file.go")
	if err != nil {
		log.Fatal(err)
	}
	_ = file
}

func slice_and_array() {
	s := []int{1, 2, 3}
	s2 := make([]int, 4)         // dynamically allocate slice of capacity = 4
	s = append(s, 4)             // append value 4 to last
	s = append(s[0:3], s[4:]...) // remove element at index 3

	a := [3]int{1, 2, 3}

	_ = s2
	_ = a
}

func demo_map() {
	m := make(map[string]int)
	m["a"] = 1
	m["b"] = 2

	var m2 map[string]int = map[string]int{"a": 1, "b": 2}

	for k, v := range m {
		fmt.Println(k)
		fmt.Println(v)
	}

	fmt.Println(m2)
}

func demo_for() {
	for i := 0; i < 10; i++ {
		fmt.Println(i)
	}

	i := 1
	for i < 10 {
		fmt.Println(i)
	}

	for {
		// infinite loop
	}
}

func demo_if() {
	i := 1
	if i > 1 {
		fmt.Println("never run here")
	}

	j := 1
	if j *= 5; j > 1 {
		fmt.Println("statement executes before condition")
	}
}

func main() {
	s := make([]int, 5)
	for i := 0; i < len(s); i++ {
		s[i] = i
	}

	fmt.Println(s)

	s = append(s, 5)
	fmt.Println(s)

	s = append(s[0:3], s[4:]...)
	fmt.Println(s)

	fmt.Println("hello")

	demo_pass_function()
	demo_closure()
	demo_defer()
	demo_inheritance()
	demo_interface()
	demo_map()
	demo_type_assertions()
}
