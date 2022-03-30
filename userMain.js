//get elements
const DashBoard = document.querySelector(".dashboard");
const ViewSurveys = document.querySelector(".view-surveys");


//showSurveys class
class showSurveys {
  static addSurveyToList(survey) {
    // const tableHeader = document.querySelector(".survey-table");
    const list = document.querySelector("#survey-list");

    const header = document.createElement("thead");
    header.innerHTML = `
     
      `;
    //   tableHeader.appendChild(header)
    const row = document.createElement("tr");
    row.innerHTML = `
          <td>${survey.Name}</td>
          <td id="td-center"><button class="${survey.Id} view-questions">Take Survey</button></td>
          `;
          
      list.appendChild(row);
  }

//   static showQuestionList(question) {
//     // window.location.href = "./surveyQuestions.html";
//     const questionList = document.querySelector(".ordered-list");

//     const orderedList = document.createElement("li");
//     orderedList.innerHTML = `
//             ${question.QuestionText}
//           `;

//     questionList.appendChild(orderedList);
//   }

  static async showQuestions(el) {
    if (el.classList.contains("view-questions")) {
      
      let Survey = [];
      let surveyNameObj;
      let surveyName;
      Survey = await getSurveyData();

      // el.parentElement.parentElement.remove();
      var id = el.classList[0];
      surveyNameObj = Survey.find(surv=>surv.Id === id)
      surveyName = surveyNameObj.Name;
      console.log(id);
      document.cookie = surveyName + ";path=/";
      sessionStorage.setItem('SurveyId', id)

      // populateQuestions()
      window.location.href = "answers.html"
    //   viewQuestionModal(id);
    }
  }
}

//FUNCTIONS
// ViewSurveys.addEventListener("click", () => {});


const showBtn = document.querySelector('.show-Btn');
showBtn.addEventListener('click', async () => {
  // location.reload();
    // console.log('testing');
    let surveyListArray =[]
  surveyListArray = await getSurveyData();
  console.log(surveyListArray)
  await surveyListArray.forEach((survey) =>
    showSurveys.addSurveyToList(survey)
  );
});


document.querySelector("#survey-list").addEventListener("click", (e) => {
    e.preventDefault();
    showSurveys.showQuestions(e.target);
    // UI.showAlert("Book Removed", "success");
  });

 