from flask import request
from flask import Flask
from flask_cors import CORS, cross_origin
import sys
from flask import jsonify
import base64
from PIL import Image
import pytesseract

app = Flask(__name__)
cors = CORS(app)


@app.route("/image", methods=['GET', 'POST'])
def hello_world():
    if(request.method == "POST"):
        print("accepted")
        bytesOfimage = request.get_json()
        print(type(bytesOfimage['image']), file=sys.stderr)
        with open("imageToSave.png", "wb") as fh:
            fh.write(base64.b64decode(bytesOfimage['image']))
        print(pytesseract.image_to_string(Image.open('imageToSave.png')))
        # with open('image.jpeg', 'wb') as out:
        #     out.write(bytesOfimage)
    return "<p>Hello, World!</p>"


if __name__ == '__main__':
    app.debug = True
    app.run(host="192.168.242.104", port=4000)
