////////////////// LOGIN /////////////////

const onLogin = () => {
  const payload = {
    email: document.getElementById("email").value,
    password: document.getElementById("pass").value,
  }

  if (payload.email == "" || payload.password == "") {
    Swal.fire({
      icon: 'error',
      title: 'Unable to move forword',
      text: 'Please fill all the details!',
    })
  }
  else {
    console.log(payload)
    fetch("https://wrike-clone-backend.onrender.com/users/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    }).then(res => res.json())
      .then(res => {
        if (res.msg !== "Login successful") {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${res.msg}`,
            text: 'Please fill the correct details!',
          })
        }
        else {
          console.log(res)
          // sessionStorage.setItem("token", res.token)
          localStorage.setItem("token", res.token)
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${res.msg}`,
            showConfirmButton: false,
            timer: 1500,
          })
          setTimeout(() => {
            window.location.href = "dashboard.html"
          }, 3000);
        }
      })
      .catch(err => console.log(err))
  }
}