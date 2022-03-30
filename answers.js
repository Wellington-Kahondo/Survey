var questionsAnswers = [];
var responseArr;

let submitButton = document.querySelector(".submitting-answers");

submitButton.addEventListener("click", receivedAnswers);
async function receivedAnswers() {
  dummyQuestions.forEach(({ questionId, type }) => {
    if (type == questionTypes.yesNo || type == questionTypes.radioGroup) {
      let answers = document.querySelectorAll(`[id='${questionId}']`);

      questionsAnswers.push({
        questionId: questionId,
        answer: [...answers].find((elmnt) => elmnt.checked == true).value,
      });
      return;
    } else if (type == questionTypes.multiCheckBox) {
      let answers = [...document.querySelectorAll(`[id='${questionId}']`)];

      answers = answers.filter((elmnt) => elmnt.checked).map((elnt) => elnt.value);

      questionsAnswers.push({
        questionId: questionId,
        answer: answers,
      });
      return;
    }

    questionsAnswers.push({
      questionId: questionId,
      answer: document.querySelector(`[id='${questionId}']`).value,
    });
  });
  console.log("checking....", questionsAnswers);
 await SubmitResponse();
 
}


async function verifyUser(){

}

async function SubmitResponse(){
  let surveyid = sessionStorage.getItem('SurveyId');
    var user = localStorage.getItem('userCredentials')
    var data =JSON.parse(user);
    let Response = {
      SurveyId: surveyid,
      UserId: data.Id,
    }

    responseObj = await postResponseData(Response);
    console.log(responseObj.Id)
     getAnswers();
    // await getAnswers()
    
}



async function SubmitAnswers(Answers){

  answer = await postAnswerData(Answers)
await Swal.fire(
  '',
  'Successful, Thank you for taking the survey',
  'success'
)
location.href = 'userMain.html'
// console.log(answer)
}
async function getAnswers(){
  // e.preventDefault()
  // let surveyid = sessionStorage.getItem('SurveyId');
  let response = responseObj.Id;
  let myArr = [];
  let answer = [];
  let Answers=[];

  questionsAnswers.forEach(answers=>{
   
      Answers.push( {
        ResponseId: response,
        QuestionId: answers.questionId,
        possibleA: answers.answer,
        possibleB: '',
        possibleC: '',
        possibleD: '',
        
      }
      )
  
     
     
      
      // setTimeout(()=>{},5000)
     
      // console.log(answer)
      // setTimeout(()=>{},2000)
      //  Swal.fire(
      //   '',
      //   'Successful, Thank you for taking the survey',
      //   'success'
      // )
      // location.href = 'userMain.html'
    
    
      // console.log(`${response}:  ${ans}:      ${answers[ans
   
  })
 
  SubmitAnswers(Answers);

  
}






















///post http method
let urlresponse = "http://localhost:3000/responses";
async function postResponseData(data) {
  try {
    const response = await fetch(urlresponse, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json();
  } catch (err) {
    console.log("found error", err);
  }
}

let urlanswer = "http://localhost:3000/answers";
async function postAnswerData(data) {
  try {
    const response = await fetch(urlanswer, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json();
  } catch (err) {
    console.log("found error", err);
  }
}