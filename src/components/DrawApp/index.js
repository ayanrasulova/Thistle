const socket = new WebSocket("ws://localhost:6789");

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

// let lastData = null;
// async function checkGestureData() {
//   try {
//     console.log("Attempting to fetch gesture data...");

//     // 👇 Fetch from your Express server
//     const res = await fetch('http://localhost:3000/gesture_data.json', {
//       headers: { 'Accept': 'application/json' },
//     });

//     console.log("Response status:", res.status, res.statusText);

//     // 👇 Grab raw text first, so we can see exactly what we got
//     const text = await res.text();
//     console.log("Raw response text:", text.substring(0, 200)); // limit to 200 chars

//     // 👇 Try to parse as JSON (after we know it looks right)
//     const data = JSON.parse(text);
//     console.log("Parsed gesture data:", data);

//     // Now you can use `data.gesture`, etc.
//     return data;
//   } catch (error) {
//     console.error("Failed to fetch gesture data:", error);
//   }
// }

let lastData = null; // keep this outside the function

async function checkGestureData() {
  try {
    const res = await fetch('http://localhost:3000/gesture_data.json', {
      headers: { 'Accept': 'application/json' },
    });

    // Read and parse the JSON
    const data = await res.json();

    // Only handle changes if data is different from last fetch
    if (JSON.stringify(data) !== JSON.stringify(lastData)) {
      console.log("Gesture data changed:", data);
      lastData = data;
      handleJsonChange(data);
    }
  } catch (error) {
    console.error("Failed to fetch gesture data:", error);
  }
}




// Poll every 500ms
setInterval(checkGestureData, 100);

function handleJsonChange(newData) {
  const { gesture, x, y } = newData; // <- directly use the fields
  if (!gesture) return;

  const shape = gesture.toLowerCase();

  if (shape === 'swipe') {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  // handle other gestures here
}



// recieved a JSON object from websocket server
socket.onmessage = (event) => {
    const { x, y, shape } = JSON.parse(event.data);


    shape = shape.toLowerCase();

    if (shape == "swipe") {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    if (shape != "draw" && isDrawing) {
        isPainting = false;
        ctx.stroke();
        ctx.beginPath();
        if (isErasing){
            isErasing = false;
            ctx.strokeStyle = strokeColor;
        }
    }

    // here you will add all your different gestures
    switch (shape){
        case "draw":
            // collect the coords of index finger tip
            const posX = x * canvas.width;
            const posY = y * canvas.height;
            if (!isDrawing){
                isDrawing = true;
                ctx.beginPath();
                ctx.moveTo(posX, posY);
            }
            ctx.lineTo(posX, posY);
            ctx.stroke();

            break;
        case "swipe":
            break;
    }
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
