//Les requetes

function AddMembre() {
    var xhr = new XMLHttpRequest();
    var nom = document.getElementById("Nom").value;
    var prenom = document.getElementById("Prenom").value;
    var adresse = document.getElementById("Adresse").value;
    var numeroTelephone = document.getElementById("NumeroTelephone").value;
    var dateNaissance = document.getElementById("DateNaissance").value;

    var data = "para1="+encodeURIComponent(nom);
    data = data+"&para2=" + encodeURIComponent(prenom);
    data = data+"&para3=" + encodeURIComponent(adresse);
    data = data+"&para4=" + encodeURIComponent(numeroTelephone);
    data = data+"&para5=" + encodeURIComponent(dateNaissance);

    xhr.open('POST','/AddMembre');
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);

    ReturnPOS();
}

function ShowListMembre(xml){
    var membres, i, n, table;

    membres = xml.getElementsByTagName("membres");
    n = membres.length;

    table = document.getElementById("TableMembre");

    for (i=n-1;i>=0; i--)
    {
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);

        cell1.innerHTML = membres[i].getElementsByTagName("IdMembre")[0].firstChild.nodeValue;
        cell2.innerHTML = membres[i].getElementsByTagName("Nom")[0].firstChild.nodeValue;
        cell3.innerHTML = membres[i].getElementsByTagName("Prenom")[0].firstChild.nodeValue;
        cell4.innerHTML = membres[i].getElementsByTagName("DateNaissance")[0].firstChild.nodeValue;
        cell5.innerHTML = membres[i].getElementsByTagName("Adresse")[0].firstChild.nodeValue;
        cell6.innerHTML = membres[i].getElementsByTagName("NumeroTelephone")[0].firstChild.nodeValue;
        cell7.innerHTML = membres[i].getElementsByTagName("DateInscription")[0].firstChild.nodeValue;
        cell8.innerHTML = membres[i].getElementsByTagName("Abonnement")[0].firstChild.nodeValue;
    }
}

function AddAbonnement(){
    var xhr = new XMLHttpRequest();
    var idMembre = document.getElementById("IdMembre").value;
    var idFormule = document.getElementById("IdFormule").value;

    var data = "para1="+encodeURIComponent(idMembre);
    data = data+"&para2=" + encodeURIComponent(idFormule);

    xhr.open('POST','/AddAbonnement');
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);

    ReturnPOS(); //Attendre que la requete soit terminée avant de revenir sur le premier ecran
}

function ShowDetailAbonnement(xml) {
    var DetailAbonnements, i, n, table;

    DetailAbonnements = xml.getElementsByTagName("DetailAbonnements");
    n = DetailAbonnements.length;

    table = document.getElementById("TableDetailAbonnement");

    for (i = n - 1; i >= 0; i--) {
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);

        cell1.innerHTML = DetailAbonnements[i].getElementsByTagName("IdMembre")[0].firstChild.nodeValue;
        cell2.innerHTML = DetailAbonnements[i].getElementsByTagName("IdFormule")[0].firstChild.nodeValue;
        cell3.innerHTML = DetailAbonnements[i].getElementsByTagName("SeanceDispo")[0].firstChild.nodeValue;
        cell4.innerHTML = DetailAbonnements[i].getElementsByTagName("NombreSeance")[0].firstChild.nodeValue;
        cell5.innerHTML = DetailAbonnements[i].getElementsByTagName("DateAchat")[0].firstChild.nodeValue;
    }
}

function ShowListFormules(xml){
    var formules, i, n, table;

    formules = xml.getElementsByTagName("formules");
    n = formules.length;

    table = document.getElementById("TableFormules");

    for (i=n-1;i>=0; i--)
    {
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);

        cell1.innerHTML = formules[i].getElementsByTagName("IdFormule")[0].firstChild.nodeValue;
        cell2.innerHTML = formules[i].getElementsByTagName("Nom")[0].firstChild.nodeValue;
        cell3.innerHTML = formules[i].getElementsByTagName("NombreDeSeance")[0].firstChild.nodeValue;
        cell4.innerHTML = formules[i].getElementsByTagName("Prix")[0].firstChild.nodeValue;
    }
}


function AddArriveDep(){
    var xhr = new XMLHttpRequest();
    var idMembre = document.getElementById("IdMembre2").value;
    var Duree = document.getElementById("Duree").value;

    var data = "para1="+encodeURIComponent(idMembre);
    data = data+"&para2=" + encodeURIComponent(Duree);

    xhr.open('POST','/AddArriveDep');
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);

    ReturnPOS();
}

