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


app = Flask(__name__)
cors = CORS(app, supports_credentials=True)


def preprocess(image_path):
    image = Image.open(image_path)
    image = image.convert("RGB")

    width, height = image.size
    w_scale = 1000 / width
    h_scale = 1000 / height
    ocr_df = pytesseract.image_to_data(image, output_type='data.frame')
    ocr_df = ocr_df.dropna().assign(left_scaled=ocr_df.left * w_scale,
                                    width_scaled=ocr_df.width * w_scale,
                                    top_scaled=ocr_df.top * h_scale,
                                    height_scaled=ocr_df.height * h_scale,
                                    right_scaled=lambda x: x.left_scaled + x.width_scaled,
                                    bottom_scaled=lambda x: x.top_scaled + x.height_scaled)
    float_cols = ocr_df.select_dtypes('float').columns
    ocr_df[float_cols] = ocr_df[float_cols].round(0).astype(int)
    ocr_df = ocr_df.replace(r'^\s*$', np.nan, regex=True)
    ocr_df = ocr_df.dropna().reset_index(drop=True)

    words = list(ocr_df.text)
    coordinates = ocr_df[['left', 'top', 'width', 'height']]
    actual_boxes = []
    for idx, row in coordinates.iterrows():
        # the row comes in (left, top, width, height) format
        x, y, w, h = tuple(row)
        # we turn it into (left, top, left+widght, top+height) to get the actual box
        actual_box = [x, y, x+w, y+h]
        actual_boxes.append(actual_box)
    boxes = []
    for box in actual_boxes:
        boxes.append(normalize_box(box, width, height))
    return image, words, boxes, actual_boxes


def normalize_box(box, width, height):
    return [
        int(1000 * (box[0] / width)),
        int(1000 * (box[1] / height)),
        int(1000 * (box[2] / width)),
        int(1000 * (box[3] / height)),
    ]


def write_dataset(output_dir, words, boxes, actual_boxes, image, filename):
    width, height = image.size
    file = open(output_dir / "test.txt", "w+", encoding="utf8")
    file_bbox = open(output_dir / "test_box.txt", "w+", encoding="utf8")
    file_image = open(output_dir / "test_image.txt", "w+", encoding="utf8")

    for i in range(len(boxes)):
        file.write("{}\t{}\n".format(words[i], 'O'))
        file_bbox.write("{}\t{} {} {} {}\n".format(words[i], *boxes[i]))
        file_image.write("{}\t{} {} {} {}\t{} {}\t{}\n".format(
            words[i], *actual_boxes[i], width, height, filename))
    # with open(output_dir / "test.txt", "w+", encoding="utf8") as file, \
    # open(output_dir / "test_box.txt", "w+", encoding="utf8") as file_bbox, \
    # open(output_dir / "test_image.txt", "w+", encoding="utf8") as file_image:
    #     file.write("{}\n".format(*words))
    #     file_bbox.write("{}\t{} {} {} {}\n".format(*words, *boxes))
    #     file_image.write("{}\t{} {} {} {}\t{} {}\t{}\n".format(*words, *actual_boxes, width, height, filename))

    file.write("\n")
    file_bbox.write("\n")
    file_image.write("\n")


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

    image, words, boxes, actual_boxes = preprocess(str)
    dataset_directory = Path(
        '/home/proma/Desktop/Kaggle/kaggle/working/inference')
    write_dataset(dataset_directory, words, boxes, actual_boxes, image, str)

    os.system("sh /home/proma/Desktop/shell.sh")

    pattern = re.compile("(.*)(S-ADDRESS)")
    temp = ''
    for i, line in enumerate(open('/home/proma/Desktop/Kaggle/kaggle/working/unilm/layoutlm/deprecated/examples/seq_labeling/output/test_predictions.txt')):
        match = re.search(pattern, line)
        if match:
            print('Found on line %s: %s' % (i+1, match.group(0)))
            strr = match.group(0)
            temp += strr.split(' ', 1)[0]+' '

    print(temp)
    return jsonify({"address": temp})

    return "<p>Hello, World!</p>"


@app.route("/msg", methods=['GET', 'POST'])
def bye_world():
    if(request.method == "POST"):
        print("accepted")
        sms = request.get_json()
        print(smsProcess.getInfo(sms['sms']))
    return "<p>Hello, World!</p>"


if __name__ == '__main__':

    app.run(host='192.168.237.104', port=8080, debug=True)
