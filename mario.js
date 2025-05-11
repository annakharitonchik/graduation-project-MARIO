let rem;
let varWidth;
let speedOfMario = -1.6;
let speed = 0.1;
let scaleForWidthAndHeight = 10;
if (window.innerWidth > 1023) {
  rem = 10;
  varWidth = 8;
} else if (window.innerWidth > 900) {
  rem = 4.24;
  varWidth = 4;
} else if (window.innerWidth > 840) {
  rem = 4.3;
  varWidth = 4;
} else if (window.innerWidth > 450) {
  rem = 4.3;
  varWidth = 10;
} else if (window.innerWidth > 400) {
  rem = 10;
  varWidth = 10.4;
} else if (window.innerWidth > 300) {
  rem = 8.78;
  scaleForWidthAndHeight = 8.78;
  varWidth = 10.4;
}
let scrollX = 0;
let varScrollSpeed = true;
let scrollSpeed = 0.01;
needVibration = false; // Сбрасываем флаг после вибрации

function scrollWorld() {
  if (varScrollSpeed) {
    scrollX -= scrollSpeed * varWidth;
    document.querySelector(
      "main"
    ).style.transform = `translateX(${scrollX}rem)`;
  }
  requestAnimationFrame(scrollWorld);
}
setTimeout(() => {
  scrollWorld();
}, 3000);
function openModal(id) {
  document.querySelector(id).style.display = "block";
}
function closeModal(id) {
  document.querySelector(id).style.display = "none";
  scrollX = 0;
  scrollSpeed = 0;
  document.querySelector("main").style.transform = `translateX(${scrollX}rem)`;
  location.reload();
}

function modalWindowClick(eo) {
  eo.stopPropagation();
}
function closeModal2(id) {
  document.querySelector(id).style.display = "none";
  openModal("#ResultModal");
  restoreInfo();
}

const MARIO = document.querySelector("#small-mario");
if (localStorage.getItem("player") == "mario") {
  MARIO.src = "./small-mario.svg";
} else if (localStorage.getItem("player") == "luigi") {
  MARIO.src = "./small-luigi.svg";
} else {
}

let o = 0;
const GRASS = document.querySelector(".grass-small");
const hardBlocks = document.querySelectorAll(".hard");
const hill_up_1 = Array.from(document.querySelectorAll(".hill-up-1"));
const hill_up_2 = Array.from(document.querySelectorAll(".hill-up-2"));
const hill_down_1 = Array.from(document.querySelectorAll(".hill-down-1"));
const hill_down_2 = Array.from(document.querySelectorAll(".hill-down-2"));
const textured = Array.from(document.querySelectorAll(".textured1"));
const visible = Array.from(document.querySelectorAll(".visible"));
const breakable = Array.from(document.querySelectorAll(".breakable"));
const coin = Array.from(document.querySelectorAll(".coin"));
const enemy = Array.from(document.querySelectorAll(".enemy"));
const background = document.querySelector(".background");
let count = 0;
let shadowWidth = 3.1 * rem;
let shadowHeight = 3.1 * rem;
let countStar = 0;
let countCoin = 0;
let countMushroom = 0;
let boleanForCoin = true;
let varForOpenModal = true;
class movingCoins {
  top = 0;
  left = 0;
  speedY = 0;
  speedX = 0;
  gravity = -3;
  constructor(ref) {
    this.ref = ref;
  }

