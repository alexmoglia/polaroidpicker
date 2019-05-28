const EXAMPLE_ALBUM = [
  (pic1 = {
    albumId: "ex",
    id: 0,
    message: "w i l d ・ f i r e",
    frameColor: "#04272d",
    textColor: "#fde9c8",
    borderColor: "#fde9c8",
    borderWidth: 1,
    font: "Gloria Hallelujah",
    textSize: "120px",
    url: "images/example/bonfire.JPG",
    credit: "Photo by Vlad Bagacian from Pexels"
  }),
  (pic2 = {
    albumId: "ex",
    id: 1,
    message: "golden",
    frameColor: "#f2f0ee",
    textColor: "#c07f48",
    borderColor: "#c07f48",
    borderWidth: 3,
    font: "Berkshire Swash",
    textSize: "150px",
    url: "images/example/abaya-abu.JPG",
    credit: "Photo by Oliver Sjöström from Pexels"
  }),
  (pic3 = {
    albumId: "ex",
    id: 2,
    message: "Ocean Air '97",
    frameColor: "#90a7c9",
    textColor: "#fff",
    borderColor: "#fff",
    borderWidth: 15,
    font: "Amatic SC",
    textSize: "150px",
    url: "images/example/lighthouse.JPG",
    credit: "Photo by Jeffrey Czum from Pexels"
  }),
  (pic4 = {
    albumId: "ex",
    id: 3,
    message: "Neon / Future",
    frameColor: "#20141f",
    textColor: "#5ff2e4",
    borderColor: "#5ff2e4",
    borderWidth: 4,
    font: "Amatic SC",
    textSize: "150px",
    url: "images/example/vending.JPG",
    credit: "Photo by Aleksandar Pasaric from Pexels"
  }),
  (pic5 = {
    albumId: "ex",
    id: 4,
    message: "Stay Frosty",
    frameColor: "#090e12",
    textColor: "#b89fff",
    borderColor: "#72f3e7",
    borderWidth: 4,
    font: "Permanent Marker",
    textSize: "150px",
    url: "images/example/celebration-colored-smoke.JPG",
    credit: "Photo by Ali Müftüoğulları from Pexels"
  }),
  (pic6 = {
    albumId: "ex",
    id: 5,
    message: "the trees, ablaze",
    frameColor: "#fff",
    textColor: "#bf3027",
    borderColor: "#bf3027",
    borderWidth: 0,
    font: "Sue Ellen Francisco",
    textSize: "110px",
    url: "images/example/leaves.JPG",
    credit: "Photo by Thomas from Pexels"
  }),
  (pic7 = {
    albumId: "ex",
    id: 6,
    message: "Asakusa・Tokyo",
    frameColor: "#3d3f52",
    textColor: "#fe0e3d",
    borderColor: "#fe0e3d",
    borderWidth: 3,
    font: "Kaushan Script",
    textSize: "100px",
    url: "images/example/asakusa.JPG",
    credit: "Alex Moglia"
  }),
  (pic8 = {
    albumId: "ex",
    id: 7,
    message: "#Precious #Pup",
    frameColor: "#dcc5de",
    textColor: "#fefefe",
    borderColor: "#fefefe",
    borderWidth: 5,
    font: "Permanent Marker",
    textSize: "150px",
    url: "images/example/pupperdoo.JPG",
    credit: "Photo by Valeria Boltneva from Pexels"
  })
];

const COLOR_SWATCHES = [
  (color1 = {
    id: 1,
    name: "dark blue",
    value: "#090e12"
  }),
  (color2 = {
    id: 2,
    name: "white",
    value: "#f2f0ee"
  }),
  (color3 = {
    id: 3,
    name: "light blue",
    value: "#cdecff"
  }),
  (color4 = {
    id: 4,
    name: "purple",
    value: "#f2e2ff"
  }),
  (color5 = {
    id: 5,
    name: "green",
    value: "#a8e6cf"
  }),
  (color6 = {
    id: 6,
    name: "teal",
    value: "#67f2e4"
  }),
  (color7 = {
    id: 7,
    name: "lime",
    value: "#dcedc1"
  }),
  (color8 = {
    id: 8,
    name: "orange",
    value: "#ffd3b6"
  }),
  (color9 = {
    id: 9,
    name: "rose",
    value: "#ffaaa5"
  }),
  (color10 = {
    id: 10,
    name: "red",
    value: "#ff8b94"
  }),
  (color11 = {
    id: 11,
    name: "dark red",
    value: "#602320"
  })
];

