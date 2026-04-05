# Plotted Shadows

![Title](Oeuvre UDEM\Vernissage\Examples\Titre.png)

**Plotted Shadows** is an interactive art piece that transforms your webcam feed into contour art.

Using object detection to identify and segment objects, the project isolates detected subjects, plots their contours, adds internal points, and draws random emoticons inside the shapes.


## Overview

This project captures live video from your webcam and:

- Detects objects in real time using **YOLOv26**
- Segments objects and displays their contours
- Uses contour coordinates to plot outlines, add random emoticons, and place points inside the figures
- Saves the final result as an **SVG file**
    
Example output:  
![Plotted Shadows input](Oeuvre UDEM\Vernissage\Examples\Example_README_frame.png)

![Plotted Shadows Output](Oeuvre UDEM\Vernissage\Examples\Example_README_Plot.png)

## How to Run

### Prerequisites

- Python 3.8 or higher
- A working webcam
- Required Python libraries:
  - [Ultralytics](https://docs.ultralytics.com/quickstart/) (YOLO for object detection/segmentation)
  - OpenCV (`opencv-python`) for webcam capture and image processing
  - NumPy
  - Matplotlib 
- Virtual environment (highly recommended as Ultralytics is quite heavy)

### Execution

run the PlottedShadows.py in your terminal.

The program will:

1. Open your webcam feed
2. Segment detected objects in real time
3. Press `f` or `1` to transform the current frame into contour art

## Pen Plotter

This project was designed for use with a **pen plotter** (which is why the output is saved as an SVG, specifically the [UUNA TEK](uunatek.com), iDraw 2 A3 pen plotter, [aka idrawhome](https://idrawhome.com/products/idrawhome-2-0-h-structure-xy-plotter-a3-plotting-range-with-plate)).

For more information on using an SVG file with this pen plotter:

- **Linux**: See [this documentation](https://can01.safelinks.protection.outlook.com/?url=https%3A%2F%2Fgithub.com%2Fbbaudry%2Fswart-studio%2Fblob%2Fmain%2Fpenplotting%2FREADME.md&data=05%7C02%7Csara.camila.castiblanco%40umontreal.ca%7C96906bbcc0344efbdf2008de7e9ef0a2%7Cd27eefec2a474be7981e0f8977fa31d8%7C1%7C0%7C639087418278869147%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C&sdata=5gdICqjYtP2YtgOtI6NZKsiiq9QIoS%2FVS16yuOlQ73w%3D&reserved=0)*
- **Windows**: See [this documentation](https://drive.google.com/drive/folders/1mDPv3P24jBe4Dkz6jCn9UlGHwQM1bb9V)*
- **Windows**: I also recomend [this documentation](https://uunatek.com/blogs/tips-and-tricks/understanding-gcode-and-setting-up-the-idraw-machine-for-the-first-time-gcode-usage)* to use the pen plotter with Gcode 