  collide(obj) {
    const mRect = this.ref.getBoundingClientRect();
    const objRect = obj.getBoundingClientRect();
    if (obj.classList.contains("noShadow")) {
      objRect.width = objRect.width - shadowWidth;
    }
    if (obj.classList.contains("noShadow1")) {
      objRect.height = objRect.height - shadowHeight;
    }
    if (
      mRect.x + mRect.width > objRect.x &&
      mRect.x < objRect.x + objRect.width &&
      mRect.y + mRect.height > objRect.y &&
      mRect.y < objRect.y + objRect.height
    ) {
      const topCollision = Math.abs(mRect.y + mRect.height - objRect.y);
      const bottomCollision = Math.abs(mRect.y - (objRect.y + objRect.height));
      const leftCollision = Math.abs(mRect.x + mRect.width - objRect.x);
      const rightCollision = Math.abs(mRect.x - (objRect.x + objRect.width));

      const minCollision = Math.min(
        topCollision,
        bottomCollision,
        leftCollision,
        rightCollision
      );
      if (minCollision === topCollision) {
        this.top -= topCollision;
        flag = true;
        this.speedY = 0;
      } else if (minCollision === bottomCollision) {
        this.top += bottomCollision; // objRect.y + objRect.height;
        this.speedY = 0;
        this.gravity = 0;
      } else if (minCollision === leftCollision && count == 0) {
        this.left -= leftCollision / rem;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 0;
      } else if (minCollision === rightCollision) {
        this.left += rightCollision / rem;
        this.speedX = 0;
        this.gravity = 0;
      }
    }
  }
  collideTextured(obj) {
    const mRect = this.ref.getBoundingClientRect();
    const objRect = obj.getBoundingClientRect();
    document.querySelector("#tall-1");
    if (obj.classList.contains("noShadow")) {
      objRect.width = objRect.width - shadowWidth;
    }
    if (
      mRect.x + mRect.width > objRect.x &&
      mRect.x < objRect.x + objRect.width &&
      mRect.y + mRect.height > objRect.y &&
      mRect.y < objRect.y + objRect.height
    ) {
      const topCollision = Math.abs(mRect.y + mRect.height - objRect.y);
      const bottomCollision = Math.abs(mRect.y - (objRect.y + objRect.height));
      const leftCollision = Math.abs(mRect.x + mRect.width - objRect.x);
      const rightCollision = Math.abs(mRect.x - (objRect.x + objRect.width));

      const minCollision = Math.min(
        topCollision,
        bottomCollision,
        leftCollision,
        rightCollision
      );
      if (minCollision === topCollision) {
        this.top -= topCollision;
        this.speedY = 0;
      } else if (minCollision === bottomCollision) {
        this.top += bottomCollision; // objRect.y + objRect.height;
        this.speedY = 0;
        obj.src = "./unbreakable.svg";
        visible[textured.indexOf(obj)].style.visibility = "visible";
        if (obj.classList.contains("breakable")) {
          obj.style = "display:none";
        }
      } else if (minCollision === leftCollision && count == 0) {
        this.left -= leftCollision / rem;
        this.speedX = 0;
      } else if (minCollision === rightCollision) {
        this.left += rightCollision / rem;
        this.speedX = 0;
      }
    }
  }

  update() {
    if (this.ref.style.visibility == "visible") {
      this.speedX = 0.1 * rem;
      this.speedY -= this.gravity / rem;
      this.top += this.speedY / rem;
      this.left += this.speedX / rem;

      this.ref.style.transform = `translate( ${this.left}rem, ${this.top}rem )`;
      hardBlocks.forEach((element) => {
        this.collide(element);
      });
      textured.forEach((element) => {
        this.collideTextured(element);
      });
      hill_up_1.forEach((element) => {
        this.collide(element);
      });
      hill_up_2.forEach((element) => {
        this.collide(element);
      });
      hill_down_1.forEach((element) => {
        this.collide(element);
      });
      hill_down_2.forEach((element) => {
        this.collide(element);
      });
    }
  }
}
class Mario {
  top = 0 * rem;
  left = 0.45 * rem;
  speedY = 0;
  speedX;
  gravity = -0.5;
  constructor(ref) {
    this.ref = ref;
  }

