import * as index from "./index.js"

var is_resizing = false
var scrollbar_width = 0

function resize_div_mouse_down(e : MouseEvent)
{
      is_resizing = true
}

function resize_div_mouse_up()
{
      is_resizing = false
}

function has_scroller() : boolean 
{
      var resize_div = document.getElementById("resize_div")
      if (resize_div == null)
            return false
            
      var nav_div = document.getElementById("nav_div")
      if (nav_div == null)
            return false   
            
      return nav_div.offsetLeft + nav_div.clientWidth != resize_div.offsetLeft
}

function resize_div_mouse_move(e : MouseEvent)
{
      if (!is_resizing)
            return

      var resize_div : HTMLElement | null  = document.getElementById("resize_div")
      if (resize_div == null)
            return

      var nav_div : HTMLElement | null  = document.getElementById("nav_div")
      if (nav_div == null)
            return
      

      var diff_x = e.clientX - resize_div.offsetLeft
      var new_nav_width = nav_div.clientWidth + diff_x

      if (has_scroller())
            new_nav_width += scrollbar_width

      nav_div.style.flex = "0 1 " + new_nav_width + "px" 
}


function mouse_move_main_iframe(e : MouseEvent)
{
      var main_iframe = document.getElementById("main_iframe") as HTMLIFrameElement

      if (!is_resizing)
            return

      var resize_div : HTMLElement | null  = document.getElementById("resize_div")
      if (resize_div == null)
            return

      var nav_div : HTMLElement | null  = document.getElementById("nav_div")
      if (nav_div == null)
            return
            
      // +2 is for keeping mouse inside resize_div
      var new_nav_width = e.clientX + main_iframe.offsetLeft - resize_div.clientWidth + 2

      if (has_scroller())
            new_nav_width += scrollbar_width

      nav_div.style.flex = "0 1 " + new_nav_width + "px"                  
}


// get width by create a div with scroll bar
function get_scrollbar_width() {
    var outer : HTMLElement | null = document.createElement('div')
    outer.style.visibility = 'hidden'
    outer.style.overflow = 'scroll'
    document.body.appendChild(outer)
  
    var inner = document.createElement('div')
    outer.appendChild(inner)
  
    scrollbar_width = (outer.offsetWidth - inner.offsetWidth)
  
    document.body.removeChild(outer)
}

export function set_iframe(html_link : string)
{
      var main_iframe = document.getElementById("main_iframe") as HTMLIFrameElement
      // @ts-ignorex
      main_iframe.contentDocument.body.fixed = true 

      main_iframe.src = html_link

      setTimeout(fix_iframe, 0)
}

function fix_iframe()
{
    var main_iframe = document.getElementById("main_iframe") as HTMLIFrameElement

    if (main_iframe.contentDocument == null)
    {
    setTimeout(fix_iframe, 0)
    return
    }

    if (main_iframe.contentDocument.body == null)
    {
    setTimeout(fix_iframe, 0)
    return    
    }

    // @ts-ignorex
    if (main_iframe.contentDocument.body.fixed == undefined)
    {
        main_iframe.contentDocument.body.addEventListener('mousemove', mouse_move_main_iframe)
        main_iframe.contentDocument.body.addEventListener('mouseup', resize_div_mouse_up)     
        main_iframe.contentDocument.body.style.margin = "0px"
        //mojo: no idea why have to -25
        main_iframe.contentDocument.body.style.height = (main_iframe.offsetHeight - 25).toString() + 'px'   
        // @ts-ignorex
        main_iframe.contentDocument.body.fixed = true
        return 
    }
    else
    {
    setTimeout(fix_iframe, 0)
    }
}

export function resize_init()
{
    var resize_div = document.getElementById("resize_div")
    if (resize_div == null)
          return

    var main_div = document.getElementById("main_div")
    if (main_div == null)
          return
          
      var main_iframe = document.getElementById("main_iframe")
      if (main_iframe == null)
            return

    var nav_div = document.getElementById("nav_div")
    if (nav_div == null)
          return  

    resize_div.addEventListener('mousedown', resize_div_mouse_down)
    resize_div.addEventListener('mouseup', resize_div_mouse_up)
    resize_div.addEventListener('mousemove', resize_div_mouse_move)
    
    nav_div.addEventListener('mouseup', resize_div_mouse_up)
    nav_div.addEventListener('mousemove', resize_div_mouse_move)

    main_div.addEventListener('mouseup', resize_div_mouse_up)
    main_div.addEventListener('mousemove', resize_div_mouse_move)    

    main_iframe.addEventListener('mouseup', resize_div_mouse_up)
    main_iframe.addEventListener('mousemove', resize_div_mouse_move)    

    window.addEventListener("resize", index.on_window_resize)

    get_scrollbar_width()    
}