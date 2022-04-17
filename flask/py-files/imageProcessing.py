import cv2
from wand.image import Image


class ImgProcessing:

    def grayScaling(image):
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    def equalize_hist(image):
        return cv2.equalizeHist(image)

    def threshold(image):
        return cv2.threshold(image, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]

    def blurr(image):
        return cv2.medianBlur(image, 1)

    def deNoise(image):
        return cv2.fastNlMeansDenoising(image)

    def deskew(image):
        with Image(filename=image) as im:
            im.deskew(0.4*im.quantum_range)
            im.save(filename=str)
