// JavaScript for label effects only

document.addEventListener("DOMContentLoaded", function () {
  console.log("hello");
  const login = document.getElementById("email")
  const password = document.getElementById("password")
  const button = document.querySelector(".submit")
  let name = ""
  let pass = ""
  let submitvalid = false;
  login.addEventListener("keyup", (e) => {
      name = login.value;
      let emailtest = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
      console.log(emailtest.test(name))
  })
  button.addEventListener("hover", (e) => {
      e.preventDefault()
      console.log(e)
  })
  
});
