import { set_selected_color_to_div, set_unselected_color_to_div } from "../../my_modules/collapse_menu";
var test;
(function (test) {
    var all_top_nav_item = [];
    function change_title_selection(new_title) {
        all_top_nav_item.forEach(function (element) {
            if (element.div.innerHTML == new_title) {
                element.expand();
            }
            else {
                element.collapse();
            }
        });
    }
    test.change_title_selection = change_title_selection;
    function add_top_nav_item(nav_item) {
        add_all_children_to_nav(nav_item);
        all_top_nav_item.push(nav_item);
    }
    test.add_top_nav_item = add_top_nav_item;
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
    var NavItemType;
    (function (NavItemType) {
        NavItemType[NavItemType["Folder"] = 0] = "Folder";
        NavItemType[NavItemType["Page"] = 1] = "Page";
    })(NavItemType || (NavItemType = {}));
    var NavItem = /** @class */ (function () {
        function NavItem(text, class_name) {
            var _this = this;
            this.children = [];
            this.parent = null;
            this.collapsed = false;
            this.type = NavItemType.Page;
            this.div = document.createElement("div");
            this.div.innerHTML = text;
            this.div.className = class_name;
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
                    }
                    else {
                        _this.expand();
                    }
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
            var depth = -1;
            while (current.parent != null) {
                current = current.parent;
                depth++;
            }
            return depth;
        };
        NavItem.prototype.set_indention = function (depth) {
            var padding = (depth + 1) * NavItem.indention;
            this.div.style.paddingLeft = padding.toString() + 'px';
            this.set_children_indention(depth + 1);
        };
        NavItem.prototype.set_children_indention = function (depth) {
            this.children.forEach(function (child) {
                child.set_indention(depth);
            });
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
        NavItem.indention = 8;
        return NavItem;
    }());
    test.NavItem = NavItem;
})(test || (test = {}));
window.onload = onload_function;
function onload_function() {
    {
        var ds_nav_item = new test.NavItem("ds", "");
        var nav_item1 = new test.NavItem('ds1', "nav_item_div");
        var nav_item2 = new test.NavItem('ds2', "nav_item_div");
        ds_nav_item.append_child(nav_item1);
        ds_nav_item.append_child(nav_item2);
        var nav_item1_1 = new test.NavItem('ds11', "nav_item_div");
        var nav_item2_2 = new test.NavItem('ds22', "nav_item_div");
        nav_item1.append_child(nav_item1_1);
        nav_item2.append_child(nav_item2_2);
        test.add_top_nav_item(ds_nav_item);
    }
    {
        var algorithm_nav_item = new test.NavItem("algorithm", "");
        var nav_item1 = new test.NavItem('devide and conqueror', "nav_item_div");
        var nav_item2 = new test.NavItem('dynamic programming', "nav_item_div");
        algorithm_nav_item.append_child(nav_item1);
        algorithm_nav_item.append_child(nav_item2);
        var nav_item1_1 = new test.NavItem('merge_sort', "nav_item_div");
        var nav_item2_2 = new test.NavItem('knapsack problem', "nav_item_div");
        nav_item1.append_child(nav_item1_1);
        nav_item2.append_child(nav_item2_2);
        test.add_top_nav_item(algorithm_nav_item);
    }
    var dummy_button = window.document.getElementById("dummy_button");
    if (dummy_button != null) {
        dummy_button.addEventListener('click', function () { test.change_title_selection('dummy'); });
    }
    var algorithm_button = window.document.getElementById("algorithm_button");
    if (algorithm_button != null) {
        algorithm_button.addEventListener('click', function () { test.change_title_selection('algorithm'); });
    }
    var ds_button = window.document.getElementById("ds_button");
    if (ds_button != null) {
        ds_button.addEventListener('click', function () { test.change_title_selection('ds'); });
    }
}
//# sourceMappingURL=collapse_menu_test.js.map