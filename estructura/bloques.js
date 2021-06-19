



function P (nombre,bloque){ return new Pagina(nombre,bloque); }   // forma redicida de Pagina
function B (...bloques){ return new Bloque(...bloques); }   // forma redicida de bloques
function M (...items){ return new Menu(...items); }   // forma redicida de los menu
function I (enlace,estilo){ return new Imagen(enlace,estilo); }   // forma redicida de imagen
function T (texto,es_padre="",es=""){ return new Texto(texto,es_padre,es); }   // forma redicida de imagen




class Pagina {
	constructor(nombre,todo) {
        Paginas[nombre] = this;  // agrega pagina a Paginas
		this.nombre = nombre;
		this.todo = todo;
	};
	set_cuerpo(...bloques) { this.todo.bloques[1].set(...bloques); };
	add_cuerpo(...bloques) { this.todo.bloques[1].add(...bloques); };
	//add_cuerpo(...bloques) { this.todo.bloques[1] = this.todo.bloques[1].concat(bloques); };
	ver() { return this.todo.ver(); }  // imprime pagina
}



class Bloque {
	constructor(...bloques) {
		this.bloques = [];
		this.ess = {};
		var ii = 0
		for (var i=0; i < bloques.length; i++) {
			if(bloques[i]){  // descarta null
				if(typeof(bloques[i])=="string"){  // estrae estilo
					this.ess.es = bloques[i];
				}else{  // estrae objetos
					this.bloques[ii] = bloques[i];
					ii++;
				} 
			}
		}
	};
	set(...bloques) { this.bloques = bloques; };
	add(...bloques) { this.bloques = this.bloques.concat(bloques); };
	ver() {
		var cad = "";
		for (var i=0; i < this.bloques.length; i++) { cad += this.bloques[i].ver(); }
		return ele_capa(cad,null,this.ess);   // caja del bloque + contenido
	};
}




class Menu {
	constructor(...bloques) {
		this.bloques = bloques; 
		//this.selec = null;
		this.vin = new Array();
		this.ess = {};
		this.selec = null;
		this.ess.menu = {};  // estilo menu
		this.ess.items = {}; // estilo items
        this.ess.texto = {}; // estilo texto
	}
	add(...bloques) { this.bloques = this.bloques.concat(bloques); }
	ver() {
		var cad = "";
		for (var i=0; i < this.bloques.length; i++) {
			if(Ubic[this.selec]==this.vin[i]){
				this.ess.items.marc = true;
				this.ess.texto.marc = true;
			}else{
				this.ess.items.marc = false;
				this.ess.texto.marc = false;
			}
			var contenido = ele_texto(this.bloques[i],null,this.ess.texto);
			var accion = "c.v." + this.vin[i];   // clic . vinculo . lugar
			cad += ele_capa(contenido,accion,this.ess.items);
		}
		return ele_capa(cad,null,this.ess.menu);   // caja del bloque + items + acciones
	}
}
 



class Imagen {
	constructor(enlace,ess) {
		this.enlace = enlace;
		this.ess = {};
		this.ess.es = ess; // estilo de imagen
        //alert(es);
	};
	//es(ess) { this.ess = ess; }  // estilos
    vin(dir){ this.enlace = dir; }   // fichero
	ver() {
		var accion = "cc.f.estilo siguiente"
		return ele_imagen(this.enlace,accion,this.ess);
	};

}


class Texto {
	constructor(texto,ess=null) {
		this.texto = texto;
		this.ess = {};
		this.ess.es = ess;
	};
	//es(ess){ this.ess = ess; }  // estilos general
    add(texto){ this.texto += texto;}   // fichero
	ver() { return ele_texto(this.texto,null,this.ess);}
}


/*
class Parrafo {
	constructor(texto,ess=null) {
		this.todo = [{tex:texto,ess:ess}];
	};
	ess(ess) { this.ess = ess; }  // estilos general
    add(tex,ess=null){ this.todo.push({tex:tex,ess:ess}); }   // fichero
	ver() {
		this.cad = "";
		for (var i=0; i < this.todo.length; i++) {
			texto = this.todo[i];
			this.cad += ele_texto(texto.tex,null,texto.ess);
			//this.cad += this.todo[i].tex  // **** de momento ****
		}
	//return ele_texto(this.cad,null,ess);
	return this.cad;
	}
}
*/