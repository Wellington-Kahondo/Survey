var idArray = [];
var userid = idArray.UserId;


const surveyForm = document.querySelector('#survey-form');

const surveyAnswers = {
    One: document.getElementById('sex').value,
    Two: document.querySelector('input[name="level"]:checked').value,
    Three: document.getElementById('device-access').value,
    Four: document.getElementById('internet-access').value,
    Five: document.querySelector('input[name="device"]:checked').value,
    Six: document.getElementById('time').value,
    Seven: document.getElementById('experience').options[document.getElementById('experience').selectedIndex].text,
    Eight: document.getElementById('enjoy').options[document.getElementById('enjoy').selectedIndex].text,
    Nine: document.getElementById('rate').options[document.getElementById('rate').selectedIndex].text,
    Ten: document.getElementById('time').value,
}

surveyForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    // console.log(JSON.parse(sessionStorage.getItem('username')));
    let userId = await searchArray(getCredentials());

// console.log('userInfo',getCredentials())


   surveyAnswers.UserId = userId;
//    postData(surveyAnswers);

   console.log(surveyAnswers);
//    postData(surveyAnswers);
})
async function searchArray(search) {
    let arryNew = [];
    arryNew = await getData();
    idArray = arryNew.find((arr) => arr.Email === search);
  }



  function getCredentials(){

    return JSON.parse(sessionStorage.getItem('loginCredentials'))
}