//import the wireclass from the wire.js file
// const wire = require("./wire");
class wire {
  constructor(coord1, coord2) {
    this.coord1 = coord1;
    this.coord2 = coord2;
    this.state = "move";
  }

  //method that creates a series of dives that is spaced between coordinate 1 and mouse coordinate
  drawWire() {
    let x1 = this.coord1[0];
    let y1 = this.coord1[1];
    let x2 = this.coord2[0];
    let y2 = this.coord2[1];

    let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

    let div = document.createElement("div");
    div.className = "wire";
    div.style.width = distance + "px";
    div.style.height = "2px";
    div.style.backgroundColor = "black";
    div.style.position = "absolute";
    div.style.left = x1 + "px";
    div.style.top = y1 + "px";
    div.style.transform = "rotate(" + angle + "deg)";
    document.body.appendChild(div);
  }
  //create function draw wire curved that draws a curved wire with 50 small divs instead of a line
  drawWireCurved() {
  //  let divBig = document.createElement("div");
  //  divBig.className = "wire";
  let divBigs = document.getElementsByClassName("wire");
  // console.log(divBigs);
  //select the last wire div
  let divBig = divBigs[divBigs.length - 1];
  // console.log(divBig);
    let x1 = this.coord1[0];
    let y1 = this.coord1[1];
    let x2 = this.coord2[0];
    let y2 = this.coord2[1];

    let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    var numberOfCurves = 49;
    for (let i = 0; i < numberOfCurves; i++) {
      let div = document.createElement("div");
      div.className = "wirePiece";
      // div.style.height = "4px";
      var segmentWidth = distance / numberOfCurves;
      if(segmentWidth<=15){
        segmentWidth = 15;
      }
      if (segmentWidth >= 18) {
          segmentWidth = 18;
      }
      div.style.width = segmentWidth + "px";

      div.style.height = segmentWidth + "px";

      div.style.backgroundColor = "blue";
      div.style.position = "absolute";
      //position each div so that the left attr and the top attr are spaced out evenly between the two coordinates
      div.style.left = x1 + ((x2 - x1) / numberOfCurves) * i + "px";
      // div.style.top = y1 + (y2-y1)/50*i + "px";
      //adjust the top attribute so that the line is curved twards the bottom
      var topnumber =
        y1 +
        ((y2 - y1) / numberOfCurves) * i 
        +
        Math.sin(12.5 * i) * -250;
        if(i>numberOfCurves*.9&&topnumber < y2){
          topnumber = y2;
        }
        div.style.top =
       topnumber + "px";
       if(divBig){
       divBig.appendChild(div)
       }
    }
  }
}

var wires = [];
var wireState = "on";
var switchState = "on"
var currentWire = null;
var mouseX = 0;
var mouseY = 0;
//move mouse to get the mouse coordinates
document.onmousemove = function (e) {
  mouseX = e.pageX;
  mouseY = e.pageY;
};
//create a function that fires every render frame to see if there is a change in the wires array
function render() {
  $(".wirePiece:not(.connected) ").remove();
  requestAnimationFrame(render);
  if(wires.length >0){
  wires.forEach((wire) => {
    if(wire.state === "delete"){
      wires.splice(wires.indexOf(wire), 1);
    }
    if (wire.state==="move") {
      wire.coord2 = [mouseX, mouseY];
      wire.drawWireCurved();
    }
  });
  }
}

render();

$(document).ready(function () {

  $(".port").click(function (e) {
    if(wireState ==="on"){
    var coord1 = [e.pageX, e.pageY];
    var wire1 = new wire(coord1, coord1);
    let divBig = document.createElement("div");
    divBig.className = "wire";
    document.body.appendChild(divBig);
    wire1.state = "move"
    // wire1.drawWire();
    wires.push(wire1);
    // wireState = "off";
    }
    // if(wireState ==="off"){
    //   var coord2 = [e.pageX, e.pageY];
    //   wires.pop();
    //   // wires[wires.length - 1].coord2 = coord2;
    //   wires[wires.length - 1].draw
    //   wireState = "on";
    // }
  });

  $(".port2").click(function(e){
    //get the last wire in the wires array
    var wire = wires[wires.length-1];
    //set the state of the wire to connected
    $(".wire").addClass("connected");
    $(".wirePiece").addClass("connected");
    // console.log("connected wire")
    // console.log($(".wire"));
    wires.forEach(
      wire=>{
        wire.state="delete";
      }
    )
  })


})

function flashingWires(){

  var gradientColors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  setInterval(() => {

    gradientColors.unshift(gradientColors.pop());
      var wires = $(".wire");
      // console.log(wires);
      wires = Array.from(wires);
      console.log(wires);
      wires.forEach((wire, index) => {
        let connectedWirePieces = wire.getElementsByClassName("connected");
        if(index!== wires.length-1 && connectedWirePieces.length === 0){
          wire.remove();
        }
        setTimeout(() => {
          // console.log(connectedWirePieces);
          for (let j = 0; j < connectedWirePieces.length; j++) {
            //do this for each of the wire instances

            setTimeout(() => {
              connectedWirePieces[j].style.backgroundColor =
                gradientColors[index % gradientColors.length];
            }, 20 * j);
          }
        }, index * 1000);
      });
  }, 1000);


}

flashingWires();