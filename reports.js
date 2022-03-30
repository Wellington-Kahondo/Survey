document.addEventListener("DOMContentLoaded", async () => {
  // let testingDiv = document.createElement('div');
  // let tableContainer = document.querySelector('.table-container')
  // console.log(document.cookie);
  let surveyName = document.querySelector("#surveyName");
  let numQues = document.querySelector("#numQues");
  let numResponses = document.querySelector("#numResponses");
  let thead = document.querySelector("#thead");
  let tbody = document.querySelector("#tbody");
  let answersArr = [];
  let filterAns = [];
  let filterAns1 = [];
  let allSurveys = [];
  let filterSurveys = [];
  let responseArr = [];
  let filterResponse = [];
  let questionsArr = [];
  let filterQuestions = [];

  allSurveys = await getSurveyData();
  filterSurveys = allSurveys.filter((survey) => survey.Id === document.cookie);

  responseArr = await getResponseData();
  filterResponse = responseArr.filter(
    (res) => res.SurveyId === document.cookie
  );
//  console.log(document.cookie)
  questionsArr = await getQuestionsData();
  filterQuestions = questionsArr.filter(
    (ques) => ques.SurveyId === document.cookie
  );

  surveyName.innerText = filterSurveys[0].Name;
  numQues.innerText = filterQuestions.length;
  numResponses.innerText = filterResponse.length;

  answersArr = await getAnswerData();
  // console.log(filterQuestions);
  let row1 = document.createElement("tr");
  
  filterQuestions.forEach((quest) => {
    // filterAns1 = answersArr.filter(ques=>ques.Id)
    // filterAns = answersArr.filter((answ) => answ.QuestionId === quest.Id);
    row1.innerHTML += `
        <th>${quest.QuestionText}</th>
        `;
    thead.appendChild(row1); 
   
   
  });
   
let questionIds = filterQuestions.map(row=>row.Id);

//  console.log(questionIds)
  filterResponse.forEach((res)=>{  
   filterAns = answersArr.filter((answ) => answ.ResponseId === res.Id);
    let row2 = document.createElement("tr");
    // console.log(filterAns)
    filterAns1 = mapOrder(filterAns,questionIds,'QuestionId')
// console.log(filterAns1)
   
  
    filterAns1.forEach((answ) => {
        
        row2.innerHTML += `
     <td id="tableData">${answ.possibleA}</td>
     `;
     tbody.appendChild(row2);
     });
   
  }) 
  
 
  
 
});

   // filterAns.forEach(row=>{
    //     row.sort
    //     // let position=questionIds.indexOf(row.ResponseId);
    //     // console.log(position)
    //     // // let position=questionIds
    //     // filterAns[position]=row;
     
    //     //   console.log("filterAns",filterAns)

    // })  
    
    function mapOrder (array, order, key) {
  
      array.sort( function (a, b) {
        var A = a[key], B = b[key];
        
        if (order.indexOf(A) > order.indexOf(B)) {
          return 1;
        } else {
          return -1;
        }
        
      });
      
      return array;
    };
//     var item_array, item_order, ordered_array;

// item_array = [ 
//   { id: 2, label: 'Two' }
// , { id: 3, label: 'Three' }
// , { id: 5, label: 'Five' }
// , { id: 4, label: 'Four' }
// , { id: 1, label: 'One'}
// ];

// item_order = [1,2,3,4,5];

// ordered_array = mapOrder(item_array, item_order, 'id');
