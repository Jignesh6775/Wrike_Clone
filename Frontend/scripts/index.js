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