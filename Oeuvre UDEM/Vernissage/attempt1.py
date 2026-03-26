from ultralytics import YOLO
import cv2

# Load a model
model = YOLO("yolo26n-seg.pt")  # load an official model

# We turn the camera on
cap = cv2.VideoCapture(0)
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
    annotated_frame = results[0].plot()  # Fixed: added parentheses

    # Display the annotated frame
    cv2.imshow("Object Inference", annotated_frame)  # Fixed: variable name

    # Break loop if 'd' is pressed
    if cv2.waitKey(1) & 0xFF == ord('d'):
        break

cap.release()
cv2.destroyAllWindows()
print("Live feed ended")

for result in results:
    data = result.masks.data
    xy = result.masks.xy  # mask in polygon format
    xyn = result.masks.xyn  # normalized
    masks = result.masks.data 
    
normalized_coords = xy[0]

print(len(xy))  
print(normalized_coords[0].shape) 
