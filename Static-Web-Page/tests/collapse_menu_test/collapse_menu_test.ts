import { set_selected_color_to_div, set_unselected_color_to_div } from "../../my_modules/collapse_menu";

namespace test {

var all_top_nav_item : NavItem[] = []

export function change_title_selection(new_title : string)
{
    all_top_nav_item.forEach(element => {
        if (element.div.innerHTML == new_title)
        {
            element.expand()
        }
        else
        {
            element.collapse()
        }
    });
}

export function add_top_nav_item(nav_item: NavItem)
{
    add_all_children_to_nav(nav_item)
    all_top_nav_item.push(nav_item)
}

function add_all_children_to_nav(nav_item : NavItem)
{
    var nav_div = document.getElementById("nav_div") 
    if (nav_div != null)
    {
        var all_nav_items = get_sub_nav_div_dfs(nav_item)
        all_nav_items.forEach(e => {
            nav_div?.appendChild(e.div)
            e.div.style.display = 'none'
        });        
    }
}

function get_sub_nav_div_dfs(nav_item : NavItem) : NavItem[]
{
    var ret : NavItem[] = []

    get_sub_nav_div_dfs2(nav_item, nav_item, ret)

    return ret
}

function get_sub_nav_div_dfs2(nav_item : NavItem, excluded_nav_item : NavItem, ret : NavItem[])
{
    if (nav_item != excluded_nav_item)
        ret.push(nav_item)
    for (var j = 0; j < nav_item.children.length; j++)
    {
        get_sub_nav_div_dfs2(nav_item.children[j], excluded_nav_item, ret)
    }         
}

enum NavItemType
{
    Folder,
    Page,
}

export class NavItem {
    div : HTMLDivElement
    children : NavItem[] = []
    parent : NavItem | null = null
    collapsed = false
    type = NavItemType.Page

    static indention = 8    

    constructor(text: string, class_name: string) {
      this.div = document.createElement("div")
      this.div.innerHTML = text
      this.div.className = class_name
      this.div.addEventListener('click', () => 
      {
          if (this.type == NavItemType.Page)
          {
            var top_nav_item = this.get_top_nav_item()
            if (top_nav_item == null)
            {
                console.error('top_nav_item == null')
                return
            }
            var subs = get_sub_nav_div_dfs(top_nav_item)
            subs.forEach(e => {
                set_unselected_color_to_div(e.div)
            })
            set_selected_color_to_div(this.div)          
          }
          else if (this.type == NavItemType.Folder)
          {
            this.collapsed = !this.collapsed
              if (this.collapsed == true)
              {
                this.collapse()                
              }
              else
              {
                this.expand() 
              }
          }
      })
    }

    get_top_nav_item() : NavItem | null
    {
        var parent = this.parent

        while (parent?.parent != null)
        {
            parent = parent.parent
        }

        return parent
    }

    get_depth() : number 
    {
        var current : NavItem = this
        var depth = -1

        while (current.parent != null)
        {
            current = current.parent
            depth++
        }
        return depth
    }

    set_indention(depth : number)
    {
        var padding = (depth + 1) * NavItem.indention
        this.div.style.paddingLeft = padding.toString() + 'px'
        this.set_children_indention(depth + 1)
    }

    set_children_indention(depth : number)
    {
        this.children.forEach(child => {
            child.set_indention(depth)
        });
    }

    append_child(nav_item : NavItem)
    {
        this.children.push(nav_item)
        var depth = this.get_depth()
        this.set_children_indention(depth + 1)
        nav_item.parent = this

        this.type = NavItemType.Folder
        this.collapsed = true

        this.children.forEach(child => {
            child.set_indention(depth)
        });       
        
        this.collapse()
    }

    expand()
    {
        this.children.forEach(child => {
            child.div.style.display = "block"
            if (child.collapsed == false)
                child.expand()
        });   
    }

    collapse()
    {
        var subs = get_sub_nav_div_dfs(this)
        subs.forEach(child => {
            child.div.style.display = "none"
        });           
    }
}

}

window.onload = onload_function

function onload_function() {

    {
        var ds_nav_item = new test.NavItem("ds", "")
    
        var nav_item1 = new test.NavItem('ds1', "nav_item_div")
        var nav_item2 = new test.NavItem('ds2', "nav_item_div")
        ds_nav_item.append_child(nav_item1)
        ds_nav_item.append_child(nav_item2)
    
        var nav_item1_1 = new test.NavItem('ds11', "nav_item_div")
        var nav_item2_2 = new test.NavItem('ds22', "nav_item_div")
    
        nav_item1.append_child(nav_item1_1)
        nav_item2.append_child(nav_item2_2)
    
        test.add_top_nav_item(ds_nav_item)
    }

    {
        var algorithm_nav_item = new test.NavItem("algorithm", "")
    
        var nav_item1 = new test.NavItem('devide and conqueror', "nav_item_div")
        var nav_item2 = new test.NavItem('dynamic programming', "nav_item_div")
        algorithm_nav_item.append_child(nav_item1)
        algorithm_nav_item.append_child(nav_item2)
    
        var nav_item1_1 = new test.NavItem('merge_sort', "nav_item_div")
        var nav_item2_2 = new test.NavItem('knapsack problem', "nav_item_div")
        nav_item1.append_child(nav_item1_1)
        nav_item2.append_child(nav_item2_2)
    
        test.add_top_nav_item(algorithm_nav_item)
    }


    var dummy_button = window.document.getElementById("dummy_button")
    if (dummy_button != null)
    {
        dummy_button.addEventListener('click', () => { test.change_title_selection('dummy') } )
    }    

    var algorithm_button = window.document.getElementById("algorithm_button")
    if (algorithm_button != null)
    {
        algorithm_button.addEventListener('click', () => { test.change_title_selection('algorithm') } )
    }
    
    var ds_button = window.document.getElementById("ds_button")
    if (ds_button != null)
    {
        ds_button.addEventListener('click', () => { test.change_title_selection('ds') } )
    }    
}

