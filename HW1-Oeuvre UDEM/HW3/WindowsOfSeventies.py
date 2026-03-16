# IMPORTANT: Make sure to have the following files in the same directory as this script:
# - courbd.ttf 
# - yolov8n.pt (YOLOv8 Nano model weights)

#IMPORTANT: When importanting Ultralitics, create a virtual environment and install ultralytics with pip install ultralytics

# ---------------------- IMPORTS ------------------

from ultralytics import YOLO
import cv2
from ascii_magic import AsciiArt 
import numpy as np
from PIL import Image, ImageFont, ImageDraw

# ---------------------- FUNCTIONS ------------------

def ascii_image(box_image, columns, color='black', textcol = (0, 255, 0), size = 6):
    """
    Convert an image to ASCII
    """
    if box_image is None or box_image.size == 0:
        print("Error: Empty box image")
        return None
        
    try:
        # Convert BGR (CV format) to RGB (PIL format)
        rgb_image = cv2.cvtColor(box_image, cv2.COLOR_BGR2RGB)
        pil_image = Image.fromarray(rgb_image)
        
        # Create ASCII 
        ascii_art = AsciiArt.from_pillow_image(pil_image)

        # Get ASCII as string
        raw_ascii = ascii_art.to_ascii(columns=columns)
        
        # Split into lines
        lines = raw_ascii.splitlines()
        
        if not lines:
            print("Error: No ASCII lines generated")
            return None
        
        # Calculate dimensions for the ASCII image
        char_width = size
        char_height = int(size * 1.65)   
        
        ascii_width = int(columns * char_width)
        ascii_height = int(len(lines) * char_height)
        
        # Create a blank image for ASCII text
        ascii_pil = Image.new('RGB', (ascii_width, ascii_height), color)
        draw = ImageDraw.Draw(ascii_pil)
        
        # Load font
        try:
            #font = ImageFont.truetype("cour.ttf", char_height)
            font = ImageFont.truetype("courbd.ttf", char_height)
        except:
            print("Warning: cour.ttf not found, using default font")
            print("Warning: ASCII art might not fit properly")
            font = ImageFont.load_default()
        
        # Draw each line 
        for i, line in enumerate(lines):
            draw.text((0, i * char_height), line, font=font, fill=textcol)
        
        # Convert back to numpy array (RGB)
        return np.array(ascii_pil)
        
    except Exception as e:
        print(f"Error in ascii_image: {e}")
        return None

def place_ascii_in_box(image, ascii_img, x1, y1, x2, y2):
    """
    Places a resized ASCII image into the specified box
    """
    # Check inputs
    if image is None or image.size == 0:
        print("Error: No image")
        return image
        
    if ascii_img is None or ascii_img.size == 0:
        print("Warning: No ASCII image")
        return image
    
    # Get box dimensions
    box_width = x2 - x1
    box_height = y2 - y1
    
    try:
        # Resize ASCII image to exactly fit the box
        ascii_resized = cv2.resize(ascii_img, (box_width, box_height), interpolation=cv2.INTER_NEAREST)
        
        # Convert ASCII image from RGB(Pil) to BGR(OpenCV)
        ascii_resized_bgr = cv2.cvtColor(ascii_resized, cv2.COLOR_RGB2BGR)
        
        # Place ASCII
        result = image.copy()
        result[y1:y2, x1:x2] = ascii_resized_bgr
        
        return result
        
    except Exception as e:
        print(f"Error: {e}")
        return image

def process_image_with_ascii(image_input, wanted_box=0, confidence=0.2, 
                             colorback='black', colortext=(0, 255, 0), model=None, size = 6):
    """
    Main function: process an image with ASCII art in the detected box
    """
    # Load model
    # Nano selected as it is the lightest
    if model is None:
        model = YOLO('yolov8n.pt')
    
    # Check if input is a path (string) or image array (frame)
    if isinstance(image_input, str):
        # It's a file path
        original_img = cv2.imread(image_input)
        if original_img is None:
            print(f"Error: Could not load image from {image_input}")
            return None
        
        # Run detection on the image file
        results = model(source=image_input, conf=confidence, save=False)
        result = results[0]
        
    else:
        # It's a numpy array (frame from G feed)
        original_img = image_input

        if original_img is None or original_img.size == 0:
            return None
        
        # Run detection on the array directly
        results = model(original_img, conf=confidence, verbose=False)
        result = results[0]
    
    #print(f"Image loaded: {original_img.shape}")
    
    
    img_with_boxes = result.plot()
    print(f"Total Boxes: {len(result.boxes)}")
    
    if len(result.boxes) > wanted_box:
        # Get box coordinates
        box = result.boxes[wanted_box]
        x1, y1, x2, y2 = map(int, box.xyxy[0])
        
        # Crop box region from ORIGINAL image
        box_region = original_img[y1:y2, x1:x2]
        
        if box_region.size == 0:
            print("Error: Box region is empty")
            return img_with_boxes
        
        # Calculate columns based on box width
        box_width = x2 - x1
        
        # Calculate optimal columns
        columns = max(10, min(60, int(box_width / (size * 0.8))))
        
        # Generate ASCII image
        ascii_img = ascii_image(box_region, int(columns), colorback, colortext, size)
        
        if ascii_img is None:
            print("Failed to generate ASCII image")
            return img_with_boxes
        
        # Place ASCII in the box
        try:
            final_img = place_ascii_in_box(img_with_boxes, ascii_img, x1, y1, x2, y2)
            return final_img
        except Exception as e:
            print(f"Error placing ASCII: {e}")
            return img_with_boxes
    
    return img_with_boxes

# ------------ MAIN --------------------

# Nano for speed
model = YOLO('yolov8n.pt')

# Colors RGB
color = (0, 0, 0)
textcolor = (255,0, 255)

# Size of the ASCII 
sizeLettes = 1

# We turn the camera on
cap = cv2.VideoCapture(0)
if not cap.isOpened():
    print("Error: Could not open camera")
    exit()
print("Live feed started. Press 'd' to quit.")

# Each frame of the live feed will be sent to the function process_image_with_ascii
while True:
    ret, frame = cap.read()
    if not ret:
        print("Error: Could not read frame")
        break
    
    if frame is not None and frame.size > 0:
        display_frame = process_image_with_ascii(frame,               # The frame from camera
                                                wanted_box=0,         # First box
                                                colorback=color,      # Background color
                                                colortext=textcolor,  # Text color
                                                model=model,          # Pre loaded model
                                                size = sizeLettes     # Size of the ASCII char
                                                )
        
        if display_frame is not None and display_frame.size > 0:
            cv2.imshow('Window from the 70s', display_frame)
        else:
            cv2.imshow('Window from the 70s', frame)
    
    if cv2.waitKey(1) & 0xFF == ord('d'):
        break

cap.release()
cv2.destroyAllWindows()
print("Live feed ended")