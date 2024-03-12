package main

import (
	"fmt"
)

func sayHello(name string) (bool, int) {
	greet := "Hello"                                                 // 2. Type can be inferred
	var greet2 string = "Hi"                                         // Type is declared explicitly
	fmt.Printf("%s, and %s: ", greet, greet2)          // 3. Support both Printf & Println
	fmt.Println(name)
	
	// 5. Support Multiple return values
	// 6. built-in function len()
	return true, len(name)
}

// 1. Programs start running in function "main" of package "main"
func main() {
	sayHello("John")
}
