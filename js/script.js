var slider = $('#slider');
var next = $('#btn-next');
var prev = $('#btn-prev');

$('#slider section:last').insertBefore('#slider section:first');

slider.css('margin-left', '-' + 100 + '%');

function moverD() {
    slider.animate({
        marginLeft: '-' + 200 + '%'
    }, 700, function () {
        $('#slider section:first').insertAfter('#slider section:last');
        slider.css('margin-left', '-' + 100 + '%');
    });
}

function moverI() {
    slider.animate({
        marginLeft: 0
    }, 700, function () {
        $('#slider section:last').insertBefore('#slider section:first');
        slider.css('margin-left', '-' + 100 + '%');
    });
}

function autoplay() {
    interval = setInterval(function () {
        moverD();
    }, 5000);
}
next.on('click', function () {
    moverD();
    clearInterval(interval);
    autoplay();
});
prev.on('click', function () {
    moverI();
    clearInterval(interval);
    autoplay();
});

autoplay();

function checkRut(rut) {
    // Despejar Puntos
    var valor = rut.value.replace('.','');
    // Despejar Guión
    valor = valor.replace('-','');
    
    // Aislar Cuerpo y Dígito Verificador
    cuerpo = valor.slice(0,-1);
    dv = valor.slice(-1).toUpperCase();
    
    // Formatear RUN
    rut.value = cuerpo + '-'+ dv
    
    // Si no cumple con el mínimo ej. (n.nnn.nnn)
    if(cuerpo.length < 7) { rut.setCustomValidity("RUT Incompleto"); return false;}
    
    // Calcular Dígito Verificador
    suma = 0;
    multiplo = 2;
    
    // Para cada dígito del Cuerpo
    for(i=1;i<=cuerpo.length;i++) {
    
        // Obtener su Producto con el Múltiplo Correspondiente
        index = multiplo * valor.charAt(cuerpo.length - i);
        
        // Sumar al Contador General
        suma = suma + index;
        
        // Consolidar Múltiplo dentro del rango [2,7]
        if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }
  
    }
    
    // Calcular Dígito Verificador en base al Módulo 11
    dvEsperado = 11 - (suma % 11);
    
    // Casos Especiales (0 y K)
    dv = (dv == 'K')?10:dv;
    dv = (dv == 0)?11:dv;
    
    // Validar que el Cuerpo coincide con su Dígito Verificador
    if(dvEsperado != dv) { rut.setCustomValidity("RUT Inválido"); return false; }
    
    // Si todo sale bien, eliminar errores (decretar que es válido)
    rut.setCustomValidity('');
  }
  
  function cargar_clima() {   
          var ciudad = $('#comunas').val();
          clima.open('GET', 'http://api.wunderground.com/api/e069d13c9432ad2f/conditions/q/CL/' + ciudad + '.json', false);
    
          var datos = JSON.parse(clima.response);
    
          var ciudad = datos.current_observation.display_location.full;
    
          $('#ubicacion').html(ciudad);       
          var bgcolor = '#FFF';  
          $('#container').css('background-color', bgcolor);
    }
    
    var RegionesYcomunas = {
    
    "regiones": [{
        "NombreRegion": "Región de Arica y Parinacota",
        "comunas": ["Arica", "Camarones", "Putre", "General Lagos"]
    },
      {
        "NombreRegion": "Región de Tarapaca",
        "comunas": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camina", "Colchane", "Huara", "Pica"]
    },
      {
        "NombreRegion": "Región de Antofagasta",
        "comunas": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "Tocopilla", "Maria Elena"]
    },
      {
        "NombreRegion": "Región de Atacama",
        "comunas": ["Copiapo", "Caldera", "Tierra Amarilla", "Chanaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"]
    },
      {
        "NombreRegion": "Región de Coquimbo",
        "comunas": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuna", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbala", "Monte Patria", "Punitaqui", "Rio Hurtado"]
    },
      {
        "NombreRegion": "Región de Valparaíso",
        "comunas": ["Valparaiso", "Casablanca", "Concon", "Juan Fernandez", "Puchuncavi", "Quintero", "Vina del Mar", "Isla de Pascua", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales", "San Antonio", "Algarrobo", "Cartagena", "El Quisco", "El Tabo", "Santo Domingo", "San Felipe", "Catemu", "Llaillay", "Panquehue", "Putaendo", "Santa Maria", "Quilpue", "Limache", "Olmue", "Villa Alemana"]
    },
      {
        "NombreRegion": "Región del Libertador Gral. Bernardo O’Higgins",
        "comunas": ["Rancagua", "Codegua", "Coinco", "Coltauco", "Donihue", "Graneros", "Las Cabras", "Machali", "Malloa", "Mostazal", "Olivar", "Peumo", "Pichidegua", "Quinta de Tilcoco", "Rengo", "Requinoa", "San Vicente", "Pichilemu", "La Estrella", "Litueche", "Marchihue", "Navidad", "Paredones", "San Fernando", "Chepica", "Chimbarongo", "Lolol", "Nancagua", "Palmilla", "Peralillo", "Placilla", "Pumanque", "Santa Cruz"]
    },
      {
        "NombreRegion": "Región del Maule",
        "comunas": ["Talca", "Constucion", "Curepto", "Empedrado", "Maule", "Pelarco", "Pencahue", "Rio Claro", "San Clemente", "San Rafael", "Cauquenes", "Chanco", "Pelluhue", "Curico", "Hualane", "Licanten", "Molina", "Rauco", "Romeral", "Sagrada Familia", "Teno", "Vichuquen", "Linares", "Colbun", "Longavi", "Parral", "ReVro", "San Javier", "Villa Alegre", "Yerbas Buenas"]
    },
      {
        "NombreRegion": "Región del Biobío",
        "comunas": ["Concepcion", "Coronel", "Chiguayante", "Florida", "Hualqui", "Lota", "Penco", "San Pedro de la Paz", "Santa Juana", "Talcahuano", "Tome", "Hualpen", "Lebu", "Arauco", "Canete", "Contulmo", "Curanilahue", "Los alamos", "Tirua", "Los angeles", "Antuco", "Cabrero", "Laja", "Mulchen", "Nacimiento", "Negrete", "Quilaco", "Quilleco", "San Rosendo", "Santa Barbara", "Tucapel", "Yumbel", "Alto Biobio", "Chillan", "Bulnes", "Cobquecura", "Coelemu", "Coihueco", "Chillan Viejo", "El Carmen", "Ninhue", "niquen", "Pemuco", "Pinto", "Portezuelo", "Quillon", "Quirihue", "Ranquil", "San Carlos", "San Fabian", "San Ignacio", "San Nicolas", "Treguaco", "Yungay"]
    },
      {
        "NombreRegion": "Región de la Araucanía",
        "comunas": ["Temuco", "Carahue", "Cunco", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Melipeuco", "Nueva Imperial", "Padre las Casas", "Perquenco", "Pitrufquen", "Pucon", "Saavedra", "Teodoro Schmidt", "Tolten", "Vilcun", "Villarrica", "Cholchol", "Angol", "Collipulli", "Curacautin", "Ercilla", "Lonquimay", "Los Sauces", "Lumaco", "Puren", "Renaico", "Traiguen", "Victoria", ]
    },
      {
        "NombreRegion": "Región de Los Ríos",
        "comunas": ["Valdivia", "Corral", "Lanco", "Los Lagos", "Mafil", "Mariquina", "Paillaco", "Panguipulli", "La Union", "Futrono", "Lago Ranco", "Rio Bueno"]
    },
      {
        "NombreRegion": "Región de Los Lagos",
        "comunas": ["Puerto Montt", "Calbuco", "Cochamo", "Fresia", "Frutillar", "Los Muermos", "Llanquihue", "Maullin", "Puerto Varas", "Castro", "Ancud", "Chonchi", "Curaco de Velez", "Dalcahue", "Puqueldon", "Queilen", "Quellon", "Quemchi", "Quinchao", "Osorno", "Puerto Octay", "Purranque", "Puyehue", "Rio Negro", "San Juan de la Costa", "San Pablo", "Chaiten", "Futaleufu", "Hualaihue", "Palena"]
    },
      {
        "NombreRegion": "Región Aisen del Gral. Carlos Ibañez del Campo",
        "comunas": ["Coihaique", "Lago Verde", "Aisen", "Cisnes", "Guaitecas", "Cochrane", "O’Higgins", "Tortel", "Chile Chico", "Rio Ibanez"]
    },
      {
        "NombreRegion": "Region de Magallanes y de la Antartica Chilena",
        "comunas": ["Punta Arenas", "Laguna Blanca", "Rio Verde", "San Gregorio", "Cabo de Hornos (Ex Navarino)", "AntarVca", "Porvenir", "Primavera", "Timaukel", "Natales", "Torres del Paine"]
    },
      {
        "NombreRegion": "Región Metropolitana de Santiago",
        "comunas": ["Cerrillos", "Cerro Navia", "Conchali", "El Bosque", "Estacion Central", "Huechuraba", "Independencia", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipu", "nunoa", "Pedro Aguirre Cerda", "Penalolen", "Providencia", "Pudahuel", "Quilicura", "Quinta Normal", "Recoleta", "Renca", "San Joaquin", "San Miguel", "San Ramon", "Vitacura", "Puente Alto", "Pirque", "San Jose de Maipo", "Colina", "Lampa", "TilVl", "San Bernardo", "Buin", "Calera de Tango", "Paine", "Melipilla", "Alhue", "Curacavi", "Maria Pinto", "San Pedro", "Talagante", "El Monte", "Isla de Maipo", "Padre Hurtado", "Penaflor"]
    }]
    }
    
    
    jQuery(document).ready(function() {
    
    var iRegion = 0;
    var htmlRegion = '<option value="sin-region">Seleccione region</option><option value="sin-region">--</option>';
    var htmlComunas = '<option value="sin-region">Seleccione comuna</option><option value="sin-region">--</option>';
    
    jQuery.each(RegionesYcomunas.regiones, function () {
      htmlRegion = htmlRegion + '<option value="' + RegionesYcomunas.regiones[iRegion].NombreRegion + '">' + RegionesYcomunas.regiones[iRegion].NombreRegion + '</option>';
      iRegion++;
    });
    
    jQuery('#regiones').html(htmlRegion);
    jQuery('#comunas').html(htmlComunas);
    
    jQuery('#regiones').change(function () {
      var iRegiones = 0;
      var valorRegion = jQuery(this).val();
      var htmlComuna = '<option value="sin-comuna">Seleccione comuna</option><option value="sin-comuna">--</option>';
      jQuery.each(RegionesYcomunas.regiones, function () {
        if (RegionesYcomunas.regiones[iRegiones].NombreRegion == valorRegion) {
          var iComunas = 0;
          jQuery.each(RegionesYcomunas.regiones[iRegiones].comunas, function () {
            htmlComuna = htmlComuna + '<option value="' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '">' + RegionesYcomunas.regiones[iRegiones].comunas[iComunas] + '</option>';
            iComunas++;
          });
        }
        iRegiones++;
      });
      jQuery('#comunas').html(htmlComuna);
    });
    jQuery('#comunas').change(function () {
      if (jQuery(this).val() == 'sin-region') {
        alert('selecciones Region');
      } else if (jQuery(this).val() == 'sin-comuna') {
        alert('selecciones Comuna');
      } else {cargar_clima();}
    });
    jQuery('#regiones').change(function () {
      if (jQuery(this).val() == 'sin-region') {
        alert('selecciones Region');
      }
    });
  });
  function validarEmail(valor) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3,4})+$/.test(valor)){
     alert("La dirección de email " + valor + " es correcta.");
    } else {
     alert("La dirección de email es incorrecta.");
    }
  }