  collide(obj) {
    const mRect = this.ref.getBoundingClientRect();
    const objRect = obj.getBoundingClientRect();
    document.querySelector("#tall-1");
    if (obj.classList.contains("noShadow")) {
      objRect.width = objRect.width - shadowWidth;
    }
    if (obj.classList.contains("noShadow1")) {
      objRect.height = objRect.height - shadowHeight;
    }
    if (
      mRect.x + mRect.width > objRect.x &&
      mRect.x < objRect.x + objRect.width &&
      mRect.y + mRect.height > objRect.y &&
      mRect.y < objRect.y + objRect.height
    ) {
      const topCollision = Math.abs(mRect.y + mRect.height - objRect.y);
      const bottomCollision = Math.abs(mRect.y - (objRect.y + objRect.height));
      const leftCollision = Math.abs(mRect.x + mRect.width - objRect.x);
      const rightCollision = Math.abs(mRect.x - (objRect.x + objRect.width));
      const minCollision = Math.min(
        topCollision,
        bottomCollision,
        leftCollision,
        rightCollision
      );

      if (minCollision === topCollision) {
        if (objRect.top != o) {
          o = objRect.top;
          varScrollSpeed = true;
        }
        this.top -= topCollision;
        flag = true;
        this.speedY = 0;
      } else if (minCollision === bottomCollision) {
        this.top += bottomCollision; // objRect.y + objRect.height;
        this.speedY = 0;
      } else if (minCollision === leftCollision && count == 0) {
        this.left -= leftCollision / rem;
        this.speedX = 0;
        varScrollSpeed = false;
        zvukElem.pause();
      } else if (minCollision === rightCollision) {
        this.left += rightCollision / rem;
        this.speedX = 0;
      }
    } else if (
      this.ref.getBoundingClientRect().top > 200 * rem &&
      !obj.classList.contains("background")
    ) {
      zvukElem.pause();
      this.ref.remove();
      openModal("#lossModal");
    } else {
    }
    if (this.ref.getBoundingClientRect().top <= 0) {
      this.speedY = -this.speedY - this.gravity;
      this.ref.style.top = this.top / 10 + "rem";
    }
  }

