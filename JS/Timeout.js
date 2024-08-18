let User =JSON.parse(localStorage.getItem("User"));
let span = document.getElementById('username');
span.textContent = `${User.FirstName } ${User.LastName}`