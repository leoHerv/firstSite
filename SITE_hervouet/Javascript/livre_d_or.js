// Cette variable est utilisée pour la verification des champs du formulaire
let verif_t = [false, false, false, false];


//La fonction test si name est bien composé que de lettres
function check_name(name){
	let re = /^[A-Za-zéèàêâùïüë]+$/;
 	return re.test(name);
}

//La fonction test si date est une date de type xxxx/xx/xx
function check_date(date){
	let re = /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/;
 	return re.test(date);
}

//La fonction utilise check_name pour vérifier si le champs de id est bon, si ce n'est pas bon il affiche un message d'erreur
function verif_name(id){
	let o_value = document.getElementById(id).value;
	let error = document.getElementById("error_" + id);
	let nb = 0;
	if (id == "firstname"){
		nb = 1;
	}
	if (!(check_name(o_value))){
		error.innerHTML = "-Erreur de saisie !-";
		verif_t[nb] = false;
	}
	else{
		error.innerHTML = "";
		verif_t[nb] = true;
	}
	test_send();
}

//La fonction vérifier si le champs de id est entre 1 et 10 sinon elle affiche un message d'erreur
function verif_nb(id){
	let o_value = document.getElementById(id).value;
	let error = document.getElementById("error_note");
	if (o_value < 1 || o_value > 10){
		error.innerHTML = "-Erreur de saisie !-";
		verif_t[3] = false;
	}
	else{
		error.innerHTML = "";
		verif_t[3] = true;
	}
	test_send();
}

//La fonction vérifier si le champs de id est de type AAAA/MM/JJ(JJ/MM/AAAA à l'affichage) sinon elle affiche un message d'erreur
function verif_date(id){
	let o_value = document.getElementById(id).value;
	let error = document.getElementById("error_date");
	if (!(check_date(o_value))){
		error.innerHTML = "-Erreur de saisie !-";
		verif_t[2] = false;
	}
	else{
		error.innerHTML = "";
		verif_t[2] = true;
	}
	test_send();
}

//La fonction verifie si toute les verification sont bonnes
function test_form(){
	verif_name("lastname");
	verif_name("firstname");
	verif_nb("note");
	verif_date("datee");
}

//La fonction verifie si toute les verification sont bonnes et change le type du bouton "Envoyer"
function test_send(){
	let bouton = document.getElementById("submit");
	if (verif_t[0] && verif_t[1] && verif_t[2] && verif_t[3]){
		bouton.type = "submit";
		bouton.onclick = "";
	}
	else{
		bouton.type = "button";
		bouton.onclick = "test_from()";
	}
}

//La fonction permet de retourner une chaine de caratère avec les differents input selectionner dans un noeud
function get_input(id){
	let formulaire = document.getElementById(id);
	let input = formulaire.getElementsByTagName("input");
	let tab = [];
	let length = input.length;
	for(i = 0; i < length; i++){

		if(input[i].checked){
			tab.push(input[i].value);
		}
	}
	let texte = "";
	let tabLength = tab.length;

	if (tabLength == 1){
		texte = tab[0];
	}
	else{
	
		for(i = 0; i < tabLength; i++){
			if((tabLength - i) == 2){
				texte = texte + tab[i] + " et " + tab[i + 1];
				i++;
			}
			else{
				texte = texte + tab[i] + ", ";
			}
		}
	}
	return texte;
}

//La fonction retourne la valeur de l'id donner en paramètre
function valueByid(id){
	return document.getElementById(id).value;
}

//La fonction crée un element "ele" et avec le texte "t" à l'interieur
function create_ele(ele,t){
	let element = document.createElement(ele);
	element.textContent = t;
	return element;
}

//La fonction ajoute à l'element "ele" la liste d'elements "t" dans l'ordre
function add_tab_to_ele(ele,t){
	let length = t.length;
	for(i = 0; i < length; i++){
		ele.appendChild(t[i]);
	}
}

//La fonction crée le recapitulatif des informations du formulaire et les affiche en bas du formulaire
function create_recap(){
	//toute les variables du formulaire
	let tab_1 = get_input("bestpage");
	let tab_2 = get_input("worstpage");
	let nom = valueByid("lastname");
	let prenom = valueByid("firstname");
	let age = valueByid("datee");
	let avis_1 = valueByid("whybestpage");
	let avis_2 = valueByid("whyworstpage");
	let avis_3 = valueByid("global");
	let note = valueByid("note");

	//creation d'elements pour le DOM
	let b = document.body;
	let newDiv = document.createElement('div');
	newDiv.id = "recap";

	let newPDateheure = document.createElement('p');
	newPDateheure.id = "date";

	let newH2 = create_ele("h2","Tous les information du formulaire : ");

	let newNom = create_ele("p","Nom : " + nom);

	let newPrenom = create_ele("p","Prénom : " + prenom);

	let newAge = create_ele("p","Age (année/ mois/ jour) : " + age);

	let newInput1 = create_ele("p","La page que vous aimez le plus : " + get_input("bestpage"));

	let newAvis_1 = create_ele("p","Pourquoi vous aimez cette page : " + avis_1);

	let newInput2 = create_ele("p","La(les) pire(s) page(s) pour vous : " + get_input("worstpage"));

	let newAvis_2 = create_ele("p","Pourquoi vous aimez pas cette(ces) page(s) : " + avis_2);

	let newAvis_3 = create_ele("p","Votre avis global du site : " + avis_3);

	let newNote = create_ele("p","Note : " + note);

	// on ajoute les elements au DOM
	b.appendChild(newDiv);
	add_tab_to_ele(newDiv,[newPDateheure, newH2, newNom, newPrenom, newAge, newInput1, newAvis_1, newInput2, newAvis_2, newAvis_3, newNote]);
	// on affiche l'heure et la date dans newPDateheure
	display_DayHour();
}

//Varible pour savoir si un recapitulatif a déjà été affiché
let recap = false;

//La fonction utilise create_recap pour afficher le recapitulatif des informations
function add_recap(){
	if(recap){
		let div_recap = document.getElementById("recap");
		div_recap.remove();
	}
	else{
		recap = true;
	}
	create_recap();
}