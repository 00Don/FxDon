//document.write();
//window.alert();
//console.log();
let mainNav = document.querySelector(".main-nav");
window.addEventListener("resize", windowResizeFunc);
function windowResizeFunc(){
    console.log(this.innerWidth);
	//if(innerWidth > 430){
	if(innerWidth > 900){
		mainNav.style.height = "auto";
	} else {
		mainNav.style.height = "0";
	}
}
let menuBtn = document.querySelector(".menu-btn");
menuBtn.addEventListener("click", menuFunc);
let mainNavBool = false;
function menuFunc() {
	if (mainNavBool === false) {
		mainNav.style.height = "100vh"; mainNavBool = true;
		menuBtn.classList.remove("fa-bars");
		menuBtn.classList.add("fa-times");
	} else {
		mainNav.style.height = "0"; mainNavBool = false;
		menuBtn.classList.add("fa-bars");
		menuBtn.classList.remove("fa-times");
	}
}
let clientBtn = document.querySelector(".client-btn");
if (clientBtn != null) {
    let clientInfo = document.getElementById("client-info");
    clientBtn.addEventListener("click", clientFunc);
    let clientFuncState = false;
    function clientFunc() {
        if (clientFuncState === false) {
            clientInfo.style.width = "200px";
		    clientBtn.classList.remove("fa-user-o");
		    clientBtn.classList.add("fa-times");
            clientFuncState = true;
        } else {
            clientInfo.style.width = "0";
		    clientBtn.classList.add("fa-user-o");
		    clientBtn.classList.remove("fa-times");
            clientFuncState = false;
        }
        console.log(clientInfo);
    }
}
let dropDownIndicator = document.querySelector(".drop-down-indicator");
/*dropDownIndicator.addEventListener("mouseon", dropIndicatorFunc);
function dropIndicatorFunc() {
	this.classList.remove("fa-angle-left");
	this.classList.add("fa-angle-down");
}*/
function setSuggComp(){
	let suggCompType = document.getElementsByName("suggCompType");
	let suggCompTypeLen = suggCompType.length;
	let suggContent = document.getElementsByName("suggContent");
	for (let i = 0; i < suggCompTypeLen; i++) {
		if (suggCompType[i].checked) {
			suggContent[0].placeholder = "Enter your "+suggCompType[i].value+" here";
		}
	}
}
let noOfPages = document.getElementById("noOfPages");
if (noOfPages != null) {
	let pageCost = document.getElementById("pageCost");
	noOfPages.addEventListener("input", function() {
		if (this.value == "") {
			pageCost.innerHTML = "Cost";
		} else if (this.value == 1) {
			pageCost.innerHTML = "$60";
		} else if (this.value > 1 && this.value < 6) {
			pageCost.innerHTML = "$100";
		} else if (this.value > 5 && this.value < 12) {
			pageCost.innerHTML = "$200";
		} else {
			pageCost.innerHTML = "$300+";
		}
	});
}
let domainExt = document.getElementById("domainExt");
if (domainExt != null) {
	let domainExtCost = document.getElementById("domainExtCost");
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
let investCapital = document.getElementById("investCapital");
if (investCapital != null) {
	let profitShare = document.getElementById("profitShare");
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