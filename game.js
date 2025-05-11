// function a() {
//   document.documentElement.requestFullscreen();
// }
document.addEventListener(
  "touchmove",
  function (event) {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  },
  { passive: false }
);

// const KOOPAS = document.querySelectorAll(".koopas");

class Goomba {
  ref; // htmlElement
  scaleNum = 1;

  constructor(element) {
    this.ref = element;
  }

  update() {
    this.ref.style.transform = `scale(${this.scaleNum},1) translate(0, -4.8rem)`;
    this.scaleNum *= -1;
  }
}

const goombas = Array.from(document.querySelectorAll(".goombas")).map(function (
  element
) {
  const goomba = new Goomba(element);
  return goomba;
});

class GoombaFly {
  ref;
  finish;
  start;
  flag = 1;
  pos = -14;
  constructor(ref, start, finish) {
    this.ref = ref;
    this.start = start;
    this.finish = finish;
  }
  update() {
    if (this.pos > this.finish && this.flag == 1) {
      this.ref.style.transform = `translate(0, ${this.pos}rem)`;
      this.pos--;
      if (this.pos == this.finish) {
        this.flag = -1;
      }
    } else if (this.pos < this.start && this.flag == -1) {
      this.ref.style.transform = `translate(0,${this.pos}rem)`;
      this.pos++;
      if (this.pos == this.start) {
        this.flag = 1;
      }
    }
  }
}
const goombaFly1 = document.querySelector("#goomba-fly-1");
const goombaFly2 = document.querySelector("#goomba-fly-2");
const firstGoombaFly = new GoombaFly(goombaFly1, 0, -20);
const secondGoombaFly = new GoombaFly(goombaFly2, -6, -18);

class Koopa {
  ref;
  posX = 1;
  posY;
  start = 0;
  finish;
  scaleNum = 1;
  constructor(ref, posY, finish) {
    this.ref = ref;
    this.posY = posY;
    this.finish = finish;
  }
  update() {
    if (this.posX < this.finish && this.scaleNum == 1) {
      this.ref.style.transform = `scale(${this.scaleNum},1) translate(${this.posX}rem, ${this.posY}rem)`;

      this.posX++;
      if (this.posX == this.finish) {
        this.scaleNum = -1;
      }
    } else if (this.posX > this.start && this.scaleNum == -1) {
      this.ref.style.transform = `scale(${this.scaleNum},1) translate(${-this
        .posX}rem, ${this.posY}rem)`;
      this.posX--;

      if (this.posX == this.start) {
        this.scaleNum = 1;
      }
    }
  }
}
const koopas = document.querySelectorAll(".koopas");
[k1, k2, k3, k4] = koopas;
let koopa1 = new Koopa(k1, -7.9, 19);
let koopa2 = new Koopa(k2, -7.6, 15);
let koopa3 = new Koopa(k3, -7.6, 29);
let koopa4 = new Koopa(k4, -7.7, 25);

class NipperPlant {
  ref;
  posX = 1;
  start = 0;
  finish = 10;
  scaleNum = 1;
  constructor(ref) {
    this.ref = ref;
  }
  update() {
    if (this.posX < this.finish && this.scaleNum == 1) {
      this.ref.style.transform = `scale(${this.scaleNum},1) translate(${-this
        .posX}rem, -4.8rem)`;

      this.posX++;
      if (this.posX == this.finish) {
        this.scaleNum = -1;
      }
    } else if (this.posX > this.start && this.scaleNum == -1) {
      this.ref.style.transform = `scale(${this.scaleNum},1) translate(${this.posX}rem, -4.8rem)`;
      this.posX--;

      if (this.posX == this.start) {
        this.scaleNum = 1;
      }
    }
  }
}
const NipperPlants = Array.from(document.querySelectorAll(".nipper-plant")).map(
  function (element) {
    const nipper = new NipperPlant(element);
    return nipper;
  }
);

class piranhaPlant {
  ref;
  posY = 1;
  top = 7;
  bottom = 0;
  flag = 1;

