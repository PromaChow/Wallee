import cv2

im = cv2.imread("invoice.png")
gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
fm = cv2.Laplacian(gray, cv2.CV_64F).var()

print(fm)
