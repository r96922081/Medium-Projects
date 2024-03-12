import * as resize from "./index_resize.js"
import * as collapse_menu from "./collapse_menu.js"
import * as generated_defs from "../my_modules/generated_defs.js"

window.onload = on_load_function

function clear_nav_items()
{
      var nav_div : HTMLElement | null = document.getElementById("nav_div")
      if (nav_div == null)
            return         

      while (nav_div.firstChild) {
            nav_div.removeChild(nav_div.firstChild);
      }
}

function add_nav_item(text : string)
{
      var nav_div = document.getElementById("nav_div")
      if (nav_div == null)
            return       

      var nav_item_div : HTMLElement = document.createElement("div")
      nav_item_div.className = "nav_item_div"
      nav_item_div.innerHTML = text
      nav_div.appendChild(nav_item_div); 
}

var all_title_div : HTMLDivElement[] = []

export function add_text_title_item(text : string, nav_name: string, html_link : string)
{
      var title_div = document.getElementById("title_div")
      if (title_div == null)
            return       

      var title_item_div : HTMLDivElement = document.createElement("div")
      
      title_item_div.className = "title_item_div"
      title_item_div.innerHTML = "<p>&nbsp;&nbsp;" + text + "&nbsp;&nbsp;</p>"
      title_div.appendChild(title_item_div)
      all_title_div.push(title_item_div) 

      title_item_div.addEventListener('click', () => 
      {
          if (nav_name != "")
          {
            collapse_menu.change_title_selection(nav_name) 
          }

            all_title_div.forEach(e => { 
                  collapse_menu.set_unselected_color_to_div(e) 
            })
                  
            collapse_menu.set_selected_color_to_div(title_item_div)

          if (html_link != "")
          {
              resize.set_iframe(html_link)
          }
      })      
}

function set_div_height()
{
      var nav_div = document.getElementById("nav_div")
      if (nav_div == null)
            return         
 
      var title_div = document.getElementById("title_div")
      if (title_div == null)
            return       

      nav_div.style.height = window.innerHeight - 60 + "px"
}

export function on_window_resize()
{
      set_div_height()
}

function init_me_title_item()
{
      var icon_img = document.getElementById("icon_img")
      if (icon_img == null)
            return
      icon_img.addEventListener('click', () => { 
            collapse_menu.change_title_selection('welcome')  
            all_title_div.forEach(e => { 
                  collapse_menu.set_unselected_color_to_div(e)
            })                     

            collapse_menu.click_nav_item('welcome', 'Welcome')
      })

      var me_nav_item = new collapse_menu.NavItem("welcome", "", "")

      var nav_item = new collapse_menu.NavItem('Welcome', "nav_item_div", "pages/welcome/welcome.html")
      me_nav_item.append_child(nav_item)

      collapse_menu.add_top_nav_item(me_nav_item)    
}

function on_load_function()
{
      var resize_div = document.getElementById("resize_div")
      if (resize_div == null)
            return

      var main_div = document.getElementById("main_div")
      if (main_div == null)
            return
            
      var nav_div = document.getElementById("nav_div")
      if (nav_div == null)
            return  

      set_div_height()  

      init_me_title_item()

      resize.resize_init()
      generated_defs.init_nav_menu()

      collapse_menu.change_title_selection('welcome')
      collapse_menu.click_nav_item('welcome', 'Welcome')
}