let opinions=[];

    if(localStorage.doggerlandFeedBack){
        opinions=JSON.parse(localStorage.doggerlandFeedBack);
    }

    console.log(opinions);

    const MyElm=document.getElementById("form");

    MyElm.addEventListener
    ("submit",processOpnFrmData);

    function processOpnFrmData(event){
        
        event.preventDefault();

        
        const nopName = document.getElementById("name").value.trim();
        const nopMail = document.getElementById("mail").value.trim();
        const nopComment = document.getElementById("comment").value.trim();
        const an2 = document.querySelector('input[id="nema"]:checked');
        const an = document.querySelector('input[id="ma"]:checked');

        if(an == null && an2 == null){
            nopMa = "Neuvedené";
        } else if(an == null) {
            nopMa = "Nie";
        } else {
            nopMa = "Áno"
        }
        
       
        const newOpinion =
            {
                name: nopName,
                mail: nopMail,
                vlastni_psa: nopMa,
                comment: nopComment,
                created: new Date()
            };

        console.log("Nový Feedback:\n "+JSON.stringify(newOpinion));

        opinions.push(newOpinion);

        localStorage.doggerlandFeedBack = JSON.stringify(opinions);


        
        window.alert("Váš feedback sa uložil.");
        console.log(opinions);

        
        MyElm.reset(); 
    }