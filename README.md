## Welcome to Thistle.io :art: :point_up_2: 
Girls Hoo Hack 2025 Official Submission by Ayan Rasulova (GitHub: ayanrasulova), Emilie Deadman (GitHub: echiino), Amelia Chen, Jack Ellis (GitHub: jackawackadoo)

## Inspiration:

Generative AI has become more powerful over the last few years, and a lot of discourse within art communities involves the idea that artists with disabilities are not able to create art without the use of generating drawings through prompt engineering. As passionate artists and software developers, we wanted to challenge this notion, offering an accessible alternative for digital drawing beyond the constraints of a mouse, tablet, or physical device. 

## Features:

Thistle utilizes OpenCV and MediaPipe Hands to detect and track hand signals through a live webcam feed. Our custom motion-mapping algorithms classify specific hand gestures, including: 

- index finger (☝️) to navigate through the canvas
- dual fingers (🤘) to switch between drawing and erasing mode 
- index finger with thumb out (👆) to interact with the canvas (drawing or erasing)
- finger pinch (☝️) to enter color selection mode 
- long swipe (🖐️) to clear the canvas 

These gestures are then transmitted in real-time via webcam to our JavaScript canvas, rendering the canvas on our front-end website (build with React and Tailwind).

## How To Use!

First you need to run the setup script

***You must be using Python 3.12 for the necessary libraries to work***

For Windows:
```bash
python setup.py
```

For Mac / Linux
```bash
python3 setup.py
```

If you are having issues with the script, ensure that whatever you are using to run this script is using the correct interpreter *(Python 3.12 in a virtual environment, this script should create the virtual environment for you but only if you start with a 3.12 interpreter)*



## Reflection/Next Steps:

We have centered our design with consideration to those with Parkinson's, Dyspraxia, and carpal tunnel syndrome. However, we plan to allow for customization with our computer vision mappings, allowing people to map canvas interactions to kinesthetic movements that feel most comfortable for them.
