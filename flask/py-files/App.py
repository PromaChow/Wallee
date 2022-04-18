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
    if(request.method == "POST"):
        print("accepted")
        bytesOfimage = request.get_json()
        print(type(bytesOfimage['image']), file=sys.stderr)
        with open(str, "wb") as fh:
            fh.write(base64.b64decode(bytesOfimage['image']))

    obj = imageProcessing.ImgProcessing
    obj.deskew(str)

    im = cv2.imread(str)

   # im = cv2.resize(im, (32, 32), interpolation=cv2.INTER_AREA)
    alpha = 1  
    beta = 0  

    im = obj.grayScaling(im)
    im = cv2.convertScaleAbs(im, alpha=alpha, beta=beta)

    kernel = np.array([[0, -1, 0],
                       [-1, 5, -1],
                       [0, -1, 0]])
    image_sharp = cv2.filter2D(src=im, ddepth=-1, kernel=kernel)

    cv2.imwrite("img.png", image_sharp)

    print(pytesseract.image_to_string(im))

    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.debug = True
    app.run(host="192.168.78.104", port=4000)
