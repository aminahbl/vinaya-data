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

def create_entry(rule_id, parallel_rule_id):
    unique_id = create_unique_id(rule_id, parallel_rule_id)
    entry = {
        "id": unique_id,
        "ruleId": rule_id,
        "parallelRuleId": parallel_rule_id,
    }
    return entry

def csv_to_json(csv_file_path, json_file_path):
    data = []
    seen = set()

    with open(csv_file_path, 'r') as csv_file:
        csv_reader = csv.reader(csv_file)
        headers = next(csv_reader)
        
        for row in csv_reader:
            rule_id = row[0]
            for i in range(1, len(row)):
                parallel_rule_id = row[i]
                if parallel_rule_id:  # if not empty
                    unique_id = create_unique_id(rule_id, parallel_rule_id)
                    if not is_duplicate(unique_id, seen):
                        entry = create_entry(rule_id, parallel_rule_id)
                        data.append(entry)

    with open(json_file_path, 'w') as json_file:
        json.dump(data, json_file, indent=2)

csv_file_path = './parallels.csv'
json_file_path = '../v0/json/db/common/rule_parallels.json'
csv_to_json(csv_file_path, json_file_path)
