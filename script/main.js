// déclaration des variables

const nomDepense = document.getElementById("nomDepense");
const montantDepense = document.getElementById("montantDepense");
const categorie = document.getElementById("categorie");
const addButton = document.getElementById("addButton");
const liste = document.getElementById("liste");
const total = document.getElementById("total");
const date = document.getElementById("date");

const tabListe = [];

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
    if (tabListe.length == 0){
        liste.innerHTML = "Aucun enregistrement";
        total.textContent = TotalCalc();
        return
    }
    // reinitialisation de l'affichage
    liste.innerHTML = "";
    // ajout de chaque Elementdu tableau à la liste
    tabListe.forEach((e,index) =>{
        liste.innerHTML += htmlContent(e[0],e[1],e[2],e[3],index);
    })

    total.textContent = TotalCalc();
}

//fonction qui calcule le total

function TotalCalc(){
    let sum = 0;
    if (tabListe.length !== 0)
        {tabListe.forEach((element) =>{
        sum += Number(element[1]);
        })
    }
    return sum;
}

//bouton del

liste.addEventListener("click",(event)=>{
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
total.textContent = 0;



