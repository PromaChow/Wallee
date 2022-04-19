import cv2
import os


def getListOfFiles(dirName):
    allFiles = os.listdir(dirName)
    fileList = list()
    for entry in allFiles:
        fullPath = os.path.join(dirName, entry)
        fileList.append(fullPath)
    return fileList


files = getListOfFiles("/home/proma/Desktop/images/blurr")

for i in range(len(files)):
    im = cv2.imread(files[i])
    gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY)
    fm = cv2.Laplacian(gray, cv2.CV_64F).var()

    print(fm)
