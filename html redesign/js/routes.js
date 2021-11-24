import Mustache from "./mustache.js";
import processOpnFrmData from "./addOpinion.js";

export default[

    {
      
        hash:"welcome",
        target:"router-view", 
        getTemplate:(targetElm) =>
            document.getElementById(targetElm).innerHTML = document.getElementById("template-welcome").innerHTML
    },
    {
        hash:"articles",
        target:"router-view",
        getTemplate: fetchAndDisplayArticles
    },
    {
        hash:"opinions",
        target:"router-view",
        getTemplate: createHtml4opinions
    },
    {
        hash:"addOpinion",
        target:"router-view",
        getTemplate: (targetElm) =>{
            document.getElementById(targetElm).innerHTML = document.getElementById("template-addOpinion").innerHTML;
            document.getElementById("form").onsubmit=processOpnFrmData;
        }
    }
];

function createHtml4opinions(targetElm){
    const opinionsFromStorage=localStorage.doggerlandFeedBack;
    let opinions=[];

    if(opinionsFromStorage){
        opinions=JSON.parse(opinionsFromStorage);
        opinions.forEach(opinion => {
            opinion.created = (new Date(opinion.created)).toDateString();
            opinion.willReturn =
                opinion.willReturn?"I will return to this page.":"Sorry, one visit was enough.";
        });
    }

    document.getElementById(targetElm).innerHTML = Mustache.render(
        document.getElementById("template-opinions").innerHTML,
        opinions
    );
}


function fetchAndDisplayArticles(targetElm, current, totalCount) {

  current=parseInt(current);
  totalCount=parseInt(totalCount);
  const data4rendering={
      currPage:current,
      pageCount:totalCount
  };

  let url = "https://wt.kpi.fei.tuke.sk/api/article/?max=20&offset=";

  let a = current-1;
  let offset = a*20;
  url = url + offset;

  function reqListener() {
      if (this.status === 200) {
          data4rendering.articles = JSON.parse(this.responseText).articles;
          if (current > 1) {
              data4rendering.prevPage = current - 1;
          }

          if (current < totalCount) {
              data4rendering.nextPage = current + 1;
          }
          document.getElementById(targetElm).innerHTML = Mustache.render(
              document.getElementById("template-articles").innerHTML,
              data4rendering
          );
      } else {
          alert("Došlo k chybe: " + this.statusText);
      }
  }
  var ajax = new XMLHttpRequest();
  ajax.addEventListener("load", reqListener);
  ajax.open("GET", url, true);
  ajax.send();
  console.log("send");
}