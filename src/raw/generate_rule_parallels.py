import os
import csv
import json

def create_unique_id(rule1, rule2):
    if rule1 > rule2:
        rule1, rule2 = rule2, rule1
    unique_id = f"{rule1}-{rule2}"
    return unique_id

def is_duplicate(unique_id, seen_set):
    if unique_id in seen_set:
        return True
    seen_set.add(unique_id)
    return False

def create_entry(id, rule_id, parallel_rule_id):
    entry = {
        "id": id,
        "ruleId": rule_id,
        "parallelRuleId": parallel_rule_id,
    }
    return entry

def csv_to_json(csv_file_path, json_file_path):
     # Load existing data
    with open(json_file_path, 'r') as json_file:
        data = json.load(json_file)
    seen = set(entry['id'] for entry in data)

    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        headers = next(csv_reader)
        
        for row in csv_reader:
            rule_id_suffix = row[0]
            for i in range(1, len(row)):
                parallel_rule_id_suffix = row[i]
                if parallel_rule_id_suffix:  # if not empty
                    rule_id = f"{headers[0]}-{rule_id_suffix}"
                    parallel_rule_id = f"{headers[i]}-{parallel_rule_id_suffix}"
                    unique_id = create_unique_id(rule_id, parallel_rule_id)
       
                    if not is_duplicate(unique_id, seen):
                        entry = create_entry(unique_id, rule_id, parallel_rule_id)
                        data.append(entry)

    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=2)

csv_file_path =  os.path.abspath('./data/raw/pli-tv-bi_parallels_test.csv')
json_file_path = os.path.abspath('./data/v0/json/db/common/rule_parallels.json')
csv_to_json(csv_file_path, json_file_path)
