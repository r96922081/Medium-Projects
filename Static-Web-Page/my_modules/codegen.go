package main

import (
	"bufio"
	"io/ioutil"
	"os"
	"path"
	"strconv"
	"strings"
)

type Node struct {
	name             string
	children         []*Node
	link             string
	defaultSelection string
}

func check(b bool) {
	if !b {
		panic("check failed!")
	}
}

func sortChildrenByOrder(childrenOrder []string, n *Node) {
	childrenToBeSorted := n.children
	n.children = []*Node{}

	for _, c := range childrenOrder {
		for i := 0; i < len(childrenToBeSorted); i++ {
			if childrenToBeSorted[i].name == c {
				n.children = append(n.children, childrenToBeSorted[i])
				childrenToBeSorted[i] = &Node{name: ""}
			}
		}
	}

	for _, c := range childrenToBeSorted {
		if c.name != "" {
			n.children = append(n.children, c)
		}
	}
}

func sortPages(folder string, n *Node, orderFilePath string) {
	_, err := os.Stat(orderFilePath)

	if err != nil {
		return
	}

	childrenOrder := []string{}
	file, _ := os.Open(orderFilePath)
	scanner := bufio.NewScanner(file)
	for scanner.Scan() {
		childrenOrder = append(childrenOrder, scanner.Text())
	}

	sortChildrenByOrder(childrenOrder, n)
}

func isHtmlFile(fileInfo os.FileInfo, parentFolder string) bool {
	if fileInfo.IsDir() {
		return false
	}

	if fileInfo.Name() == parentFolder+".html" {
		return true
	}

	return false
}

func isDefaultFile(fileInfo os.FileInfo) bool {
	if strings.HasPrefix(fileInfo.Name(), "default is ") {
		return true
	}

	return false
}

func isSkipingFile(fileInfo os.FileInfo) bool {
	if fileInfo.Name()[0] == '_' {
		return true
	}

	return false
}

func scanDir(folder string, level int) *Node {
	n := &Node{}

	baseName := path.Base(folder)
	n.name = baseName

	files, _ := ioutil.ReadDir(folder)
	for _, file := range files {
		if isSkipingFile(file) {
			continue
		}
		if isHtmlFile(file, baseName) {
			n.link = path.Join(folder, file.Name())
		} else if isDefaultFile(file) {
			n.defaultSelection = file.Name()[len("default is "):]
		}

		subNode := scanDir(path.Join(folder, file.Name()), level+1)
		if subNode != nil {
			n.children = append(n.children, subNode)
		}
	}

	if level <= 1 && len(n.children) == 0 {
		return nil
	}

	if len(n.children) == 0 && n.link == "" {
		return nil
	}

	sortPages(folder, n, path.Join(folder, "orders.txt"))

	return n
}

func toCamelCase(s string) string {
	strByte := []byte(s)

	for i := 0; i < len(strByte); i++ {
		if i == 0 || strByte[i-1] == ' ' {
			if 'a' <= strByte[i] && strByte[i] <= 'z' {
				strByte[i] -= 'a' - 'A'
			}
		}
	}

	return string(strByte)
}

func genCodeAddChild(n *Node, outputFile *os.File, index *int) {
	itemName := ""
	if *index == 0 {
		itemName = "top"
	} else {
		itemName = "item" + strconv.Itoa(*index)
	}

	for _, child := range n.children {
		*index++
		childItemName := "item" + strconv.Itoa(*index)
		outputFile.WriteString("\n    var " + childItemName + ` = new collapse_menu.NavItem("` + toCamelCase(child.name) + `", "nav_item_div", "` + child.link + "\")\n")
		outputFile.WriteString("    " + itemName + ".append_child(" + childItemName + ")\n")
		if itemName != "top" {
			outputFile.WriteString("    " + itemName + ".add_triangle()\n")
		}

		genCodeAddChild(child, outputFile, index)
	}
}

func genCode(n *Node, landscapesFolder string, outputFile *os.File) {
	outputFile.WriteString("import * as collapse_menu from \"./collapse_menu.js\"\n")
	outputFile.WriteString("import * as index from \"./index.js\"\n")
	outputFile.WriteString("export var landscapes : string[] = []\n\n")

	files, _ := ioutil.ReadDir(landscapesFolder)
	for _, file := range files {
		if path.Ext(file.Name()) == ".png" {
			outputFile.WriteString(`landscapes.push("` + file.Name() + "\")\n")
		}
	}
	outputFile.WriteString("\n")
	functionArray := []string{}

	for _, n2 := range n.children {
		functionName := "init_" + strings.ReplaceAll(n2.name, " ", "_") + "_nav_menu()"
		functionArray = append(functionArray, functionName)
		outputFile.WriteString("function " + functionName + "{\n")
		outputFile.WriteString(`    index.add_text_title_item("` + toCamelCase(n2.name) + `", "` + n2.name + `", "` + n2.link + "\")\n")
		outputFile.WriteString(`    var top = new collapse_menu.NavItem("` + n2.name + `", "", "")` + "\n")
		index := 0
		genCodeAddChild(n2, outputFile, &index)
		outputFile.WriteString("\n    collapse_menu.add_top_nav_item(top)\n")
		outputFile.WriteString("}\n\n")
	}

	outputFile.WriteString("export function init_nav_menu(){\n")

	for _, function := range functionArray {
		outputFile.WriteString("    " + function + "\n")
	}

	outputFile.WriteString("}\n")
}

func testSortChildrenByOrder() {
	n := &Node{}
	n.children = append(n.children, &Node{name: "1"})
	n.children = append(n.children, &Node{name: "2"})
	n.children = append(n.children, &Node{name: "3"})
	sortChildrenByOrder([]string{"3", "1", "4"}, n)
	check(n.children[0].name == "3")
	check(n.children[1].name == "1")
	check(n.children[2].name == "2")
	check(len(n.children) == 3)

	n.children = make([]*Node, 0)
	n.children = append(n.children, &Node{name: "1"})
	n.children = append(n.children, &Node{name: "2"})
	n.children = append(n.children, &Node{name: "3"})
	sortChildrenByOrder([]string{"2"}, n)
	check(n.children[0].name == "2")
	check(n.children[1].name == "1")
	check(n.children[2].name == "3")
	check(len(n.children) == 3)
}

func runUt() {
	testSortChildrenByOrder()
}

func changeVariableIfDebugging(outputFilePath, targetFolder, landscapesFolder *string, ut *bool) {
	if len(os.Args) < 2 || os.Args[1] != "debug" {
		return
	}

	*outputFilePath = "../" + *outputFilePath
	*targetFolder = "../" + *targetFolder
	*landscapesFolder = "../" + *landscapesFolder
	*ut = true
}

func main() {

	outputFilePath := "my_modules/generated_defs.ts"
	targetFolder := "pages"
	landscapesFolder := "pages/welcome"
	ut := false

	changeVariableIfDebugging(&outputFilePath, &targetFolder, &landscapesFolder, &ut)

	if ut {
		runUt()
	}

	outputFile, _ := os.Create(outputFilePath)

	n := scanDir(targetFolder, 0)
	genCode(n, landscapesFolder, outputFile)
	_ = n
}