  collideTextured(obj) {
    const mRect = this.ref.getBoundingClientRect();
    const objRect = obj.getBoundingClientRect();
    if (
      mRect.x + mRect.width > objRect.x &&
      mRect.x < objRect.x + objRect.width &&
      mRect.y + mRect.height > objRect.y &&
      mRect.y < objRect.y + objRect.height
    ) {
      const topCollision = Math.abs(mRect.y + mRect.height - objRect.y);
      const bottomCollision = Math.abs(mRect.y - (objRect.y + objRect.height));
      const leftCollision = Math.abs(mRect.x + mRect.width - objRect.x);
      const rightCollision = Math.abs(mRect.x - (objRect.x + objRect.width));

      const minCollision = Math.min(
        topCollision,
        bottomCollision,
        leftCollision,
        rightCollision
      );
      if (minCollision === topCollision) {
        needVibration = true;
        this.top -= topCollision;
        flag = true;
        this.speedY = 0;
      } else if (minCollision === bottomCollision) {
        needVibration = true;
        this.top += bottomCollision; // objRect.y + objRect.height;
        this.speedY = 0;
        obj.src = "unbreakable.svg";
        visible[textured.indexOf(obj)].style.visibility = "visible";
        if (obj.classList.contains("breakable")) {
          obj.style = "display:none";
        }
      } else if (minCollision === leftCollision && count == 0) {
        needVibration = true;
        this.left -= leftCollision / rem;
        this.speedX = 0;
      } else if (minCollision === rightCollision) {
        needVibration = true;
        this.left += rightCollision / rem;
        this.speedX = 0;
      }
    }
  }
  collideCoins(obj) {
    const mRect = this.ref.getBoundingClientRect();
    const objRect = obj.getBoundingClientRect();

    if (
      mRect.x + mRect.width > objRect.x &&
      mRect.x < objRect.x + objRect.width &&
      mRect.y + mRect.height > objRect.y &&
      mRect.y < objRect.y + objRect.height
    ) {
      const topCollision = Math.abs(mRect.y + mRect.height - objRect.y);
      const bottomCollision = Math.abs(mRect.y - (objRect.y + objRect.height));
      const leftCollision = Math.abs(mRect.x + mRect.width - objRect.x);
      const rightCollision = Math.abs(mRect.x - (objRect.x + objRect.width));

      const minCollision = Math.min(
        topCollision,
        bottomCollision,
        leftCollision,
        rightCollision
      );
      if (minCollision === topCollision) {
        const placeholder = document.createElement("div");
        placeholder.style.width = obj.offsetWidth / rem + "rem";
        placeholder.style.height = obj.offsetHeight / rem + "rem";
        obj.replaceWith(placeholder);
        obj.remove();
        needVibration = true;
        if (obj.classList.contains("star")) {
          countStar++;
        } else if (
          obj.classList.contains("mushroom") &&
          countMushroom == 0 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./middle-mario.svg";
          this.ref.style.height = 48 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -1.8;
          speed = 0.2;
          scrollSpeed = 0.02;
          countMushroom++;
        } else if (
          obj.classList.contains("mushroom-green") &&
          countMushroom == 0 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./middle-mario-green.svg";
          this.ref.style.height = 48 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -1.8;
          speed = 0.2;
          scrollSpeed = 0.02;
          countMushroom++;
        } else if (
          obj.classList.contains("mushroom-green") &&
          countMushroom == 1 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./large-mario.svg";
          this.ref.style.height = 78 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -2.1;
          speed = 0.4;
          scrollSpeed = 0.04;
          countMushroom++;
        } else if (
          obj.classList.contains("coin") &&
          obj.style.visibility == "visible"
        ) {
          countCoin++;
        }
      } else if (minCollision === bottomCollision) {
        const placeholder = document.createElement("div");
        placeholder.style.width = obj.offsetWidth / rem + "rem";
        placeholder.style.height = obj.offsetHeight / rem + "rem";
        obj.replaceWith(placeholder);
        obj.remove();
        needVibration = true;
        if (obj.classList.contains("star")) {
          countStar++;
        } else if (
          obj.classList.contains("mushroom") &&
          countMushroom == 0 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./middle-mario.svg";
          this.ref.style.height = 48 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -1.8;
          speed = 0.2;
          countMushroom++;
          scrollSpeed = 0.02;
        } else if (
          obj.classList.contains("mushroom-green") &&
          countMushroom == 0 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./middle-mario-green.svg";
          this.ref.style.height = 48 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -1.8;
          speed = 0.2;
          scrollSpeed = 1;
          scrollSpeed = 0.02;
          countMushroom++;
        } else if (
          obj.classList.contains("mushroom-green") &&
          countMushroom == 1 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./large-mario.svg";
          this.ref.style.height = 78 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -2.1;
          scrollSpeed = 1;
          speed = 0.4;
          scrollSpeed = 0.04;
          countMushroom++;
        } else if (
          obj.classList.contains("coin") &&
          obj.style.visibility == "visible"
        ) {
          countCoin++;
        }
      } else if (minCollision === leftCollision && count == 0) {
        const placeholder = document.createElement("div");
        placeholder.style.width = obj.offsetWidth / rem + "rem";
        placeholder.style.height = obj.offsetHeight / rem + "rem";
        obj.replaceWith(placeholder);
        obj.remove();
        needVibration = true;
        if (obj.classList.contains("star")) {
          countStar++;
        } else if (
          obj.classList.contains("mushroom") &&
          countMushroom == 0 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./middle-mario.svg";
          this.ref.style.height = 48 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -1.8;
          speed = 0.2;
          scrollSpeed = 0.02;
          countMushroom++;
        } else if (
          obj.classList.contains("mushroom-green") &&
          countMushroom == 0 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./middle-mario-green.svg";
          this.ref.style.height = 48 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -1.8;
          speed = 0.2;
          scrollSpeed = 0.02;
          countMushroom++;
        } else if (
          obj.classList.contains("mushroom-green") &&
          countMushroom == 1 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./large-mario.svg";
          this.ref.style.height = 78 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -2.1;
          speed = 0.4;
          scrollSpeed = 0.04;
          countMushroom++;
        } else if (
          obj.classList.contains("coin") &&
          obj.style.visibility == "visible"
        ) {
          countCoin++;
        }
      } else if (minCollision === rightCollision) {
        const placeholder = document.createElement("div");
        placeholder.style.width = obj.offsetWidth / rem + "rem";
        placeholder.style.height = obj.offsetHeight / rem + "rem";
        obj.replaceWith(placeholder);
        obj.remove();
        needVibration = true;
        if (obj.classList.contains("star")) {
          countStar++;
        } else if (
          obj.classList.contains("mushroom") &&
          countMushroom == 0 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./middle-mario.svg";
          this.ref.style.height = 48 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -1.8;
          speed = 0.2;
          scrollSpeed = 0.02;
          scrollX = 0;
          countMushroom++;
        } else if (
          obj.classList.contains("mushroom-green") &&
          countMushroom == 0 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./middle-mario-green.svg";
          this.ref.style.height = 48 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -1.8;
          speed = 0.2;
          scrollSpeed = 0.02;
          countMushroom++;
        } else if (
          obj.classList.contains("mushroom-green") &&
          countMushroom == 1 &&
          obj.style.visibility == "visible"
        ) {
          this.ref.src = "./large-mario.svg";
          this.ref.style.height = 78 / scaleForWidthAndHeight + "rem";
          this.ref.style.width = 48 / scaleForWidthAndHeight + "rem";
          speedOfMario = -2.1;
          speed = 0.4;
          scrollSpeed = 0.04;
          countMushroom++;
        } else if (
          obj.classList.contains("coin") &&
          obj.style.visibility == "visible"
        ) {
          countCoin++;
        }
      }
    }
  }
  collideEnemy(obj) {
    const mRect = this.ref.getBoundingClientRect();
    const objRect = obj.getBoundingClientRect();
    if (
      mRect.x + mRect.width > objRect.x &&
      mRect.x < objRect.x + objRect.width &&
      mRect.y + mRect.height > objRect.y &&
      mRect.y < objRect.y + objRect.height
    ) {
      const topCollision = Math.abs(mRect.y + mRect.height - objRect.y);
      const bottomCollision = Math.abs(mRect.y - (objRect.y + objRect.height));
      const leftCollision = Math.abs(mRect.x + mRect.width - objRect.x);
      const rightCollision = Math.abs(mRect.x - (objRect.x + objRect.width));

      const minCollision = Math.min(
        topCollision,
        bottomCollision,
        leftCollision,
        rightCollision
      );

      if (minCollision === topCollision) {
        needVibration = true;
        obj.remove();
      } else if (minCollision === bottomCollision) {
        if (
          this.ref.src.includes("./middle-mario.svg") ||
          this.ref.src.includes("./middle-mario-green.svg") ||
          this.ref.src.includes("./large-mario.svg")
        ) {
          obj.remove();
          needVibration = true;
        } else {
          zvukElem.pause();
          this.top += bottomCollision;
          this.ref.remove();
          varScrollSpeed = false;
          scrollX = 0;
          openModal("#lossModal");
        }
      } else if (minCollision === leftCollision && count == 0) {
        if (
          this.ref.src.includes("./middle-mario.svg") ||
          this.ref.src.includes("./middle-mario-green.svg") ||
          this.ref.src.includes("./large-mario.svg")
        ) {
          obj.remove();
          needVibration = true;
        } else {
          zvukElem.pause();
          this.left -= leftCollision / rem;
          this.ref.remove();
          varScrollSpeed = false;
          scrollX = 0;
          openModal("#lossModal");
        }
      } else if (minCollision === rightCollision) {
        if (
          this.ref.src.includes("./middle-mario.svg") ||
          this.ref.src.includes("./middle-mario-green.svg") ||
          this.ref.src.includes("./large-mario.svg")
        ) {
          obj.remove();
          needVibration = true;
        } else {
          zvukElem.pause();
          this.left += rightCollision / rem;
          this.ref.remove();
          varScrollSpeed = false;
          scrollX = 0;
          openModal("#lossModal");
        }
      }
    }
  }
  collideFinish(obj) {
    const mRect = this.ref.getBoundingClientRect();
    const objRect = obj.getBoundingClientRect();
    if (
      mRect.x + mRect.width > objRect.x &&
      mRect.x < objRect.x + objRect.width &&
      mRect.y + mRect.height > objRect.y &&
      mRect.y < objRect.y + objRect.height &&
      obj.classList.contains("background")
    ) {
      const rightCollision = Math.abs(mRect.x - (objRect.x + objRect.width));

      const minCollision = Math.min(rightCollision);
      if (minCollision === rightCollision) {
        setTimeout(() => {
          // document.querySelector("main").style.backgroundColor = "black";

          speed = 0;
          scrollSpeed = 0;
          this.ref.remove();
          if (varForOpenModal) {
            openModal("#winModal");
          }
          varForOpenModal = false;
        }, 7000);
      }
    }
  }
  update() {
    this.speedX = speed * rem;
    this.speedY -= this.gravity;
    this.top += this.speedY;
    this.ref.style.top = this.top / rem + "rem";
    this.left += this.speedX / rem;
    this.ref.style.left = this.left + "rem";
    if (window.innerWidth > 840 && window.innerWidth < 950) {
      this.gravity = -0.23;
    }
    hardBlocks.forEach((element) => {
      this.collide(element);
    });

    textured.forEach((element) => {
      this.collideTextured(element);
    });
    coin.forEach((element) => {
      this.collideCoins(element);
    });
    enemy.forEach((element) => {
      this.collideEnemy(element);
    });
    this.collideFinish(background);
    let onSlope = false;
    hill_up_1.forEach((hill) => {
      const hillRect = hill.getBoundingClientRect();
      let marioRect = this.ref.getBoundingClientRect();
      if (marioRect.right > hillRect.left && marioRect.left < hillRect.right) {
        const relativeLeft = (marioRect.right - hillRect.left) / hillRect.width;

        let slopeTop =
          hillRect.top -
          marioRect.height / 2 / rem -
          (hillRect.height / rem -
            hardBlocks[9].getBoundingClientRect().height / rem) *
            rem *
            relativeLeft;
        if (this.ref.height == 78 && hill.classList.contains("hill-up-1")) {
          this.ref.style.transform = `translate(0rem, ${
            2 * (-78 / rem + 45 / rem)
          }rem)`;
        }

        if (this.top >= slopeTop + marioRect.height && this.speedY >= 0) {
          this.top = slopeTop + marioRect.height;
          this.speedY = 0;
          flag = true;
          onSlope = true;
        }
      }
    });
    hill_up_2.forEach((hill) => {
      const hillRect = hill.getBoundingClientRect();
      const marioRect = this.ref.getBoundingClientRect();
      if (marioRect.right > hillRect.left && marioRect.left < hillRect.right) {
        if (this.ref.height == 78 && hill.classList.contains("hill-up-2")) {
          this.ref.style.transform = `translate(0rem, ${
            2 * (-78 / rem + 45 / rem)
          }rem)`;
        }
        const relativeLeft = (marioRect.right - hillRect.left) / hillRect.width;

        const slopeTop =
          hillRect.top -
          marioRect.height / 2 / rem -
          (hillRect.height / rem -
            hardBlocks[10].getBoundingClientRect().height / rem) *
            rem *
            relativeLeft;
        if (this.top >= slopeTop + marioRect.height && this.speedY >= 0) {
          this.top = slopeTop + marioRect.height;
          this.speedY = 0;
          flag = true;
          onSlope = true;
        }
      }
    });

    count = onSlope ? 1 : 0;
    hill_down_1.forEach((hill) => {
      const hillRect = hill.getBoundingClientRect();
      const marioRect = this.ref.getBoundingClientRect();
      if (marioRect.right > hillRect.left && marioRect.left < hillRect.right) {
        if (this.ref.height == 78 && hill.classList.contains("hill-down-1")) {
          this.ref.style.transform = `translate(0rem, 0rem)`;
        }
        const relativeLeft = (marioRect.right - hillRect.left) / hillRect.width;

        const slopeTop =
          hillRect.top -
          (2 * marioRect.height) / rem +
          (hillRect.height / rem -
            hardBlocks[9].getBoundingClientRect().height / rem) *
            rem *
            relativeLeft;
        if (this.top >= slopeTop - marioRect.height && this.speedY >= 0) {
          this.top = slopeTop - marioRect.height;
          this.speedY = 0;
          flag = true;
        }
      }
    });
    hill_down_2.forEach((hill) => {
      const hillRect = hill.getBoundingClientRect();
      const marioRect = this.ref.getBoundingClientRect();
      if (marioRect.right > hillRect.left && marioRect.left < hillRect.right) {
        if (this.ref.height == 78 && hill.classList.contains("hill-down-2")) {
          this.ref.style.transform = `translate(0rem, 0rem)`;
        }
        const relativeLeft = (marioRect.right - hillRect.left) / hillRect.width;

        const slopeTop =
          hillRect.top -
          (2 * marioRect.height) / rem +
          (hillRect.height / rem -
            hardBlocks[10].getBoundingClientRect().height / rem) *
            rem *
            relativeLeft;
        if (this.top >= slopeTop - marioRect.height && this.speedY >= 0) {
          this.top = slopeTop - marioRect.height;
          this.speedY = 0;
          flag = true;
        }
      }
    });
  }
}