let icon,
  appName,
  uploadButton,
  uploadDetails,
  uploadThumbsWrapper,
  exampleDetails,
  exampleThumbsWrapper,
  frameColorDiv,
  textColorDiv,
  borderColorDiv,
  fontField,
  textField,
  canvas,
  ctx,
  albumObject,
  selectedImage;

window.onload = init;
function init() {
  // * Query Selectors
  icon = document.querySelector(".material-icons"); // used in changeColor()
  appName = document.querySelector("#app-name"); // used in changeColor()
  uploadButton = document.querySelector("#file-input-label"); // used in uploadImages()
  uploadDetails = document.querySelector("#upload-details"); // used in toggleAlbums()
  uploadThumbsWrapper = document.querySelector("#upload-thumbnail-div"); // used in displayExampleThumbs(), uploadImages()
  exampleDetails = document.querySelector("#example-details"); // used in toggleAlbums()
  exampleThumbsWrapper = document.querySelector("#example-thumbnail-div"); // used in displayExampleThumbs()
  frameColorDiv = document.querySelector("#frame-color-div"); // used in displaySwatches()
  textColorDiv = document.querySelector("#text-color-div"); // used in displaySwatches()
  borderColorDiv = document.querySelector("#border-color-div"); // used in displaySwatches()
  fontField = document.querySelector("#font-input"); // ued in changeFont()
  textField = document.querySelector("#text-field");

  // * Event Listeners
  // Toggles albums so only one can be open, based on Summary element found in Details element
  const SUMMARIES = document.querySelectorAll(".summary");
  // Click Toggle
  SUMMARIES.forEach(summary =>
    summary.addEventListener("click", function(event) {
      toggleAlbums(event.target);
    })
  );
  // Hover Toggle
  SUMMARIES.forEach(summary =>
    summary.addEventListener("mouseover", function(event) {
      // hover on Summary, need Details, thus pass id for processing in hoverAlbums()
      hoverAlbums(event.target.id);
    })
  );

  const COLOR_CONTROLS = document.querySelectorAll("#span-div span");
  COLOR_CONTROLS.forEach(tab =>
    tab.addEventListener("mouseover", function(event) {
      hoverColorTab(event.target);
    })
  );

  // font Event Listener
  fontField.addEventListener("input", function(event) {
    changeFont(this.value);
  });

  // * Canvas
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  // * Function Calls
  displayCanvasInstructions();
  displayExampleThumbs();
  displaySwatches(frameColorDiv);
  displaySwatches(textColorDiv);
  displaySwatches(borderColorDiv);
}

// * Hover/Toggle Control Functions

function toggleAlbums(clickedAlbum) {
  //? update to take in clicked button & array of possible buttons in section,
  //? thus allowing for us with controls section?
  if (clickedAlbum.id === "upload-summary") {
    if (exampleDetails.hasAttribute("open")) {
      exampleDetails.removeAttribute("open");
    } else if (uploadDetails.hasAttribute("open")) {
      exampleDetails.setAttribute("open", "open");
    }
  } else if (clickedAlbum.id === "example-summary") {
    if (uploadDetails.hasAttribute("open")) {
      uploadDetails.removeAttribute("open");
    } else if (exampleDetails.hasAttribute("open")) {
      uploadDetails.setAttribute("open", "open");
    }
  }
}

function hoverAlbums(id) {
  let hoveredAlbum = document.querySelector(`#${id}`).parentElement;
  // possible values for hoveredAlbum = [#example-details, #upload-details]
  if (hoveredAlbum.id === "example-details") {
    if (uploadDetails.hasAttribute("open")) {
      uploadDetails.removeAttribute("open");
    }
    exampleDetails.setAttribute("open", "open");
  } else if (hoveredAlbum.id === "upload-details") {
    if (exampleDetails.hasAttribute("open")) {
      exampleDetails.removeAttribute("open");
    }
    uploadDetails.setAttribute("open", "open");
  }
}