function ShowListArriveDep(xml){
    var MembresPresent, i, n, table1, table2, Total;

    MembresPresent = xml.getElementsByTagName("MembresPresent");
    n = MembresPresent.length;

    table1 = document.getElementById("TableMembrePresent");

    for (i = n - 1; i >= 0; i--) {
        var row = table1.insertRow(1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = MembresPresent[i].getElementsByTagName("IdMembre")[0].firstChild.nodeValue;
        cell2.innerHTML = MembresPresent[i].getElementsByTagName("DateSeance")[0].firstChild.nodeValue;
        cell3.innerHTML = MembresPresent[i].getElementsByTagName("Duree")[0].firstChild.nodeValue;
    }

    Total = xml.getElementsByTagName("total");
    table2 = document.getElementById("TableTotalArriveDep");
    var row = table2.insertRow(1);
    var cell1 = row.insertCell(0);
    cell1.innerHTML = Total[0].firstChild.nodeValue;
}

function DelArriveDep(){
    var xhr = new XMLHttpRequest();
    var idMembre = document.getElementById("IdMembre4").value;

    var data = "para1="+encodeURIComponent(idMembre);

    xhr.open('POST','/DelArriveDep');
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);

    ReturnPOS();
}

function AddMarchandise(){
    var xhr = new XMLHttpRequest();
    var idMembre = document.getElementById("IdMembre3").value;
    var idMarchandise = document.getElementById("IdMarchandise").value;
    var Quantite = document.getElementById("Quantite").value;


    var data = "para1="+encodeURIComponent(idMembre);
    data = data+"&para2=" + encodeURIComponent(idMarchandise);
    data = data+"&para3=" + encodeURIComponent(Quantite);

    xhr.open('POST','/AddMarchandise');
    xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    xhr.send(data);

    ReturnPOS();
}

function ShowListMarchandise(xml) {
    var Marchandises, i, n, table;

    Marchandises = xml.getElementsByTagName("marchandises");
    n = Marchandises.length;

    table = document.getElementById("TableMarchandises");

    for (i = n - 1; i >= 0; i--) {
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);

        cell1.innerHTML = Marchandises[i].getElementsByTagName("Id")[0].firstChild.nodeValue;
        cell2.innerHTML = Marchandises[i].getElementsByTagName("Nom")[0].firstChild.nodeValue;
        cell3.innerHTML = Marchandises[i].getElementsByTagName("Prix")[0].firstChild.nodeValue;
    }
}

function ShowJournal(xml) {
    var Journals, i, n, table;

    Journals = xml.getElementsByTagName("Journals");
    n = Journals.length;

    table = document.getElementById("TableJournal");

    for (i = n - 1; i >= 0; i--) {
        var row = table.insertRow(1);

        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);

        cell1.innerHTML = Journals[i].getElementsByTagName("IdJournal")[0].firstChild.nodeValue;
        cell2.innerHTML = Journals[i].getElementsByTagName("IdMembre")[0].firstChild.nodeValue;
        cell3.innerHTML = Journals[i].getElementsByTagName("IdFormule")[0].firstChild.nodeValue;
        cell4.innerHTML = Journals[i].getElementsByTagName("DateAchat")[0].firstChild.nodeValue;
        cell5.innerHTML = Journals[i].getElementsByTagName("IdMarchandise")[0].firstChild.nodeValue;
        cell6.innerHTML = Journals[i].getElementsByTagName("Quantite")[0].firstChild.nodeValue;
        cell7.innerHTML = Journals[i].getElementsByTagName("Nom")[0].firstChild.nodeValue;
        cell8.innerHTML = Journals[i].getElementsByTagName("Prix")[0].firstChild.nodeValue;
    }
}

//Les affichages

function AfficherAjouterMembreForm(){
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("AjouterMembreForm").style.display="inline";
}

function AfficherListeMembre() {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            ShowListMembre(xhr.responseXML);
        }
    };
    xhr.open("GET",'/membres',true);
    xhr.send();
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("AfficherMembre").style.display = "inline";
}

function AfficherAjouterAbonnementForm(){
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("AjouterAbonnementForm").style.display = "inline";
}

function AfficherAbonnements(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            ShowDetailAbonnement(xhr.responseXML);
        }
    };
    xhr.open("GET",'/Abonnements',true);
    xhr.send();
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("DetailAbonnement").style.display = "inline";
}

function AfficherFormules(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            ShowListFormules(xhr.responseXML);
        }
    };
    xhr.open("GET",'/formules',true);
    xhr.send();
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("Formules").style.display = "inline";
}