  constructor(ref) {
    this.ref = ref;
  }
  update() {
    if (this.posY > this.bottom && this.flag == -1) {
      this.posY--;
      this.ref.style.backgroundPositionY = this.posY + "rem";
      if (this.posY == this.bottom) {
        this.flag = 1;
      }
    } else if (this.posY < this.top && this.flag == 1) {
      this.posY++;
      this.ref.style.backgroundPositionY = this.posY + "rem";
      if (this.posY == this.top) {
        this.flag = -1;
      }
    }
  }
}

const redPiranha = document.querySelector(".red-piranha");
const plant = new piranhaPlant(redPiranha);

class Nanny {
  ref;
  finish = 34;
  start = 0;
  flag = 1;
  pos;
  constructor(ref, pos) {
    this.ref = ref;
    this.pos = pos;
  }
  update() {
    if (this.pos < this.finish && this.flag == 1) {
      this.ref.style.transform = `translate(0, ${this.pos}rem)`;
      this.pos++;
      if (this.pos == this.finish) {
        this.flag = -1;
      }
    } else if (this.pos > this.start && this.flag == -1) {
      this.ref.style.transform = `translate(0,${this.pos}rem)`;
      this.pos--;
      if (this.pos == this.start) {
        this.flag = 1;
      }
    }
  }
}
const nanny1 = document.querySelector("#nanny1");
const nanny2 = document.querySelector("#nanny2");
const firstNanny = new Nanny(nanny1, 27);
const secondNanny = new Nanny(nanny2, 15);

class Fish {
  ref;
  posX;
  start = 0;
  finish = 41;
  scaleNum = 1;
  constructor(ref, posX) {
    this.ref = ref;
    this.posX = posX;
  }
  update() {
    if (this.posX < this.finish && this.scaleNum == 1) {
      this.ref.style.transform = `scale(${this.scaleNum},1) translate(${this.posX}rem, 0)`;

      this.posX++;
      if (this.posX == this.finish) {
        this.scaleNum = -1;
      }
    } else if (this.posX > this.start && this.scaleNum == -1) {
      this.ref.style.transform = `scale(${this.scaleNum},1) translate(${-this
        .posX}rem, 0)`;
      this.posX--;

      if (this.posX == this.start) {
        this.scaleNum = 1;
      }
    }
  }
}

const fish1 = document.querySelector("#fish1");
const fish2 = document.querySelector("#fish2");
const firstFish = new Fish(fish1, 30);
const secondFish = new Fish(fish2, 23);

class Spiny {
  ref;
  posX = 10;
  start = 0;
  finish = 65;
  scaleNum = -1;
  constructor(ref) {
    this.ref = ref;
  }
  update() {
    if (this.posX < this.finish && this.scaleNum == -1) {
      this.ref.style.transform = `scale(${this.scaleNum},1) translate(${-this
        .posX}rem, 0)`;

      this.posX++;
      if (this.posX == this.finish) {
        this.scaleNum = 1;
      }
    } else if (this.posX > this.start && this.scaleNum == 1) {
      this.ref.style.transform = `scale(${this.scaleNum},1) translate(${this.posX}rem, 0)`;
      this.posX--;

      if (this.posX == this.start) {
        this.scaleNum = -1;
      }
    }
  }
}

const spiny1 = document.querySelector("#spiny");
const firstSpiny = new Spiny(spiny1);

let start100;
let start300;
let start500;

requestAnimationFrame(function globalUpdate(time) {
  if (start100 == undefined) {
    start100 = time;
  }
  if (start300 == undefined) {
    start300 = time;
  }
  if (start500 == undefined) {
    start500 = time;
  }

  if (time - start100 > 100) {
    start100 = time;
    firstGoombaFly.update();
    secondGoombaFly.update();
    firstNanny.update();
    secondNanny.update();
    firstSpiny.update();
  }
  if (time - start300 > 300) {
    start300 = time;
    koopa1.update();
    koopa2.update();
    koopa3.update();
    koopa4.update();
    NipperPlants.forEach((nipper) => nipper.update());
    plant.update();
    firstFish.update();
    secondFish.update();
  }
  if (time - start500 > 500) {
    start500 = time;
    goombas.forEach((goomba) => goomba.update());
  }
  requestAnimationFrame(globalUpdate);
});


