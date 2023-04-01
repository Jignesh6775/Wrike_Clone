let stopModelBTN = document.querySelector('.closeBTN');
stopModelBTN.addEventListener('click', function () {
  window.location.href = "index.html";
})
let numberCount = document.querySelector('#monNumber');
numberCount.addEventListener('input', () => {
  let print = document.querySelector('#monNumber').value.length;
  document.querySelector('#updateNUM').innerText = print;
})
let LSdata = JSON.parse(localStorage.getItem("UserData")) || [];
let username = document.querySelector('#username');
let useremail = document.querySelector('#email');
let usermobile = document.querySelector("#monNumber");
let password = document.querySelector("#pass")
let continueBTN = document.querySelector('.continueBTN');

//***************************************************************************************************** */

////////////////// LOGIN /////////////////
const onLogin = () => {
  const payload = {
    user_email: useremail.value,
    user_password: password.value
  }

  LSdata.push(payload)

  if (useremail.value == "" || password.value == "") {
    Swal.fire({
      icon: 'error',
      title: 'Unable to move forword',
      text: 'Please fill all the details!',
    })
  }
  else {
    console.log(payload)
    fetch("http://localhost:8090/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        // sessionStorage.setItem("token", res.token)
        localStorage.setItem("token", res.token)
        Swal.fire(res.msg)
        setTimeout(() => {
          // window.location.href = "login.html"
        }, 3500);
      })
      .catch(err => console.log(err))
  }
}