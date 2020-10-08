function setup() {
  createCanvas(400, 400);
  n1Input = createInput(1.337);

  n1Input.input(draw);
  n1Input.size(50)

  n2Input = createInput(1.463);
  n2Input.input(draw);
  n2Input.size(50)

  rSlider = createSlider(0, 90, 45, 0.1);
  rSlider.style('width', '80px');

  rSlider.input(draw)

  n2sel = createSelect();
  n2sel.position(9, 10);
  n2sel.input(draw);
  n2sel.option('Fused Silica');
  n2sel.option('Air');
  n2sel.option('Water');
  n2sel.option('Custom');


  n1sel = createSelect();
  n1sel.position(295, 280);
  n1sel.input(draw);
  n1sel.option('Water');
  n1sel.option('Air');
  n1sel.option('Fused Silica');
  n1sel.option('Custom');

}

function draw() {

  var CenterX = 200;
  var CenterY = 100;

  background(255);
  rectMode(CENTER);

  if (n1sel.value() == 'Air') {
    n1Input.value(1)
  } else if (n1sel.value() == 'Fused Silica') {
    n1Input.value(1.463)
  } else if (n1sel.value() == 'Water') {
    n1Input.value(1.337)
  }

    if (n2sel.value() == 'Air') {
    n2Input.value(1)
  } else if (n2sel.value() == 'Fused Silica') {
    n2Input.value(1.463)
  } else if (n2sel.value() == 'Water') {
    n2Input.value(1.337)
  }

  n1Input.position(CenterX + 135, CenterY + 210);
  n2Input.position(CenterX - 190, CenterY - 60);
  rSlider.position(CenterX + 105, CenterY + 270);

  strokeWeight(0.1)
  fill(0)
  text('n1 =', CenterX + 100, 327)

  fill(0)
  text(' = n2', CenterX - 135, CenterY - 43)
  text('Input Angle',  CenterX + 18, CenterY + 283)

  strokeWeight(1)
  var n1CurrAngRad = 0;
  var opplength = 0;

  fill(150, 0, 0, 20)
  rect(CenterX, CenterY, 400, 200)

  fill(0, 150, 150, 20)
  rect(CenterX, CenterY + 200, 400, 200)

  fill(190, 0, 0)
  rect(CenterX + 180, CenterY + 250, 15, 15)

  fill(0, 190, 0)
  rect(CenterX - 180, CenterY - 20, 15, 15)

  fill(0)

  var n1CurrAng = rSlider.value()
  textSize(16)


  if (n1CurrAng == 0) {} else {
    var arcStart = 90 * PI / 180
    var arcStop = (90 + n1CurrAng) * PI / 180
    fill(190, 0, 0)
    noStroke()
    arc(CenterX, CenterY + 100, 50, 50, arcStart, arcStop);
    stroke(0)
  }

  n1str = ''
  if (n1CurrAng < 45) {

    n1CurrAngRad = n1CurrAng * PI / 180
    opplength = (tan(n1CurrAngRad)) * 200
    line(CenterX, CenterY + 100, CenterX - opplength, CenterY + 300);

  } else {

    n1CurrAngRad = n1CurrAng * PI / 180
    opplength = 200 / (tan(n1CurrAngRad))
    line(CenterX, CenterY + 100, CenterX - 200, CenterY + 100 + opplength);

  }


  fill(0)
  strokeWeight(0.1);
  text(n1str.concat(n1CurrAng.toFixed(1), '° ='), CenterX + 114, CenterY + 255)
  stroke(1);
  var n2CurrAng = asin((n1Input.value() * sin(n1CurrAngRad)) / n2Input.value()) * 180 / PI
  var n2str = '= '

  fill(0)
  strokeWeight(0.1)
  text(n2str.concat(n2CurrAng.toFixed(1), '°'), CenterX - 165, CenterY - 15)
  strokeWeight(1)

  var n2CurrAngRad = n2CurrAng * PI / 180

  stroke(0)
  if (n2CurrAng == 0) {} else {
    let arcStart = 270 * PI / 180
    let arcStop = (270 + n2CurrAng) * PI / 180
    fill(0, 190, 0)
    noStroke()
    arc(CenterX, CenterY + 100, 50, 50, arcStart, arcStop);
  }
  
  stroke(0)

  if (isNaN(n2CurrAng)) {
  n1CurrAngRad = n1CurrAng * PI / 180
    
    let arcStart = (90 - n1CurrAng) * PI / 180
    let arcStop = 90 * PI / 180
      
    arc(CenterX, CenterY + 100, 50, 50, arcStart, arcStop);
    fill(190, 0, 0)
    
    opplength = 200 / (tan(n1CurrAngRad))
    line(CenterX, CenterY + 100, CenterX + 200, CenterY + 100 + opplength);
    
  } else if (n2CurrAng < 45) {

    opplength = (tan(n2CurrAngRad)) * 200
    line(CenterX, CenterY + 100, CenterX + opplength, CenterY - 100);

  } else {

    opplength = 200 / (tan(n2CurrAngRad))
    line(CenterX, CenterY + 100, CenterX + 200, CenterY + 100 - opplength);

  }


  stroke(0)
  strokeWeight(1)

  drawingContext.setLineDash([10, 5]);
  line(CenterX, CenterY - 100, CenterX, CenterY + 300)

  drawingContext.setLineDash([]);
}

function Medium_RI() {

  let lam = 488
  let lams2 = Math.pow(lam / 1000, 2); // wavelength square in µm

  // Dispersion formula
  let a = ((5.684027565 / 10) * lams2) / (lams2 - (5.101829712 / 1000));
  let b = ((1.726177391 / 10) * lams2) / (lams2 - (1.821153936 / 100));
  let c = ((2.086189578 / 100) * lams2) / (lams2 - (2.620722293 / 100));
  let d = ((1.130748688 / 10) * lams2) / (lams2 - (1.069792721 * 10));

  let sums = 1 + a + b + c + d
  let RIwat = Math.sqrt(sums);

  SheathRIinput.value(str(RIwat.toFixed(4)))
} // end of function

function FlowCell_RI() {

  let lam = 488
  let lams2 = Math.pow(lam / 1000, 2); // wavelength square in µm

  // Dispersion formula 
  let a = ((0.6961663) * lams2) / (lams2 - Math.pow(0.0684043, 2));
  let b = ((0.4079426) * lams2) / (lams2 - Math.pow(0.1162414, 2));
  let c = ((0.8974794) * lams2) / (lams2 - Math.pow(9.896161, 2));

  let sums = 1 + a + b + c
  let RIflowcell = Math.sqrt(sums);

  FlowCellRIinput.value(str(RIflowcell.toFixed(4)))
} // end of function