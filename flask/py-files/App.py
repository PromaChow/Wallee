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
import easyocr

app = Flask(__name__)
cors = CORS(app)


@app.route("/image", methods=['GET', 'POST'])
# def process_image(path):
#     img = cv2.imread(path)
#     img = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
#     img = cv2.threshold(img, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
#     return img
def hello_world():
    str = "rec.jpg"
    # if(request.method == "POST"):
    #     print("accepted")
    #     bytesOfimage = request.get_json()
    #     print(type(bytesOfimage['image']), file=sys.stderr)
    #     with open(str, "wb") as fh:
    #         fh.write(base64.b64decode(bytesOfimage['image']))

    obj = imageProcessing.ImgProcessing
    # obj.deskew(str)
    im = cv2.imread(str)
    im = obj.grayScaling(im)
    im = obj.threshold(im)

    cv2.imwrite("img.png", im)
    # im = cv2.imread(str)

    # im = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    # im = cv2.fastNlMeansDenoising(im)
    # im = cv2.threshold(im, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    # with Image(filename=str) as im:
    #     im.deskew(0.4*im.quantum_range)
    #     im.save(filename=str)
    # im = cv2.imread(str)

    print("hello"+pytesseract.image_to_string(im))
    # reader = easyocr.Reader(['en'])
    # result = reader.readtext(im, detail=0)
    # print(result)
    # with open('image.jpeg', 'wb') as out:
    #     out.write(bytesOfimage)
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.debug = True
    app.run(host="192.168.78.104", port=5000)
