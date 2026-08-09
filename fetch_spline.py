import urllib.request
import re
import json
import sys

url = 'https://my.spline.design/nexbotbyaximoriscopycopy-oduNMXvfp3DrR218y3uecGwc/'
try:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        html = response.read().decode('utf-8')
        
    m = re.search(r'app\.start\(\[(.*?)\]\)', html)
    if m:
        data = json.loads('[' + m.group(1) + ']')
        with open('public/scene.splinecode', 'wb') as f:
            f.write(bytes(data))
        print(f"Success: extracted {len(data)} bytes")
    else:
        print("Failed to find app.start array in HTML")
        sys.exit(1)
except Exception as e:
    print("Error:", e)
    sys.exit(1)
