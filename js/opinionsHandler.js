 export default class OpinionsHandler {

   
    constructor(opinionsFormElmId, opinionsListElmId){ 
        this.opinions = [];

        this.opinionsElm = document.getElementById(opinionsListElmId);
		this.opinionsFrmElm = document.getElementById("form");
    }

    
    init(){
        if (localStorage.doggerlandFeedBack) {
            this.opinions = JSON.parse(localStorage.doggerlandFeedBack);
        }

        this.opinionsElm.innerHTML = this.opinionArray2html(this.opinions);


        this.opinionsFrmElm.addEventListener("submit", event => this.processOpnFrmData(event));
    }

    
    processOpnFrmData(event){
       
        event.preventDefault();

        const nopName = document.getElementById("name").value.trim();
        const nopMail = document.getElementById("mail").value.trim();
        const nopComment = document.getElementById("comment").value.trim();
        const nopPredmet = document.getElementById("predmet").value.trim();
        const an2 = document.querySelector('input[id="nema"]:checked');
        const an = document.querySelector('input[id="ma"]:checked');
        var nopMa = "";

        if(an == null && an2 == null){
            nopMa = "Neuvedené";
        } else if(an == null) {
            nopMa = "Nie";
        } else {
            nopMa = "Áno";
        }
       
        const newOpinion =
            {
                name: nopName,
                mail: nopMail,
                vlastni_psa: nopMa,
                about: nopPredmet,
                comment: nopComment,
                created: new Date()
            };

        console.log("Nový Feedback:\n "+JSON.stringify(newOpinion));

        this.opinions.push(newOpinion);

        localStorage.doggerlandFeedBack = JSON.stringify(this.opinions);


        
        this.opinionsElm.innerHTML+=this.opinion2html(newOpinion);



        
        this.opinionsFrmElm.reset(); 
    }

   

    opinion2html(opinion){
        const opinionTemplate=
		`
			<section>
			    <h3>${opinion.name} (${(new Date(opinion.created)).toDateString()})</h3>
                <p>Vlastní psa :${opinion.vlastni_psa}</p>
			    <p>${opinion.comment}</p>
			    <p>${opinion.willReturn?"I will return to this page.":"Sorry, one visit was enough."}</p>
			</section>`;
		return opinionTemplate;
    }

    
    opinionArray2html(sourceData){
        return sourceData.reduce((htmlWithOpinions,opn) => htmlWithOpinions+ this.opinion2html(opn),"");
    }

}



