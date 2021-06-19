




function carga_js(dir){
    var script  = document.createElement('script');
    script.src  = dir;
    script.type = 'text/javascript';
    //script.async;
    document.head.appendChild(script);
}

carga_js("images/arq/info.js");


function incluir(lista) {
    nombre = lista.split(" ");
    for(var x=0; x<nombre.length; x++){
        var script  = document.createElement('script');
        script.src  = "estructura/" + nombre[x] + ".js";
        script.type = 'text/javascript';
        //script.defer = true;
        document.head.appendChild(script);
    }
}



// inclir archivos js 
incluir("data variables elementos eventos bloques plantillas paginas comandos gestor");
