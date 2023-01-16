 var d = new Date(); //Varible avec la date et heure de connection

//La fonction permet d'afficher la date et l'heure de conection
function display_DayHour(){
   
    let dateinput = document.getElementById("date");

    //La fonction permet de mettre un 0 devant le chiffre des minutes quand "min" < 10
     function minutes(){
        let min = d.getMinutes();
        if(min < 10)
        {
            return "0" + min;
        }
        else
        {
            return min;
        }
     }
     //La fonction donne un jour de la semaine, "j" est un nombre et la fonction le transforme en string
     function jours(){
        let j = d.getDay();
        switch(j){
            case 1 : return "Lundi";
            case 2 : return "Mardi";
            case 3 : return "Mercredi";
            case 4 : return "Jeudi";
            case 5 : return "Vendredi";
            case 6 : return "Samedi";
            case 7 : return "Dimanche";
            default : "erreur"
        }

     }
    //La fonction donne un mois de l'année, "m" est un nombre et la fonction le transforme en string
     function mois(){
        let m = d.getMonth();
        switch(m){
            case 1 : return "Janvier";
            case 2 : return "Février";
            case 3 : return "Mars";
            case 4 : return "Avril";
            case 5 : return "Mai";
            case 6 : return "Juin";
            case 7 : return "Juillet";
            case 8 : return "Août";
            case 9 : return "Septembre";
            case 10 : return "Octobre";
            case 11 : return "Novembre";
            case 12 : return "Décembre";
            default : "erreur"
        }

     }
     //on affiche => le jour de la semaine + le numero du jour + le mois + l'année + l'heure + les minutes
    dateinput.innerText = jours() + " " + d.getDate() + " " + mois() + " " + d.getFullYear() + ", " + 
                          d.getHours() + " h " + minutes();
}

//La fonction permet d'envoyer un mail à "leo.hervouet@etu.univ-poitiers.fr"
// mais avec les informations du navigateur et le temps passé sur le site sont en objet du mail
function mail(){

    //La fonction vous donne le temps depuis l'ouverture de la page du site
        function tempsco(){
         let t = new Date();
         let s = t.getSeconds();
         let m = t.getMinutes();
         let h = t.getHours();
         let old_s = d.getSeconds();
         let old_m = d.getMinutes();
         let old_h = d.getHours();

         if(s < old_s){
            m -= 1;
            s = 60 + (s - old_s);
         }
         else{
            s -= old_s;
         }

         if(m < old_m){
            h -= 1;
            m = 60 + (m - old_m);
         }
         else{
            m -= old_m;
         }
         if
            (h < old_h){
            h = 24 + (h - old_h);
         }
         else {
            h = h - old_h;
         }

         if (h < 10){
            h = "0" + h;
         }

         if (m < 10){
            m = "0" + m;
         }

         if (s < 10){
            s = "0" + s;
         }
        let new_t = h + "/" + m + "/" + s;
         return new_t;
    }

    let info = navigator.userAgent + " t: " + tempsco();
    let lien = document.getElementById("mail");
    lien.href = "mailto:leo.hervouet@etu.univ-poitiers.fr?subject=" + info;
}

// boucle_img fait arreter ou marcher la boucle
let boucle_img = false;
// t est la variable du setInterval
let t = 0;

//La fonction permet de changer d'img sur la page "index.xhtml"
function change_img(){
    let o_img = document.getElementById("img");
    let o_img_a = document.getElementById("img_a");
    if(o_img.alt == "Nintendo switch logo"){
        o_img.src = "Images/Collection/NintendoLogo.png";
        o_img.alt = "Logo de Nintendo";
        o_img.title = "Logo de Nintendo";
        o_img.style.width = "28%";
        o_img.style.height = "28%";
        o_img_a.href = "https://fr.wikipedia.org/wiki/Nintendo#/media/Fichier:NintendoLogo.png";
     }
    else{
        o_img.src = "Images/Collection/Nintendo_switch_logo.png";
        o_img.alt = "Nintendo switch logo";
        o_img.title = "Nintendo switch logo";
        o_img.style.width = "7%";
        o_img.style.height = "7%";
        o_img_a.href = "https://fr.m.wikipedia.org/wiki/Fichier:Nintendo_switch_logo.png";
     }
}

//La fonction permet de soit mettre en marche la boucle, soit l'arreter
function boucle_image(){
    boucle_img = !boucle_img;
    if(boucle_img == true){
        change_img();
        t = setInterval(change_img, 4000);
    }
    else{
        clearInterval(t);
    }
}




//La fonction permet de cacher un element qui est après "o"
function on_off(o) {
    let new_o = o.nextSibling;
    /*On utilise ici deux fois nextSibling car si on ne le fait que une fois c'est un espace 
    qui est viser et non pas l'element que l'on voudrait*/
    let new_new_o = new_o.nextSibling;
    if (new_new_o.style.display == "none") {
    new_new_o.style.display = "block";
    } 
    else {
    new_new_o.style.display = "none";
    }
}