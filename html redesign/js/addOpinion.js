/*
 * Created by Stefan Korecko, 2020-21
 * Opinions form processing functionality
 */

/*
This function works with the form:

<form id="opnFrm">
    <label for="nameElm">Your name:</label>
    <input type="text" name="login" id="nameElm" size="20" maxlength="50" placeholder="Enter your name here" required />
    <br><br>
    <label for="opnElm">Your opinion:</label>
    <textarea name="comment" id="opnElm" cols="50" rows="3" placeholder="Express your opinion here" required></textarea>
    <br><br>
    <input type="checkbox" id="willReturnElm" />
    <label for="willReturnElm">I will definitely return to this page.</label>
    <br><br>
    <button type="submit">Send</button>
</form>

 */
export default function processOpnFrmData(event){
    //1.prevent normal event (form sending) processing
    event.preventDefault();

    //2. Read and adjust data from the form (here we remove white spaces before and after the strings)
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


    let opinions = [];

    if(localStorage.doggerlandFeedBack){
        opinions=JSON.parse(localStorage.doggerlandFeedBack);
    }

    opinions.push(newOpinion);
    localStorage.doggerlandFeedBack = JSON.stringify(opinions);


    //5. Go to the opinions
    window.location.hash="#opinions";

}
