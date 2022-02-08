function makeGraph(vote_average) {
  const canvas = document.getElementById("vote_average_graph");
  const ctx = canvas.getContext("2d");
  const posX = canvas.width / 2;
  const posY = canvas.height / 2;

  ctx.lineCap = "round";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawGraphBackground(posX, posY, ctx);

  drawGraphLine(posX, posY, ctx, vote_average);
}

function drawGraphBackground(posX, posY, ctx) {
  const radius = 30;
  const rad = Math.PI / 180;

  ctx.beginPath();
  ctx.arc(posX, posY, radius, 0, rad * 360);
  ctx.fillStyle = "#ffffff2c";
  ctx.fill();
}

function drawGraphLine(posX, posY, ctx, vote_average) {
  const vote_average_percentage_in_angles = 3.6 * vote_average;
  const start_angle = 270;
  const radius = 27;
  const rad = Math.PI / 180;

  ctx.beginPath();
  ctx.strokeStyle = "#17ff00";
  ctx.lineWidth = "6";
  ctx.arc(
    posX,
    posY,
    radius,
    rad * start_angle,
    rad * (start_angle + vote_average_percentage_in_angles)
  );
  ctx.stroke();
}

export default makeGraph;
