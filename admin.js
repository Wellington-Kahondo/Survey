//global variables
var surveyId;
var addSurvey;
var surveyListArray = [];
var sid;


//class with static methods
class SurveyTable {
  static addSurveyToList(survey) {
    const surlist = document.querySelector("#survey-list");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${survey.UserName}</td>
        <td>${survey.Name}</td>
        <td id="td-center"><button id="btnCreate" class="${survey.Id} view-modal">create questions</button></td>
        `;
    if(surlist){
      surlist.appendChild(row);
    }
     
  }
  static addToList(survey) {
    const list = document.querySelector("#show-list");

    const row = document.createElement("tr");
    row.innerHTML = `
        <td>${survey.UserName}</td>
        <td>${survey.Name}</td>

        <td id="td-center"><button id="btnCreate" class="${survey.Id} view-report">view more</button></td>
        `;

    list.appendChild(row);
  }

  static showQuestionList(question){
    // window.location.href = "./surveyQuestions.html";
    const questionList = document.querySelector(".ordered-list");

    const orderedList = document.createElement("li");
    orderedList.innerHTML = `
          ${question.QuestionText}
        `;

    questionList.appendChild(orderedList);
  }

  static openModal(el) {
    if (el.classList.contains("view-modal")) {
      // el.parentElement.parentElement.remove();
       var id = el.classList[0]
       console.log(id)
       viewCreateQuestionModal(id)
      }
    
  }

  static viewReport(el) {
    if (el.classList.contains("view-report")) {
      // el.parentElement.parentElement.remove();
       var id = el.classList[0]
       document.cookie = id + '; path=/';
      //  console.log(id)
      //  viewReportPage(id)
       window.location.href = "surveyReports.html"
      }
    
  }

}

//populate report page
document.addEventListener("DOMContentLoaded", async () => {
  const numberOfSurveys = document.querySelector('#count-surveys')
  surveyListArray = await getSurveyData();
  numberOfSurveys.innerText = surveyListArray.length;
  await surveyListArray.forEach((survey) => SurveyTable.addToList(survey));
});
document.addEventListener("DOMContentLoaded", async () => {
  surveyListArray = await getSurveyData();
  surveyListArray.forEach((survey) => SurveyTable.addSurveyToList(survey));
});
// const adminHome = document.querySelector('#admminHome')
// if(adminHome){
//   adminHome.addEventListener('click', async ()=>{
//     surveyListArray = await getSurveyData();
//     numberOfSurveys.innerText = surveyListArray.length;
//     await surveyListArray.forEach((survey) => SurveyTable.addToList(survey));
//   })
// }

// const adminHome2 = document.querySelector('#admminHome2')
// if(adminHome2){
//   adminHome2.addEventListener('click', async()=>{
//     window.location.href = "adminCreate.html"
//     surveyListArray = await getSurveyData();
//       surveyListArray.forEach((survey) => SurveyTable.addSurveyToList(survey));
//   })
 
// }
//populate table with surveys
const adminCreate2 = document.querySelector('#admminCreate2')
if(adminCreate2){
  adminCreate2.addEventListener('click', async ()=>{
    
      surveyListArray = await getSurveyData();
      surveyListArray.forEach((survey) => SurveyTable.addSurveyToList(survey));
    
  })
 
}

const adminCreate = document.querySelector('#admminCreate')
if(adminCreate){
  adminCreate.addEventListener('click', ()=>{
    window.location.href = "adminHome.html"
    document.addEventListener("DOMContentLoaded", async () => {
      const numberOfSurveys = document.querySelector('#count-surveys')
      surveyListArray = await getSurveyData();
      numberOfSurveys.innerText = surveyListArray.length;
      await surveyListArray.forEach((survey) => SurveyTable.addToList(survey));
    });
    
  })
}

//create survey new survey
const createSurvey = document.querySelector(".surveyBtn");
if(createSurvey){
  createSurvey.addEventListener("click", async () => {
    const createNew = document.querySelector(".create-new");
  
    createNew.innerHTML = `
    <input type="text" id="input-survey" placeholder="Enter the survey name here..."/>
    <button class="addSurvey">Add Survey</button>
    `;
    addSurvey = document.querySelector(".addSurvey");
    addSurveys();
  });
}


//Add new Survey
function addSurveys() {
  addSurvey.addEventListener("click", async () => {
    // e.preventDefault();
    var surveyName = document.querySelector("#input-survey");
    var user = localStorage.getItem("userCredentials");
    var data = JSON.parse(user);

    let newSurvey = {
      Name: surveyName.value,
      UserId: data.Id,
      UserName: data.Name,
    };
    console.log(newSurvey);
    let surveyArr = [];

    //post survey
    surveyArr = await postData(newSurvey);
    console.log(surveyArr);
    surveyListArray.push(surveyArr);

    //call back the create new button
    const inputSurvey = document.querySelector("#input-survey");
    const addSurveyBtn = document.querySelector(".addSurvey");
    inputSurvey.parentNode.removeChild(inputSurvey);
    addSurveyBtn.parentNode.removeChild(addSurveyBtn);
    location.reload();
  });
}

//create questions function
const surList = document.querySelector("#survey-list");
if(surList){
  surList.addEventListener("click", (e) => {
    e.preventDefault();
    SurveyTable.openModal(e.target);
    // UI.showAlert("Book Removed", "success");
  });
}

const showList = document.querySelector("#show-list");
if(showList){
  showList.addEventListener("click", (e) => {
    e.preventDefault();
    SurveyTable.viewReport(e.target);
    // UI.showAlert("Book Removed", "success");
  });
}

//function to open the modal
function viewCreateQuestionModal(id){
  const surveyId = id;
  const modalContainer = document.querySelector('.modal-container')
  // modalContainer.classList.add('view-modal')
  modalContainer.style.visibility = "visible"

  const nextQuestion = document.querySelector('.btn-next');
  nextQuestion.addEventListener("click", async (e) => {
    e.preventDefault();
    e.stopPropagation();
    const possibleAnswers = document.querySelector(".possible-answers");
  
    if (questionType.options[questionType.selectedIndex].text == "range") {
      let Question = {
        SurveyId: surveyId,
        QuestionText: document.querySelector("#question").value,
        questionType: questionType.options[questionType.selectedIndex].value,
        possibleA: document.querySelector("#input-range").value,
        possibleB: "",
        possibleC: "",
        possibleD: "",
      };
  
      //post the question
       postQuestionData(Question)
      //clear the fields
      document.querySelector("#question").value = '';
      possibleAnswers.innerHTML = "";
    } else if (questionType.options[questionType.selectedIndex].text == "dropdown") {
      let Question = {
        SurveyId: surveyId,
        QuestionText: document.querySelector("#question").value,
        questionType: questionType.options[questionType.selectedIndex].value,
        possibleA: document.querySelector("#first").value,
        possibleB: document.querySelector("#sec").value,
        possibleC: document.querySelector("#third").value,
        possibleD: document.querySelector("#fourth").value,
      };
      //post the question
      postQuestionData(Question)
      //clear the fields
      document.querySelector("#question").value = '';
      possibleAnswers.innerHTML = "";
    } else {
      let Question = {
        SurveyId: surveyId,
        QuestionText: document.querySelector("#question").value,
        questionType: questionType.options[questionType.selectedIndex].value,
        possibleA: "",
        possibleB: "",
        possibleC: "",
        possibleD: "",
      };
      //post the question
    postQuestionData(Question)
    //clear the fields
    document.querySelector("#question").value = '';
    possibleAnswers.innerHTML = "";
    }
  
    

  });

  const btnComplete = document.querySelector('.btn-Complete');
  btnComplete.addEventListener('click', async()=>{
    const mainContainer = document.querySelector('.main-content');
    const modalContainer = document.querySelector('.modal-container')
    modalContainer.style.visibility = "hidden"
    mainContainer.style.visibility = "visible"; 
    let questionArr = [];
    let questionFilteredArr = [];
    questionArr = await  getQuestionData()
    questionFilteredArr = questionArr.filter(question=> question.SurveyId === surveyId)
    console.log(questionFilteredArr);
    questionFilteredArr.forEach((question) => SurveyTable.showQuestionList(question));
    
  })

}
const closeBtn = document.querySelector('.closeBtn')
if(closeBtn){
  closeBtn.onclick = async()=>{
    await Swal.fire(
      '',
      'Survey successfully created',
      'success'
    )
    const mainContainer = document.querySelector('.main-content');
    mainContainer.style.visibility = "hidden";
    location.reload();
  }
}


//=========================================Question type function=================/
var questionType = document.getElementById("question-type");
if(questionType){
  questionType.addEventListener("change", () => {
    var selected = questionType.options[questionType.selectedIndex].text;
    const possibleAnswers = document.querySelector(".possible-answers");
    if (selected == "radio") {
      alert("radio");
    } else if (selected === "range") {
      possibleAnswers.innerHTML = "";
      possibleAnswers.innerHTML = `
       <label for="range">Enter Range Maximum</label>
      <input id="input-range" type="number" min="0" max="10" placeholder="0">
       `;
    } else if (selected === "dropdown") {
      possibleAnswers.innerHTML = "";
      possibleAnswers.innerHTML = `
       <input type="text" class="dd-answers" id="first" placeholder="Enter first answer here...">
       <input type="text" class="dd-answers" id="sec" placeholder="Enter second answer here...">
       <input type="text" class="dd-answers" id="third" placeholder="Enter third answer here...">
       <input type="text" class="dd-answers" id="fourth" placeholder="Enter fourth answer here...">
       `;
    } else {
      possibleAnswers.innerHTML = "";
      return;
    }
  });
}

const logOut = document.querySelector('#logout');
logOut.addEventListener('click', ()=>{
  window.location.replace("./index.html")
})



// http methods for getting data