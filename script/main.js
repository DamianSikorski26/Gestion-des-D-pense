// déclaration des variables

const nomDepense = document.getElementById("nomDepense");
const montantDepense = document.getElementById("montantDepense");
const categorie = document.getElementById("categorie");
const addButton = document.getElementById("addButton");
const liste = document.getElementById("liste");
const total = document.getElementById("total");
const totalTransport = document.getElementById("totalTransport");
const totalLogement = document.getElementById("totalLogement");
const totalDiver = document.getElementById("totalDiver");
const date = document.getElementById("date");

const listeTransport =document.getElementById("listeTransport");
const listeLogement =document.getElementById("listeLogement");
const listeDiver =document.getElementById("listeDiver");

const tabListe = [];
const wrapper = document.getElementById("wrapper");
// fonction qui return le contenu html

function htmlContent(el1,el2,el3,el4,ind){
    return `<li style="color:${colorPicker(el3)[0]}"><p>${colorPicker(el3)[1]} ${el1} | ${el2}€ - ${el3}   ${el4}</p><span class="delButton" id=${ind}>❌</span></li><hr>`

}

// fonction qui choisit la couleur en fonction de la catégorie
function colorPicker(cat){
    let color;
    let emoji;
    switch (cat){
        case "transport":
            color = "blue";
            emoji = "🚗";
            break
        case "logement":
            color = "green";
            emoji = "🏠";
            break
        case "divertissement":
            color = "pink";
            emoji = "🥳";
            break
        default :
            color = "black";
            emoji = "😐";
    }
    return [color,emoji]
}



// fonction permettant l'affichage du contenu du tableau
function displayListe(){
    // reinitialisation de l'affichage
    liste.innerHTML = "";
    listeLogement.innerHTML = "";
    listeDiver.innerHTML = "";
    listeTransport.innerHTML = "";

    total.textContent = 0;
    totalDiver.textContent = 0;
    totalLogement.textContent = 0;
    totalTransport.textContent = 0;

    let sumTransport = 0;
    let sumLogement = 0;
    let sumDivers = 0;
    let sum = 0;
    // ajout de chaque Elementdu tableau à la liste
    tabListe.forEach((e,index) =>{

        switch (e[2]){

            case "transport":
                listeTransport.innerHTML += htmlContent(e[0],e[1],e[2],e[3],index);
                sumTransport += Number(e[1]);
                totalTransport.textContent = sumTransport; 
                break
            case "logement":
                listeLogement.innerHTML += htmlContent(e[0],e[1],e[2],e[3],index);
                sumLogement += Number(e[1]);
                totalLogement.textContent = sumLogement; 
                break
            case "divertissement":
                listeDiver.innerHTML += htmlContent(e[0],e[1],e[2],e[3],index);
                sumDivers += Number(e[1]);
                totalDiver.textContent = sumDivers; 
                break
            default :
                liste.innerHTML += htmlContent(e[0],e[1],e[2],e[3],index);
                sum += Number(e[1]);
                total.textContent = sum; 
        }
        
    })
    if (sumTransport == 0){
        listeTransport.textContent = "Aucun enregistrement";
    }
    if (sumLogement == 0){
        listeLogement.textContent = "Aucun enregistrement";
    }
    if (sumDivers == 0){
        listeDiver.textContent = "Aucun enregistrement";
    }
    if (sum == 0){
        liste.textContent = "Aucun enregistrement";
    }
}

//bouton del

wrapper.addEventListener("click",(event)=>{
    event.preventDefault();
    
    if (event.target.classList.contains("delButton")){
         let delButtonIndex = parseInt(event.target.id);
         tabListe.splice(delButtonIndex,1)
    }
    else {return}
    displayListe()

})

// addButton

addButton.addEventListener("click",(event) =>{
    event.preventDefault();
    // pas de dépense
    if (!nomDepense.value){
        nomDepense.placeholder = "Veuillez indiquer une dépense !";
        return
    }
    else{
        nomDepense.placeholder = "";
    }
    // controle du montant
    if(montantDepense.value <= 0 || !montantDepense.value){
        montantDepense.value = "";
        montantDepense.placeholder = "Montant manquant ou plus petit que zéro !";
        return
    }
    else{
        montantDepense.placeholder = "";
    }
    tabListe.push([nomDepense.value,montantDepense.value,categorie.value,date.value])
    displayListe()
    console.log(TotalCalc());
    nomDepense.value = "";
    montantDepense.value = "";
    
    
})

// initialisation du total et de la liste
liste.innerHTML = "Aucun enregistrement";
listeLogement.innerHTML = "Aucun enregistrement";
listeDiver.innerHTML = "Aucun enregistrement";
listeTransport.innerHTML = "Aucun enregistrement";
total.textContent = 0;
totalLogement.textContent = 0;
totalDiver.textContent = 0;
totalTransport.textContent = 0;



