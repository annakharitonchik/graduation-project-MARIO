setInterval(updateGoomba, 500);
setInterval(updateKoopa, 400);
setInterval(updateKoopaParatroopa, 400);
setInterval(updateRedPiranhaPlant, 100);
setInterval(changeRaccoonColor, 500);

const GOOMBA = document.querySelector("#goomba");
const KOOPA = document.querySelector("#koopa");
const KOOPA_PARATROOPA = document.querySelector("#koopa-paratroopa");
const RED_PIRANHA_PLANT = document.querySelector("#red-piranha-plant");
const RACCOON_RED = document.querySelector("#raccoon-fly");
const RACCOON_GREEN = document.querySelector("#raccoon-fly1");

const KOOPA_START = 20;
const KOOPA_FINISH = 39;
const KOOPA_PARATROOPA_START = 0;
const KOOPA_PARATROOPA_FINISH = 16;
const RED_PIRANHA_PLANT_BOTTOM_MAX = 49;
const RED_PIRANHA_PLANT_BOTTOM_MIN = 25;

let redPiranhaPlantBottom = 48;
let koopaLeft = KOOPA_START;
let koopaParatroopaLeft = KOOPA_PARATROOPA_START;

let scaleNumGoomba = 1;
let scaleNumKoopa = 1;
let scaleNumKoopaParatroopa = -1;
let booleanVar = true;
let changeColorVar = true;
function updateGoomba() {
  GOOMBA.style.transform = `scale(${scaleNumGoomba},1)`;
  scaleNumGoomba *= -1;
}

function updateKoopa() {
  if (koopaLeft < KOOPA_FINISH && scaleNumKoopa == 1) {
    KOOPA.style.transform = `scale(${scaleNumKoopa},1)`;
    koopaLeft++;
    KOOPA.style.left = koopaLeft + "rem";
    if (koopaLeft == KOOPA_FINISH) {
      scaleNumKoopa = -1;
    }
  } else if (koopaLeft > KOOPA_START && scaleNumKoopa == -1) {
    KOOPA.style.transform = `scale(${scaleNumKoopa},1)`;
    koopaLeft--;
    KOOPA.style.left = koopaLeft + "rem";

    if (koopaLeft == KOOPA_START) {
      scaleNumKoopa = +1;
    }
  }
}

function updateKoopaParatroopa() {
  if (
    koopaParatroopaLeft < KOOPA_PARATROOPA_FINISH &&
    scaleNumKoopaParatroopa == -1
  ) {
    KOOPA_PARATROOPA.style.transform = `scale(${-scaleNumKoopaParatroopa},1)`;
    koopaParatroopaLeft++;
    KOOPA_PARATROOPA.style.left = koopaParatroopaLeft + "rem";
    if (koopaParatroopaLeft == KOOPA_PARATROOPA_FINISH) {
      scaleNumKoopaParatroopa = 1;
    }
  } else if (
    koopaParatroopaLeft > KOOPA_PARATROOPA_START &&
    scaleNumKoopaParatroopa == 1
  ) {
    KOOPA_PARATROOPA.style.transform = `scale(${-scaleNumKoopaParatroopa},1)`;
    koopaParatroopaLeft--;
    KOOPA_PARATROOPA.style.left = koopaParatroopaLeft + "rem";

    if (koopaParatroopaLeft == KOOPA_PARATROOPA_START) {
      scaleNumKoopaParatroopa = -1;
    }
  }
}

function updateRedPiranhaPlant() {
  if (redPiranhaPlantBottom > RED_PIRANHA_PLANT_BOTTOM_MIN && !booleanVar) {
    redPiranhaPlantBottom--;
    RED_PIRANHA_PLANT.style.bottom = redPiranhaPlantBottom + "rem";
    if (redPiranhaPlantBottom == RED_PIRANHA_PLANT_BOTTOM_MIN) {
      booleanVar = true;
    }
  } else if (
    redPiranhaPlantBottom < RED_PIRANHA_PLANT_BOTTOM_MAX &&
    booleanVar
  ) {
    redPiranhaPlantBottom++;
    RED_PIRANHA_PLANT.style.bottom = redPiranhaPlantBottom + "rem";
    if (redPiranhaPlantBottom == RED_PIRANHA_PLANT_BOTTOM_MAX) {
      booleanVar = false;
    }
  }
}

function changeRaccoonColor() {
  if (changeColorVar == true) {
    RACCOON_RED.src = "raccoon-fly.svg";
    RACCOON_GREEN.src = "raccoon-fly1.svg";
    changeColorVar = false;
  } else if (!changeColorVar) {
    RACCOON_RED.src = "raccoon-fly1.svg";
    RACCOON_GREEN.src = "raccoon-fly.svg";
    changeColorVar = true;
  }
}
function choosePlayer(player) {
  if (player == document.querySelector("#mario")) {
    player.style.border = "0.8rem dashed #eb5757 ";
    document.querySelector("#luigi").style.border = "none";
  } else if (player == document.querySelector("#luigi")) {
    player.style.border = "0.8rem dashed #27ae60";
    document.querySelector("#mario").style.border = "none";
  }
  localStorage.setItem("player", player.id);
}

function openModal(id) {
  document.querySelector(id).style.display = "block";
}
function closeModal(id) {
  document.querySelector(id).style.display = "none";
}
function modalWindowClick(eo) {
  eo.stopPropagation();
}
