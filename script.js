/*==============================SIGN UP LOGIC===================================== */

//the array stores user data retrieved from the database
var userDataArray = [];

//grabbing elements from the form
const loginBtn = document.querySelector(".btn-submit");
const loginContainer = document.querySelector(".login-container");
const signUpContainer = document.querySelector(".signup-container");
const signInSpan = document.querySelector(".signIn-span");

//User sign up
const signUpForm = document.querySelector(".signUp");
if (signUpForm) {
  signUpForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    let checkBox = document.querySelector(".check");
    const confirmPassword = document.querySelector("#confirmPassword").value;

    let userDetails = {
      Name: document.querySelector("#userName").value,
      Email: document.querySelector("#userEmail").value,
      UserType: 1,
      Password: document.querySelector("#userPassword").value,
    };
    let errorResponse = `User with ${userDetails.Email} already exists`;
    if (checkBox.checked && userDetails.Password === confirmPassword) {
      let response = [];
      response = await postUserData(userDetails);

      if (response.message === errorResponse) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `${response.message}`,

          })
        document.querySelector("#email").value = "";
        document.querySelector("#userEmail").value = "";
        document.querySelector("#userEmail").value = "";
        document.querySelector("#confirmPassword").value = "";
      } else {
        Swal.fire(
            '',
            'Successful Registration',
            'success'
          )
          signUpContainer.classList.add('hide-forms')
          loginContainer.classList.remove('hide-forms')
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Invalid Input`,
      });
      document.querySelector("#email").value = "";
      document.querySelector("#userEmail").value = "";
      document.querySelector("#Password").value = "";
      document.querySelector("#confirmPassword").value = "";
      return;
    }
  });
}
async function searchArray(search) {
  let arryNew = [];
  arryNew = await getData();
  userDataArray = await arryNew.find((arr) => arr.Email === search);
}

//User login function
const userLogin = document.querySelector(".login-form");
if (userLogin) {
  userLogin.addEventListener("submit", async (e) => {
    e.preventDefault();
    let userDetails = {
      Email: document.querySelector("#email").value,
      Password: document.querySelector("#password").value,
    };
    let validateEmail = [];
    validateEmail = await getUserData()
    
    if(validateEmail.find(email=> email.Email === userDetails.Email)){
        let response = await postLogin(userDetails);
        //  console.log(response);
         if(response.Email === userDetails.Email && response.UserType === 2){
           var json = JSON.stringify(response);
           localStorage.setItem('userCredentials', json)
          //  var user = localStorage.getItem('userCredentials')
          //  var data =JSON.parse(user);
          //  console.log(data.Id)
            // alert('Heloo Admin');
            window.location.replace("./adminHome.html");
            
         }else if(response.Email === userDetails.Email && response.UserType === 1){
          var json = JSON.stringify(response);
          localStorage.setItem('userCredentials', json)
            // alert('Hello User')
            window.location.replace("./userMain.html");
            // window.location.href = "./userMain.html";
         }
         else{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Incorrect username or password`,
          });
         }
    }
    else{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Incorrect username or password`,
      });
     
    }
  });
}


// function encryptTest(){
//    const encodedToken=jseu.encoder.encodeBase64(JSON.stringify({'name':'phumudzo'}));
//    console.log('stored',encodedToken);

//    const decoded=JSON.parse(jseu.encoder.decodeBase64(encodedToken));

//    console.log('decooded',decoded)
// }

// function setUserDetails(userId) {
//   sessionStorage.setItem("loginCredentials", JSON.stringify({ userId }));
// }

const anonymous = document.querySelector(".start-btn");
if (anonymous) {
  anonymous.addEventListener("click", () => {
    window.location.replace("survey.html");
  });
}

const registerBtn = document.querySelector(".reg-btn");
if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    loginContainer.classList.add("hide-forms");
    signUpContainer.classList.remove("hide-forms");
  });
}

// signInSpan.addEventListener("click", () => {
//   signUpContainer.classList.add("hide-forms");
//   loginContainer.classList.remove("hide-forms");
// });

// loginBtn.addEventListener('click', ()=>{
// Swal.fire(
//     'Good job!',
//     'Successful Registration',
//     'success'
//   )
// })
// signUpBtn.addEventListener('click', ()=>{
//     Swal.fire(
//         'Good job!',
//         'You clicked the button!',
//         'success')
// })
//encryptTest()