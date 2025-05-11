var canvas = document.getElementById("Canvas1");
var ctx = canvas.getContext("2d");

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.moveTo(x, y + radius);
  ctx.arcTo(x, y + height, x + radius, y + height, radius);
  ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
  ctx.arcTo(x + width, y, x + width - radius, y, radius);
  ctx.arcTo(x, y, x, y + radius, radius);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

function drawbackground() {
  canvas.width = 600;
  canvas.height = 400;
  ctx.fillStyle = "black";

  roundedRect(ctx, 12, 12, 582, 382, 25);
  ctx.fillStyle = "white";
  ctx.strokeStyle = "black";

  roundedRect(ctx, 4, 4, 566, 370, 25);

  ctx.fillStyle = "black";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = "bold 60px 'Fira Sans'";
  ctx.fillText("GAME OVER", 582 / 2, 302 / 2);
}

var canvas2 = document.getElementById("inputOK");
var ctx2 = canvas2.getContext("2d");
function drawButton() {
  drawbackground();
  canvas2.width = 145;
  canvas2.height = 75;
  ctx2.fillStyle = "black";
  roundedRect(ctx2, 7, 7, 132, 62, 15);
  ctx2.fillStyle = "#eb5757";
  ctx2.strokeStyle = "black";
  roundedRect(ctx2, 2, 2, 130, 60, 15);
  ctx2.font = "bold 30px 'Fira Sans'";
  ctx2.fillStyle = "black";
  ctx2.textAlign = "center";
  ctx2.textBaseline = "middle";
  ctx2.fillText("OK", 132 / 2, 75 / 2);
}
document.fonts.ready.then(() => {
  drawButton();
  drawbackground();
});
function drawScaleButton() {
  drawbackground();
  canvas2.width = 149;
  canvas2.height = 79;
  ctx2.fillStyle = "black";
  roundedRect(ctx2, 7, 7, 134, 64, 15);
  ctx2.fillStyle = "#eb5757";
  ctx2.strokeStyle = "black";
  roundedRect(ctx2, 2, 2, 132, 62, 15);
  ctx2.font = "bold 34px 'Fira Sans'";
  ctx2.fillStyle = "black";
  ctx2.textAlign = "center";
  ctx2.textBaseline = "middle";
  ctx2.fillText("OK", 139 / 2, 77 / 2);
}

canvas2.addEventListener("mousemove", drawScaleButton);
canvas2.addEventListener("mouseleave", drawButton);

var canvas3 = document.getElementById("Canvas2");
var ctx3 = canvas3.getContext("2d");

function drawbackground2() {
  canvas3.width = 600;
  canvas3.height = 400;
  ctx3.fillStyle = "black";

  roundedRect(ctx3, 12, 12, 582, 382, 25);
  ctx3.fillStyle = "white";
  ctx3.strokeStyle = "black";

  roundedRect(ctx3, 4, 4, 566, 370, 25);

  ctx3.fillStyle = "black";
  ctx3.textAlign = "center";
  ctx3.textBaseline = "middle";
  ctx3.font = "bold 60px 'Fira Sans'";
  ctx3.fillText("YOU WON!", 582 / 2, 302 / 2);
}

var canvas4 = document.getElementById("inputRes");
var ctx4 = canvas4.getContext("2d");
function drawButton2() {
  drawbackground2();
  canvas4.width = 145;
  canvas4.height = 75;
  ctx4.fillStyle = "black";
  roundedRect(ctx4, 7, 7, 132, 62, 15);
  ctx4.fillStyle = "#eb5757";
  ctx4.strokeStyle = "black";
  roundedRect(ctx4, 2, 2, 130, 60, 15);
  ctx4.font = "bold 30px 'Fira Sans'";
  ctx4.fillStyle = "black";
  ctx4.textAlign = "center";
  ctx4.textBaseline = "middle";
  ctx4.fillText("RESULTS", 132 / 2, 75 / 2);
}
document.fonts.ready.then(() => {
  drawButton2();
  drawbackground2();
});
function drawScaleButton2() {
  drawbackground2();
  canvas4.width = 151;
  canvas4.height = 81;
  ctx4.fillStyle = "black";
  roundedRect(ctx4, 7, 7, 136, 66, 15);
  ctx4.fillStyle = "#eb5757";
  ctx4.strokeStyle = "black";
  roundedRect(ctx4, 2, 2, 134, 64, 15);
  ctx4.font = "bold 32px 'Fira Sans'";
  ctx4.fillStyle = "black";
  ctx4.textAlign = "center";
  ctx4.textBaseline = "middle";
  ctx4.fillText("RESULTS", 136 / 2, 79 / 2);
}

canvas4.addEventListener("mousemove", drawScaleButton2);
canvas4.addEventListener("mouseleave", drawButton2);