function AfficherAjouterArriveDepForm(){
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("AjouterArriveDepForm").style.display = "inline";
}

function AfficherListArriveDep(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            ShowListArriveDep(xhr.responseXML);
        }
    };
    xhr.open("GET",'/ArriveDep',true);
    xhr.send();
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("AfficherArriveDep").style.display = "inline";
}

function AfficherSuppArriveDep(){
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("SuppArriveDepForm").style.display = "inline";
}

function AfficherAjouterMarchandiseForm(){
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("AcheterMarchandiseForm").style.display = "inline";
}

function AfficherMarchandises(){
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            ShowListMarchandise(xhr.responseXML);
        }
    };
    xhr.open("GET",'/Marchandises',true);
    xhr.send();
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("Marchandises").style.display = "inline";
}

function AfficherJournal(){
        var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(this.readyState === 4 && this.status === 200){
            ShowJournal(xhr.responseXML);
        }
    };
    xhr.open("GET",'/Journal',true);
    xhr.send();
    document.getElementById("btns").style.display = "none";
    document.getElementById("btn_Pos").style.display = "inline";
    document.getElementById("Journal").style.display = "inline";
}

function ReturnPOS()
{
    document.getElementById("btns").style.display = "inline";
    document.getElementById("btn_Pos").style.display = "none";
    document.getElementById("AjouterMembreForm").style.display= "none";
    document.getElementById("AfficherMembre").style.display = "none";
    document.getElementById("AjouterAbonnementForm").style.display = "none";
    document.getElementById("DetailAbonnement").style.display = "none";
    document.getElementById("Formules").style.display = "none";
    document.getElementById("AjouterArriveDepForm").style.display ="none";
    document.getElementById("AfficherArriveDep").style.display = "none";
    document.getElementById("SuppArriveDepForm").style.display = "none";
    document.getElementById("AcheterMarchandiseForm").style.display ="none";
    document.getElementById("Marchandises").style.display = "none";
    document.getElementById("Journal").style.display = "none";
}

function init(event) {

    //Boutons de validation

    var btn_AddMembre = document.getElementById("AddMembre");
    btn_AddMembre.addEventListener("click", AddMembre);

    var btn_AddAbonnement = document.getElementById("AddAbonnement");
    btn_AddAbonnement.addEventListener("click", AddAbonnement);

    var btn_AddArriveDep = document.getElementById("AddArriveDep");
    btn_AddArriveDep.addEventListener("click", AddArriveDep);

    var btn_DelArriveDep = document.getElementById("SuppArriveDep");
    btn_DelArriveDep.addEventListener("click", DelArriveDep);

    var btn_AddMarchandise = document.getElementById("btn_AddMarchandise");
    btn_AddMarchandise.addEventListener("click", AddMarchandise);

    //Boutons d'affichage
    var btn_AjouterMembre = document.getElementById("btn_AjouterMembre");
    btn_AjouterMembre.addEventListener("click",AfficherAjouterMembreForm);

    var btn_ListeMembre = document.getElementById("btn_ListeMembre");
    btn_ListeMembre.addEventListener("click",AfficherListeMembre);

    var btn_AjouterAbonnement= document.getElementById("btn_AjouterAbonnement");
    btn_AjouterAbonnement.addEventListener("click",AfficherAjouterAbonnementForm);

    var btn_Abonnements= document.getElementById("btn_DetailAbonnement");
    btn_Abonnements.addEventListener("click",AfficherAbonnements);

    var btn_Formules = document.getElementById("btn_Formules");
    btn_Formules.addEventListener("click",AfficherFormules);

    var btn_AjouterArriveDep = document.getElementById("btn_AjouterArriveDep");
    btn_AjouterArriveDep.addEventListener("click",AfficherAjouterArriveDepForm);

    var btn_ListArriveDep = document.getElementById("btn_ArriveDep");
    btn_ListArriveDep.addEventListener("click",AfficherListArriveDep);

    var btn_SuppArriveDep = document.getElementById("btn_FinArriveDep");
    btn_SuppArriveDep.addEventListener("click",AfficherSuppArriveDep);

    var btn_AjouterMarchandise = document.getElementById("btn_AjouterMarchandise");
    btn_AjouterMarchandise.addEventListener("click",AfficherAjouterMarchandiseForm);

    var btn_Marchandises = document.getElementById("btn_Marchandises");
    btn_Marchandises.addEventListener("click",AfficherMarchandises);

    var btn_Journal = document.getElementById("btn_Journal");
    btn_Journal.addEventListener("click",AfficherJournal);

}

window.onload = init;