const throttle = (cb, delay = 1000) => {
  let waiting = false;
  let extraArgs;
  const timeoutFunc = () => {
    if (extraArgs == null) {
      waiting = false;
    } else {
      cb(...extraArgs);
      extraArgs = null;
      setTimeout(timeoutFunc, delay);
    }
  }
  return (...args) => {
    if (waiting) {
      extraArgs = args;
      return;
    } else {
      cb(...args);
      waiting = true;
      setTimeout(timeoutFunc, delay);
    }
  }
};
const debounce = (cb, delay = 500) => {
  let timmer;
  return  (...args) => {
    clearTimeout(timmer);
    timmer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};
const createTimeCountDown = (cb, givenTime) => {
  let time = givenTime + 1;
  let interval;
  const countDown =() => {
    if (time > 0) {
      time = -- time;
      cb(time);
    }
  }
  return (reset = false) => {
    if (!reset) {
      interval = setInterval(countDown, 1000);
    } else {
      clearInterval(interval);
      reset = false;
      time = givenTime;
      interval = setInterval(countDown, 1000);
    }
  };
};
const mainNav = document.getElementById("mainMenu");
const resizeThrottle = throttle((tParam) => {
	//if(tParam > 430){
	if(tParam > 900) {
		mainNav.style.height = "auto";
    mainNav.style.width = "100%";
    menuState = "closed";
	} else if(tParam < 900 && menuState !== "open") {
		mainNav.style.height = 0;
    mainNav.style.width = 0;
	}
}, 300);
window.addEventListener("resize", function() {
  resizeThrottle(this.innerWidth);
});
const scrollDirec = (scrollAxis = "y") =>  {
  let oldScroll = 0;
  return (newScroll = 0) => {
    newScroll = (newScroll < 0) ? 0 : newScroll;
    if (oldScroll > newScroll) {
      oldScroll = newScroll;
      if (scrollAxis === "y") {
        return "up";
      } else if (scrollAxis === "x") {
        return "left";
      }
    } else if (oldScroll < newScroll) {
      oldScroll = newScroll;
      if (scrollAxis === "y") {
        return "down";
      } else if (scrollAxis === "x") {
        return "right";
      }
    }
  }
}
const scrollDirection = scrollDirec("y");
const myHeader = document.getElementById("myHeader");
const scrollThrottle = throttle((tParam) => {
  let headerHeight = myHeader.offsetHeight;
  let scroll = scrollDirection(tParam);
  if (clientState === "open" || menuState === "open") {
    myHeader.style.position = "sticky";
    myHeader.style.top = "0";
  } else if (tParam <= headerHeight && scroll === "down") {
    myHeader.style.position = "relative";
    myHeader.style.top = "0";
  } else {
    if (scroll === "up") {
      myHeader.style.position = "sticky";
      myHeader.style.top = "0";
    } else if (scroll === "down") {
      myHeader.style.top = "-50px";
      setTimeout(function() {myHeader.style.position = "relative";}, 510);
    }
  }
}, 250);
window.addEventListener("scroll", function() {
  scrollThrottle(this.scrollY);
});
const clientBtn = document.getElementById("clientBtn");
let clientState = "closed";
clientBtn.addEventListener("click", function() {
  const clientSec = document.getElementById("clientSec");
  const mainMenu = document.getElementById("mainMenu");
  if (clientState === "closed") {
    if (menuState === "open") {
      mainMenu.style.height = 0;
      mainMenu.style.width = 0;
			menuBtn.classList.remove("fa-times");
			menuBtn.classList.add("fa-bars");
      menuState = "closed";
    }
    clientSec.style.width = "200px";
		clientBtn.classList.remove("fa-user-o");
		clientBtn.classList.add("fa-times");
    clientState = "open";
  } else {
    clientSec.style.width = 0;
		clientBtn.classList.remove("fa-times");
		clientBtn.classList.add("fa-user-o");
    clientState = "closed";
  }
});
const menuBtn = document.getElementById("menuBtn");
let menuState = "closed";
menuBtn.addEventListener("click", function() {
  const mainMenu = document.getElementById("mainMenu");
  const clientSec = document.getElementById("clientSec");
  if (menuState === "closed") {
    if (clientState === "open") {
      clientSec.style.width = 0;
			clientBtn.classList.remove("fa-times");
			clientBtn.classList.add("fa-user-o");
      clientState = "closed";
    }
    let headerHeight = myHeader.offsetHeight;
    mainMenu.style.height = `calc(100vh - ${headerHeight}px)`;
    mainMenu.style.width = "100%";
    mainMenu.style.overflowY = "auto";
		menuBtn.classList.remove("fa-bars");
		menuBtn.classList.add("fa-times");
    menuState = "open";
  } else {
    mainMenu.style.height = 0;
    mainMenu.style.width = 0;
    mainMenu.style.overflowY = "clip";
		menuBtn.classList.remove("fa-times");
		menuBtn.classList.add("fa-bars");
    menuState = "closed";
  }
});
function setSuggComp() {
  const suggComp = document.getElementsByName("suggComp");
  const suggContent = document.getElementById("suggContent");
  if (suggComp[0].checked) {
    suggContent.placeholder = "Enter your suggestions here";
  } else if (suggComp[1].checked) {
    suggContent.placeholder = "Enter your complaints here";
  }
}
const siteCat = document.getElementById("siteCat");
const noOfPages = document.getElementById("noOfPages");
if (siteCat != null) {
  siteCat.addEventListener("change", function() {
    let pages;
    switch (this.value) {
      case "portfolio":
        pages = 5;
        noOfPages.value = pages;
        break;
      case "eCommerce":
        pages = 15;
        noOfPages.value = pages;
        break;
      case "multiMedia":
        pages = 15;
        noOfPages.value = pages;
        break;
      case "blog":
        pages = 7;
        noOfPages.value = pages;
        break;
      default:
        pages = "";
        noOfPages.value = pages;
    }
    pageCostEvent(pages);
  });
}
if (noOfPages != null) {
	noOfPages.addEventListener("input", function() {
    pageCostEvent(this.value);
  });
}
function pageCostEvent(value) {
  const pageCost = document.getElementById("pageCost");
  if (value == "") {
    pageCost.innerHTML = "Cost";
  } else if (value == 1) {
    pageCost.innerHTML = "$60";
  } else if (value > 1 && value < 6) {
    pageCost.innerHTML = "$100";
  } else if (value > 5 && value < 12) {
    pageCost.innerHTML = "$200";
  } else {
    pageCost.innerHTML = "$300+";
  }
}
const domainExt = document.getElementById("domainExt");
if (domainExt != null) {
	const domainExtCost = document.getElementById("domainExtCost");
	domainExt.onchange = function(){
		switch (this.value) {
			case "com":
				domainExtCost.innerHTML = "$20+/y";
				break;
			case "net":
				domainExtCost.innerHTML = "$20+/y";
				break;
			case "ng":
				domainExtCost.innerHTML = "$5+/y";
				break;
			default:
				domainExtCost.innerHTML = "Cost";
		}
	}
}
const investCapital = document.getElementById("investCapital");
if (investCapital != null) {
	const profitShare = document.getElementById("profitShare");
	investCapital.addEventListener("input", function() {
		if (this.value == "" /*or this.value < 100*/) {
			profitShare.innerHTML = "Share%";
		} else if (this.value > 99 && this.value < 500) {
			profitShare.innerHTML = "50%";
		} else if (this.value > 499 && this.value < 1000) {
			profitShare.innerHTML = "60%";
		} else if (this.value > 999) {
			profitShare.innerHTML = "70%";
		}
	});
}
const cardBtns = document.getElementsByClassName("close-card");
for(let closeBtn of cardBtns) {
  closeBtn.addEventListener("click", function() {
    const card = this.parentElement.parentElement;
    closeBtn.classList.toggle("fa-angle-down");
    closeBtn.classList.toggle("fa-times");
    card.classList.toggle("open-card");
    console.log(card);
  });
}
const timmerOTP = document.getElementById("timmerOTP");
if (timmerOTP != null) {
  const resendOTP = document.getElementById("resendOTP");
  const timmerOTPReset = document.getElementById("timmerOTPReset");
  const intervalOTP = createTimeCountDown((time) => {
    timmerOTP.innerHTML = time + "s";
    if (time == 0) {
      resendOTP.style.maxWidth = "100%";
    } else {
      resendOTP.style.maxWidth = 0;
    }
  }, 30);
  intervalOTP();
  timmerOTPReset.addEventListener("click", function() {
    intervalOTP(true);
  });
}
const password = document.getElementById("password");
const cPassword = document.getElementById("cPassword");
if (password != null && password != null) {
  let passValue;
  let cPassValue;
  function passCheck() {
  	const cPassAlert = document.getElementById("cPassAlert");
    if (passValue != undefined && cPassValue != undefined) {
      if (passValue != cPassValue) {
    		cPassAlert.innerHTML = `<p class="alert-warning">
    			password must be the same with confirm password
				</p>`;
      } else {
    		cPassAlert.innerHTML = `<p class="alert-ok">Confirmed</p>`;
      }
    }
  }
  const debouncePassword = debounce((dParam) => {
    passValue = dParam;
    passCheck();
  }, 500);
  password.addEventListener("input", function() {
    debouncePassword(this.value);
  });
  const debounceCPassword = debounce((dParam) => {
    cPassValue = dParam;
    passCheck();
  }, 500);
  cPassword.addEventListener("input", function() {
    debounceCPassword(this.value);
  });
}
/*const updateDebounceText = debounce((dParam) => {
  console.log(`Debounce: ${dParam}`);
});
const updateThrottleText = throttle((tParam) => {
  console.log(`Throttle: ${tParam}`);
});
const effTest = document.getElementById("effTest");
effTest.addEventListener("input", function() {
  updateDebounceText(this.value);
  updateThrottleText(this.value);
});*/