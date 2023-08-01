
let LSdata = JSON.parse(localStorage.getItem("UserData")) || [];
let username = document.querySelector('#username');
let email = document.querySelector('#email');
let mobile = document.querySelector("#monNumber");
let password = document.querySelector("#pass")
let continueBTN = document.querySelector('.continueBTN');

////////////////// SIGN UP /////////////////
const onSignup = () => {
  const payload = {
    username: username.value,
    email: email.value,
    mobile: mobile.value,
    password: password.value
  }

  LSdata.push(payload)

  if (username.value == "" || email.value == "" || mobile.value == "" || password.value == "") {
    Swal.fire({
      icon: 'error',
      title: 'Unable to move forword',
      text: 'Please fill all the details!',
    })
  }
  else {
    console.log(payload)
    localStorage.setItem("usernameid", payload.username)

    fetch("https://wrike-clone-backend.onrender.com/users/register", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(res => {
        console.log(res)
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${res.msg}`,
          showConfirmButton: false,
          timer: 1500,
      })
        setTimeout(() => {
          window.location.href = "login.html"
        }, 3000);
      })
      .catch(err => console.log(err))
  }
}