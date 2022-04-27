from flask import request
from flask import Flask
from flask_cors import CORS, cross_origin
import sys
from flask import jsonify
import base64
#from PIL import Image
import pytesseract
import numpy as np
import cv2
from wand.image import Image
import imageProcessing


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

    obj = imageProcessing.ImgProcessing
    obj.deskew(str)

    im = cv2.imread(str)
    im = obj.increase_contrast(im)
    im = obj.grayScaling(im)
    im = obj.threshold(im)
    im = obj.sharpen(im)

    cv2.imwrite("img.png", im)

    print("\n\n"+pytesseract.image_to_string(im))

    return "<p>Hello, World!</p>"


if __name__ == '__main__':

    app.run(host='192.168.86.104', port=4000, debug=True)
