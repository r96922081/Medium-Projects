import * as resize from "./index_resize.js"
var all_top_nav_item : NavItem[] = []

export function set_selected_color_to_div(div : HTMLDivElement)
{
    div.style.color = "yellow"    
    div.style.background = "#500867"    
}

export function set_unselected_color_to_div(div : HTMLDivElement)
{
    div.style.color = "#fffff2"
    div.style.background = "#242921"  
}

export function change_title_selection(new_title : string)
{
    all_top_nav_item.forEach(element => {
        if (element.div.innerHTML == new_title)
        {
            element.expand()
            var subs = get_sub_nav_div_dfs(element)
            subs.forEach(e => {  
                set_unselected_color_to_div(e.div)
            })            
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

export function click_nav_item(top_nav_inner_html: string, child_nav_inner_html : string)
{
      all_top_nav_item.forEach(e => {
            if (e.div.innerHTML == top_nav_inner_html)
            {
                  e.children.forEach(e2 => {
                        if (e2.div.innerHTML == child_nav_inner_html)
                              e2.div.dispatchEvent(new Event('click'))
                  })
            }
      });
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
    html_link : string = ""
    triangle : HTMLDivElement | null = null

    static indention = 12 

    constructor(text: string, class_name: string, html_link : string) {
      this.div = document.createElement("div")
      this.div.innerHTML = text
      this.div.className = class_name
      this.html_link = html_link
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
                if (this.triangle != null)
                {
                    this.triangle.style.transform = "rotate(0deg)" 
                }
              }
              else
              {
                this.expand() 
                if (this.triangle != null)
                {
                    this.triangle.style.transform = "rotate(90deg)" 
                }                
              }
          }
          
          if (this.html_link != "")
          {
              resize.set_iframe(this.html_link)
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
        var depth = 0

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
        this.div.style.paddingLeft = padding.toString()
        this.set_children_indention(depth + 1)
    }

    set_children_indention(depth : number)
    {
        this.children.forEach(child => {
            child.set_indention(depth)
        });
    }

    add_triangle()
    {
        if (this.triangle != null)
            return

        this.triangle  = document.createElement('div') as HTMLDivElement
        this.triangle.style.width = "0"
        this.triangle.style.height = "0"
        this.triangle.style.position = "absolute"
        this.triangle.style.top = "5"
        this.triangle.style.borderTop = "4px solid transparent"
        this.triangle.style.borderBottom = this.triangle.style.borderTop 
        this.triangle.style.borderLeft = "5px solid #fffff2"
        this.triangle.style.transitionDuration = "0.3s"
        this.triangle.style.transitionProperty = "transform"       

        var padding_left_int = Number(this.div.style.paddingLeft.substr(0, this.div.style.paddingLeft.length - 2))
        this.triangle.style.left = (padding_left_int - 10).toString()
        
        this.div.appendChild(this.triangle)  
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
