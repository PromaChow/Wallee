import cv2
from wand.image import Image
import numpy as np


class ImgProcessing:

    def grayScaling(image):
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    def threshold(image):
        blured1 = cv2.medianBlur(image, 3)
        blured2 = cv2.medianBlur(image, 51)
        divided = np.ma.divide(blured1, blured2).data
        normed = np.uint8(255*divided/divided.max())
        th, threshed = cv2.threshold(normed, 100, 255, cv2.THRESH_OTSU)

        return np.vstack(threshed)

    def deskew(image):
        with Image(filename=image) as im:
            im.deskew(0.4*im.quantum_range)
            im.save(filename=image)

    def sharpen(image):

        kernel = np.array([[0, -1, 0],
                           [-1, 5, -1],
                           [0, -1, 0]])
        image_sharp = cv2.filter2D(src=image, ddepth=-1, kernel=kernel)
        return image_sharp

    def increase_contrast(image):
        alpha = 1
        beta = 0
        return cv2.convertScaleAbs(image, alpha=alpha, beta=beta)
