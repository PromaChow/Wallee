from flask import request
from flask import Flask
from flask_cors import CORS, cross_origin
import sys
from flask import jsonify
import base64
import pytesseract
import numpy as np
import cv2
from wand.image import Image
import os
import glob
import json
import random
from pathlib import Path
from difflib import SequenceMatcher
import pandas as pd
import numpy as np
from PIL import Image
from tqdm import tqdm
from IPython.display import display
import matplotlib
import re
from matplotlib import pyplot, patches
import smsProcess

import layoutlm

app = Flask(__name__)
cors = CORS(app, supports_credentials=True)



@app.route("/image", methods=['GET', 'POST'])
def hello_world():
    str = "rec.jpg"
    if(request.method == "POST"):
        print("accepted")
        bytesOfimage = request.get_json()
        print(type(bytesOfimage['image']), file=sys.stderr)
        with open(str, "wb") as fh:
            fh.write(base64.b64decode(bytesOfimage['image']))

    im = cv2.imread(str)
    print("\n\n"+pytesseract.image_to_string(im))
    
    dic = layoutlm.get_predictions()
    print(dic)

    # image, words, boxes, actual_boxes = preprocess(str)
    # dataset_directory = Path(
    #     '/home/proma/Desktop/Kaggle/kaggle/working/inference')
    # write_dataset(dataset_directory, words, boxes, actual_boxes, image, str)

    # os.system("sh /home/proma/Desktop/shell.sh")

    # pattern = re.compile("(.*)(S-ADDRESS)")
    # temp = ''
    # for i, line in enumerate(open('/home/proma/Desktop/Kaggle/kaggle/working/unilm/layoutlm/deprecated/examples/seq_labeling/output/test_predictions.txt')):
    #     match = re.search(pattern, line)
    #     if match:
    #         print('Found on line %s: %s' % (i+1, match.group(0)))
    #         strr = match.group(0)
    #         temp += strr.split(' ', 1)[0]+' '

    # print(temp)
    return jsonify(dic)

    return "<p>Hello, World!</p>"


@app.route("/msg", methods=['GET', 'POST'])
def bye_world():
    if(request.method == "POST"):
        print("accepted")
        sms = request.get_json()

        return jsonify(smsProcess.getInfo(sms['sms']))
    return "<p>Hello, World!</p>"


if __name__ == '__main__':

    app.run(host='192.168.88.104', port=8080, debug=True)