const ajaxHandlerScript = "https://fe.it-academy.by/AjaxStringStorage2.php";
let updatePassword = Math.random();
const stringName = "KHARYTONCHYK_MARIO_RESULTS";

let results = [];
function showLoader() {
  document.getElementById("loader").style.display = "block";
}
function hideLoader() {
  document.getElementById("loader").style.display = "none";
}

function storeInfo() {
  $.ajax({
    url: ajaxHandlerScript,
    type: "POST",
    cache: false,
    dataType: "json",
    data: { f: "LOCKGET", n: stringName, p: updatePassword },
    success: lockGetReady,
    error: function (jqXHR, statusStr, errorStr) {
      hideLoader();
      errorHandler(jqXHR, statusStr, errorStr);
    },
  });
}

function lockGetReady(callresult) {
  if (callresult.error != undefined) {
    alert(callresult.error);
    hideLoader();
  } else {
    $.ajax({
      url: ajaxHandlerScript,
      type: "POST",
      cache: false,
      dataType: "json",
      data: {
        f: "UPDATE",
        n: stringName,
        v: JSON.stringify(results),
        p: updatePassword,
      },
      success: updateReady,
      error: function (jqXHR, statusStr, errorStr) {
        hideLoader();
        errorHandler(jqXHR, statusStr, errorStr);
      },
    });
  }
}

function updateReady(callresult) {
  hideLoader();
  if (callresult.error != undefined) alert(callresult.error);
}

function restoreInfo() {
  showLoader();
  $.ajax({
    url: ajaxHandlerScript,
    type: "POST",
    cache: false,
    dataType: "json",
    data: { f: "READ", n: stringName },
    success: readReady,
    error: function (jqXHR, statusStr, errorStr) {
      hideLoader();
      errorHandler(jqXHR, statusStr, errorStr);
    },
  });
}
function readReady(callresult) {
  results = JSON.parse(callresult.result);
  if (countCoin <= 9) {
    results.push(`coins: ${countCoin}           stars: ${countStar}`);
  } else {
    results.push(`coins: ${countCoin}         stars: ${countStar}`);
  }
  if (results.length > 5) {
    results = results.slice(-5);
  }
  hideLoader();
  drawbackground3();
  storeInfo();
}

function errorHandler(jqXHR, statusStr, errorStr) {
  alert(statusStr + " " + errorStr);
}

var canvas5 = document.getElementById("Canvas3");
var ctx5 = canvas5.getContext("2d");
function drawbackground3() {
  canvas5.width = 1000;
  canvas5.height = 800;
  ctx5.fillStyle = "black";

  roundedRect(ctx5, 12, 12, 976, 776, 25);
  ctx5.fillStyle = "white";
  ctx5.strokeStyle = "black";

  roundedRect(ctx5, 4, 4, 967, 772, 25);

  ctx5.fillStyle = "black";
  ctx5.textAlign = "center";
  ctx5.textBaseline = "middle";
  ctx5.font = "bold 60px 'Fira Sans'";
  ctx5.fillText("RESULTS", 992 / 2, 192 / 2);

  let y = 392 / 2;
  if (results) {
    [...results].reverse().forEach((element) => {
      ctx5.fillText(element, 992 / 2, y);
      y += 100;
    });
  }
}
drawbackground3();
var canvas6 = document.getElementById("inputMenu");
var ctx6 = canvas6.getContext("2d");
function drawButton3() {
  drawbackground3();
  canvas6.width = 145;
  canvas6.height = 75;
  ctx6.fillStyle = "black";
  roundedRect(ctx6, 7, 7, 132, 62, 15);
  ctx6.fillStyle = "#eb5757";
  ctx6.strokeStyle = "black";
  roundedRect(ctx6, 2, 2, 130, 60, 15);
  ctx6.font = "bold 30px 'Fira Sans'";
  ctx6.fillStyle = "black";
  ctx6.textAlign = "center";
  ctx6.textBaseline = "middle";
  ctx6.fillText("MENU", 132 / 2, 75 / 2);
}

drawButton3();
function drawScaleButton3() {
  drawbackground3();
  canvas6.width = 151;
  canvas6.height = 81;
  ctx6.fillStyle = "black";
  roundedRect(ctx6, 7, 7, 136, 66, 15);
  ctx6.fillStyle = "#eb5757";
  ctx6.strokeStyle = "black";
  roundedRect(ctx6, 2, 2, 134, 64, 15);
  ctx6.font = "bold 32px 'Fira Sans'";
  ctx6.fillStyle = "black";
  ctx6.textAlign = "center";
  ctx6.textBaseline = "middle";
  ctx6.fillText("MENU", 136 / 2, 79 / 2);
}

canvas6.addEventListener("mousemove", drawScaleButton3);
canvas6.addEventListener("mouseleave", drawButton3);