function hoverColorTab(hoveredTab) {
  const COLOR_CONTROLS = document.querySelectorAll("#span-div span");
  COLOR_CONTROLS.forEach(function(span) {
    span.style.color = "#fff";
    span.style.backgroundColor = "#111";
  });
  hoveredTab.style.color = "#111";
  hoveredTab.style.backgroundColor = "#fff";

  const COLOR_DIVS = document.querySelectorAll(".color-control-class");
  COLOR_DIVS.forEach(div => div.classList.add("display-none"));

  // idClip uses regex to extract the first word in the hoveredTab's id (stops at first dash character)
  let idClip = hoveredTab.id.match(/(\w*)/)[0]; // possible values - 'frame', 'text', 'border'
  let targetColorDiv = document.querySelector(`#${idClip}-color-div`);
  targetColorDiv.classList.remove("display-none");
  targetColorDiv.style.backgroundColor = "#fff";
}

// * Canvas Control Functions

function changeColor(colorValue, selectedSwatch, divWrapper) {
  // called by event listeners on swatches (which are created in displaySwatches())
  colorValue += ""; // cast colorValue as string

  // applies black border to all swatches, then white border to selected swatch
  let allSwatches = document.querySelectorAll("#" + divWrapper.id + " div");
  allSwatches.forEach(swatch => (swatch.style.borderColor = "#111"));
  let customSwatch = document.querySelector("#" + divWrapper.id + " input");
  customSwatch.style.borderColor = "#111";
  selectedSwatch.style.borderColor = "#FF0000";

  // apply color change to logo
  if (divWrapper.id === "frame-color-div") {
    icon.style.background = colorValue;
    console.log("Logo Frame Color = " + colorValue);
  } else if (divWrapper.id === "text-color-div") {
    appName.style.color = colorValue;
    console.log("Logo Text Color = " + colorValue);
  } else {
    icon.style.color = colorValue;
  }
  // apply color change to canvas if an image is selected
  if (selectedImage) {
    albumObject = findAlbumObject(selectedImage);
    if (divWrapper.id === "frame-color-div") {
      albumObject.frameColor = colorValue;
      console.log("Canvas Frame Color = " + colorValue);
    } else if (divWrapper.id === "text-color-div") {
      albumObject.textColor = colorValue;
      console.log("Canvas Text Color = " + colorValue);
    } else {
      albumObject.borderColor = colorValue;
    }
    canvasImage(selectedImage);
  }
}

function changeFont(value) {
  appName.style.fontFamily = `'${value + ""}', cursive`;
  if (selectedImage) {
    // if an image has been selected...
    albumObject = findAlbumObject(selectedImage);
    albumObject.font = value + "";
    canvasImage(selectedImage);
  } else {
    // if no image selected (still viewing canvas instructions)...
    displayCanvasInstructions(value); // if no image loaded, change font family of Canvas Instructions
  }
}

function changeText(value) {
  if (selectedImage) {
    albumObject = findAlbumObject(selectedImage);
    albumObject.message = value;
    canvasImage(selectedImage);
  }
}

// TODO Change Font Size (& Location?) function

// TODO Picture Border function (color, on/off, width) - add to changeColor()

// * Main Functions

function displayExampleThumbs() {
  // called from init()
  EXAMPLE_ALBUM.forEach(function(currentImage) {
    // Create thumbnail div elements
    let thumb = document.createElement("div");
    thumb.id = `thumb-${currentImage.albumId}-${currentImage.id}`;
    thumb.classList.add("thumb");
    thumb.style.backgroundImage = `url('${currentImage.url}')`;
    thumb.alt = currentImage.message;
    // Event listener to draw clicked thumb to canvas
    thumb.addEventListener("click", function(event) {
      canvasImage(event.target);
      document.querySelector("#text-field").value = ""; // clears custom message input upon new image selected
    });
    // Append thumb to thumbnail div wrapper
    exampleThumbsWrapper.append(thumb);
  });
}

