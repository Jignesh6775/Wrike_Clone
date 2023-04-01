// ================= SHOW NAV MENU =================

// ================= SHOW MENU =================
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId)
    const nav = document.getElementById(navId)


    toggle.addEventListener("click", () => {
        nav.classList.toggle("show-menu")

        toggle.classList.toggle("show-icon")
    })
}

showMenu("nav-toggle", "nav-menu")

// ================= SHOW DROPDOWN MENU =================
const dropdownItems = document.querySelectorAll(".dropdown-item")

dropdownItems.forEach((item) => {
    const dropdownBtn = item.querySelector(".dropdown-btn")

    dropdownBtn.addEventListener("click", () => {
        const showDropdown = document.querySelector(".show-dropdown")

        toggleItem(item)

        if (showDropdown && showDropdown != item) {
            toggleItem(showDropdown)
        }
    })
})

//function for display dropdown
const toggleItem = (item) => {

    //select each dropdown content
    const dropdownContainer = item.querySelector(".dropdown-container")

    //if same item contains the dropdown class,remove
    if (item.classList.contains("show-dropdown")) {
        dropdownContainer.removeAttribute("style")
        item.classList.remove("show-dropdown")
    } else {
        dropdownContainer.style.height = dropdownContainer.scrollHeight + "px"
        item.classList.add("show-dropdown")
    }
}

//DELETE Dropdown Styles
const mediaQuery = matchMedia('(min-width: 1118px)')
    dropdownContainer = document.querySelectorAll('.dropdown-container')

const removeStyle = ()=>{
    if(mediaQuery.matches){
        dropdownContainer.forEach((e)=>{
            e.removeAttribute("style")
        })

        dropdownItems.forEach((e)=>{
            e.classList.remove("show-dropdown")
        })
    }
}
addEventListener("resize",removeStyle)

// ====================== Main Body Slider 1======================
"use strict";

function carousel1() {
  let carouselSlider = document.querySelector(".carousel__slider1");
  let list = document.querySelector(".carousel__list1");
  let item = document.querySelectorAll(".carousel__item1");
  let list2;

  const speed = 1;

  const width = list.offsetWidth;
  let x = 0;
  let x2 = width;

  function clone() {
    list2 = list.cloneNode(true);
    carouselSlider.appendChild(list2);
    list2.style.left = `${width}px`;
  }

  function moveFirst() {
    x -= speed;

    if (width >= Math.abs(x)) {
      list.style.left = `${x}px`;
    } else {
      x = width;
    }
  }

  function moveSecond() {
    x2 -= speed;

    if (list2.offsetWidth >= Math.abs(x2)) {
      list2.style.left = `${x2}px`;
    } else {
      x2 = width;
    }
  }

  function hover() {
    clearInterval(a);
    clearInterval(b);
  }

  function unhover() {
    a = setInterval(moveFirst, 20);
    b = setInterval(moveSecond, 20);
  }

  clone();

  let a = setInterval(moveFirst, 20);
  let b = setInterval(moveSecond, 20);

  carouselSlider.addEventListener("mouseenter", hover);
  carouselSlider.addEventListener("mouseleave", unhover);
}

carousel1();

// ====================== Main Body Slider 1======================
"use strict";

function carousel() {
  let carouselSlider = document.querySelector(".carousel__slider2");
  let list = document.querySelector(".carousel__list2");
  let item = document.querySelectorAll(".carousel__item2");
  let list2;

  const speed = 1;

  const width = list.offsetWidth;
  let x = 0;
  let x2 = width;

  function clone() {
    list2 = list.cloneNode(true);
    carouselSlider.appendChild(list2);
    list2.style.left = `${width}px`;
  }

  function moveFirst() {
    x -= speed;

    if (width >= Math.abs(x)) {
      list.style.left = `${x}px`;
    } else {
      x = width;
    }
  }

  function moveSecond() {
    x2 -= speed;

    if (list2.offsetWidth >= Math.abs(x2)) {
      list2.style.left = `${x2}px`;
    } else {
      x2 = width;
    }
  }

  function hover() {
    clearInterval(a);
    clearInterval(b);
  }

  function unhover() {
    a = setInterval(moveFirst, 20);
    b = setInterval(moveSecond, 20);
  }

  clone();

  let a = setInterval(moveFirst, 20);
  let b = setInterval(moveSecond, 20);

  carouselSlider.addEventListener("mouseenter", hover);
  carouselSlider.addEventListener("mouseleave", unhover);
}

carousel();

//////////////////////////////////////////