function a(element) {
  return new movingCoins(element);
}
const newVisible = visible.map(a);
const mario = new Mario(MARIO);
let flag = true;
let keys = {
  Space: false,
  W: false,
  ArrowUp: false,
};
function checkKey(event) {
  if (keys.hasOwnProperty(event.code) && flag) {
    keys[event.code] = true;
  }
}
function zvukJumpPlay() {
  if (flag) {
    zvukJump.play();
  }
}

function stopPress(event) {
  keys[event.code] = false;
}
function pressKey() {
  if (keys["Space"] && flag) {
    zvukJumpPlay();
    mario.speedY = speedOfMario * rem;
    zvukElem.play();
    flag = false;
  }
  if (keys["KeyW"] && flag) {
    zvukJumpPlay();
    mario.speedY = speedOfMario * rem;
    flag = false;
    zvukElem.play();
  }
  if (keys["ArrowUp"] && flag) {
    zvukJumpPlay();
    mario.speedY = speedOfMario * rem;
    flag = false;
    zvukElem.play();
  }
}
Zepto(window).on("swipeUp", function () {
  mario.speedY = speedOfMario * rem;
  zvukJumpPlay();
  flag = false;
});
requestAnimationFrame(updateGame);

document.addEventListener("keydown", checkKey);
document.addEventListener("keyup", stopPress);

function updateGame() {
  pressKey();
  mario.update();
  newVisible.forEach((element) => {
    element.update();
  });
  requestAnimationFrame(updateGame);
}
const zvukElem = document.getElementById("ZVUK");
const zvukJump = document.getElementById("JUMP");

function zvukPlay() {
  zvukElem.play();
}
document.addEventListener("touchstart", function () {
  if (needVibration && "vibrate" in navigator) {
    navigator.vibrate(300); // Вибрация на 100 миллисекунд
    needVibration = false; // Сбрасываем флаг после вибрации
  }
});
document.addEventListener("touchstart", function () {
  zvukPlay();
});
