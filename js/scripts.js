function idioma(){
        var newWindow = window.open('', 'Idioma', 'left=600,top=300,width=400,height=400,scrollbars=NO,resizable=NO');
        newWindow.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Petición AJAX</title><link rel="stylesheet" href="../css/styles.css" /></head><body><!--    <h1>VERSIÓN EN EUSKERA NO IMPLEMENTADA</h1> --><h1>Itzulpena inplementatu gabe</h1><h1>Web del Gobierno Vasco donde se puedan ver indicadores sobre vehículos, turismos y taxis</h1></body></html>');
}
function idioma_index(){
    window.open("views/idioma.html","idioma","left=600,top=300,width=200,height=100,scrollbars=NO,resizable=NO");
}
function persona(personaurl,persona){
    window.open(personaurl,persona,"left=600,top=300,width=200,height=100,scrollbars=NO,resizable=NO");
}

    

