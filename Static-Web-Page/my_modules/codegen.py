import os

def ToCapitalString(str):
    strs = str.split()
    
    ret = ''
    for i in range(len(strs)):
        if i != 0:
            ret += ' '
        s = strs[i]
        temp = s[0]
        ret += temp.upper()
        ret += s[1:]

    return ret

def gen_import():
    f.write('import * as collapse_menu from "./collapse_menu.js"\n')
    f.write('import * as index from "./index.js"\n')
    f.write('export var landscapes : string[] = []\n\n')

def gen_landscape_push():
    for _, _, files in os.walk("./pages/_about_me"):
        for file in files:
            if file.endswith('.png'):
                f.write('landscapes.push("' + file + '")\n')

    f.write('\n')

def gen_init_nav_menu(target_dir):
    f.write('export function init_nav_menu(){}\n')
    return    

    f.write('{\n')

    dirs = os.listdir(target_dir)

    for file in dirs:
        path1 = os.path.join(target_dir, file)
        if not file.startswith('_') and os.path.isdir(path1):
            default_page = ''        
            html_path = os.path.join(path1, file + '.html')
            if (os.path.exists(html_path)):
                default_page = html_path
            
            capital_file = ToCapitalString(file)
            default_page = default_page.replace('\\', '/')

            f.write('    index.add_text_title_item("' + capital_file + '", "' + file + '", "' + default_page + '\")\n')
    f.write('}\n\n')

def gen_nav_menu2(full_path, dir):
    pass

def add_sub_folder(full_dir_path, dir_str, start_index):
    dirs = os.listdir(full_dir_path)

    has_sub_folder = False
    has_link = False
    start_index += 1

    for sub_dir in dirs:
        sub_dir_full_path = os.path.join(full_dir_path, sub_dir)
        if sub_dir.startswith('_') or not os.path.isdir(sub_dir_full_path):
            continue

        sub_valid, sub_folder_item_name, sub_start_index = add_sub_folder(sub_dir_full_path, sub_dir, start_index)
        if not sub_valid:
            continue

        has_sub_folder = True
        start_index = sub_start_index

    link_path = os.path.join(full_dir_path, dir_str + '.html')
    if not os.path.exists(link_path):
        link_path = ''

    if has_sub_folder or link_path != '':
        pass
    elif has_link:
        True, 
    else:
        return False, '', '', -1


def gen_nav_menu(target_dir):
    print(os.path.split(target_dir)[1])
    add_sub_folder(target_dir, os.path.split(target_dir)[1], 0)


target_dir = 'tests/folder_struct_test'
f = open("./my_modules/generated_defs.ts", "w")
gen_import()
#gen_landscape_push()
gen_init_nav_menu(target_dir)
gen_nav_menu(target_dir)
f.close()


