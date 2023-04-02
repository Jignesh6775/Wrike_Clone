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
          window.location.href = "dashboard.html"
        }, 3500);
      })
      .catch(err => console.log(err))
  }
}