function displaySwatches(divWrapper) {
  // Called from init(), possible values are frameColorDiv, textColorDiv, or borderColorDiv
  // Color swatch divs
  COLOR_SWATCHES.forEach(function(currentSwatch) {
    // Create swatch div elements
    let swatch = document.createElement("div");
    // swatch.id uses regex to extract the first word in the divWrapper id (stops at first dash character)
    swatch.id = `swatch-${divWrapper.id.match(/(\w*)/)[0]}-${currentSwatch.id}`; // 'swatch-frame-1', 'swatch-text-1', 'swatch-border-1', etc.
    swatch.classList.add("swatch");
    swatch.style.background = currentSwatch.value;
    swatch.alt = currentSwatch.name;
    // Event listener to apply color to frame or text
    swatch.addEventListener("click", function(event) {
      // passes in selected color, the swatch div, and the wrapper (frameColorDiv, textColorDiv, or borderColorDiv)
      changeColor(event.target.style.backgroundColor, event.target, divWrapper);
    });
    // Append swatch to divWrapper passed in to displaySwatches() (frameColorDiv, textColorDiv, or borderColorDiv)
    divWrapper.append(swatch);
  });

  // Custom color picker input
  let colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.id = `swatch-${divWrapper.id.match(/(\w*)/)[0]}-custom`; // 'swatch-frame-custom', 'swatch-text-custom', 'swatch-border-custom'
  colorPicker.classList.add("swatch");
  colorPicker.value = "#fff";
  colorPicker.addEventListener("input", function(event) {
    // passes in selected color, the swatch div, and the wrapper (frame or text wrappers)
    changeColor(event.target.style.backgroundColor, event.target, divWrapper);
  });
  // Append colorPicker to divWrapper passed in to displaySwatches()
  divWrapper.append(colorPicker);
}

// Upload Images
let uploadThumbCounter = 0;
const UPLOAD_ALBUM = [];
function uploadImages(files) {
  uploadButton.classList.add("display-none"); // hide the original Upload button
  uploadDetails.classList.remove("display-none"); // show the "My Album" details/summary/div
  exampleDetails.removeAttribute("open"); // collapse the "Examples" album

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let reader = new FileReader();
    reader.onload = function(event) {
      // thumbObject is created to add to UPLOAD_ALBUM array so changes can be saved/retrieved
      let thumbObject = {
        albumId: "up",
        id: uploadThumbCounter,
        message: "",
        frameColor: "#090e12",
        textColor: "#fff",
        borderColor: "#fff",
        borderWidth: 3,
        font: "Permanent Marker",
        textSize: "100px",
        url: `url('${event.target.result}')`
      };
      UPLOAD_ALBUM.push(thumbObject);

      // div object - the visible thumbnail
      let thumb = document.createElement("div");
      thumb.id = `thumb-up-${uploadThumbCounter}`;
      uploadThumbCounter++;
      thumb.classList.add("thumb");
      thumb.style.backgroundImage = `url('${event.target.result}')`;
      thumb.alt = "";

      // Event listener to draw clicked thumb to canvas
      thumb.addEventListener("click", function(event) {
        canvasImage(event.target);
        document.querySelector("#text-field").value = ""; // clears custom message input when new image selected
      });

      // Append thumb to thumbnail div wrapper
      uploadThumbsWrapper.append(thumb);
    };
    reader.readAsDataURL(file);
  }
  uploadDetails.setAttribute("open", "open"); // ensures "My Album" opens, even if Examples album is closed first
}

function canvasImage(div) {
  // called in event listeners on thumbs, in changeColor(), changeFont(), changeText()
  // creates the image object to be drawn, then calls drawCanvasImage() & drawText()
  selectedImage = div; // for use in Control functions
  albumObject = findAlbumObject(div);
  setControlValues(albumObject);

  // create image object from div's background image url, pass to drawCanvasImage()
  let imgObj = new Image();
  imgObj.src = div.style.backgroundImage.slice(5, -2); // strips url("  ")
  imgObj.onload = function() {
    setCanvasMaxSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    drawCanvasImage(imgObj, albumObject);
    drawText(albumObject);
    ctx.restore();
  };
}

