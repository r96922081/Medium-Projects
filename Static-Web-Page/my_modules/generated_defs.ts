import * as collapse_menu from "./collapse_menu.js"
import * as index from "./index.js"
export var landscapes : string[] = []

landscapes.push("DSCN2598.png")
landscapes.push("DSCN3670.png")
landscapes.push("DSCN3674.png")
landscapes.push("DSCN3705.png")
landscapes.push("DSCN3896.png")
landscapes.push("DSC_0465.png")
landscapes.push("DSC_0473.png")
landscapes.push("DSC_0500.png")
landscapes.push("DSC_0563.png")
landscapes.push("DSC_0570.png")

function init_algorithm_nav_menu(){
    index.add_text_title_item("Algorithm", "algorithm", "pages/algorithm/algorithm.html")
    var top = new collapse_menu.NavItem("algorithm", "", "")

    var item1 = new collapse_menu.NavItem("Algorithm Design", "nav_item_div", "pages/algorithm/algorithm design/algorithm design.html")
    top.append_child(item1)

    var item2 = new collapse_menu.NavItem("String Matching", "nav_item_div", "")
    top.append_child(item2)

    var item3 = new collapse_menu.NavItem("Naive String Matching", "nav_item_div", "pages/algorithm/string matching/naive string matching/naive string matching.html")
    item2.append_child(item3)
    item2.add_triangle()

    var item4 = new collapse_menu.NavItem("Rabin-Karp Algorithm", "nav_item_div", "pages/algorithm/string matching/Rabin-Karp algorithm/Rabin-Karp algorithm.html")
    item2.append_child(item4)
    item2.add_triangle()

    var item5 = new collapse_menu.NavItem("Finite State Automata", "nav_item_div", "pages/algorithm/string matching/finite state automata/finite state automata.html")
    item2.append_child(item5)
    item2.add_triangle()

    var item6 = new collapse_menu.NavItem("KMP Algorithm", "nav_item_div", "pages/algorithm/string matching/KMP algorithm/KMP algorithm.html")
    item2.append_child(item6)
    item2.add_triangle()

    collapse_menu.add_top_nav_item(top)
}

function init_web_nav_menu(){
    index.add_text_title_item("Web", "web", "")
    var top = new collapse_menu.NavItem("web", "", "")

    var item1 = new collapse_menu.NavItem("Basics", "nav_item_div", "")
    top.append_child(item1)

    var item2 = new collapse_menu.NavItem("Ecmascript", "nav_item_div", "pages/web/basics/ecmascript/ecmascript.html")
    item1.append_child(item2)
    item1.add_triangle()

    var item3 = new collapse_menu.NavItem("Module", "nav_item_div", "pages/web/basics/module/module.html")
    item1.append_child(item3)
    item1.add_triangle()

    var item4 = new collapse_menu.NavItem("Strict Mode", "nav_item_div", "pages/web/basics/strict mode/strict mode.html")
    item1.append_child(item4)
    item1.add_triangle()

    collapse_menu.add_top_nav_item(top)
}

function init_go_nav_menu(){
    index.add_text_title_item("Go", "go", "")
    var top = new collapse_menu.NavItem("go", "", "")

    var item1 = new collapse_menu.NavItem("Why Go", "nav_item_div", "pages/go/why go/why go.html")
    top.append_child(item1)

    var item2 = new collapse_menu.NavItem("Hello World", "nav_item_div", "pages/go/hello world/hello world.html")
    top.append_child(item2)

    var item3 = new collapse_menu.NavItem("Syntax And Basics", "nav_item_div", "pages/go/syntax and basics/syntax and basics.html")
    top.append_child(item3)

    var item4 = new collapse_menu.NavItem("Command And Code Orgnization", "nav_item_div", "pages/go/command and code orgnization/command and code orgnization.html")
    top.append_child(item4)

    var item5 = new collapse_menu.NavItem("Q And A", "nav_item_div", "pages/go/q and a/q and a.html")
    top.append_child(item5)

    collapse_menu.add_top_nav_item(top)
}

function init_soft_skills_nav_menu(){
    index.add_text_title_item("Soft Skills", "soft skills", "")
    var top = new collapse_menu.NavItem("soft skills", "", "")

    var item1 = new collapse_menu.NavItem("How To Learn", "nav_item_div", "pages/soft skills/how to learn/how to learn.html")
    top.append_child(item1)

    var item2 = new collapse_menu.NavItem("Productivity", "nav_item_div", "pages/soft skills/productivity/productivity.html")
    top.append_child(item2)

    collapse_menu.add_top_nav_item(top)
}

function init_software_development_nav_menu(){
    index.add_text_title_item("Software Development", "software development", "")
    var top = new collapse_menu.NavItem("software development", "", "")

    var item1 = new collapse_menu.NavItem("Software Craftsmanship", "nav_item_div", "pages/software development/software craftsmanship/software craftsmanship.html")
    top.append_child(item1)

    var item2 = new collapse_menu.NavItem("Principles", "nav_item_div", "pages/software development/principles/principles.html")
    top.append_child(item2)

    var item3 = new collapse_menu.NavItem("Anti-patterns", "nav_item_div", "pages/software development/anti-patterns/anti-patterns.html")
    top.append_child(item3)

    collapse_menu.add_top_nav_item(top)
}

function init_Database_nav_menu(){
    index.add_text_title_item("Database", "Database", "")
    var top = new collapse_menu.NavItem("Database", "", "")

    var item1 = new collapse_menu.NavItem("SQL", "nav_item_div", "pages/Database/SQL/SQL.html")
    top.append_child(item1)

    collapse_menu.add_top_nav_item(top)
}

export function init_nav_menu(){
    init_algorithm_nav_menu()
    init_web_nav_menu()
    init_go_nav_menu()
    init_soft_skills_nav_menu()
    init_software_development_nav_menu()
    init_Database_nav_menu()
}
