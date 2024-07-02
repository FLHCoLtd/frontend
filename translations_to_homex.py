import os
import json
import re

def replace_string_in_json_files(directory, old_string, new_string):
    pattern = re.compile(re.escape(old_string), re.IGNORECASE)  # 建立忽略大小寫的正則表達式模式
    
    for filename in os.listdir(directory):
        if filename.endswith(".json"):
            file_path = os.path.join(directory, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                data = json.load(file)
            
            # 遍歷所有 key, value，並替換字串
            def replace_value(obj):
                if isinstance(obj, dict):
                    return {k: replace_value(v) for k, v in obj.items()}
                elif isinstance(obj, list):
                    return [replace_value(item) for item in obj]
                elif isinstance(obj, str):
                    return pattern.sub(new_string, obj)
                else:
                    return obj
            
            modified_data = replace_value(data)

            # 將修改後的資料寫回原檔案
            with open(file_path, 'w', encoding='utf-8') as file:
                json.dump(modified_data, file, ensure_ascii=False, indent=4)
                
directory_path = "translations/frontend"
replace_string_in_json_files(directory_path, "home assistant", "FLH HomeX")
directory_path = "translations/backend"
replace_string_in_json_files(directory_path, "home assistant", "FLH HomeX")