function findAlbumObject(clickedImage) {
  // called in canvasImg(), changeColor(), changeFont(), changeText()
  let albumId = clickedImage.id.slice(6, 8);
  let thumbId = clickedImage.id.slice(9);
  if (albumId === "ex") {
    return EXAMPLE_ALBUM[thumbId];
  } else {
    return UPLOAD_ALBUM[thumbId];
  }
}

function setControlValues(albumObject) {
  // TODO update selected swatches when image canved
  // ! some color values are rgb so need to assign swatch info to album object and use that to set defaults
  // let tempFrameObj = {
  //   name: "frame",
  //   value: albumObject.frameColor
  // };
  // let tempTextObj = {
  //   name: "text",
  //   value: albumObject.textColor
  // };
  // console.log(tempFrameObj);
  // let values = [tempFrameObj, tempTextObj];
  // let index;
  // values.forEach(function(tempObj) {
  //   COLOR_SWATCHES.forEach(color =>
  //     color.value === tempObj.value ? (index = color.id) : (index = "custom")
  //   );
  //   console.log(index);
  //   let setSwatch = document.querySelector(`#swatch-${tempObj.name}-${index}`);
  //   setSwatch.style.borderColor = "#FF0000";
  // });
  // TODO
  // TODO update selected font when image canvased
  // let allOptions = document.querySelectorAll("option");
  // allOptions.forEach(option => option.setAttribute("selected", false));
  // let setOption = document.querySelector(`option[value="${albumObject.font}"`);
  // setOption.setAttribute("selected", "selected");
  // console.log(setOption);
  // TODO
}

// * Canvas Functions

function displayCanvasInstructions(font) {
  setCanvasMaxSize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  const INSTRUCTIONS_FONT = "Gloria Hallelujah";

  // Welcome message
  let message = "Welcome to Polaroid Picker!";
  ctx.font = `50px ${INSTRUCTIONS_FONT}, cursive`; // welcome message is 50px
  ctx.fillStyle = "#fff";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, 125);

  // Thumbs message
  message = "< Upload some images or";
  ctx.font = `30px ${INSTRUCTIONS_FONT}, cursive`; // remaining text is 30px
  ctx.fillStyle = "#a8e6cf";
  ctx.textAlign = "left";
  ctx.fillText(message, 30, canvas.height / 3.3);

  message = "play with the examples";
  ctx.textAlign = "left";
  ctx.fillText(message, 70, canvas.height / 2.8);

  // Controls message
  message = "Change the colors, the >";
  ctx.fillStyle = "#ffaaa5";
  ctx.textAlign = "right";
  ctx.fillText(message, canvas.width - 30, canvas.height / 1.9);

  message = "font, and the text";
  ctx.fillText(message, canvas.width - 70, canvas.height / 1.7);

  // Save message
  message = "Uploaded images are NOT sent to a server,";
  ctx.fillStyle = "#cdecff";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, canvas.height / 1.3);

  message = "so make sure to save your favorites!";
  ctx.fillText(message, canvas.width / 2, canvas.height / 1.2);

  // Canvas border

  ctx.strokeStyle = "#222";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.restore();
}

function setCanvasMaxSize() {
  // called in canvasImage()
  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  let height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  document.querySelector("#canvas").style.maxWidth = width - 800 + "px";
  document.querySelector("#canvas").style.maxHeight = height - 125 + "px";
}

// * Draw Image Functions

function drawCanvasImage(imgObj, albumObject) {
  canvas.width = imgObj.width + 150;
  canvas.height = imgObj.height + 450; // acounts for "polaroid" spacing below picture
  // draw frame
  ctx.fillStyle = albumObject.frameColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // draw image
  ctx.drawImage(imgObj, 75, 75);
  // draw image border
  ctx.strokeStyle = albumObject.borderColor;
  ctx.lineWidth = albumObject.borderWidth;
  ctx.strokeRect(75, 75, imgObj.width, imgObj.height);
}

// * Draw Text Function

function drawText(albumObject) {
  ctx.fillStyle = albumObject.textColor;
  ctx.font = `${albumObject.textSize} ${albumObject.font}, cursive`;
  ctx.textAlign = "center";
  ctx.fillText(
    albumObject.message,
    canvas.width / 2,
    canvas.height - 150 // places text in polaroid area below picture
  );
}
