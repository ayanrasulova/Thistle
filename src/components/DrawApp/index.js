import { defaultClientConditions } from "vite";

const canvas = document.getElementById('drawing-board');
const toolbar = document.getElementById('toolbar');
const ctx = canvas.getContext('2d');

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;
let startX;
let startY;
let isErasing = false;
let isDrawing = false;
let strokeColor = '#0000';


let lastData = null; 

async function checkGestureData() {
  try {
    // make a request to the served up json file
    const res = await fetch('http://localhost:3000/gesture_data.json', {
      headers: { 'Accept': 'application/json' },
    });

    // read and parse the JSON
    const data = await res.json();

    // only handle changes if data is different from last fetch
    if (JSON.stringify(data) !== JSON.stringify(lastData)) {
      console.log("Gesture data changed:", data);
      lastData = data;
      handleJsonChange(data);
    }
  } catch (error) {
    console.error("Failed to fetch gesture data:", error);
  }
}




// Poll every interval ms 
setInterval(checkGestureData, 50);

let pastShape = "";
function handleJsonChange(newData) {
  const { gesture, x, y } = newData; // separate out json data
  if (!gesture) return;

  const shape = gesture.toLowerCase();

  if (shape != 'point_thumb_out' && pastShape == 'point_thumb_out'){
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    if (isErasing){
        isErasing = false;
        ctx.strokeStyle = strokeColor;
    }
  }
  if (shape != 'rockstar' && pastShape == 'rockstar'){
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    if (isErasing){
        isErasing = false;
        ctx.strokeStyle = strokeColor;
    }
  }
  if (shape === 'swipe') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pastShape = 'swipe';
  }
  if (shape === 'point_thumb_out'){
    if (pastShape === 'point_thumb_out'){
        // complete the line from past point to current point
        if(!isPainting) {
        }
        else {

            // set the pen parameters
            ctx.lineWidth = lineWidth;
            ctx.lineCap = 'round';

            // make a line to the new point!
            ctx.lineTo(x - canvasOffsetX, y);
            ctx.stroke();
        }
    }
    else {
        // start a drawing point here
        isPainting = true;
        startX = x;
        startY = y;
    }

    // update previous state
    pastShape = 'point_thumb_out';
  }
  if (shape === 'rockstar') {
    isErasing = true;
    ctx.strokeStyle = '#ffff';
  }
  else {
    // default previous state for unexpected gesture
    pastShape = 'poop';
  }

  // TODO: handle rest of hand inputs
}



toolbar.addEventListener('click', e => {
    if (e.target.id === 'clear') {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    if (e.target.id === 'erase') {
        isErasing = true;
        ctx.strokeStyle = '#ffff';
    }
});

toolbar.addEventListener('change', e => {
    if(e.target.id === 'stroke') {
        ctx.strokeStyle = e.target.value;
        strokeColor = ctx.strokeStyle;
    }

    if(e.target.id === 'lineWidth') {
        lineWidth = e.target.value;
    }
});

const draw = (e) => {
    if(!isPainting) {
        return;
    }

    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';

    ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
    ctx.stroke();
}

canvas.addEventListener('mousedown', (e) => {
    isPainting = true;
    startX = e.clientX;
    startY = e.clientY;
});

canvas.addEventListener('mouseup', e => {
    isPainting = false;
    ctx.stroke();
    ctx.beginPath();
    if (isErasing){
        isErasing = false;
        ctx.strokeStyle = strokeColor;
    }
});

canvas.addEventListener('mousemove', draw);


