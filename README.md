## Welcome to Thistle.io :art: :point_up_2: 
Girls Hoo Hack 2025 Official Submission by Ayan Rasulova, Emilie Deadman, Amelia Chen, Jack Ellis (GitHub: jackawackadoo)

## Inspiration:

Generative AI has become more powerful over the last few years, and a lot of discourse within art communities involves the idea that artists with disabilities are not able to create art without the use of generating drawings through prompt engineering. As passionate artists and software developers, we wanted to challenge this notion, offering an accessible alternative for digital drawing beyond the constraints of a mouse, tablet, or physical device. 

## Features:

Thistle utilizes OpenCV and MediaPipe Hands to detect and track hand signals through a live webcam feed. Our custom motion-mapping algorithms classify specific hand gestures, including: 

- index finger ( :point_up: ) to navigate through the canvas
- dual fingers (:metal:) to switch between drawing and erasing mode 
- index finger with thumb out ( :point_up_2: ) to interact with the canvas (drawing or erasing)
- finger pinch ( :fingers_crossed: ) to enter color selection mode 
- long swipe ( :hand_splayed:) to clear the canvas 

These gestures are then transmitted in real-time via webcam to our JavaScript canvas, rendering the canvas on our front-end website (build with React and Tailwind).

## How To Use!

Make sure you install the dependencies first:
``` bash
dependencies here
```
Then, type the following commands into the terminal: 
 ```bash
insert download here 
python run.py # etc 
```

## Reflection/Next Steps:

We have centered our design with consideration to those with Parkinson's, Dyspraxia, and carpal tunnel syndrome. However, we plan to allow for customization with our computer vision mappings, allowing people to map canvas interactions to kinesthetic movements that feel most comfortable for them.
