# Windows for 70s

An interactive art piece that transforms your webcam feed into retro ASCII art. 

Using object detection to identify and track objects, the project isolates detected objects and renders them as classic ASCII characters with [1970s aesthetics](https://archive.org/details/ascii-star-trek-spock-1976). 

## Overview

This project captures video from your webcam and:

* Detects objects in real-time using YOLOv8
* Tracks objects and displays bounding boxes with labels and confidence scores
* Converts the image inside each box into ASCII art using the ascii_magic library
* Displays both the original detection and the ASCII art version on top

The result: [!](https://github.com/SaraCamCas/AgorithmicArtCourse/blob/main/HW1-Oeuvre%20UDEM/HW3/Example/Example.gif)

## How to run

Prerequisites

* Python 3.8 or higher
* A working webcam
* Install the [ultralytic](https://docs.ultralytics.com/quickstart/) and [ascii_magic](https://github.com/LeandroBarone/python-ascii_magic) in virtual environment (highly recommended)

The program will:

* Open your webcam feed
* Display the ASCII art version of each detected object
* Press 'd' or 1 to quit