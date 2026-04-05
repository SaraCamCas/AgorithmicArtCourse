import random
import matplotlib.pyplot as plt
from matplotlib.patches import Rectangle
from matplotlib.path import Path
import numpy as np
from ultralytics import YOLO
import sys
import cv2

def settingCoords (box, percentage, px):
    """
    Set x and y coordinates for the countour and percentage of coordinates of the contour
    """

    # X and Y axis
    x_axis = [x[0] * -px  for x in box]
    y_axis = [y[1] * -px  for y in box]

    # X and Y coordinates for points 

    percentage = percentage if int(len(box)*percentage)>10 else 10

    indices = np.random.choice(len(box), size=int(len(box)*percentage))
    indices.sort()
    points = box[indices] 

    x_point = [x[0] * -px  for x in points]
    y_point = [y[1] * -px  for y in points]

    return x_axis, y_axis, x_point, y_point

def pointsFigure (x_point, y_point, box, totalPoints, px):
    """
    Return a list with the x and y coordinates for points inside the figure
    """

    maxx, minx = max(x_point), min(x_point)
    maxy, miny = max(y_point), min(y_point)

    shape_path = Path(box*px*(-1))

    attempts = 0
    points_found = 0 
    filler = []

    while points_found <= totalPoints and attempts < 10000:
        tempx = random.uniform(minx, maxx) 
        tempy = random.uniform(miny, maxy)
        if shape_path.contains_point((tempx, tempy)):
            filler.append([tempx,tempy])
            points_found += 1
        attempts += 1

    return filler

def namePiece():
    emoticons =[ '.｡.:･゜ﾟ･!!!!!','!!!!.!', '´･ω･`', '$$$$$!', '?????????', '~>°)---', '-°·_·°-',
                'ᯓ✦', '( ^^)','U~~','( ^^)','旦~~','(´▽｀)','(*°∀°)=3', '(・へ・)','()',
                '<`>','<`ヘ´>','(ーー;)','(^▽^)','(✿◠‿◠)','𐙚 ‧₊˚ ','𐙚 ‧₊˚ ','𐙚 ‧₊˚ ','𐙚 ‧₊˚ ','𐙚 ‧₊˚ '
                '. ݁₊ ⊹ . ݁ ⟡ ݁ . ⊹ ₊ ݁.', '. ݁₊ ⊹ . ݁˖ . ݁']
    
    random_indicesEmoticons = random.randint(0, len(emoticons) - 1)
    random_indicesEmoticons2 = random.randint(0, len(emoticons) - 1)
    random_indicesEmoticons3= random.randint(0, len(emoticons) - 1)

    name = f'DS9 ▶︎ |"{emoticons[random_indicesEmoticons]}i"{emoticons[random_indicesEmoticons2]}"|"{emoticons[random_indicesEmoticons3]}"|• Plotted shadows'
    return name

def drawEmoticon(x_point, y_point):
    """
    Returns a random emoticon and a random point in the contour
    """
    emoticons =[ '.｡.:･゜ﾟ･!!!!!','!!!!.!', '´･ω･`', '$$$$$!', '?????????', '~>°)---', '-°·_·°-',
                'ᯓ✦', '( ^^)','U~~','( ^^)','旦~~','(´▽｀)','(*°∀°)=3', '(・へ・)','()',
                '<`>','<`ヘ´>','(ーー;)','(^▽^)','(✿◠‿◠)','𐙚 ‧₊˚ ','𐙚 ‧₊˚ ','𐙚 ‧₊˚ ','𐙚 ‧₊˚ ','𐙚 ‧₊˚ '
                '. ݁₊ ⊹ . ݁ ⟡ ݁ . ⊹ ₊ ݁.', '. ݁₊ ⊹ . ݁˖ . ݁']
    
    random_indicesPoint = random.randint(0, len(x_point) - 1)
    random_indicesEmoticons = random.randint(0, len(emoticons) - 1)

    emoticon = emoticons[random_indicesEmoticons]
    x, y = x_point[random_indicesPoint], y_point[random_indicesPoint]

    return emoticon, x, y


def plottedShadow(width, height, result, percentage, totalPoints, totalEmo):

    """
    Returns a plot with the contour of the segment and plots of random plots inside the figures
    """

    for result in results:
        data = result.masks.data
        xy = result.masks.xy 
        boxes = result.boxes

    percentage = 0.2
    px = 1/plt.rcParams['figure.dpi']  # pixel in inches

    fig, ax = plt.subplots(figsize=(width*px, height*px))
    ax.text(0, 1, namePiece(), transform=ax.transAxes, 
        verticalalignment='top', horizontalalignment='left',
        fontsize=10, fontweight='bold')

    for i in range(len(data)):
        box = xy[i]

        x_axis, y_axis, x_point, y_point = settingCoords(box, percentage, px)

        filler = pointsFigure(x_point, y_point, box, totalPoints, px)

        x_points, y_points = [x[0] for x in filler], [y[1] for y in filler]

        ax.plot(x_axis, y_axis, c='k', markeredgewidth=1)
        ax.plot(x_points, y_points, 'x--', c='k', markeredgewidth=1)

        
        square = boxes[i].xyxy
        x1, y1, x2, y2 = square[0].tolist()
        recAxX = [x1*px*(-1), x2*px*(-1), x2*px*(-1), x1*px*(-1), x1*px*(-1)] 
        recAxY = [y1*px*(-1), y1*px*(-1), y2*px*(-1), y2*px*(-1), y1*px*(-1)] 
        ax.plot(recAxX, recAxY, c='k', markeredgewidth=1)
        

        for j in range(totalEmo): 
            emoticon, emoX, emoY = drawEmoticon(x_point, y_point)
            plt.text(emoX, emoY, emoticon, fontdict=None)
            

    
    plt.axis('off')
    fig.patch.set_visible(False)  # Removes figure background
    ax.patch.set_visible(False)   # Removes axes background
    plt.savefig('Oeuvre UDEM/Vernissage/savedSVG.svg')
    plt.show()
    

# Load a model
model = YOLO("yolo26n-seg.pt")  # load an official model

# Variables 
percentage = 10
points = 8
emoticons = 5

# We turn the camera on
cap = cv2.VideoCapture(0)
width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))

if not cap.isOpened():
    print("Error: Could not open camera")
    exit()
print("Live feed started. Press 'd' to quit.")

while cap.isOpened():
    success, frame = cap.read()
    
    if not success:
        print("Error: Failed to read frame")
        break

    # Predict with the model
    results = model(frame)

    # Visualize the results on the frame
    annotated_frame = results[0].plot()  

    # Display the annotated frame
    cv2.imshow("Object Inference", annotated_frame)  

    
    # Break loop if 'f' is pressed
    if cv2.waitKey(1) & 0xFF == ord('f'):
        print("New frame plotted")
        break

        

    
plottedShadow(width, height, results, percentage, points, emoticons)
cap.release()
cv2.destroyAllWindows()
print("Live feed ended")