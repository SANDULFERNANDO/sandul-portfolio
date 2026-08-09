import re
import json

html_path = r'C:\Users\Sandul Fernando\.gemini\antigravity\brain\a30a3385-9262-4d80-8e31-0f46add1e27f\.system_generated\steps\265\content.md'
html = open(html_path, 'r', encoding='utf-8').read()

m = re.search(r'app\.start\(\[(.*?)\]\)', html)
if m:
    data = json.loads('[' + m.group(1) + ']')
    with open('public/scene.splinecode', 'wb') as f:
        f.write(bytes(data))
    print("Success: extracted", len(data), "bytes")
else:
    print("Failed to find app.start array")
