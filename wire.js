//export a class called "wire" that has a constructor that takes two 2d coordinated as an argument

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
    drawWireCurved(){
        let x1 = this.coord1[0];
        let y1 = this.coord1[1];
        let x2 = this.coord2[0];
        let y2 = this.coord2[1];
    
        let distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        let angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    
        for(i=0;i<50;i++){
            let div = document.createElement("div");
            div.style.width = distance/50 + "px";
            div.style.height = "2px";
            div.style.backgroundColor = "black";
            div.style.position = "absolute";
            //position each div so that the left attr and the top attr are spaced out evenly between the two coordinates
            div.style.left = x1 + (x2-x1)/50*i + "px";
            // div.style.top = y1 + (y2-y1)/50*i + "px";
            //adjust the top attribute so that the line is curved twards the bottom
            div.style.top = y1 + (y2-y1)/50*i + Math.sin((x2-x1)/50*i)*10 + "px";
            document.body.appendChild(div);
        }
    }
    
}

module.exports = wire;