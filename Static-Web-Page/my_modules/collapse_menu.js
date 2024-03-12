import * as resize from "./index_resize.js";
var all_top_nav_item = [];
export function set_selected_color_to_div(div) {
    div.style.color = "yellow";
    div.style.background = "#500867";
}
export function set_unselected_color_to_div(div) {
    div.style.color = "#fffff2";
    div.style.background = "#242921";
}
export function change_title_selection(new_title) {
    all_top_nav_item.forEach(function (element) {
        if (element.div.innerHTML == new_title) {
            element.expand();
            var subs = get_sub_nav_div_dfs(element);
            subs.forEach(function (e) {
                set_unselected_color_to_div(e.div);
            });
        }
        else {
            element.collapse();
        }
    });
}
export function add_top_nav_item(nav_item) {
    add_all_children_to_nav(nav_item);
    all_top_nav_item.push(nav_item);
}
function add_all_children_to_nav(nav_item) {
    var nav_div = document.getElementById("nav_div");
    if (nav_div != null) {
        var all_nav_items = get_sub_nav_div_dfs(nav_item);
        all_nav_items.forEach(function (e) {
            nav_div === null || nav_div === void 0 ? void 0 : nav_div.appendChild(e.div);
            e.div.style.display = 'none';
        });
    }
}
function get_sub_nav_div_dfs(nav_item) {
    var ret = [];
    get_sub_nav_div_dfs2(nav_item, nav_item, ret);
    return ret;
}
function get_sub_nav_div_dfs2(nav_item, excluded_nav_item, ret) {
    if (nav_item != excluded_nav_item)
        ret.push(nav_item);
    for (var j = 0; j < nav_item.children.length; j++) {
        get_sub_nav_div_dfs2(nav_item.children[j], excluded_nav_item, ret);
    }
}
export function click_nav_item(top_nav_inner_html, child_nav_inner_html) {
    all_top_nav_item.forEach(function (e) {
        if (e.div.innerHTML == top_nav_inner_html) {
            e.children.forEach(function (e2) {
                if (e2.div.innerHTML == child_nav_inner_html)
                    e2.div.dispatchEvent(new Event('click'));
            });
        }
    });
}
var NavItemType;
(function (NavItemType) {
    NavItemType[NavItemType["Folder"] = 0] = "Folder";
    NavItemType[NavItemType["Page"] = 1] = "Page";
})(NavItemType || (NavItemType = {}));
var NavItem = /** @class */ (function () {
    function NavItem(text, class_name, html_link) {
        var _this = this;
        this.children = [];
        this.parent = null;
        this.collapsed = false;
        this.type = NavItemType.Page;
        this.html_link = "";
        this.triangle = null;
        this.div = document.createElement("div");
        this.div.innerHTML = text;
        this.div.className = class_name;
        this.html_link = html_link;
        this.div.addEventListener('click', function () {
            if (_this.type == NavItemType.Page) {
                var top_nav_item = _this.get_top_nav_item();
                if (top_nav_item == null) {
                    console.error('top_nav_item == null');
                    return;
                }
                var subs = get_sub_nav_div_dfs(top_nav_item);
                subs.forEach(function (e) {
                    set_unselected_color_to_div(e.div);
                });
                set_selected_color_to_div(_this.div);
            }
            else if (_this.type == NavItemType.Folder) {
                _this.collapsed = !_this.collapsed;
                if (_this.collapsed == true) {
                    _this.collapse();
                    if (_this.triangle != null) {
                        _this.triangle.style.transform = "rotate(0deg)";
                    }
                }
                else {
                    _this.expand();
                    if (_this.triangle != null) {
                        _this.triangle.style.transform = "rotate(90deg)";
                    }
                }
            }
            if (_this.html_link != "") {
                resize.set_iframe(_this.html_link);
            }
        });
    }
    NavItem.prototype.get_top_nav_item = function () {
        var parent = this.parent;
        while ((parent === null || parent === void 0 ? void 0 : parent.parent) != null) {
            parent = parent.parent;
        }
        return parent;
    };
    NavItem.prototype.get_depth = function () {
        var current = this;
        var depth = 0;
        while (current.parent != null) {
            current = current.parent;
            depth++;
        }
        return depth;
    };
    NavItem.prototype.set_indention = function (depth) {
        var padding = (depth + 1) * NavItem.indention;
        this.div.style.paddingLeft = padding.toString();
        this.set_children_indention(depth + 1);
    };
    NavItem.prototype.set_children_indention = function (depth) {
        this.children.forEach(function (child) {
            child.set_indention(depth);
        });
    };
    NavItem.prototype.add_triangle = function () {
        if (this.triangle != null)
            return;
        this.triangle = document.createElement('div');
        this.triangle.style.width = "0";
        this.triangle.style.height = "0";
        this.triangle.style.position = "absolute";
        this.triangle.style.top = "5";
        this.triangle.style.borderTop = "4px solid transparent";
        this.triangle.style.borderBottom = this.triangle.style.borderTop;
        this.triangle.style.borderLeft = "5px solid #fffff2";
        this.triangle.style.transitionDuration = "0.3s";
        this.triangle.style.transitionProperty = "transform";
        var padding_left_int = Number(this.div.style.paddingLeft.substr(0, this.div.style.paddingLeft.length - 2));
        this.triangle.style.left = (padding_left_int - 10).toString();
        this.div.appendChild(this.triangle);
    };
    NavItem.prototype.append_child = function (nav_item) {
        this.children.push(nav_item);
        var depth = this.get_depth();
        this.set_children_indention(depth + 1);
        nav_item.parent = this;
        this.type = NavItemType.Folder;
        this.collapsed = true;
        this.children.forEach(function (child) {
            child.set_indention(depth);
        });
        this.collapse();
    };
    NavItem.prototype.expand = function () {
        this.children.forEach(function (child) {
            child.div.style.display = "block";
            if (child.collapsed == false)
                child.expand();
        });
    };
    NavItem.prototype.collapse = function () {
        var subs = get_sub_nav_div_dfs(this);
        subs.forEach(function (child) {
            child.div.style.display = "none";
        });
    };
    NavItem.indention = 12;
    return NavItem;
}());
export { NavItem };
//# sourceMappingURL=collapse_menu.js.map