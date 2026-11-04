// Directorio de agencias (generado). NO editar a mano: se regenera desde
// los directorios oficiales. Shalom proviene de la lista vigente que
// publica shalom.com.pe/agencias (leída el 2026-11-04: ubicación,
// dirección, referencia, tipo de agencia, horario, teléfono y coordenadas
// exactas del mapa). Olva proviene de su lista pública de tiendas y
// agentes (olvacourier.com/ubicanos), con horario por día y coordenadas.
// Emtrafesa, Marvisur y Flores provienen de documentos
// oficiales (listados de sucursales de cada empresa) y se geocodifican por
// distrito/provincia/departamento (coords aproximadas, ver src/data/peruGeo.js).
export const RAW_AGENCIES = [
  {
    courier: "shalom",
    department: "Amazonas",
    province: "Bagua",
    district: "Bagua",
    zone: "Bagua Capital",
    address: "Jr. Amazonas C-9 Mz. 126 Lt. 25, Bagua - Bagua - Amazonas",
    reference: "frente Al Parque Jerusalen Y/o Costado De Avicola Yaceg",
    lat: -5.6347003028441,
    lng: -78.528378922503,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Amazonas",
    province: "Bongara",
    district: "Jazan",
    zone: "Pedro Ruiz",
    address: "Av. Sacsahuaman N° 513 - Pedro Ruiz",
    reference: "A Media Cuadra De La Ugel",
    lat: -5.9481590587064,
    lng: -77.979191086497,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Amazonas",
    province: "Chachapoyas",
    district: "Chachapoyas",
    zone: "Chachapoyas Co Dos De Mayo",
    address: "Jr. Dos De Mayo Cdra. 15 S/n Chachapoyas",
    reference: "Junto A Terminal De Combis Etsa",
    lat: -6.2386732901495,
    lng: -77.868008265336,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Amazonas",
    province: "Chachapoyas",
    district: "Chachapoyas",
    zone: "Chachapoyas Jr Grau",
    address: "Jr. Grau 270",
    reference: "Junto A La Agencia De Viajes Monteverde",
    lat: -6.2269907390686,
    lng: -77.871959791137,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Amazonas",
    province: "Luya",
    district: "Luya",
    zone: "Luya",
    address: "Jr. Ramón Castilla 1247 Luya - Amazonas",
    reference: "Entre El Colegio Secundario Ramón Castilla Y El Jr. José Gálvez, A Media Cdra. Del Agente De Venta De Pasajes De Civa, Móvil Y Transporte Chiclayo",
    lat: -6.159612028355,
    lng: -77.944719801561,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Amazonas",
    province: "Utcubamba",
    district: "Bagua Grande",
    zone: "Bagua Grande",
    address: "Av. Chachapoyas 1094 Sector Gonchillo",
    reference: "A 2 Cuadras De La Clínica Señor De Los Milagros",
    lat: -5.7502771328253,
    lng: -78.449191047248,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Carhuaz",
    district: "Carhuaz",
    zone: "Carhuaz",
    address: "Carretera Central 00s/n Cent Carhuaz - Carhuaz - Áncash",
    reference: "Media Cuadra Antes De Llegar Al Estadio Municipal Capitan Carlos Mejia",
    lat: -9.2841105,
    lng: -77.6468648,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Casma",
    district: "Casma",
    zone: "Casma",
    address: "Av. Miguel Grau Mz. D 4 Lt. 1 Casma - Ancash",
    reference: "Frente Al Jardín De Infancia",
    lat: -9.4718613228196,
    lng: -78.303136341104,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Huaraz",
    district: "Huaraz",
    zone: "Av. 27 De Noviembre Co",
    address: "Av. 27 De Noviembre Cdra. 20 S/n - Villon Bajo",
    reference: "Al Costado Del Grifo Primax",
    lat: -9.541547,
    lng: -77.531075,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Huaraz",
    district: "Independencia",
    zone: "Huaraz Independencia",
    address: "Jr. Candelaria Villar N. 631",
    reference: "Esquina Con Con Jr. Huaylas Casa De 4 Pisos Amarillo",
    lat: -9.518168683963,
    lng: -77.53261042945,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "11:00 AM A 02:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Huarmey",
    district: "Huarmey",
    zone: "Huarmey",
    address: "Carr. Panamericana Norte N° Km 293 Sect. Panamericana Huarmey – Ancash",
    reference: "a 4 Cdras. Del Terminal Terrestre De Sur A Norte",
    lat: -10.064877234999,
    lng: -78.156818888783,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Huaylas",
    district: "Caraz",
    zone: "Caraz",
    address: "Av. 9 De Octubre N° 259 - Huaylas",
    reference: "Al Costado De La Empresa Móvil Tours",
    lat: -9.0478790288089,
    lng: -77.803470533954,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Santa",
    district: "Chimbote",
    zone: "Av Enrique Meiggs",
    address: "Av. Enrique Meiggs N° 2457.",
    reference: "",
    lat: -9.0939502716064,
    lng: -78.568466186523,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Santa",
    district: "Chimbote",
    zone: "Av Jose Galvez",
    address: "Av. José Gálvez 791, Chimbote - Santa - Ancash",
    reference: "a 1 Cdra. Antes De Llegar Al Puente Gálvez",
    lat: -9.0711845135623,
    lng: -78.58882269437,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Santa",
    district: "Chimbote",
    zone: "Av. Los Pescadores Co",
    address: "Par. Parcela N° 16757 - E Sector La Perla Tres Cabezas - Ancash",
    reference: "frente Al Estadio Centenario",
    lat: -9.0982171678222,
    lng: -78.558546562114,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Santa",
    district: "Nuevo Chimbote",
    zone: "Av. Pacífico Belen",
    address: "Aa.hh. Belen Mz O Lt 28 - Nuevo Chimbote - Santa - Ancash",
    reference: "Frente Al Grifo Doxa",
    lat: -9.1329718245368,
    lng: -78.509082613845,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Santa",
    district: "Nuevo Chimbote",
    zone: "Garatea",
    address: "Urb. Nicolas Garatea Mz. 100 lt. 24 - Nuevo Chimbote - Santa - Ancash",
    reference: "Frente Al Paradero Autos N.- Garatea",
    lat: -9.1184982806451,
    lng: -78.506110723207,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Santa",
    district: "Nuevo Chimbote",
    zone: "Ovalo De La Familia",
    address: "Urbanización José Carlos Mariategui (ex Unicreto) Mz R 3 Lt 3",
    reference: "A Una Cuadra Del Óvalo La Familia",
    lat: -9.127764,
    lng: -78.517709,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Santa",
    district: "Nuevo Chimbote",
    zone: "Tres De Octubre",
    address: "Av. José Pardo Mz. K, Lt. 17 - Tres De Octubre",
    reference: "Frente Al Óvalo Las Américas",
    lat: -9.1178189102457,
    lng: -78.537899051291,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Santa",
    district: "Santa",
    zone: "Santa",
    address: "Panamericana Norte Km 442 - B, Santa",
    reference: "Al Lado De La Ferreteria La Llave",
    lat: -8.9894225762046,
    lng: -78.617430260416,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ancash",
    province: "Yungay",
    district: "Yungay",
    zone: "Yungay",
    address: "Jr. Industrial, Lte. 14 - Yungay",
    reference: "Al Costado Del Terminal Terrestre Y La Tapiceria Fredy",
    lat: -9.1397382909279,
    lng: -77.747211445572,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Apurimac",
    province: "Abancay",
    district: "Abancay",
    zone: "Abancay Co",
    address: "Av. Panamericana S/n - Abancay - Apurímac",
    reference: "A 100 Metros De La Comisaría De Bellavista, Al Costado De Maderera Vega",
    lat: -13.638156277625,
    lng: -72.898993460113,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Apurimac",
    province: "Andahuaylas",
    district: "Andahuaylas",
    zone: "Andahuaylas",
    address: "Av. Malinas 1355 Pochccota, Andahuaylas - Andahuaylas - Apurímac",
    reference: "al Costado De La Ex Cancha El Centenario O Altura De La Universidad Unsaac",
    lat: -13.660854303166,
    lng: -73.375429023314,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Apurimac",
    province: "Cotabambas",
    district: "Challhuahuacho",
    zone: "Challhuahuacho",
    address: "Barrio Wichaypampa Lt. 13 - 15 - 16, challhuahuacho - Cotabambas - Apurímac",
    reference: "A Dos Cdras Del Terminal Terrestre De Challhuahuacho / A Espaldas Del Taller E&l",
    lat: -14.123588600655,
    lng: -72.25614026073,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Alto Selva Alegre",
    zone: "Av Augusto Salazar Bondy",
    address: "Augusto Salazar Bondy Mz J Lt 4 Alto Selva Alegre - Arequipa",
    reference: "a Media Cdra. De La Iglesia Guadalupe",
    lat: -16.380360193926,
    lng: -71.525778403804,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Alto Selva Alegre",
    zone: "Av Lima",
    address: "Av. Lima N° 406 – Alto Selva Alegre - Arequipa",
    reference: "Esquina Con Av. Obrera Cuadra 20",
    lat: -16.373025713808,
    lng: -71.512111770517,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Arequipa",
    zone: "Av Parra 379",
    address: "Av. Parra 379 - Arequipa",
    reference: "",
    lat: -16.414719927538,
    lng: -71.547783910033,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "07:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Arequipa",
    zone: "Mall Lambramani",
    address: "Av. Lambramani 325, Arequipa - Arequipa- Arequipa",
    reference: "Dentro Del Mall Lambramani (sotano Piso -4)",
    lat: -16.410501929707,
    lng: -71.519777129466,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cayma",
    zone: "Av Charcani",
    address: "Av. Charcani 401 Asoc. Jose Olaya",
    reference: "Frente Al Colegio Mendel",
    lat: -16.339917952103,
    lng: -71.540474523392,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cayma",
    zone: "Plaza La Tomilla",
    address: "Av. Ramón Castilla N° 1000 - B La Tomilla Cayma -",
    reference: "En La Misma Plaza Tomilla",
    lat: -16.3575544,
    lng: -71.5437086,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Asoc Las Flores - Av 54",
    address: "Asoc. Vivienda Interes Social Aldo Moro Mz. C Lt. 21, Cerro Colorado - Arequipa - Arequipa",
    reference: "al Lado Del Sistema Eléctrico El Profe",
    lat: -16.327304045386,
    lng: -71.569155459829,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Asoc. Nuevo Horizonte - Av. 54",
    address: "Nuevo Horizonte Mz.h Lote 12 - Cerro Colorado - Arequipa",
    reference: "Con Av.54 A Cuatro Cdras. De Inkafarma",
    lat: -16.327308817549,
    lng: -71.5541667,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Autopista La Joya",
    address: "Asoc. Urbanizadora Peruarbo Sector Peru Zona I Mz. B4 Lt. 4 - Autopista La Joya - Arequipa",
    reference: "Autopista Arequipa - La Joya, A Dos Cdras. Del Sauna Candamo",
    lat: -16.346111743448,
    lng: -71.6060278,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Av Los Incas",
    address: "Av. Los Incas N° 604 Semirural Pachacutec – Cerro Colorado - Arequipa",
    reference: "Esquina Con Calle San Martin Semirural Pachacutec",
    lat: -16.392024899212,
    lng: -71.570138064496,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Av Pumacahua",
    address: "Urb. San Felipe Av Pumacahua Lt 14, Cerro Colorado Arequipa",
    reference: "A Dos Cdras. Antes De Llegar Al Metro Cencosud / Ex Notaria Concha Revilla.",
    lat: -16.377530805257,
    lng: -71.556889606852,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 - 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Ciudad Municipal",
    address: "Mz. A, Sub Lt. 2 A, Asentamiento Poblacional Asociación Centro Industrial Las Canteras, Cerro Colorado - Arequipa",
    reference: "Al Costado Del Grifo Primax",
    lat: -16.327887664431,
    lng: -71.594528470558,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Zamacola",
    address: "Calle Yavarí 507 B - Zamacola - Cerro Colorado – Arequipa",
    reference: "A Una Cuadra De La Posta De Zamacola (marcisa Campos)",
    lat: -16.35166707504,
    lng: -71.560805179972,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Jacobo Hunter",
    zone: "Jacobo Hunter",
    address: "Calle Argentina # 405 - A, Jacobo Hunter - Arequipa",
    reference: "Frente Al Cajero De Caja Arequipa Y Esquina Con El Banco Caja Arequipa",
    lat: -16.43913925543,
    lng: -71.559500110635,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "La Joya",
    zone: "El Cruce La Joya",
    address: "Lateral 12 C Lt. 32, El Cruce La Joya - Arequipa",
    reference: "Al Costado Del Grifo Primax De La Joya",
    lat: -16.492806242963,
    lng: -71.847805600027,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Mariano Melgar",
    zone: "Mariano Melgar",
    address: "Calle Ancash N° 202 - Mariano Melgar",
    reference: "A La Altura Del Coliseo Del Niño",
    lat: -16.40347178489,
    lng: -71.51149918751,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Miraflores",
    zone: "Miraflores Arequipa",
    address: "Urb. Residencial Felipe Santiago Salaverry - Calle Teniente Rodríguez Mz. H Lt. 11, Miraflores - Arequipa - Arequipa",
    reference: "A Media Cdra. De La Compañia De Bombero De Miraflores",
    lat: -16.391344690541,
    lng: -71.513189845233,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Paucarpata",
    zone: "Av Jesus",
    address: "Av. Jesús N° 1100 Paucarpata – Arequipa",
    reference: "Con Esquina arturo Villegas N° 101.",
    lat: -16.414803670337,
    lng: -71.508945070551,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Paucarpata",
    zone: "Urb Manuel Prado",
    address: "Calle Belén N°100 - A Urb. Manuel Prado - Paucarpata",
    reference: "A Espaldas Del Cc. Mall Aventura Porongoche",
    lat: -16.4169283,
    lng: -71.5124596,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Sachaca",
    zone: "Variante Uchumayo Co",
    address: "Variante De Uchumayo Km 4.5 Valle Chili Sector Alto Cural, Parcela 662, Sachaca - Arequipa - Arequipa",
    reference: "A 50 Mts. Del Óvalo Volvo Variante Uchumayo",
    lat: -16.406333467232,
    lng: -71.592028734791,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Socabaya",
    zone: "Av Socabaya - Los Toritos",
    address: "Av. Socabaya 301 - Urb. San Martín De Socabaya",
    reference: "Al Frente Del Parque Victor Barriga",
    lat: -16.43784754394,
    lng: -71.529989703615,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Socabaya",
    zone: "Av. Horacio Zevallos",
    address: "Asentamiento Urbano Municipal Horacio Zeballos Gamez Sector E Mz. 1 Lt. 18 socabaya - Arequipa",
    reference: "al Costado Del Colegio Joule Y/o 2 Cdras. Del Penal De Socabaya",
    lat: -16.4853889,
    lng: -71.501417370552,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Uchumayo",
    zone: "Congata",
    address: "Urb. El Carmen M. E. Lt. 1 Congata Del Distrito Uchumayo - Arequipa",
    reference: "A Dos Cdras. De La Comisaria Congata",
    lat: -16.445521,
    lng: -71.61994,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Arequipa",
    district: "Yura",
    zone: "Yura",
    address: "Mz. O Lt. 4 Zna 2 Ciudad De Dios - Yura - Arequipa",
    reference: "Carretera Yura",
    lat: -16.306749604497,
    lng: -71.615276458895,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Camana",
    district: "Camana",
    zone: "Camana",
    address: "Calle Agustín Gamarra N° 451, Cercado Camaná",
    reference: "Al Frente Del Delivey Caseritos",
    lat: -16.618666,
    lng: -72.710622,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Caraveli",
    district: "Chala",
    zone: "Chala",
    address: "Av. Emancipacion Nro. S/n Mz. 78 Lt. 10",
    reference: "A Media Cdra. Del Parque Del Niño Chalino",
    lat: -15.849445506231,
    lng: -74.25530717556,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Castilla",
    district: "Aplao",
    zone: "Aplao",
    address: "Ubica En La Manzana X1, Lote 07, De La Calle 8 De Setiembre, Aplao - Castilla - Arequipa",
    reference: "A Una Cdra. De Ministerial Público Fiscalía",
    lat: -16.078428090429,
    lng: -72.491853483296,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Caylloma",
    district: "Majes",
    zone: "Av Colonizadores Co",
    address: "Av. Lote Colonizadores. 4 Parcela 180, Majes - Caylloma - Arequipa",
    reference: "A Media Cdra. Del Grifo El Eje",
    lat: -16.352289700015,
    lng: -72.180926141061,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Caylloma",
    district: "Majes",
    zone: "Calle Yarabamba",
    address: "Calle Yarabamba, Mz. Y Lt 7. Villa El Pedregal, Majes - Caylloma - Arequipa",
    reference: "A Media Cdra. De La Notaria Terán Bejar",
    lat: -16.358222616241,
    lng: -72.190472238385,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Islay",
    district: "Cocachacra",
    zone: "Cocachacra",
    address: "Centro Poblado Cocachacra Mz. N5 Sub-lote 5b Calle Dean Valdivia, Cocachacra - Islay - Arequipa",
    reference: "del Parque San Francisco Una Cdra. Hacia Abajo",
    lat: -17.096111691038,
    lng: -71.773000126693,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Islay",
    district: "Islay",
    zone: "Matarani",
    address: "Asentamiento Humano. Puerto Nuevo Mz. I Lt. 18 Av. Bello Horizonte, islay - islay - Arequipa",
    reference: "Frente Al Parque Ecológico",
    lat: -16.99849950877,
    lng: -72.096777058153,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Arequipa",
    province: "Islay",
    district: "Mollendo",
    zone: "Mollendo Co",
    address: "Mariscal Castilla 472 –a, Arequipa - Islay - Mollendo",
    reference: "al Costado De Cei “mi carrusel”",
    lat: -17.021804037741,
    lng: -72.013916892237,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ayacucho",
    province: "Huamanga",
    district: "Ayacucho",
    zone: "Ayacucho Co",
    address: "Aa.hh Complejo Artesanal T1 Lt1 - Ayacucho -",
    reference: "A Una Cuadra De La Puerta 2 Del Terminal Terrestre Libertadores De América",
    lat: -13.1349252,
    lng: -74.2326602,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Ayacucho",
    province: "Huamanga",
    district: "Carmen Alto",
    zone: "Carmen Alto",
    address: "Asentamiento Humano Carmen Alto Mz B1 Lote 9 Zona Ii Acuchimay Carmen Alto – Huamanga- Ayacucho",
    reference: "A 1 Cuadra De La Municipalidad De Carmen Alto",
    lat: -13.178399652891,
    lng: -74.220495670554,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ayacucho",
    province: "Huamanga",
    district: "Jesus Nazareno",
    zone: "Jesus Nazareno",
    address: "Jr. José María Eguren 451 - Jesus Nazareno - Huamanga - Ayacucho",
    reference: "Cruce Con Jr. Mariano Melgar",
    lat: -13.154760305912,
    lng: -74.214073329448,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ayacucho",
    province: "Huamanga",
    district: "San Juan Bautista",
    zone: "San Juan Bautista",
    address: "Av. Venezuela N° 431 – Urb. Aprovisa, San Juan Bautista - Huamanga - Ayacucho",
    reference: "Altura Del Hostal La Oriental, Cerca Al Seguro De Essalud",
    lat: -13.175943594201,
    lng: -74.199324499991,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ayacucho",
    province: "Huanta",
    district: "Huanta",
    zone: "Huanta",
    address: "Jr. Gervasio Santillana N°976 - Huanta - Ayacucho",
    reference: ", Cruce Con Jr. Revolución",
    lat: -12.937385673235,
    lng: -74.255491005798,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Cajabamba",
    district: "Cajabamba",
    zone: "Cajabamba",
    address: "Jr. Lara N° 100 ,cajabamba - Cajabamba - Cajamarca",
    reference: "A Una Cdra. Del Complejo Deportivo “santa Ana”",
    lat: -7.6268617255628,
    lng: -78.048167560925,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Barrio San Jose",
    address: "Jr. Chanchamayo N° 1162 - Barrio San José Cajamarca",
    reference: "Paralela Con Jr. Huancavelica Y Jr. Sara Macdougall.",
    lat: -7.1497829958282,
    lng: -78.5206235201,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Barrio San Martín",
    address: "Jirón Los Gladiolos N° 336 barrio San Martín, Cajamarca – Cajamarca – Cajamarca",
    reference: "A La Altura De La Cdra. 13 De La Vía De Evitamiento Sur /a Una Cdra. De La Universidad Nacional De Cajamarca",
    lat: -7.1699003050971,
    lng: -78.499003664337,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Cajamarca Co",
    address: "Av. Independencia N° 787 Barrio Santa Elena",
    reference: "",
    lat: -7.1712133,
    lng: -78.5120151,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Cajamarca Horacio Zevallos",
    address: "Jr. Emilio Barrantes Mz X Lote 3 Urb. Horacio Zevallos - Cajamarca",
    reference: "A Una Cuadra De La Universidad Privada Del Norte (upn) Y Vía De Evitamiento Norte Cuadra 13.",
    lat: -7.1494038,
    lng: -78.5064654,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Huambocancha Baja",
    address: "Mz. A Lote S/n – Barrio Huambocancha Baja – Cajamarca",
    reference: "A Una Cdra. Del Paradero De La P13/al Costado Del Campo Deportivo El Patriarca",
    lat: -7.118417325098,
    lng: -78.528418064811,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "8:00 AM A 1:00 PM (Atención)",
      "2:00 PM A 7:00 PM (Atención)"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Jesus",
    zone: "Huaraclla",
    address: "Mz. A Lote S/n Cp Huaraclla - Jesus - Cajamarca",
    reference: "A Una Cdra. De La I.e. José Olaya Balandra.",
    lat: -7.2328604675508,
    lng: -78.410917671899,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "8:00 AM A 1:00 PM (Atención)",
      "2:00 PM A 7:00 PM (Atención)"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Los Banos Del Inca",
    zone: "Baños Del Inca",
    address: "Jr. Cahuide N° 242 – Lotiz. Hurtado Miller – Baños Del Inca – Cajamarca",
    reference: "A Espaldas De Senati Y A Una Cdra. De La Base De Serenazgo De Baños Del Inca",
    lat: -7.163558261272,
    lng: -78.468443729448,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Celendin",
    district: "Celendin",
    zone: "Celendin",
    address: "Jr. Pedro Ortiz Montoya 148",
    reference: "Esquina Con Av. Amazonas",
    lat: -6.8714795543587,
    lng: -78.14372690136,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Chota",
    district: "Chota",
    zone: "Chota",
    address: "Av. Fray José Arana N 805 -",
    reference: "Frente Al Terminal Angel Divino",
    lat: -6.562775,
    lng: -78.653349,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Contumaza",
    district: "Chilete",
    zone: "Chilete - Agente",
    address: "Jr. Santa Rosa N° 121, Chilete – Contumazá – Cajamarca",
    reference: "A Una Cdra. Del Terrapuerto Y A 100 Mts. Del Puente De Ingreso A Chilete",
    lat: -7.2225019957084,
    lng: -78.838027799969,
    type: "Terminal",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Contumaza",
    district: "Yonan",
    zone: "Tembladera Cajamarca",
    address: "Jr. Bolognesi S/n – Tembladera - Yonan - Contumazá - Cajamarca",
    reference: "Al Frente Del Parque Víctor Raúl Haya De La Torre",
    lat: -7.2525846006918,
    lng: -79.132860979091,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Cutervo",
    district: "Cutervo",
    zone: "Cutervo",
    address: "Av. Salomón Vilchez Murga S/n. Cdra 9",
    reference: "Frente A La Clínica Cutervo",
    lat: -6.37884,
    lng: -78.812233,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Hualgayoc",
    district: "Bambamarca",
    zone: "Bambamarca",
    address: "Av. Tupac Amaru 1105",
    reference: "Al Costado Del Paradero Al Cumbe",
    lat: -6.677954,
    lng: -78.525601,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "Jaen",
    district: "Jaen",
    zone: "Jaen Co",
    address: "Av. Pakammuros Cuadra 6 S/n -",
    reference: "Esquina Con Calle Libertad N° 490",
    lat: -5.7098471730858,
    lng: -78.80305781963,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "San Ignacio",
    district: "San Ignacio",
    zone: "San Ignacio",
    address: "Pasaje Tres N° 113 Urb Santa Rosa, Cajamarca - San Ignacio",
    reference: "Frente Al Estado Municipal",
    lat: -5.1428081364603,
    lng: -78.998320738098,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "San Marcos",
    district: "Pedro Galvez",
    zone: "San Marcos",
    address: "Jr. Adolfo Amorin Bueno N° 140 San Marcos – Cajamarca",
    reference: "Al Frente De La Plaza Agropecuaria",
    lat: -7.3343555505042,
    lng: -78.174261935812,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "07:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "San Miguel",
    district: "San Miguel",
    zone: "San Miguel Cajamarca",
    address: "Jr. Bolognesi N° 717 – San Miguel – Cajamarca - Cajamarca",
    reference: "Al Costado Del Coliseo Y El Paradero De Llapa Y Cochán.",
    lat: -7.0007791311052,
    lng: -78.849751341107,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cajamarca",
    province: "San Pablo",
    district: "San Pablo",
    zone: "San Pablo Cajamarca",
    address: "Jr. Tnt. Lorenzo Iglesia N° 910 - San Pablo – Cajamarca - Cajamarca",
    reference: "A Media Cdra. Del Hospital San Pablo",
    lat: -7.1151079999997,
    lng: -78.823372000001,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "8:00 AM A 1:00 PM (Atención)",
      "2:00 PM A 6:00 PM (Atención)"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Bellavista",
    zone: "Bellavista Callao",
    address: "Av. Elmer Faucett 1641 - Urb. Jardines Virú Mz. B Lt 46, Bellavista - Callao",
    reference: "A 2 Cuadras Del Cruce De Av. Faucett Con Av. Venezuela",
    lat: -12.060813729761,
    lng: -77.097564493089,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Callao",
    zone: "Av Bertello Callao",
    address: "Av. Alejandro Bertello Bollati mz. B Lt. 20 Y 21 – Urb. Progresiva Bahía Blanca – Callao - Callao - Callao",
    reference: "Frente Al Mercado Costa Azul",
    lat: -11.985684611869,
    lng: -77.115837899999,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Callao",
    zone: "Av Quilca",
    address: "Unidad Inmobiliaria N° 1, Av. Quilca Mz. G Sub Lt. 11c, Urb. Aeropuerto – Segundo Sector - Callao",
    reference: "Cruce Con Calle 1, Frente A La Iglesia De Testigos De Jehová",
    lat: -12.033462418573,
    lng: -77.096426666561,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Callao",
    zone: "Av Saenz Peña",
    address: "Av. Saenz Peña N° 414 - 416 - Callao - Callao",
    reference: "Cruce Con Av. Marco Polo",
    lat: -12.061012700004,
    lng: -77.142579099985,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Callao",
    zone: "Callao Faucett",
    address: "Av. Elmer Faucett N° 492",
    reference: "",
    lat: -12.049958017539,
    lng: -77.098095000011,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "La Perla",
    zone: "Ovalo La Perla",
    address: "Av. La Marina 530, Urb. Benjamin Doigg Lossio, La Perla, Callao",
    reference: "a 3 Cuadras Del Óvalo De La Perla",
    lat: -12.068000755733,
    lng: -77.115764452752,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Mi Peru",
    zone: "Mi Peru",
    address: "V. Victor Raul Haya De La Torre Mz. A Lt. 02 Asentamiento Humano Confraternidad - Iii Sector - Mi peru – Callao - Callao",
    reference: "Cruce Con Av. Arequipa",
    lat: -11.857445566174,
    lng: -77.128500287367,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Ventanilla",
    zone: "Pachacutec Av 150",
    address: "Av. 150 Izquierda Mz. W2 Lt. 01 Proyecto Piloto Nuevo pachacutec, Ventanilla - Callao - Callao",
    reference: "A 1 Cdra. Del Cruce Av. Camino Del Inca",
    lat: -11.838273352412,
    lng: -77.156421448409,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Ventanilla",
    zone: "Pachacutec Pdro Chinitas",
    address: "Av. 225 Mz. H Sub Lt. T. 11 - Asoc Proy. Esp. Ciudad Pachacutec",
    reference: "A 1 Cdra. Del Cruce Con Av. Los Proyectistas, Ventanilla - Lima - Lima",
    lat: -11.841691881151,
    lng: -77.137115856604,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Ventanilla",
    zone: "Pachacutec Pdro Vc",
    address: "Av. 225 Mz F Lote 2 Sector A Grupo Residencial A2 - Proyecto piloto Nuevo Pachacutec, Ventanilla - Callao - Callao",
    reference: "Frente Al Centro De Salud 3 De Febrero",
    lat: -11.829064116198,
    lng: -77.158289677599,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Callao",
    province: "Callao",
    district: "Ventanilla",
    zone: "Parad. Los Licenciados",
    address: "Calle 19, Mz. J Lt. 26 Zn - Urb. Coop. De La Marina",
    reference: "Al Costado De Lubricentro Pablito Romero",
    lat: -11.879870488107,
    lng: -77.126912984603,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Anta",
    district: "Anta",
    zone: "Anta Izcuchaca",
    address: "Parque Del Carmen Lt. 1 Mz. B 2, Anta - Anta - Cusco",
    reference: "Paradero Carmen, Pista Principal Izcuchaca",
    lat: -13.469611752105,
    lng: -72.135833970585,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Calca",
    district: "Calca",
    zone: "Cusco Calca",
    address: "Av. Vilcanota Mz. A Lt 4 Calca - Cusco",
    reference: "Frente Al Grifo Petro Perú O El Óvalo Puma - Entrada De Calca",
    lat: -13.32544905492,
    lng: -71.953392422748,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Calca",
    district: "Pisac",
    zone: "Pisac",
    address: "Av Vilcanota S/n, Pisac - Calca - Cusco",
    reference: "A Media Cdra. Del Puente De Pisac / Carretera A Taray",
    lat: -13.423507817134,
    lng: -71.85281378755,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Canchis",
    district: "Combapata",
    zone: "Combapata",
    address: "Av. Señor De Huanca S/n - Combapata - Canchis - Cusco",
    reference: "Al Costado Del Grifo Señor De Qoylluriti - A Orillas De La Misma Carretera A Sicuani",
    lat: -14.102278291534,
    lng: -71.427169751185,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Canchis",
    district: "Sicuani",
    zone: "Sicuani Av Confederacion Co",
    address: "Av. Confederacion N° 659",
    reference: "al Frente Del Ovalo Entrada De Sicuani / Al Frente De La Comisaria De Torcoma",
    lat: -14.256253760015,
    lng: -71.229391837808,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "015007878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Canchis",
    district: "Sicuani",
    zone: "Sicuani Av Manuel Callo",
    address: "Jr. Inambari Nro. 208, Sicuani - Canchis - Cusco",
    reference: "Al Frente Del Bcp Y De Caja Piura",
    lat: -14.268306864713,
    lng: -71.227834102622,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "015007878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Chumbivilcas",
    district: "Santo Tomas",
    zone: "Santo Tomas",
    address: "Calle Bolognesi Mz. 02 Lt. 25, Santo Tomas - Chumbivilcas - Cusco",
    reference: "A Espaldas De La Polleria Pico Dorado Y A Media Cdra. De La Av Santa Barbara",
    lat: -14.450639460425,
    lng: -72.084860024965,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "8:00 AM A 1:00 PM (Atención)",
      "2:00 PM A 7:00 PM (Atención)"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "Cusco",
    zone: "Tica Tica",
    address: "Arco Ticatica Pustipata, Lt. N° A - 11 - 2, Cusco",
    reference: "En La Av. Principal A 3 Cdras. Del Mercado Tica Tica",
    lat: -13.507250998862,
    lng: -71.998752093836,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "San Jeronimo",
    zone: "San Jeronimo",
    address: "Calle Ciro Alegría 226 - 224",
    reference: "Una Cuadra Antes Del Paradero Penal En El Carril De Bajada",
    lat: -13.545038230775,
    lng: -71.895806395877,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "San Sebastian",
    zone: "Cachimayo - San Sebastian",
    address: "Urb. Cachimayo A-37 Av. La Cultura – San Sebastian – Cusco",
    reference: "Entre Paradero Enaco Y Parque Cachimayo, A 2 Cuadra De La Universidad Andina.",
    lat: -13.534609281872,
    lng: -71.910668384545,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "San Sebastian",
    zone: "Cusco Co Via Evitamiento",
    address: "Av. Evitamiento S/n Ups Chacahuayco, san Sebastian - Cusco - Cusco",
    reference: "Vía evitamiento En El Paradero Horacio",
    lat: -13.542279103821,
    lng: -71.918194399996,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "San Sebastian",
    zone: "Via Expresa Sur",
    address: "Urb. Tupac Amaru B-1-2 san Sebastian – Cusco",
    reference: "Terminando La Via Expresa Zona Sur",
    lat: -13.539137908489,
    lng: -71.906443678608,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "Santiago",
    zone: "Av Antonio Lorena",
    address: "Prolongación Av. Antonio Lorena # 140 - Santiago, Cusco",
    reference: "Al Frente Del Cementerio Almudena",
    lat: -13.5257396,
    lng: -71.9879012,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "015007878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "Santiago",
    zone: "Huancaro",
    address: "Urb. Villa Union F-1-b Huancaro, Santiago - Cusco - Cusco",
    reference: "Frente A La Iglesia De Los Mormones/ A Una Cdra. Del Mercado Huancaro",
    lat: -13.538445249518222,
    lng: -71.981750657335,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "Santiago",
    zone: "Urb. Bancopata Av. Industrial",
    address: "Av. Industrial Urb. Bancopata J-20, Santiago - Cusco",
    reference: "a 2 Cdras. Del Ovalo Pachacutec, Frente A La Empresa Coca Cola",
    lat: -13.53302993621,
    lng: -71.970140480922,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "Wanchaq",
    zone: "Av Pachacutec",
    address: "Av. Pachacutec 429 - Wanchaq",
    reference: "A 100 Mtrs. De La Piscina Wanchaq",
    lat: -13.524395751135,
    lng: -71.970136579029,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "Wanchaq",
    zone: "Cusco Parque Industrial",
    address: "Av. Las Americas Mz. E Lt. 20, 2da Etapa, Urb. Parque Industrial, Wanchaq - Cusco",
    reference: "Al Frente De Talleres Pfuro, Al Frente De Mederera Urpi, Paralela a La Av Via Expresa.",
    lat: -13.532971798458,
    lng: -71.944027560633,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "015007878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Cusco",
    district: "Wanchaq",
    zone: "Velasco Astete",
    address: "Velasco Astete D3 - Wanchaq",
    reference: "A 2 Cdras. Del Aereopuerto",
    lat: -13.53848438482397,
    lng: -71.94663732182276,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Espinar",
    district: "Yauri ( Espinar )",
    zone: "Espinar",
    address: "Calle San Jose N° 703 Barrio Progreso, Yauri (espinar) - Espinar - Cusco",
    reference: "a Media Cdra. Del Grifo San Jose / A Media Cdra. De La Av. Tintaya",
    lat: -14.794805680154,
    lng: -71.40547176079,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "La Convencion",
    district: "Pichari",
    zone: "Pichari",
    address: "Asoc. Gral. Juan Velasco A. Mz. B Lt. 2 , Pichari - La Convencion – Cusco",
    reference: "Al Costado De Techo Propio",
    lat: -12.522202082844,
    lng: -73.823762832914,
    type: "Terminal",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "La Convencion",
    district: "Santa Ana",
    zone: "Quillabamba",
    address: "Jr. Puno Lt. 10 Y 11 Mz. G Urb. Santa Ana, Cusco - La Convencion - Santa Ana",
    reference: "A Media Cdra.l Del Estadio Municipal De Quillabamba / Cruce Con Prolongacion Jr. Martin Pio Concha",
    lat: -12.867000552803,
    lng: -72.691361212547,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Quispicanchi",
    district: "Ocongate",
    zone: "Ocongate",
    address: "Av. Ausangate S/n, Barrio Túpac Amaru",
    reference: "al Costado De La Carpintería Emmanuel. A Orillas De La Carretera Interoceánica A Mazuko.",
    lat: -13.6292063857,
    lng: -71.387583856822,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Quispicanchi",
    district: "Oropesa",
    zone: "Oropesa",
    address: "Mz. C Lt. 3 Del Predio Denominado Fracción \"b\" Quispicanchis – Puna Punabamba",
    reference: "Al Costado De Panificadora Los Marqueses, A Orillas De La Ctra. A Paucartambo",
    lat: -13.600029358967,
    lng: -71.767112823253,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Quispicanchi",
    district: "Urcos",
    zone: "Urcos",
    address: "Mayupata S/n Paucarbamba, Urcos - Quispicanchi - Cusco",
    reference: "Al Frende Del Estadio Municipal De Urcos / Al Frente Del Terminal Terrestre De Urcos",
    lat: -13.683279585148,
    lng: -71.623473408855,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Urubamba",
    district: "Chinchero",
    zone: "Chinchero",
    address: "Av. Mateo Pumacahua S/n, Chinchero - Urubamba - Cusco",
    reference: "Al costado De La Caja Cusco / En La Misma Carretera A Urubamba",
    lat: -13.3916558,
    lng: -72.050836126361,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Cusco",
    province: "Urubamba",
    district: "Urubamba",
    zone: "Cusco Urubamba",
    address: "Lt. E-3 Fracción -1, Sector Patahuasi, Urubamba – Urubamba - Cusco",
    reference: "A Una Cdra. De La Carretera A Ollantaytambo / A Media Cdra. Del Parque Teresita",
    lat: -13.300611752565,
    lng: -72.125221529448,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Huancavelica",
    province: "Huancavelica",
    district: "Huancavelica",
    zone: "Barrio Sta Ana Co",
    address: "Av. Universitaria 1003 - Huancavelica",
    reference: "A 1 Cdra. De La Escuela Santa Ana Y A 3 Cdras. Del Puente Del Ejército (barrio Santa Ana)",
    lat: -12.783667969689,
    lng: -74.964528087041,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Huancavelica",
    province: "Huancavelica",
    district: "Huancavelica",
    zone: "Barrio Yananaco",
    address: "Av. Andrés A. Cáceres N° 198, Huancavelica – Huancavelica – Huancavelica",
    reference: "A Media Cdra. De La Plazoleta \"tupac Amaru\" Y En La Esquina Con Calle Oropeza (barrio Yananaco)",
    lat: -12.787446361763,
    lng: -74.978028470551,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Huanuco",
    province: "Ambo",
    district: "Ambo",
    zone: "Ambo",
    address: "Av. Las Americas 501",
    reference: "Al Frente Del Colegio Juan José Crespo Y Castillo",
    lat: -10.120588660119,
    lng: -76.206691676387,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Huanuco",
    province: "Huanuco",
    district: "Amarilis",
    zone: "Amarilis Co",
    address: "Jr. Los Pinos Lote 3 -d2 Urb Los Pinos - Amarilis - Huánuco",
    reference: "A La Espalda De Toyota Huánuco",
    lat: -9.9139073583669,
    lng: -76.233213644157,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Huanuco",
    province: "Huanuco",
    district: "Huanuco",
    zone: "Jr Mayro",
    address: "Jr. Mayro N° 344",
    reference: "A Una Cdra. Del Parque San Pedro",
    lat: -9.9319057914582,
    lng: -76.246645538138,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Huanuco",
    province: "Leoncio Prado",
    district: "Jose Crespo Y Castil",
    zone: "Aucayacu",
    address: "Jr. Chiclayo 247 0c-02 Cent Aucayu, Leoncio Prado, Huánuco",
    reference: "Atrás Del Estadio Municipal",
    lat: -8.9322596556481,
    lng: -76.112530146816,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Huanuco",
    province: "Leoncio Prado",
    district: "Rupa Rupa",
    zone: "Tingo María - Leoncio Prado",
    address: "Av. Tito Jaime 914, Rupa Rupa- Leoncio Prado - Huanuco",
    reference: "A Dos Cdras. De La Plaza De Armas Leoncio Pardo",
    lat: -9.2920534325924,
    lng: -75.997412332603,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Huanuco",
    province: "Leoncio Prado",
    district: "Rupa Rupa",
    zone: "Tingo Maria Co Buenos Aires",
    address: "Calle Rosario Central",
    reference: "Segunda Entrada De Buenos Aires, En La Misma Esquina",
    lat: -9.3212843,
    lng: -75.9933975,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Chincha",
    district: "Chincha Alta",
    zone: "Calle Los Angeles",
    address: "Calle Los Ángeles N° Casa 217 01 - A Sin Barriio Cercado, Chincha Alta - Chincha - Ica",
    reference: "A 2 Cdras. De La Plaza De Armas De Chncha Pasando Electrodunas",
    lat: -13.416193893866,
    lng: -76.131554534509,
    type: "Micro E/r",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Chincha",
    district: "Chincha Alta",
    zone: "Prolong Luis Massaro",
    address: "Prolongacion Luis Massaro N°247 - Chincha Alta",
    reference: "",
    lat: -13.417292,
    lng: -76.139622,
    type: "Micro E/r",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Chincha",
    district: "Pueblo Nuevo",
    zone: "Chincha Pueblo Nuevo",
    address: "Aa. Hh. Los Alamos, Calle Los Laureles Mz. 17 Lt. 11- A",
    reference: "A 2 Cdras. De La Posta Los Álamos",
    lat: -13.399703209779,
    lng: -76.140172536272,
    type: "Micro E/r",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Chincha",
    district: "Sunampe",
    zone: "Sunampe Co",
    address: "Carr. Panamericana sur Nro. 198 -b , Sin Barrio Cercado Sunampe, Sunampe - Chincha - Ica",
    reference: "Antigua panamericana Sur Frente A La Entrada De Grocio Prado.",
    lat: -13.411199184426,
    lng: -76.161001005329,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Ica",
    district: "Ica",
    zone: "Ica Av. Jj Elias",
    address: "Manzana B, Sub-lote 02 Del Fundo La Palma Ica",
    reference: "Cruce De Av. Cutervo Con Av. J.j Elias",
    lat: -14.07358570085,
    lng: -75.731736729448,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Ica",
    district: "Ica",
    zone: "Ica San Joaquin",
    address: "Pasaje Grau N° 101 San Joaquin - Ica",
    reference: "A 1 Cdra De Petro Peru",
    lat: -14.0643326,
    lng: -75.7409599,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Ica",
    district: "Ica",
    zone: "Ica Urb. Manzanilla",
    address: "Av. Manuel Santana Chiri N°359 A1 – Ica",
    reference: "Cruce Con Calle Baltazar Caravedo",
    lat: -14.075173411545,
    lng: -75.723226190124,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Ica",
    district: "La Tinguina",
    zone: "La Tinguiña",
    address: "Calle Francisco Sales Sotelo N° 298 Sub Lote 3, La Tinguiña - Ica – Ica",
    reference: "Cruce De La Av.frncisco Sales Sotelo Y Av. Jose Carlos Mariategui",
    lat: -14.039900990771,
    lng: -75.711601465608,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Ica",
    district: "Parcona",
    zone: "Parcona",
    address: "Cp. De Parcona -cercado (primera Etapa) Mz. B Lote 16 Parcona - Ica",
    reference: "Av. 18 De Febrero y Cruce De Av. Natividad Paco",
    lat: -14.0474001492,
    lng: -75.708398960386,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Ica",
    district: "Salas",
    zone: "Salas Ica",
    address: "Sub Lote 01 zona panamericana sur km. 293.350, Salas guadalupe - Ica - Ica",
    reference: "Frente Al Estadio De Salas Guadalupe",
    lat: -13.988307260089,
    lng: -75.771832996982,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Ica",
    district: "Santiago",
    zone: "Ica Santiago",
    address: "Centro Poblado Santiago Mz. E, Lt. 01 Sector Ii Santiago - Ica - Ica",
    reference: "Frente A La Comisaria De Santiago",
    lat: -14.184709950323,
    lng: -75.714393999999,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Ica",
    district: "Subtanjalla",
    zone: "Ica Subtanjalla Co",
    address: "C.p - Sector Macacona /predio Parcela 214 Lote 2, Subtanjalla - Ica - Ica",
    reference: "Panamericana Sur Frente A La Entrada Del Arrabal",
    lat: -14.035221650519,
    lng: -75.75583767055,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Nazca",
    district: "El Ingenio",
    zone: "El Ingenio",
    address: "Av. Principal Tulin 204, El Ingenio - Nazca - Ica",
    reference: "Fremte A A La Plaza De Tulin",
    lat: -14.64720106174,
    lng: -75.07065165982,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Nazca",
    district: "Marcona",
    zone: "San Juan De Marcona",
    address: "A. H. San Martín De Porres E-28 san Juan De Marcona - Nazca - Ica",
    reference: "Entre El Hotel San Martin Y El Minimarket Lana",
    lat: -15.372110896808,
    lng: -75.157416478964,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Nazca",
    district: "Nazca",
    zone: "Av Circunvalacion Nazca",
    address: "En La Esquina De La Av. Circunvalación Con Calle S/n, Hoy Calle Las Mercedes S/n Nasca -",
    reference: "Al Lado De La Iep Jean Piaget",
    lat: -14.8252316,
    lng: -74.9463744,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Nazca",
    district: "Vista Alegre",
    zone: "Vista Alegre Co",
    address: "Carretera Panamericana Sur N\\u00b0 906, Vista Alegre - Nazca -\\u00a0ica",
    reference: "Frente Al Aeropuerto De Vista Alegre",
    lat: -14.850980032038,
    lng: -74.957309986507,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Pisco",
    district: "Pisco",
    zone: "Av Abraham Valdelomar Co",
    address: "Av. Abraham Valdelomar Nro. Puerta 965 Pisco - Pisco - Ica",
    reference: "A Una Cdra. Por La Posta San Martin",
    lat: -13.717889589276,
    lng: -76.207415719224,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Pisco",
    district: "Pisco",
    zone: "La Villa Cruce Pisco",
    address: "C. P. Oblacion Villa Los Angeles Mz.a Lt 13 B La Villa pisco-pisco-ica",
    reference: "A 100 Metros Con Dirección Al Sur Dedl Cruce Panamericana Antigua C/n Av. Fermín Tangüis",
    lat: -13.714378,
    lng: -76.153788,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ica",
    province: "Pisco",
    district: "San Clemente",
    zone: "San Clemente",
    address: "Av. Los Libertadores Grupo Número 1 Mz,91 Lote 7ª San Clemente - Pisco - Ica",
    reference: "Libertadores Sexta Cuadra,frente Del Grifo Santa Rosa",
    lat: -13.680502366805,
    lng: -76.151887445621,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Chanchamayo",
    district: "Bajo Pichanaqui",
    zone: "Pichanaki",
    address: "Av. Venus Lt. 20 Ciudad Satélite -",
    reference: "( A 1 Cuadra Y Media Del Parque De Satélite)",
    lat: -10.919270732705,
    lng: -74.878801,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "015007878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Chanchamayo",
    district: "La Merced",
    zone: "La Merced",
    address: "Av. Peru 931 Sector Pampa Del Carmen, La Merced -chanchamayo - Junín",
    reference: "Frente A La Cooperativa Chanchamayo",
    lat: -11.070138136554,
    lng: -75.336406736317,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Chanchamayo",
    district: "Perene",
    zone: "Perene",
    address: "Av. Marginal S/n Aa.vv San Jacinto - perene - Chanchamayo - Junin",
    reference: "Antes Del Ultimo Rompemuelle De San Jacinto",
    lat: -10.949521894979,
    lng: -75.223239171096,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Chanchamayo",
    district: "San Ramon",
    zone: "San Ramón",
    address: "Jr. Ucayali 102 - San Ramón",
    reference: "Frente A La Caja Huancayo Y El Parque El Avión",
    lat: -11.124126,
    lng: -75.355581,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Chupaca",
    district: "Chupaca",
    zone: "Chupaca",
    address: "Jr. Ramon Castilla 201, Chupaca - Chupaca - Junin",
    reference: "A Una Cdra. De La Plaza Principal De Chupaca",
    lat: -12.061264754772,
    lng: -75.286272902005,
    type: "Pequeña",
    hours: [
      "LUNES A VIERNES",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Concepcion",
    district: "Concepcion",
    zone: "Concepcion",
    address: "Carretera Central Lt. 7 - Mz. E5, Concepción - Concepción - Junín",
    reference: "Esquina Con Tupac Amaru",
    lat: -11.918185909992,
    lng: -75.322057252364,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "Chilca",
    zone: "Chilca Co Leoncio Prado",
    address: "Jr. Leonico Prado 656, Chilca – Huancayo - Junín",
    reference: "Esquina Con Jiron Jose Olaya",
    lat: -12.075860337839,
    lng: -75.196962163462,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 AM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "Chilca",
    zone: "Chilca Huancayo",
    address: "Jr. 28 De Julio N° 935",
    reference: "Esquina 28 De Julio Y Santos Chocano",
    lat: -12.084192324029,
    lng: -75.202691995668,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "El Tambo",
    zone: "Av Circunvalación Cruce Con Mariategui",
    address: "Av. Circunvalación 480 T-1, El Tambo - Huancayo - Junin",
    reference: "Esquina Con Prolongación Mariategui",
    lat: -12.049266655779,
    lng: -75.210464658895,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "El Tambo",
    zone: "Av Mariscal Castilla Parq Industrial",
    address: "Av Mariscal Castilla 2769",
    reference: "Frente Al Colegio Andres Bello",
    lat: -12.0428748,
    lng: -75.2267209,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 - 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "El Tambo",
    zone: "Ciudad Universitaria",
    address: "Jr Tarma Nro. 37 - 24, El Tambo - Huancayo - Junín",
    reference: "Al Costado De La Facultad De Ingeniería Metalúrgica Uncp",
    lat: -12.030532662807,
    lng: -75.235135251462,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "El Tambo",
    zone: "Pio Pata",
    address: "Av. Huancavelica 1201, El Tambo - Huancayo - Junín",
    reference: "Esquina Con El Jr. La Victoria",
    lat: -12.059666604967,
    lng: -75.221244266004,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "Huancayo",
    zone: "Huancayo Jr. Ica",
    address: "Jr. Ica Nº 1143 - Huancayo",
    reference: "Entre El Jr. Ica Y El Jr. Tacna",
    lat: -12.0739582,
    lng: -75.2141862,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "Huancayo",
    zone: "San Carlos Huancayo",
    address: "Pj. San Fernando 209 Huancayo - Huancayo - Junin",
    reference: "Esquina Del Jr. San Fernando Y Mártires Del Periodismo",
    lat: -12.054983032705,
    lng: -75.201461670555,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "Huancayo",
    zone: "Terminal Los Andes",
    address: "Av. Ferrocarril S/n - Huancayo - Counter N° 14",
    reference: "Terminal Terrestre Los Andes, Frente Al Open Plaza",
    lat: -12.061289165519,
    lng: -75.20892492023,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "Pilcomayo",
    zone: "Pilcomayo",
    address: "Plaza Independencia 131, Pilcomayo - Huancayo - Junín",
    reference: "Plaza Principal De Pilcomayo",
    lat: -12.054989295684,
    lng: -75.254161844677,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "San Agustin",
    zone: "San Agustin De Cajas",
    address: "Carretera Central Km 7.5 S/n San Agustin – Huancayo – Junín",
    reference: "Frente A La Envasadora Solgas",
    lat: -12.010163420625,
    lng: -75.246695070583,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Huancayo",
    district: "Sapallanga",
    zone: "Sapallanga",
    address: "Ca. Coronel Cisneros 598",
    reference: "Esquina Con Av. Mariscal Caceres",
    lat: -12.142211055552,
    lng: -75.163969411663,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Jauja",
    district: "Jauja",
    zone: "Jauja",
    address: "Jr. Estanislao Marquez 286, Yauyos - Jauja - Junín",
    reference: "Esquina Con Jr. 4 De Enero",
    lat: -11.785629433895,
    lng: -75.493856236131,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Jauja",
    district: "Jauja",
    zone: "Terminal Jauja",
    address: "Jr.luis Bardales S/n, Jauja – Jauja – Junín",
    reference: "Terminal Terrestre Hatun Xauxa",
    lat: -11.772218425795,
    lng: -75.492098458891,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Satipo",
    district: "Mazamari",
    zone: "Mazamari",
    address: "Jr. Jorge Chavez Nro 144 Lt. 8a Junín - Satipo– Mazamari",
    reference: "Cerca A La Vía Principal, Al Costado Del Hospedaje Luján 1er Piso",
    lat: -11.328194232542,
    lng: -74.532861406404,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Satipo",
    district: "Pangoa",
    zone: "Pangoa",
    address: "Av. Marginal S/n Número Villa Chavini Pangoa - Satipo - Junín",
    reference: "Al Costado De La Tienda Honda Inversiones Arauco San Martín De Pangoa",
    lat: -11.419797368222,
    lng: -74.489787911117,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Satipo",
    district: "Satipo",
    zone: "Satipo",
    address: "Jr. Francisco Irazola 1077 - Junín",
    reference: "Fábrica La Satipeña",
    lat: -11.259616493652,
    lng: -74.64248165158,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Tarma",
    district: "Tarma",
    zone: "Tarma",
    address: "Jr. Amazonas Nro. 1164 Tarma - Junín",
    reference: "entre Jr. Amazonas Con Av. Vienrich",
    lat: -11.417779771838,
    lng: -75.693027799999,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Junin",
    province: "Yauli",
    district: "La Oroya",
    zone: "La Oroya",
    address: "Av. Arévalo S/n (carretera Central) - Anexo El Tambo - Santa Rosa De Sacco",
    reference: "",
    lat: -11.5707657,
    lng: -75.9586329,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Ascope",
    district: "Casa Grande",
    zone: "Casa Grande",
    address: "Calle Luis sánchez N° 152 Sector Parte Alta. Casa Grande - Ascope - La Libertad",
    reference: "Cruce Con av. Estadio",
    lat: -7.7392758167105,
    lng: -79.187860328116,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Ascope",
    district: "Paijan",
    zone: "Paijan",
    address: "Av. Panamericana Nro. 2321 La Libertad - Ascope - Paijan",
    reference: "A 1 Cdra. Del Estadio Municipal De Paiján",
    lat: -7.7222500000004,
    lng: -79.308472200001,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Chepen",
    district: "Chepen",
    zone: "Chepen",
    address: "Prolongacion Ezequiel Gonzales Caceda 193 - Sec. Chepen, Frente Al Coliseo",
    reference: "",
    lat: -7.2211028,
    lng: -79.436371,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Chepen",
    district: "Pacanga",
    zone: "Pacanguilla",
    address: "Carretera Panamericana # 835 - Urb. Pacanguilla - Distrito Pacanga",
    reference: "En La Misma Panamericana",
    lat: -7.154513,
    lng: -79.446302,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Otuzco",
    district: "Otuzco",
    zone: "Otuzco",
    address: "Av. Alfredo Gutiérrez N° 120 - Otuzco - Otuzco - La Libertad.",
    reference: "",
    lat: -7.9063204,
    lng: -78.5644849,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Guadalupe",
    zone: "Ciudad De Dios",
    address: "Mz. A Lt. 01 Cpm Ciudad De Dios - Sec. Los Ángeles – Guadalupe – La Libertad",
    reference: "Al Costado Del Molino Samán Y A Dos Cuadras Del Cruce A Cajamarca",
    lat: -7.3078077719091,
    lng: -79.480498695801,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Guadalupe",
    zone: "Guadalupe La Libertad",
    address: "Av. Nilla Cerruty N° 299 - Guadalupe – Pacasmayo – La Libertad",
    reference: "Al Costado Del Grifo Repsol - Neotech",
    lat: -7.2469439071577,
    lng: -79.46819496902,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Pacasmayo",
    zone: "Pacasmayo Centro",
    address: "Av. Gonzalo Ugaz Salcedo S/n - Pacasmayo - La Libertad",
    reference: "Al Costado Del Estadio Municipal De Pacasmayo / A Media Cdra. Del Supermercado Tottus",
    lat: -7.3998619490134,
    lng: -79.566583624171,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Pacasmayo",
    zone: "Pacasmayo Las Palmeras",
    address: "Ctra. Panamericana Norte N° Mz. P Lt. 4a - A.h. Las Palmeras",
    reference: "Entre Av. Sucre Y Av. Leoncio Prado",
    lat: -7.3942461776644,
    lng: -79.564250835777,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "San Pedro De Lloc",
    zone: "San Pedro De Lloc",
    address: "Av. Vía De Evitamiento N° 407, San Pedro De Lloc - Pacasmayo - La Libertad",
    reference: "A Media Cdra. De La Calle Libertad/ A Media Cdra. Del Paradero De La Via De Evitamiento",
    lat: -7.432359975376,
    lng: -79.500667425779,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Sanchez Carrion",
    district: "Huamachuco",
    zone: "Huamachuco",
    address: "Jr. Simon Bolivar 763, Huamachuco Sanchez Carrion - La Libertad",
    reference: "Entre Jr. Independecia Y Jr. Alfonso Ugarte",
    lat: -7.8123777275905,
    lng: -78.049513218584,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "El Porvenir",
    zone: "Alto Trujillo",
    address: "Av. Prolongación 12 De Noviembre, Mz. Q, Lt. 25",
    reference: "A Media Cdra. De La Comisaría Alto Trujillo",
    lat: -8.0688863115724,
    lng: -79.021611486879,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "El Porvenir",
    zone: "Av Hermanos Angulo",
    address: "Av. Hermanos Angulo 628, Trujillo",
    reference: "A Espaldas De La Municipalidad El Porvenir",
    lat: -8.0843892837298,
    lng: -79.000249497004,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "El Porvenir",
    zone: "Av. 12 De Noviembre",
    address: "Av. 12 De Noviembre m. W Lote 19 Mz. 3a, El Porvenir - Trujillo - La Libertad",
    reference: "Al Frente Del Completo Deportivo José Caipo",
    lat: -8.0652017214992,
    lng: -79.022208280762,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "El Porvenir",
    zone: "Av. Las Magnolias",
    address: "Av. Las Magnolias Mz. 25 Lt. 2a Nuevo Porvenir, El Porvenir - Trujillo - La Libertad",
    reference: "A Una Cdra. Del Poder Judicial Cisaj Sede El Porvenir",
    lat: -8.0701613262859,
    lng: -79.011612049897,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "El Porvenir",
    zone: "Jr. Cahuide",
    address: "Jr. Cahuide N° 342 Aa.hh La Merced - El Porvenir - Trujillo - La Libertad",
    reference: "A Una Cdra. Del Arco Del Porvenir / A Una Cdra. De La Parroquia El Buen Pastor",
    lat: -8.0861170633811,
    lng: -79.004310200334,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Huanchaco",
    zone: "El Milagro",
    address: "Av. Industrial Mz 23 Lt. 13 Sector Ii – el Milagro, Huanchaco - Trujillo - La Libertad",
    reference: "A 2 cdras. de la plaza de armas de el Milagro",
    lat: -8.0226277284451,
    lng: -79.068544041134,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Huanchaco",
    zone: "Ovalo Huanchaco Co",
    address: "Carretera Via De Evitamiento 576.2 Huanchaquito Alto - Trujillo - La Libertad",
    reference: "A 1 Cdra. De Ovalo Huanchaco / Al Costado De Condominio Las Brisas",
    lat: -8.0940006638734,
    lng: -79.097945741105,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "La Esperanza",
    zone: "Av Tahuantinsuyo",
    address: "Av. Tahuantinsuyo N° 739, la Esperanza – trujillo – la Libertad",
    reference: "Diagonal A Grifo El Amigo. / Entre Pasaje Santa Ana Y Av. Los Laureles",
    lat: -8.0860539275375,
    lng: -79.041433559277,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "La Esperanza",
    zone: "Wichanzao",
    address: "Mz. 1 Lt. 23 Aa.hh Wichanzao – la Esperanza – trujillo – la Libertad",
    reference: "Al Costado Del Almacén Sunat. / Diagonal Al Hospital De Alta Complejidad Virgen De La Puerta",
    lat: -8.0521209280154,
    lng: -79.05562705114,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Moche",
    zone: "Moche",
    address: "Calle Elio Jacobo Mz. D - Lt. 13. Cruce Con Av. La Marina A Una Cdra. De Essalud Moche. Frente Al Parque El Paraíso.",
    reference: "",
    lat: -8.1718883345549,
    lng: -79.011334590606,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Atahualpa",
    address: "Calle Atahualpa 481 – Trujillo – La Libertad",
    reference: "A 1/2 Cdra De La Av Los Incas",
    lat: -8.1150950743473,
    lng: -79.023006204424,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Av Hnos Uceda - America Norte",
    address: "Av. Hermanos Uceda Meza N° 269 Urb Miraflores Ii Etapa - trujillo - Trujillo - La Libertad",
    reference: "A Una Cdra. De Av. America Norte. / Entre Av. Miraflores Y Av. Salvador Lara",
    lat: -8.0988234915918,
    lng: -79.02339297055,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Calle Liverpool",
    address: "Calle Liverpool N° 329 / Urb. Santa Isabel - Trujillo",
    reference: "A Una Cuadra Antes De La Iglesia De Mansiche",
    lat: -8.103728,
    lng: -79.042822,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 - 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Calle Santa Cruz - America Sur",
    address: "Calle Santa Cruz n° 389 Chicago - Trujillo - La Libertad",
    reference: "A Media Cdra. De La Av. America Sur/a Media Cuadra Del Estadio Chan Chan.",
    lat: -8.1169719966571,
    lng: -79.017168118756,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Ovalo Papal",
    address: "Urb. Vista Hermosa Mz. F Lt. 11 Piso °1 Trujillo - Trujillo - La Libertad",
    reference: "A Espaldas Del Metro Del Ovalo Papal",
    lat: -8.1196746638327,
    lng: -79.042061399999,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo La Perla",
    address: "Av. La Perla Mz. E Lote 05 Urb. Ingenieria – Trujillo – La Libertad",
    reference: "A 1 Cdra. Del Colegio Bruning",
    lat: -8.1279459649259,
    lng: -79.027663092444,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Trujillo",
    district: "Victor Larco Herrera",
    zone: "Av Larco",
    address: "Av. Larco 865, Trujillo - Trujillo - La Libertad",
    reference: "Mz X Lt 28 Cui San Andres V Etapa Tercer Sector",
    lat: -8.137749685409,
    lng: -79.050334950868,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Viru",
    district: "Chao",
    zone: "Chao",
    address: "Av. Victor Raul Haya De La Torre 575 Chao - Viru",
    reference: "A Media Cdra. De La Comisaría De Chao",
    lat: -8.5379739271001,
    lng: -78.678412960146,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Viru",
    district: "Viru",
    zone: "Puente Viru",
    address: "Panamericana Norte N° 933 Puente Virú - Virú - La Libertad",
    reference: "A Media Cdra. Del Grifo Zona Etna/media Cdra. Del Semaforo Zona Etna",
    lat: -8.4283352899314,
    lng: -78.778388900003,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "La Libertad",
    province: "Viru",
    district: "Viru",
    zone: "Viru Centro",
    address: "Calle Puno N° 125 - Mz. 32 Lt. 7a - Virú - La Libertad",
    reference: "A Media Cdra. Del Cruce De La Av. Viru Con La Calle Jorge Chavez / a Media Cdra. De La Plazuela Maria Parado De Bellido",
    lat: -8.4153338853584,
    lng: -78.75430648376,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Av Las Americas",
    address: "Av. Las Américas Lt. 42 Mz. D, Urb. Monterrico - I Etapa, Chiclayo - Chiclayo - Lambayeque",
    reference: "A Media Cdra. entre La Av. Colectora Y Av. Las Americas Y A Media Cdra. Del Grifo Sr. De Sipán",
    lat: -6.7805011639111,
    lng: -79.852166441757,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Calle Tacna",
    address: "Calle. Tacna n° 1095 -chiclayo- Chiclayo - Lambayeque",
    reference: "Intersección Con Av. Jose Quiñones / A Espaldas Del Supermercado Makro Chiclayo",
    lat: -6.7740292479815,
    lng: -79.833500386476,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Miraflores Chiclayo",
    address: "Av. Panamericana 975 Pp Jj Luis Alberto Sanchez, Chiclayo - Chiclayo - Lambayeque",
    reference: "A Media Cdra. Del Ovalo Señor De Sipan / Al Frente De Derco Center",
    lat: -6.7587235317862,
    lng: -79.862861099996,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chongoyape",
    zone: "Chongoyape",
    address: "Av. Atahualpa N° 1200 - Chongoyape - Chiclayo - Lambayeque",
    reference: "Interseccion Con Calle Iquitos / A 2 Cdras. De La Interseccion Con La Av. Chiclayo",
    lat: -6.6378895883335,
    lng: -79.391862272577,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Jose Leonardo Ortiz",
    zone: "Av Balta Cdra. 36",
    address: "Av. Jose Balta N° 3653 C.p.m. Primero De Mayo Jose Leonardo Ortiz -chiclayo -lambayeque",
    reference: "Entre La Av. Balta Y Néstor Barsallo / a 2 Cuadras De La Av. Chiclayo",
    lat: -6.7475994398994,
    lng: -79.836109469451,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Jose Leonardo Ortiz",
    zone: "Calle Tahuantinsuyo",
    address: "Calle Tahuantinsuyo 995 - Urb. San Lorenzo - Jose Leonardo Ortiz - Chiclayo - Lambayeque",
    reference: "Entre La Cdra. 2 De Av. América Y La Calle Tahuantinsuyo/a Media Cdra. De La Iglesia Los Mormones",
    lat: -6.7606203740115,
    lng: -79.841664422679,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "La Victoria",
    zone: "Av Victor R. Haya Co",
    address: "Av. Víctor Raul Haya De La Torre 2470 La Victoria - Chiclayo",
    reference: "Entre La Via Evitamiento Y Panamericana",
    lat: -6.8003757,
    lng: -79.830527,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Monsefu",
    zone: "Monsefu",
    address: "Av. Venezuela N° 221, Monsefú - Chiclayo - Lambayeque",
    reference: "Ref 01: A Media Cdra. De La Calle Diego Ferre Y A Cdra. Y Media Del Parque Artesanal De Monsefú",
    lat: -6.8800297971621,
    lng: -79.868249329452,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Patapo",
    zone: "Patapo",
    address: "Av. Chongoyape N° S/n Sector Cerro Mirador, Patapo - Chiclayo - Lambayeque",
    reference: "A Una Cdra. Y Media De La Intersección Con Av Trapiche / Al Frente Del Polideportivo Del Cerro Mirador",
    lat: -6.7394168760271,
    lng: -79.637638965613,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Pimentel",
    zone: "Pimentel",
    address: "Calle Juan Velasco Alvarado n.° 472",
    reference: "Intersección Con La Calle Ciro Alegría. A Unas Cdras. Del Centro De Salud Pimentel.",
    lat: -6.8318488760978,
    lng: -79.930162497091,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Pomalca",
    zone: "Pomalca",
    address: "Calle 25 Mz. I Lt. 6 Sect. 6 San Juan, Pomalca - Chiclayo - Lambayeque",
    reference: "A Una Cdra. Y Media De La Intersección Con Av. San Martin/ Al Frente De La Iglesia Mormon",
    lat: -6.7680844845415,
    lng: -79.780749746733,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Reque",
    zone: "Reque",
    address: "Av. Mariscal Ramon Castilla Mz. 4 Lote 14, Reque - Chiclayo - Lambayeque",
    reference: "A Media Cdra. De La Interseccion Con Calle San Martin / A Unos Mtrs De Alborada Eventos Y Recepciones",
    lat: -6.8670559848257,
    lng: -79.816861574083,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Tuman",
    zone: "Tuman",
    address: "Av. Chota N° 288 Sector Acapulco, Tuman - Chiclayo - Lambayeque",
    reference: "Al Costado Del Restaurant Manos Chotanas",
    lat: -6.7435012497878,
    lng: -79.697416401677,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Ferrenafe",
    district: "Ferrenafe",
    zone: "Ferreñafe",
    address: "Av. Andrés A. Cáceres N°550a",
    reference: "Al Costado Del Grifo Primax",
    lat: -6.646179,
    lng: -79.790525,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Jayanca",
    zone: "Jayanca",
    address: "Calle Diego Ferre N°1321 - jayanca - Lambayeque",
    reference: "Al Frente Del Centro De Salud De Jayanca / A Media Cdra. Del Grifo Asia",
    lat: -6.384834348558,
    lng: -79.818776772611,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Lambayeque",
    zone: "Lambayeque Centro",
    address: "Av. Federico Villarreal N° 491, Lambayeque - Lambayeque - Lambayeque",
    reference: "A Media Cdra. De La Interseccion De La av. Federico Villarreal Con Calle Emiliano Niño",
    lat: -6.7051384276932,
    lng: -79.909416873063,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Lambayeque",
    zone: "Lambayeque Panamericana",
    address: "Calle Paraguay Mz. D Lt 2a Unidad Vecinal Indoamérica - lambayeque",
    reference: "Al Costado De La Fábrica De Kinkones Bruning / A 01 Cuadra Del Puente Lambayeque",
    lat: -6.6950640309514,
    lng: -79.903733032828,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM",
      "O1 5007878"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Morrope",
    zone: "Morrope",
    address: "Calle Tahuantinsuyo N° 821, Morrope - Lambayeque",
    reference: "Frente Al Parque Infantil De Morrope",
    lat: -6.543444405424585,
    lng: -80.01232827124002,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Motupe",
    zone: "Motupe",
    address: "Av. El Maestro N° 447 - Motupe - Lambayeque- Lambayeque",
    reference: "En La Carretera Fernando Belaunde Terry (panamericana Norte) / Al Frente Del Grifo Ava",
    lat: -6.1564451082616,
    lng: -79.704861209008,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Olmos",
    zone: "Olmos",
    address: "Av. Augusto B. Leguía Mz. 87 Lt. 32 - olmos - Lambayeque",
    reference: "Al Frente De La Comisaria De Olmos.",
    lat: -5.9871924350643,
    lng: -79.743017122659,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Tucume",
    zone: "Tucume",
    address: "Calle Federico Villarreal Nro. 1157",
    reference: "Frente Al Molino Santamaría",
    lat: -6.5039437295491,
    lng: -79.858972889844,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Barranca",
    district: "Barranca",
    zone: "Barranca",
    address: "Jr. Andres Reyes Buitron 416. Barranca - Barranca – Lima",
    reference: "A 2 Cdrs. Del Parque El Olvivar / A Mtrs. De La Casa Del Maestro",
    lat: -10.752972858777678,
    lng: -77.75544507054775,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Barranca",
    district: "Paramonga",
    zone: "Paramonga",
    address: "Av. Central N° 305 Mz. N1 Lt. 17",
    reference: "Urb. Miguel Grau",
    lat: -10.673598,
    lng: -77.815645,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Barranca",
    district: "Supe",
    zone: "Supe",
    address: "Av. Francisco Vidal 1120, Supe - Barranca - Lima",
    reference: "Al Costado De Lubricentro Ciriaco Y Media Cdra. De La Cruz Misionera",
    lat: -10.797690682632263,
    lng: -77.7110626706071,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Cañete",
    district: "Chilca",
    zone: "Ant Panam Sur Cdra 11",
    address: "Antigua Panamericana Sur Cdra. 11 Mz. 46, Lt. 08. Chilca - Cañete - Lima",
    reference: "A Media Cdra. Del Hotel El Pacífico",
    lat: -12.519499635745452,
    lng: -76.73222309911321,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Cañete",
    district: "Imperial",
    zone: "Cañete Imperial",
    address: "Jr. Augusto B. Leguía N.º 457, Mz E, Centro Poblado Imperial, Imperial - Cañete - Lima",
    reference: "Cevichería Brisas Del mar",
    lat: -13.059358624396962,
    lng: -76.35372113923681,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Cañete",
    district: "Mala",
    zone: "Mala",
    address: "Av. Marchand # 250, Distrito De Mala",
    reference: "A Unas Casas Frente A La Distribuidora Primax Gas",
    lat: -12.6571028,
    lng: -76.6366831,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Cañete",
    district: "Nuevo Imperial",
    zone: "Nuevo Imperial Co",
    address: "Fundo Santa Adela, Mz. A, Lotes 8 Y 9 – Carretera Cañete A Yauyos Nuevo Imperial - Cañete - Lima",
    reference: "Al Costado Del Restaurant la Ruta Brava",
    lat: -13.071831653175837,
    lng: -76.33534999999453,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Cañete",
    district: "San Vicente De Canet",
    zone: "Cañete San Vicente",
    address: "Aa.hh. Víctor Andrés Belaunde Mz. B Lt. 12, San Vicente De Cañete - Cañete - Lima",
    reference: "",
    lat: -13.076518251018443,
    lng: -76.39128869885437,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Huaral",
    district: "Chancay",
    zone: "Chancay",
    address: "Prolongación San Martín N°403 Chancay -",
    reference: "A Una Cdra. De La Av. Panamericana Norte",
    lat: -11.5643122,
    lng: -77.2673802,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Huaral",
    district: "Huaral",
    zone: "Huaral",
    address: "Habilitación Urbana Fundo Esquivel P-21, Mz. C, Lt. 5, 6, 8 Y 9 De La Urb. Resid. El Olivar, Con Int. En Av. Chancay",
    reference: "A 1 M. Del Estadio Unión Huaral, A 3 Cdras. De Los 3 Arcos Ingreso A huaral",
    lat: -11.500890214183,
    lng: -77.221888900027,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Huarochiri",
    district: "San Antonio",
    zone: "Jicamarca",
    address: "Av. Sinchi Roca Mz. P Lt. 16a P Lote 16a, Aahh Las Praderas De Jicamarca – Sector El Cercado – Anexo 22 Jicamarca – Huarochiri",
    reference: "Cerca Al Arco Porton De Jicamarca",
    lat: -11.931112343934627,
    lng: -76.96588399999963,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Huaura",
    district: "Huacho",
    zone: "Huacho Av Indacochea",
    address: "Av. Mercedes Indacochea 1276 Huacho - Huaura - Lima",
    reference: "Intersección Con Pedro Ruiz Gallo, A 2 Cdras. De La Universidad Nacional José Faustino Sánchez Carrión",
    lat: -11.1185268130511,
    lng: -77.6103892352451,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Huaura",
    district: "Huacho",
    zone: "Salaverry Huacho Co",
    address: "Prolongación Salaverry N° 764 Huacho -",
    reference: "Cruce Con La Av La Paz",
    lat: -11.1094203,
    lng: -77.5991073,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Huaura",
    district: "Huaura",
    zone: "Huaura",
    address: "Av. Las Malvinas Mz. C Lote 16 Urb. El Rosario Sur Huaura",
    reference: "A Espaldas De La Plaza De Armas, A 1 Cdra. De La Calle Los Alamos",
    lat: -11.0713592723957,
    lng: -77.5999746859657,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Huaura",
    district: "Sayan",
    zone: "Sayan",
    address: "Calle Naranjo N° 211.sayan - Huaura - Lima",
    reference: "A Media Cdra. De La Plaza De Armas Y De La Municipalidad",
    lat: -11.135195879940518,
    lng: -77.19272381237359,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ancon",
    zone: "Ancon",
    address: "Carretera Serpentín De Pasamayo mz. G Lt. 3 Sublt. B - Asoc. De Prop. Casa Huerta Ind. Pecuarias San Pedro Zona 4, Ancón - Lima-lima",
    reference: "A 1 Cdra. Del Ovalo De Ancón",
    lat: -11.774039837812818,
    lng: -77.16181025497632,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Av El Sol",
    address: "Av. El Sol Mz. S Lt. 2 Zona 03 - Asoc. Parque Industrial El Asesor, Sector 010 Zona 03 - Ate",
    reference: "A Una Cuadra Y Media De La Carretera Central",
    lat: -12.038365169091593,
    lng: -76.93396781379997,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Av Esperanza",
    address: "Av. Esperanza Mz. K Lt. 06 Las Americas - Ate Vitarte - Lima",
    reference: "Pasando Mercado Raucana",
    lat: -12.031974898143,
    lng: -76.904894767678,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Av Marco Puente",
    address: "Av. Marco Puente Llanos 309, Mz. A, Lt. 03",
    reference: "",
    lat: -12.032176320939,
    lng: -76.921789902195,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Huaycan Av Horacio Zevallos",
    address: "Av. Horacio Zeballos Mz. V Lt. 12 Prog. Viv. Residencial Pariachi (sec. 031) Zona 5, Ate - Lima - Lima",
    reference: "Frente Al Circuito De Manejo Garcilaso De La Vega",
    lat: -12.007693484031522,
    lng: -76.8424867018833,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Huaycan Av Jose C Mariategui",
    address: "Av. José Carlos Mariátegui Z. E Lt. 23 Ucv 5 (zona Comercio) - Pueblo Joven \"proyecto Especial Huaycán\" Ate Vitarte - Lima",
    reference: "A Dos Cdras. Del Cruce Con Av. 15 De Julio",
    lat: -12.014821320970137,
    lng: -76.82313108705995,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Huaycan El Descanso",
    address: "Av. Jose Carlos Mariategui Mza. B Lte 06, Residencial Pariachi Sec. 031 Zon. 05, Ate - Lima - Lima",
    reference: "Cruce Con La Av. Los Incas",
    lat: -12.004388120507466,
    lng: -76.83611140249312,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Huaycan Entrada",
    address: "Ctra. Central Km. 17.5 mz. I Lt. 1 Praderas De Pariachi",
    reference: "Misma Ctra. Central A Una Cdra. Del Paradero El Lavadero Y Dos Cdras. Del Grifo El Negro",
    lat: -11.997750000001,
    lng: -76.836000000002,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Los Sauces",
    address: "Av. Santa Rosa N°773 Manzana “a” Lote 6 Urb Los Sauces - Ate -",
    reference: "Cruce Con La Av Separadora Industrial",
    lat: -12.0709298,
    lng: -76.9809503,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Puente Santa Anita",
    address: "Av. Nicolás Ayllón N° 3080 - Ate Vitarte",
    reference: "",
    lat: -12.057126998901367,
    lng: -76.96934509277344,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Santa Clara",
    address: "Av. Pedro Ruíz Gallo Mz. H Lt. 3. Asoc. Viv. Villa San Luis, Santa Clara - Ate Vitarte - Limaref: Entre El Real Plaza Y La Utp Santa Clara",
    reference: "",
    lat: -12.013911972067,
    lng: -76.884198929523,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Ate-vitarte",
    zone: "Urb Santa Elvira",
    address: "Av. Ferrocarril Mz. C Lt. 19 Parcela 3, Urb. Santa Elvira Sec. 018 zona 3",
    reference: "a Media Cdra. Del Cruce Con Av. De La Cultura",
    lat: -12.028531299993436,
    lng: -76.950749770605,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Brena",
    zone: "Av Venezuela",
    address: "Av. Venezuela 1670 - Breña",
    reference: "Al Costado Del Policlínico De Breña",
    lat: -12.055384807466,
    lng: -77.055713323752,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Brena",
    zone: "Jr. Huaraz - Breña",
    address: "Jr. Huaraz 1633, Breña -lima",
    reference: "En Medio Del Cruce De Jr. Gral Orbegoso Y Jr. Centenario Con Jr. Huaraz",
    lat: -12.065815746489534,
    lng: -77.04986305455087,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Av Jose Saco Rojas",
    address: "Av. José Saco Rojas Mz. A Lt. 15 Programa De Vivienda El Pino, San Antonio - Carabayllo",
    reference: "Frente Al Chifa Hong Fu Y A 3 Cuadras Del Gran Mercado El Pino",
    lat: -11.858131810981817,
    lng: -77.04414250346564,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Av Tupac Amaru Km. 19",
    address: "Jr. Los Sauces Mz. E Lote 9 Del Aa. Hh. Villa Manuel Escorza",
    reference: "Entre Prolongacion Av. Primavera Y Jr. Los Sauces Altura De Av. Tupac Amaru Km. 19",
    lat: -11.880455724702,
    lng: -77.021657153123,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Av. Tupac Amaru Km. 23.5",
    address: "Av. Túpac Amaru Km. 23.5 - Carabayllo",
    reference: "Frente A La Iglesia De Mormones - A Una Cdra. Del Último Paradero Del Rápido",
    lat: -11.844310757655741,
    lng: -77.00039932685678,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Carabayllo Establo",
    address: "Av. Tupac Amaru N? 441 - 443, Mz. O2 Lt. 35",
    reference: "Paradero Establo, A Una Cuadra De La Urb. Santa Isabel",
    lat: -11.9035821,
    lng: -77.0309854,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "El Progreso Km 22",
    address: "Av. Tupac Amaru 3493 – P.j. El Progreso (parte Baja) Mz. K Lt. 11b Zona Ii, carabayllo - Lima",
    reference: "A Una Cdra. Del Cruce Con La Av. Manuel Prado",
    lat: -11.872316361141715,
    lng: -77.01521214760115,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Santo Domingo",
    address: "Av. A Mz. l2 Lt. 20 Urb. Santo domingo – vi etapa Carabayllo - Lima",
    reference: "En El Cruce De Las Av. Chillon Trapiche Y av. Camino Real",
    lat: -11.873004724827046,
    lng: -77.0290837822141,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Tungasuca",
    address: "Av. Trapiche Mz. P Lt. 48, Urb. Tungasuca",
    reference: "Aux. Av. Chimpu Ocllo Con Aux. Chillón Trapiche, A 1 Cuadra Del Mercado Qatuna",
    lat: -11.891425542922,
    lng: -77.044425516811,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Cercado Lima",
    zone: "Av Nicolas Dueñas Cdra. 5",
    address: "Av. Nicolas Dueñas 584 Mz. C Lt. 4 – Aahh Primero De Setiembre, Cercado De Lima – Lima - Lima",
    reference: "A Media Cdra. Del Cruce Con Jr. Pedro Garezon",
    lat: -12.041685469771842,
    lng: -77.06569704398638,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Cercado Lima",
    zone: "Lima Av Tingo María",
    address: "Av. Tingo María N°1252-a - Cercado De Lima - Lima",
    reference: "A Media Cdra. Del Cruce Con Jr. Gral. Orbegoso",
    lat: -12.0606406907256,
    lng: -77.0589838666984,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Cercado Lima",
    zone: "Malvinas - Jr. Garcia Villón",
    address: "Jr. Presbítero García Villon Nro. 560 Cercado Lima - Lima",
    reference: "A La Altura De La Cdra. 5 De Av. Oscar R. Benavides (ex Av. Colonial), En Medio De Las Av. Guillermo Dansey Y Av. Oscar R. Benavides",
    lat: -12.04638719585,
    lng: -77.049473000003,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Cercado Lima",
    zone: "Malvinas - Jr. Ricardo Treneman",
    address: "Jr. Ricardo Treneman N° 920",
    reference: "Dentro Del Local Farenet",
    lat: -12.046751,
    lng: -77.054634,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Chorrillos",
    zone: "Chorrillos Co",
    address: "Av. Santa Anita N.° 580, Chorrillos - Lima",
    reference: "Al Costado Del Mercado Santa Anita, Cruce Con San Genaro",
    lat: -12.19049228146922,
    lng: -77.01532743242808,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Chorrillos",
    zone: "Chorrillos Los Faisanes",
    address: "Av. Los Faisanes 420",
    reference: "Al Costado De La Tienda John Holden",
    lat: -12.176072,
    lng: -76.998107,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Chorrillos",
    zone: "Las Delicias De Villa",
    address: "Av. 12 De Octubre Mz. A - 03, Lt. 02, Urb. Aria - Las Delicias De Villa",
    reference: "A Dos Cuadras De La Av. Defensores Del Morro (ex Av. Huaylas)",
    lat: -12.195888810911,
    lng: -76.998027663434,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Cieneguilla",
    zone: "Cieneguilla Km. 14.5",
    address: "Av. Arterial Huarochiri d Mz. B Lt. 19, Asoc. De Viviendas Las Cumbres De Cieneguilla, Lima",
    reference: "Al Costado De La Tienda Mass",
    lat: -12.089303982280754,
    lng: -76.85365371221069,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Año Nuevo",
    address: "Av. Tupac Amaru N° 7837- 7839 Mz. C Lt. 010 Urb. Popular San Juan bautista I Etapa, Comas - Lima",
    reference: "A Una Cdra. De La Entrada De Collique",
    lat: -11.915107566733,
    lng: -77.040662268934,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Av Tupac Amaru Cdra. 57",
    address: "Av. Tupac Amaru 5725-5727 - Urb. huaquillay I Etapa, comas - Lima - Lima",
    reference: "A Media Cdra. Del Banco De La Nación",
    lat: -11.945312645665,
    lng: -77.050549078246,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Av Univ. Retablo",
    address: "Av. Universitaria N° 7241",
    reference: "Ex Boulevard De Retablo / A 2 Cdras Del Metro De Belaunde",
    lat: -11.937314524134514,
    lng: -77.05809407916101,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Av. Trapiche",
    address: "Av. Trapiche 886 A 16 2p 2 - Urb. Pinar",
    reference: "Frente Al Complejo Deportivo Walon",
    lat: -11.91918929266535,
    lng: -77.06050258466907,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Av. Univ. Parque Sinchi Roca",
    address: "Av. Universitaria Norte Mzn. Q1 Lte. 030 Urb. Primavera,comas-lima - Lima",
    reference: "A Media Cdra. Del Ingreso Al Parque Zona Sinchi Roca",
    lat: -11.919995063846647,
    lng: -77.05093521974257,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Urb. Repartición",
    address: "Av. Tupac Amaru 3184 Urb. Reparticion, Comas - Lima - Lima",
    reference: "A Media Cdra. De Av. Victor Andres Belaunde Y/o Frente A Dollarcity",
    lat: -11.939410443955,
    lng: -77.0500541,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "El Agustino",
    zone: "Jiron Ancash",
    address: "Jr. Ancash Mz. B Lt. 11 Aahh Ancieta Alta, El Agustino - Lima - Lima",
    reference: "frente Al Ingreso De Agustino Plaza",
    lat: -12.041365477648608,
    lng: -77.00264283281007,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "El Agustino",
    zone: "Puente Nuevo",
    address: "Av 1° De Mayo 3071 - Urb Huancayo",
    reference: "Frente Al Grifo Repsol",
    lat: -12.0300919,
    lng: -76.9991156,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Independencia",
    zone: "Calle A Con Av Industrial",
    address: "Calle A, Mz. D Lt. 26 Urbanización Panamericana (primer Piso) Independencia - Lima - Lima",
    reference: "A 1 Cdra. Del Cruce Con Av. Industrial (lateral De Megaplaza)",
    lat: -11.992650999981887,
    lng: -77.06030747047947,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Independencia",
    zone: "La Cincuenta",
    address: "Av. Tupac Amaru N° 4708 - 4710",
    reference: "A Una Cdra. Del Paradero Estación Naranjal",
    lat: -11.978882502306,
    lng: -77.059104431032,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Independencia",
    zone: "Plaza Norte Entregas",
    address: "Av. Gerardo Unger Nro. 6917 Int. Lb 19",
    reference: "",
    lat: -12.004946,
    lng: -77.055867,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Independencia",
    zone: "Plaza Norte S. Express",
    address: "Av. Gerardo Unger Nro. 6917 Int. Lb 19",
    reference: "",
    lat: -12.004946,
    lng: -77.055867,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Jesus Maria",
    zone: "Jesus Maria",
    address: "Av. Mariscal Luzuriaga 584-586 Jesús María - Lima",
    reference: "A Cuadra Y Media Del Parque San José, Paralelo A La Av. Mello Franco",
    lat: -12.076277049292106,
    lng: -77.0481659884218,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Av Alameda Del Corregidor",
    address: "Av. Alameda Del Corregidor Mz. U Lt. 19 Ui 1 - Urb La Capilla, La Molina - Lima - Lima",
    reference: "A 2 Cdras. Del Cruce Con Alameda De Los Cóndores",
    lat: -12.105549936759,
    lng: -76.946964207289,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Av Flora Tristan",
    address: "Av. Flora Tristán N° 885, urb. Santa Patricia Iii Etapa, La Molina - Lima",
    reference: "a Media Cdra. De Molisalud",
    lat: -12.064156609712583,
    lng: -76.9455208508212,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Av La Fontana",
    address: "Av La Fontana 440 - La Molina (cc La Rotonda Ii Local 1018)",
    reference: "",
    lat: -12.072691,
    lng: -76.9548488,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Av. La Molina Cdra. 35",
    address: "Av. La Molina (exav. La Universidad) #3551 Tda -7 Mz. H Sublote 1c, Urb. El Sol De La Molina I Etapa La Molina - Lima",
    reference: "A Media Cdra. Del Cruce Con Av. El Sol",
    lat: -12.085763100386,
    lng: -76.913409441937,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Los Fresnos",
    address: "Av. Los Fresnos 1305 Tienda 2 - Urb. Portada Del Sol I Etapa - La Molina - Lima",
    reference: "A 3 Cdras. Del Óvalo De Los Cóndores",
    lat: -12.104084611289,
    lng: -76.9414167,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Av Mexico Co",
    address: "Av. Mexico 1125, La Victoria - Lima",
    reference: "",
    lat: -12.073430785867,
    lng: -77.01758370586,
    type: "Terminal",
    hours: [
      "RECEPCIÓN DE ENVÍOS:",
      "LUNES A SÁBADOS",
      "08:00 AM A 09:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM",
      "ENTREGA DE ENVÍOS:",
      "LUNES A SÁBADO DE 8:00 AM A 9:00 PM",
      "DOMINGOS DE 8:00 AM A 5:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Av. Canada",
    address: "Av. Canadá 1603",
    reference: "Entre Av. Canadá Con Av. Aviación",
    lat: -12.0840074,
    lng: -77.0058111,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Jr. Luna Pizarro",
    address: "Jr. Luna Pizarro N° 701 - La Victoria",
    reference: "Esquina Hipólito Unanue",
    lat: -12.0670586,
    lng: -77.0273264,
    type: "Solo Envíos",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Jr. Raymondi",
    address: "Jr. Antonio Raymondi Nro. 113",
    reference: "",
    lat: -12.061097830007334,
    lng: -77.0344310742025,
    type: "Terminal",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "015007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Lince",
    zone: "Av Jose Leal Cdra 6",
    address: "Av. Coronel José Leal 648, Urb. Fundo Lobatón, Lince - Lince",
    reference: "Paralela A La Cdra. 6 De La Av. Canevaro",
    lat: -12.085366655704,
    lng: -77.040226370395,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Lince",
    zone: "Jr Casanova Con Petit Thouars",
    address: "Jr. domingo casanova N°318 Lince - Lima",
    reference: "Cruce Con Petit Thouars",
    lat: -12.089639700017,
    lng: -77.032406270598,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Av Huandoy Con Av Central",
    address: "Av. Huandoy Mza. 72 Lte. 54 P.j. P.m.v. “confraternidad” - Aahh. Enrique Milla Ochoa Los Olivos - Lima",
    reference: "A Una Cdra. Del Cruce Con Av. Central",
    lat: -11.957822256001,
    lng: -77.075944870551,
    type: "Pequeña",
    hours: [
      "LUNES A VIERNES",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Av Huandoy Con Marañon",
    address: "Av. Próceres, Mz. 3, Lt. 23 A.h. Laura Caller - Los Olivos",
    reference: "Cruce Entre Av. Huandoy Y Marañón",
    lat: -11.970678,
    lng: -77.080356,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Av. Angelica Gamarra",
    address: "Av. Angelica Gamarra De Leon Valverde N° 621 Urb El Trebol, Los Olivos - Lima",
    reference: "A La Altura Del Kfc / Cruce Con Av. Alfa",
    lat: -12.00564059430335,
    lng: -77.06833392202753,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Av. Carlos Izaguirre Cdra. 14",
    address: "Calle David Alva Manzana H Lote 4 Urb. Cajabamba Los Olivos - Lima",
    reference: "Entre La Av. Carlos Izaguirre Con La Av. Universitaria (frente Al Colegio Pamer)",
    lat: -11.991719564563,
    lng: -77.080444406224,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Av. Dos De Octubre",
    address: "Av. 2 De Octubre Mz. H Lt. 2 - Los Olivos - Pro",
    reference: "Av. 2 De Octubre Con Av. Canta Callao, Al Costado Del Centro De Salud Pro",
    lat: -11.95057177592816,
    lng: -77.08493089999897,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Av. Las Palmeras",
    address: "Av. Las Palmeras N° 5236 Urb. Villa Norte - Los Olivos",
    reference: "",
    lat: -11.975852939682618,
    lng: -77.07207437848116,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Av. Los Platinos",
    address: "Av. Los Platinos N°. 259, Mz. A - Lt. 17, Urb. Lotización Industrial Infantas Los Olivos - Lima",
    reference: "A Dos Cdras. Y Media De La Av. Alfredo Mendiola Y/o Panamericana Norte (altura Del Paradero Caseta)",
    lat: -11.970038188057043,
    lng: -77.06456792944489,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Pro",
    address: "Av. Los Próceres Mz. Pp2 Lt.21, Urb. Puertas De Pro - Los Olivos",
    reference: "",
    lat: -11.9450493,
    lng: -77.0775764,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Segunda De Pro",
    address: "Av. Alfredo Mendiola 8161 Urb. Pro, Los Olivos - Lima - Lima",
    reference: "A Una Cdra. Del Colegio José maría Arguedas",
    lat: -11.933223203028,
    lng: -77.073028216717,
    type: "Terminal",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Lurigancho",
    zone: "Chosica",
    address: "El Sol 124 (parque Echenique) Lurigancho - Chosica",
    reference: "",
    lat: -11.933529281206,
    lng: -76.693335095276,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Lurigancho",
    zone: "Santa María De Huachipa",
    address: "Av. Circunvalación Mz. A Lt. 1 - D C - P Santa María De Huachipa - Lurigancho - Chosica",
    reference: "Entre La Av. Circunvalación Y La Av. Huachipa",
    lat: -12.016439072071643,
    lng: -76.91240974118337,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Lurin",
    zone: "Nuevo Lurin",
    address: "Av. Antigua Panamericana Sur Km 37 Mz C Lt 17 - Fundo Las Salinas -",
    reference: "A Cuadra Y Media Del Mercado Virgen De Las Mercedes.",
    lat: -12.2819873,
    lng: -76.8658386,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Lurin",
    zone: "Puente Lurin",
    address: "Antigua Panamericana Sur, lote 2, Mz. B, Primer Piso Lurín - Lima",
    reference: "A Cdra. Y Media Del Cruce Con Av. Santa Cruz",
    lat: -12.25508377880026,
    lng: -76.89009010408147,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Magdalena Del Mar",
    zone: "Magdalena Del Mar",
    address: "Jr. Ayacucho N° 756",
    reference: "A Una Cdra. Del Mercado Modelo De Magdalesy A 3 Cdras. De La Iglesia Cúpula De Sucre",
    lat: -12.086209998878,
    lng: -77.071422971786,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Pachacamac",
    zone: "Av Manuel Valle",
    address: "Av. Manuel Valle Sub - Lote 2 - 1, Número De Parcela J, Proyecto Huertos De Pachacamac, Valle Lurín - Pachacamac - Lima",
    reference: "Frente Al Estudio De Canal 4 (america Televisión)",
    lat: -12.232514555328416,
    lng: -76.86432399999713,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Pachacamac",
    zone: "El Retamal",
    address: "Av. Victor Malasquez Mz. B Lt. 16 – Asociación De Vivienda “el Sol De San Fernando” Zona 5 – Quebrada De Manchay",
    reference: "A 2 cdras. Del Cruce Con Av. Unión",
    lat: -12.147095887089,
    lng: -76.871512513949,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Pachacamac",
    zone: "La Curva De Manchay",
    address: "Av. Prolongación De La Av. La Molina Mz. E Lote 21. Ah Paul Poblet Lind, Pachacamac - Lima",
    reference: "A Media Cdra. De Mi Banco",
    lat: -12.084751211026502,
    lng: -76.8761664787276,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Pachacamac",
    zone: "Manchay Tres Marias",
    address: "Av. Victor Malasquez mz. B11 Sub-lote 06-a - aahh Centro Poblado Rural Los Huertos De Manchay Sector B Pachacamac - Lima",
    reference: "A Media Cdra. Del Paradero",
    lat: -12.114362937395487,
    lng: -76.87350734288519,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Pueblo Libre",
    zone: "Av Bolivar",
    address: "Av. Bolivar 1097, Pueblo Libre - Lima",
    reference: "A Media Cdra. Del Cruce av. Gral. José maría Egusquiza",
    lat: -12.072414855721524,
    lng: -77.06500307055026,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Pueblo Libre",
    zone: "Av. La Marina",
    address: "Av. La Marina 1640 -",
    reference: "A Una Cuadra Del Centro Comercial Plaza San Miguel",
    lat: -12.0775694,
    lng: -77.0799465,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Av Buenos Aires",
    address: "Av. Buenos Aires Mz. D, Sub-lote 188e1 Asociación De Pobladoresmicaela Bastidas, Puente Piedra - Lima - Lima",
    reference: "A 2 Cdras. De La Demuna De Puente Piedra",
    lat: -11.8466089579004,
    lng: -77.0980102328854,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Av. San Lorenzo",
    address: "Av. San Lorenzo mz C Lt 20 - adp Virgen De Copacabana, Puente Piedra - Lima",
    reference: ", A Media Cuadra Del Parque Virgen De Copacabana",
    lat: -11.856723599999995,
    lng: -77.06764117055229,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Ovalo Puente Piedra",
    address: "Av. Miguel Grauâ mz. A Lt. 07 Y 08 Urb. San Martin De Porres, Cercado Puente Piedra - Lima",
    reference: "Espaldas De Tottus De Puente Piedra",
    lat: -11.8690911986368,
    lng: -77.0736756180273,
    type: "Pequeña",
    hours: [
      "LUNES A VIERNES",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Puente Arica",
    address: "Panamericana Norte Km 32.5 , A 1/2 Cuadra Del Puente Arica - Al Costado Del Grifo Repsol",
    reference: "",
    lat: -11.8531295,
    lng: -77.088719,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Zapallal",
    address: "Av. Ancón 678",
    reference: "A La Espalda Del Precio Uno De Fundicion",
    lat: -11.830750370122983,
    lng: -77.11410941944563,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Punta Hermosa",
    zone: "Punta Hermosa",
    address: "Av. Garcia Rada Mz.b Lt.04, Aahh Asociacion De vivienda Y Desarrollo Integral Nueva Generacion, Punta hermosa - Lima",
    reference: "A Una Cdra. Del Paradero Peatonal De Punta Hermosa",
    lat: -12.328301119458041,
    lng: -76.82488673250228,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Rimac",
    zone: "Rimac Av. Amancaes",
    address: "Av. Amancaes Nro. 644 Urb. Ciudad Y Campo - Rimac",
    reference: "",
    lat: -12.0220967,
    lng: -77.0306918,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Rimac",
    zone: "Rimac Guardia Republicana Cdra. 9",
    address: "Sección Inmobiliaria N°2 – Primer Piso Lt. 11 De La Mz. 2, Urb. Villacampa Rimac",
    reference: "A Una Cdra. Del Cruce Con Av. Felipe Arancibia",
    lat: -12.029694115562732,
    lng: -77.03647277723022,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Borja",
    zone: "Av. Angamos",
    address: "Av. Angamos Este 2521 (ex Av. Primavera) - Conjunto Habitacional Limatambo - San Borja",
    reference: "Cerca Al Cruce De Av. Angamos Este Con Av. Principal",
    lat: -12.111695444371,
    lng: -77.004615170566,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Borja",
    zone: "Aviacion 2819",
    address: "Av. Aviación 2819, Urb. San Borja Sur",
    reference: "Al Frente De Bembos",
    lat: -12.0966861,
    lng: -77.0021534,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Av Central Sjl",
    address: "Av. Central Mz R9 Lote 3 Programa Ciudad Mrcal. Caceres, Sector Ii, Barrio 3, Grupo Residencial R - San Juan De Lurigancho",
    reference: "En Medio Del Cruce Con Las Av. El Muro Y Ampliacion Este",
    lat: -11.948238651609,
    lng: -76.97919847596,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Av Circunvalacion Sjl",
    address: "Av. Circunvalación mz. B-5 Lt. 20 Aa. Hh. sargento Fernando Lores Tenazoa Comuna 20, san Juan De Lurigancho - Lima",
    reference: "A Dos Cdras. Del Colegio Ramiro Priale",
    lat: -11.97117157272077,
    lng: -76.9893916747466,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Av Malecon Checa Cdra. 1",
    address: "Av. Malecón Miguel Checa Eguiguren N° 167 Y 169 De La Urb. Zárate, Sjl - Lima",
    reference: "Esquina Con Av. Gran Chimú",
    lat: -12.03068626503971,
    lng: -77.01069288124661,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Av Santa Rosa Urb Los Alamos",
    address: "Av. Santa Rosa Mz. D1 Lote 1 Urb. Los Alamos 2da Etapa -",
    reference: "Altura De La Cuadra 13 Del Paradero Canto Grande",
    lat: -11.965189930601,
    lng: -76.997693918962,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Av. 13 De Enero",
    address: "Av. 13 De Enero Nº2057, Urb. San Hilarión",
    reference: "Cerca A La Estación Los Postes",
    lat: -11.997585,
    lng: -77.005279,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Av. Del Mercado",
    address: "Programa Ciudad Mrcal. Caceres, Sector Iii Mz. Q8 Lt. 11 San Juan De Lurigancho - Lima",
    reference: "A Media Cdra. Del Cruce De Av. Del Mercado Con Av. Ampliacion Oeste",
    lat: -11.93887049947234,
    lng: -76.9899343671839,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Av. Santa Rosa Cruce Av. El Sol",
    address: "Av. Santa Rosa De Lima Mz. D Lt. 4 - Aahh 2 De Setiembre - San Juan De Lurigancho",
    reference: "A Tres Cdras. Del Cruce Con Av. El Sol",
    lat: -11.98966604407686,
    lng: -76.99894440000024,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Bayovar",
    address: "Av. Fernando Wiesse Mz. E8. Lote 38b, Mariscal Cáceres Bayovar - San Juan De Lurigancho - Lima",
    reference: "Auxiliar Próceres De La Independencia, Al Frente De La Universidad San Marcos – Agroindustrial",
    lat: -11.952649328006302,
    lng: -76.9868396646944,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Campoy",
    address: "Av. Malecón Checa Mz. B Lt. 7, Urb. Campoy, San Juan De Lurigancho",
    reference: "A 1 Cdra. Del Cruce De Av. Malecón Checa Con Av. San Martín",
    lat: -12.024684940555957,
    lng: -76.96870763756485,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Canto Grande",
    address: "Calle San Martin Con Av. Comercial Norte 189 - San Juan De Lurigancho",
    reference: "A 1/2 Cuadra De La Av 6 De Canto Grande - Al Costado Del Play Park (parque Bolognesi)",
    lat: -11.973898198595233,
    lng: -77.00615208127309,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Cruz de Motupe",
    address: "Av. Fernando Wiesse Mz. Q Lote 1 Aa.hh. Cruz De Motupe",
    reference: "",
    lat: -11.938267731665,
    lng: -76.975696450097,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Jr Chinchaysuyo Cdra 4",
    address: "Jr. Chinchaysuyo 468 Zarate, San Juan De Lurigancho - Lima",
    reference: "A 1 Cdra. De Tiendas 3 A",
    lat: -12.023579,
    lng: -77.000722,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Los Pinos",
    address: "Mz. B1 Lt. 25 Urbanización Los Pinos San Juan De Lurigancho",
    reference: "Av. Fernando Wiesse - Cerca A La Estación San Martín",
    lat: -11.973859486208,
    lng: -76.999139704875,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Sjl- Las Flores",
    address: "Av. Canto Grande N°. 2570 - Urb. Ganimedes",
    reference: "A 3 Cdras. De Plaza Vea",
    lat: -11.986444455930926,
    lng: -77.01549062944763,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Lurigancho",
    zone: "Sjl-av.proceres",
    address: "Av. Próceres De La Independencia Nro. 1295 - 1299",
    reference: "Al Costado Del Banco De La Nación De Av. Los Tusilagos Oeste",
    lat: -12.012724544095,
    lng: -77.002363933588,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Miraflores",
    zone: "Atocongo",
    address: "Av. De Los Héroes N° 228 - San Juan De Miraflores - (estación Atocongo)",
    reference: "",
    lat: -12.1518357,
    lng: -76.9781867,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Miraflores",
    zone: "Av Los Precursores / Las Americas",
    address: "Av. Los Precursores Mz. B Lt. 17 Aa.hh El Inti, San Juan De Miraflores - Lima - Lima",
    reference: "A 1 Cdra. Del Cruce Con Av. Los Próceres",
    lat: -12.187290105723,
    lng: -76.981656592911,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Miraflores",
    zone: "Av Miguel Grau Pamplona Alta",
    address: "Av. Almirante Miguel Grau Mz. Y3 Lt. 29,pamplona Alta - San Juan De Miraflores - Lima",
    reference: "A Media Cdra. Del Mercado Ollantay Pamplonaalta",
    lat: -12.1367497811897,
    lng: -76.9658882149969,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Miraflores",
    zone: "Av San Juan Pamplona Alta",
    address: "Av. San Juan Mz. 24 Lt. 1, Sect. Nuevo Horizonte, Pp. Jj Pamplona Alta - San Juan De Miraflores",
    reference: "A 3 Cdras. Del Cruce Con Av. Salvador Allende",
    lat: -12.1462220555428,
    lng: -76.9669646,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Miraflores",
    zone: "Av. Canevaro",
    address: "Av. Canevaro 336 - A",
    reference: "A 2 Cuadras De La Av. Vargas Machuga Y A Una Cuadra De La Fiscalía Provincial Penal De S.j.m.",
    lat: -12.166336290865159,
    lng: -76.9690565560943,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Juan De Miraflores",
    zone: "Maria Auxiliadora",
    address: "Av. Los Héroes 1140 - Sjm",
    reference: "Una Cdra. Antes Del Hospital María Auxiliadora",
    lat: -12.158926,
    lng: -76.960685,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av Central Smp",
    address: "Av. Central Mz. A Lt. 07, Urb. Programa De Vivienda Lucerito De Naranjal, San Martín De Porres - Lima - Lima",
    reference: "A 5 Cdras. Del Cruce Con Av. Tantamayo",
    lat: -11.959972288593,
    lng: -77.091252270512,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av Jose Granda Cdra 38",
    address: "Av. José Granda 3826 De La Urb. Condevilla Señor Y Valdivieso Mz. M7 Lt 20, 2 Etapa, 2 Sector - S.m.p.",
    reference: "Entre Av. Condevilla Y Av. Los Próceres",
    lat: -12.020561244152566,
    lng: -77.08705644110377,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av Jose Granda Cdra. 25",
    address: "Av. Jose Granda 2546 - San Martin De Porres -lima - Lima",
    reference: "A Una Cdra. Del Óvalo Jose Granda Y Av. Universitaria",
    lat: -12.026653935000597,
    lng: -77.07307865890112,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av Universitaria Con Izaguirre",
    address: "Av. Universitaria mz. D Lt. 01 asociación De Vivienda San Juan De dios, San Martín De Porres - Lima - Lima",
    reference: "a 1 cdra. Del Cruce Con Av. Carlos Izaguirre",
    lat: -11.993691495867,
    lng: -77.08386534618,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av. Canta Callao Con Alisos",
    address: "Av. Canta Callao, Mz. A Lt. 3 Urb. Arizona - 2da Etapa",
    reference: "",
    lat: -11.97783423,
    lng: -77.09336287,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av. Canta Callao Con Izaguirre",
    address: "Av. Canta Callao Mz. A Lt. 3 Asoc. Brisas Santa Rosa 1ra Etapa",
    reference: "A Media Cdra. Del Colegio Amistad y/o A Cuatro Cdras. De La av. Carlos Izaguirre",
    lat: -11.985684244067,
    lng: -77.102068570552,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av. Carlos Izaguirre Cuadra 23",
    address: "Av. Carlos Izaguirre Sub Lt. 8, Mz. C - Asoc. De Viv. Los Nisperos",
    reference: "Entre Av. 12 De Octubre Y Av. Santa Rosa",
    lat: -11.99001,
    lng: -77.09459,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av. Dominicos Cdra 14",
    address: "Av. Los Dominicos 1460 - Urb. Los Cipreses Mz. Z Lt. 4 - San Martín De Porres",
    reference: "A Una Cdra. Del Cruce Con Av. Santa Rosa Al Lado Del Mercado Los Cipreses",
    lat: -12.000236699984,
    lng: -77.101816070595,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av. Gerardo Unger Cdra 64",
    address: "Av. Gerardo Unger 6475, Urb. Santa Luisa, 1ra Etapa, S.m.p.",
    reference: "Esquina Con Av. 22 De Agosto, Límite Con Comas / A Una Cdra. Y Media De La Comisaria Santa Luzmila",
    lat: -11.94597458951921,
    lng: -77.0665273461935,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av. Lima Cdra 38",
    address: "Av. Lima 3899 - Smp",
    reference: "A 3 Cdras. Del Tottus De Quilca Con Av. Lima",
    lat: -12.028420907156587,
    lng: -77.0905094113077,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av. Peru 15",
    address: "Av. Perú 1589, San Martin De Porres - Lima",
    reference: "A Dos Cuadras Del Cruce Con La Av. Canadá.",
    lat: -12.0327011,
    lng: -77.0626605,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Av. Universitaria Cdra. 16",
    address: "Av. Universitaria 1619 - urb. Maria Gracia De Antares Mz. B lt. 25 – San Martin De Porres - Lima",
    reference: "Frente Al Plaza Vea De Universitaria Con Tomas Valle",
    lat: -12.010046601589,
    lng: -77.081589491522,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Fiori",
    address: "Av. Miguel Angel N° 235 - Urb. Fiori 4ta Etapa Mz. N-1 Lt. 04 U.i N°6, San Martín De Porres - Lima",
    reference: "A 1 Cdra. Del Cruce Con Av. Marco Polo",
    lat: -12.009873681812502,
    lng: -77.05573138335198,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Germán Aguirre",
    address: "Av. German Aguirre Ugarte 649 Urb. San German - San Martin De Porres",
    reference: "A La Altura De La Cuadra 6 De La Av. German Aguirre Y A 3 Cuadras De Av. Tomas Valle",
    lat: -12.01520062837,
    lng: -77.071383204114,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Smp Av Bertello",
    address: "Av. Alejandro Bertello Bollati Mz. H Lt. 2-a - Asoc. De Viv. San Remo Ii Etapa, San Martín De Porres - Lima - Lima",
    reference: "A Media Cdra. Del Cruce Con Av. Canta Callao",
    lat: -11.995717209191,
    lng: -77.113550598391,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Smp Av Pacasmayo",
    address: "Av. Pacasmayo Mz. A Lt. 03 – Urb. Santa Fe De Naranjal, San Martín De Porres - Lima - Lima",
    reference: "a 3 cdras. Del Cruce Con Av. El Sol De Naranjal",
    lat: -11.971120370669,
    lng: -77.100521064793,
    type: "Terminal",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "San Martin De Porres",
    zone: "Smp-av. Proceres",
    address: "Av. Próceres N° 588 Urb. Covicem",
    reference: "A 2 Cdras. De Tomás Valle",
    lat: -12.014500655852,
    lng: -77.086998658861,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Santa Anita",
    zone: "Av Huarochiri Envios",
    address: "Av. Huarochiri Mz. D8 Lt. 13, Urb. Los Cedros, Santa Anita - Lima",
    reference: "A Media Cdra. Del Cruce Con Av. Santa Rosa",
    lat: -12.041806655130582,
    lng: -76.95260172004053,
    type: "Solo Envíos",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Santa Anita",
    zone: "Av Santa Rosa - Sta Anita",
    address: "Av. Santa Rosa #147 – Urb. Santa Anita Mz. B1 Lt. 08 Unidad Inmobiliaria N° 1 - Santa Anita - Lima",
    reference: "A Una Cdra. De La Carretera Central",
    lat: -12.05226684612813,
    lng: -76.96148503819886,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Santa Anita",
    zone: "Av. Huarochirí",
    address: "Av. Huarochirí Mz. E1 Lt. 03 - Urb. Los Cedros Santa Anita",
    reference: "Cruce De Av. Huarochirí Con Av. Santa Ana",
    lat: -12.041444176807,
    lng: -76.952297800037,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Santa Anita",
    zone: "Urb Universal",
    address: "Jr. Cesar Vallejo 302 Mz. B1 Lt. 02 Urb Universal, Santa Anita- Lima-lima",
    reference: "A 1 Cdra. Del Cruce Con Av. Tupac Amaru",
    lat: -12.043267502694624,
    lng: -76.97980031394222,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Santa Rosa",
    zone: "Santa Rosa",
    address: "Mz. L 23 Urb. Coovitiomar, - Santa Rosa - Lima",
    reference: "Cruce De Ingreso A Santa Rosa Y/o Al Costado De Imagen De Santa Rosa",
    lat: -11.785832663255,
    lng: -77.154776871103,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Santiago De Surco",
    zone: "Av Tomas Marsano - La Bolichera",
    address: "Av. Santiago De Surco Nº 4348, Urbanización La Virreyna, Santiago De Surco - Lima",
    reference: "Al Lado De Inteci Sede Surco",
    lat: -12.14075536666277,
    lng: -76.99291252944776,
    type: "Mini-micro",
    hours: [
      "LUNES A VIERNES",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Santiago De Surco",
    zone: "Higuereta",
    address: "Calle Barlovento N° 134",
    reference: "A 3 Cdras De Polvos Rosados, Cerca Al Óvalo Higuereta, Surco",
    lat: -12.128290656591,
    lng: -76.999440079644,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Santiago De Surco",
    zone: "Surco Mateo Pumacahua",
    address: "Av. San Juan Mz A Lote 01 Mateo Pumacahua - Surco",
    reference: "A 2 Cuadras De La Av. Tupac Amaru Entre El Límite De Chorrillos Y Surco",
    lat: -12.191080022844782,
    lng: -76.98405895275964,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Surquillo",
    zone: "Av. Principal",
    address: "Lt. 12 Mz. G, Av. Principal 995 (ex Av. Uno) Urb. Los Sauces 2da Etapa, Surquillo",
    reference: "Cruce Con A. Manuel Villarán",
    lat: -12.120399751438,
    lng: -77.003503247772,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Surquillo",
    zone: "Rep. De Panama",
    address: "Av República De Panamá N° 5115",
    reference: "Costado Del Grifo Repsol.",
    lat: -12.1155255,
    lng: -77.01815066,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa El Salvador",
    zone: "01 De Mayo",
    address: "Av. 01de Mayo 1 Sect Gp 23 - A Mz N Lote 13 - V.e.s.",
    reference: "Av. Pastor Sevilla Con Av. 1 De Mayo A 2 Cuadras Del Hospital De La Solidaridad Por La Ruta C",
    lat: -12.197813452067589,
    lng: -76.95645150975598,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa El Salvador",
    zone: "Av Revolución",
    address: "Av. Revolución Mz. J Lt. 19, sector Tercero, Grupo Residencial 9, pueblo Joven Villa El Salvador, Villa El Salvador - Lima - Lima",
    reference: "Cerca Al Cruce Con Av. Jose Carlos Mariategui",
    lat: -12.21992881072,
    lng: -76.932644770566,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa El Salvador",
    zone: "Av. Cesar Vallejo",
    address: "Av. Cesar Vallejo, Mz. F Lt. 1 - Sect. 2",
    reference: "Frente A Essalud, Al Costado Del Mercado Villa Sur",
    lat: -12.210718983393,
    lng: -76.932733043167,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa El Salvador",
    zone: "Av. Pastor Sevilla",
    address: "Mz. B Lt. 3 Barrio 3 Sector 2 - 4ta Etapa - Ves",
    reference: "Por El Óvalo Cerro Lomas, Frente Al Colegio Virgen Del Rosario",
    lat: -12.242278748260654,
    lng: -76.92582672867127,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa El Salvador",
    zone: "Óvalo Mariátegui",
    address: "Av. Pastor Sevilla Sect. 6 - Gp 7 - Mz. A - Lote 05 - V.e.s.",
    reference: "A 2 Cuadras Del Óvalo Mariátegui Con 3 De Octubre",
    lat: -12.222771994776,
    lng: -76.94317697476,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria Del Triunfo",
    zone: "Av. Lima - Vmt",
    address: "Av. Lima 2208 José Gálvez- Villa María Del Triunfo",
    reference: "A Dos Cdras. De La Curva José Gálvez",
    lat: -12.226053,
    lng: -76.908879,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria Del Triunfo",
    zone: "Av. Villa Maria",
    address: "Av Villa Maria Mz. G12 Lt. 9 - B Ps 1 Sect. Villa Maria Del Triunfo",
    reference: "Av. Villa Maria A 2 Cuadras De La Municipalidad De Vmt Y Al Costado De Essalud",
    lat: -12.160054167398743,
    lng: -76.94150305828285,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria Del Triunfo",
    zone: "La Tablada Zona Nueva",
    address: "Av. Pachacútec N° 4465, Mz. 36, Lt. 18 Zona Nueva Esperanza - P.j. César Vallejo - Villa María Del Triunfo - Lima - Lima",
    reference: "Al Frente Del Cruce Con Av. 01 De Mayo",
    lat: -12.187781031186,
    lng: -76.938656958167,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria Del Triunfo",
    zone: "Las Conchitas",
    address: "Av. Pachacutec 6779, Mz. N, Lt. 20, Villa Maria Del Triunfo -",
    reference: "A Una Cdra. Del Grifo Repsol Las Conchitas",
    lat: -12.208631,
    lng: -76.9259818,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria Del Triunfo",
    zone: "Nueva Esperanza Vmt",
    address: "Av. 26 De Noviembre, 1728b - 1728c Mz. 90 Sub Lote. 19b Pueblo joven Nueva Esperanza, Villa Maria Del Triunfo - Lima",
    reference: "A 3 Cdras. Del Mercado Virgen De Lourdes",
    lat: -12.167552525986567,
    lng: -76.92398425823932,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria Del Triunfo",
    zone: "Pesquero",
    address: "Av. Pachacutec N° 3548",
    reference: "Frente A Real Plaza, A 1 Cdra. De Mayorsa",
    lat: -12.179083535105955,
    lng: -76.94455568962945,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Lima",
    province: "Oyon",
    district: "Churin",
    zone: "Churín",
    address: "Av. Vía De Evitamiento N° N/s Churín - Oyón - Lima",
    reference: "a Media Cdra. De La Plaza De Armas Y De La Municipalidad",
    lat: -10.806834617318,
    lng: -76.876111099995,
    type: "Terminal",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Loreto",
    province: "Alto Amazonas",
    district: "Yurimaguas",
    zone: "Yurimaguas",
    address: "Calle Jorge Chávez N° 300",
    reference: "Esquina Con Progreso, Al Costado De Enapu",
    lat: -5.8863186,
    lng: -76.1105129,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Loreto",
    province: "Maynas",
    district: "Iquitos San Juan Bautista",
    zone: "Av Jose A. Quiñones",
    address: "Av. José Abelardo Quiñones # 2475 San Juan Bautista - Maynas - Loreto",
    reference: "Frente A La Universidad Científica Del Perú (ucp)",
    lat: -3.7704160308984,
    lng: -73.281970858895,
    type: "Punto Pro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Loreto",
    province: "Maynas",
    district: "Iquitos San Juan Bautista",
    zone: "Av Participacion Parcela",
    address: "Av. Participación Parcela 9-a San Juan Bautista - Maynas - Loreto",
    reference: "Frente Al Lavadero Osito Y A Media Cdra. Del Parque 1 De Enero",
    lat: -3.7793125277868,
    lng: -73.27991317086,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Loreto",
    province: "Maynas",
    district: "Iquitos San Juan Bautista",
    zone: "Ctra Iquitos Nauta",
    address: "Carretera Iquitos Nauta, S/n Mz. K - Lt. 20, San Juan Bautista - Maynas - Loreto",
    reference: "Al Costado De La Distribuidora Amazon Gas.",
    lat: -3.7960541680007,
    lng: -73.301555482859,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Loreto",
    province: "Maynas",
    district: "Iquitos",
    zone: "Iquitos Av Tupac Amaru",
    address: "Av. tupac Amaru Con - Calle Lourdes De León #479 iquitos Maynas - Loreto",
    reference: "Frente A La Botica Thiagofama",
    lat: -3.7550842625749,
    lng: -73.269944604887,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Loreto",
    province: "Maynas",
    district: "Iquitos",
    zone: "Iquitos Co Jr. Bolognesi",
    address: "Jr. Francisco Bolognesi #941 Con Jr. Bermúdez, Iquitos - Maynas - Loreto",
    reference: "Frente A La Universidad nacional De La Amazonia Peruana",
    lat: -3.7541661727549,
    lng: -73.252084268484,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Loreto",
    province: "Maynas",
    district: "Iquitos",
    zone: "Iquitos Jr Pablo Rossel",
    address: "Jr Pablo Rossel 590 Con Nanay",
    reference: "Frente Al Cetpro American Computer",
    lat: -3.7418759911191,
    lng: -73.243443036497,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Loreto",
    province: "Maynas",
    district: "Punchana",
    zone: "Punchana",
    address: "Calle Borja N°648 Punchana - Maynas - Loreto",
    reference: "Al Costado De La Farmacia San Carlos Centro Médico",
    lat: -3.7299283680047,
    lng: -73.247475881523,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Madre De Dios",
    province: "Tahuamanu",
    district: "Iberia",
    zone: "Iberia",
    address: "Av. Jorge Chavez Mz. H1 Sub Lote 11-b, Iberia - Tahuamanu - Madre De Dios",
    reference: "A Una Cdra. De La Empresa Real Dorado / A Una Cdra. Y Media De La Av Jose Aldamiz",
    lat: -11.406554280783,
    lng: -69.487970049644,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Madre De Dios",
    province: "Tambopata",
    district: "Inambari",
    zone: "Mazuko",
    address: "Av. Los Pioneros, Lt. 2 Y 3, Inambari – Tambopata - Madre De Dios",
    reference: "al Costado Del Terminal Terrestre De Mazuko / Al Pie De La Carretera Al Rio Inambari",
    lat: -13.098946521772,
    lng: -70.369917328069,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Madre De Dios",
    province: "Tambopata",
    district: "Las Piedras",
    zone: "El Triunfo",
    address: "Av. Interoceanica Km. 1 , Las Piedras - Tambopata - Madre De Dios",
    reference: "Al Costado Del Grifo Virgen Natividad",
    lat: -12.580879,
    lng: -69.172572,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Madre De Dios",
    province: "Tambopata",
    district: "Tambopata",
    zone: "Av 15 De Agosto",
    address: "Av. 15 De Agosto n° 529, Tambopata - Tambopata - Madre De Dios",
    reference: "a Espaldas Del Colegio Carlos Fermin Fitzcarrald / Cruce Con Jr. Ica",
    lat: -12.590861310162,
    lng: -69.189889605433,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Madre De Dios",
    province: "Tambopata",
    district: "Tambopata",
    zone: "Tambopata Av Circunvalacion",
    address: "Av. Circunvalacion Mz. C Lt. 01, Tambopata - Tambopata - Madre De Dios",
    reference: "A Dos Cdras. De La Carretera Interoceanica Sur / Cruce Con Jr. Las Mercedes Cabello",
    lat: -12.581888331368,
    lng: -69.202891221518,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Madre De Dios",
    province: "Tambopata",
    district: "Tambopata",
    zone: "Tambopata Av Ucayali Co",
    address: "Av. Ucayali N° 473 - Tambopata - Tambopata - Madre De Dios",
    reference: "Al Costado De Motos Ssenda. Al Frente Del Colegio Santa Fe",
    lat: -12.602639614278,
    lng: -69.191528153031,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Moquegua",
    province: "Ilo",
    district: "Ilo",
    zone: "Ilo Co Pampa Inalambrica",
    address: "Urb. Ciudad Del Pescador, Mz. J Lt. 18-19",
    reference: "A Dos Cuadras Del Poder Judicial",
    lat: -17.646726685783,
    lng: -71.332508637667,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Moquegua",
    province: "Ilo",
    district: "Ilo",
    zone: "Ilo Puerto",
    address: "Jr. Callao Prolongación Mz. N, Lt. 19 - A",
    reference: "A Media Cdra. De La Cooperativa Cuajone",
    lat: -17.644710705275,
    lng: -71.34212390418,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Moquegua",
    province: "Ilo",
    district: "Pacocha",
    zone: "Ilo Pacocha",
    address: "Agrupación De Familias Pueblo Nuevo M.z E2 Lt. Com2a Sect. Ii – Ilo - Moquegua",
    reference: "Al Costado Del Banco Bcp",
    lat: -17.614692860029,
    lng: -71.338305548056,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Moquegua",
    province: "Mariscal Nieto",
    district: "Moquegua",
    zone: "Calle Lima",
    address: "Calle Lima 190 - Mariscal Nieto - Moquegua",
    reference: "A Dos Cuadras Del Parque Los Héroes/alameda",
    lat: -17.194764722676,
    lng: -70.938348672668,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Moquegua",
    province: "Mariscal Nieto",
    district: "Moquegua",
    zone: "Chen Chen",
    address: "Mz. C Lt. 24 – Asociación César Vizcarra – Centro Poblado Chen Chen , Moquegua –mariscal Nieto – Moquegua",
    reference: "Al Costado Del Ovalo Chen Chen",
    lat: -17.199167770597,
    lng: -70.922473397987,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Moquegua",
    province: "Mariscal Nieto",
    district: "Moquegua",
    zone: "Quebrada Las Lechuzas Co",
    address: "Sector Quebrada Las Lechuzas Moquegua Calle N°1 Mz H Lt. 04, Moquegua - Mariscal Nieto - Moquegua",
    reference: "Quebrada De Lechuzas",
    lat: -17.196494104692,
    lng: -70.94804437675,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Moquegua",
    province: "Mariscal Nieto",
    district: "Moquegua",
    zone: "San Antonio",
    address: "Av. Santa Fortunata Mz. N5 Lt. 10 Asoc. Villa Moquegua San Antonio",
    reference: "A Una Cuadra De La Casa De La Mujer",
    lat: -17.2102839,
    lng: -70.9480949,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Pasco",
    province: "Oxapampa",
    district: "Oxapampa",
    zone: "Oxapampa",
    address: "Mz. 239 Sub Lote H – 1 Oxapampa - Oxapampa - Pasco",
    reference: "Entre Av. Angélica Frey Y Jr. Lima",
    lat: -10.582583283003,
    lng: -75.398971637447,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Pasco",
    province: "Oxapampa",
    district: "Villa Rica",
    zone: "Villa Rica",
    address: "Av. Leopoldo Krausse N° 442 Villa Rica - Oxapampa - Pasco",
    reference: "Entre El Jr. Pozuzo Y Jr. Cooperativa, Al Costado De La Notaría Guerra Y A 20 Metros De La Plaza Principal",
    lat: -10.735805270593,
    lng: -75.268361100077,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Pasco",
    province: "Pasco",
    district: "Chaupimarca",
    zone: "Cerro De Pasco",
    address: "Jr. Huaricapcha S/n A.h. Tupac Amaru Chaupimarca",
    reference: "Frente Al Nuevo Terminal",
    lat: -10.686749,
    lng: -76.246862,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Pasco",
    province: "Pasco",
    district: "Huayllay",
    zone: "Huayllay",
    address: "Calle Lima S/n Barrio Arenales Huayllay Pasco -",
    reference: "Al Costado Del Colegio Cesar Vallejo",
    lat: -11.0007095,
    lng: -76.3672417,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Ayabaca",
    district: "Ayabaca",
    zone: "Ayabaca",
    address: "Calle Bolognesi N° 136",
    reference: "A 2 Cuadras De La Plaza De Armas De Ayabaca",
    lat: -4.6400387456146,
    lng: -79.714678136096,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Ayabaca",
    district: "Paimas",
    zone: "Paimas",
    address: "Av. Sullana S/n",
    reference: "Frente Al Complejo Educativo Juan Velasco Alvarado",
    lat: -4.62382798467,
    lng: -79.948503000001,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Huancabamba",
    district: "Huancabamba",
    zone: "Huancabamba",
    address: "Av. Ramon Castilla 0351 Huancabamba - Piura",
    reference: "A 1 Cuadra De La Capilla Ramon Castilla",
    lat: -5.24390333549,
    lng: -79.453353341105,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Morropon",
    district: "Chulucanas",
    zone: "Chulucanas",
    address: "Jr. Huancavelica N° 548",
    reference: "Al Lado Del Terminal De Ronco",
    lat: -5.0955589,
    lng: -80.1629195,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Morropon",
    district: "Morropon",
    zone: "Morropon",
    address: "Jr. Adrianzén N° 099, Morropon - Morropon - Piura",
    reference: ", A Espaldas De Del Terminal Terrestre De Trampsa",
    lat: -5.1891950678039,
    lng: -79.972304929448,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Paita",
    district: "Paita",
    zone: "Paita",
    address: "Mz. H Lt. 14 Urb. Sol Y Mar - Paita",
    reference: "Al Costado De La Empresa San Miguel",
    lat: -5.0867947730703,
    lng: -81.093009488701,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "26 De Octubre",
    zone: "Aahh Santa Rosa Piura",
    address: "Urb. Santa Rosa Mz. D Lt. 7, Sect. 7, 26 De Octubre - Piura",
    reference: "Av. Raul Mata La Cruz Con Circunvalación Al Frente De Repuestos Frank|",
    lat: -5.1891416643432,
    lng: -80.665360286188,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "26 De Octubre",
    zone: "Av. Gullman",
    address: "A.a.h.h. Consuelo De Velasco 1 Etapa Sector B Mz Lt.18 26 De Octubre – Piura",
    reference: "Cruce Av. Circunvalación Con Av. Gullman Al Costado De La Ferreteria los Reyes",
    lat: -5.1979627644128,
    lng: -80.642655599997,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "26 De Octubre",
    zone: "Calle Emaús",
    address: "Calle Tres N° 102, Sublote N° 1d Mz. Y - Zona Industrial Ii, Distrito 26 De Octubre -",
    reference: "Al Costado De Senati",
    lat: -5.1799717074005,
    lng: -80.652250843267,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "26 De Octubre",
    zone: "Parque Industrial Co Piura Futura",
    address: "Urb. Parque Industrial Piura Futura Mz. G, Lt. 1a. 26 De Octubre - Piura",
    reference: "Al Frente Del Grifo Petro Perú",
    lat: -5.1605551169742,
    lng: -80.690649236109,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "Castilla",
    zone: "Av Tacna",
    address: "Av. Tacna 503 Castilla - Piura",
    reference: "Frente A Ugel De Castilla",
    lat: -5.2024612,
    lng: -80.6241167,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "Castilla",
    zone: "Tacala",
    address: "Carr. Panamericana A-2 Ah. Almirante Miguel Grau I Etapa, Castilla - Piura - Piura",
    reference: "Al Costado De Cerámicas San Lorenzo",
    lat: -5.1904180356006,
    lng: -80.603083300001,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: ""
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "Catacaos",
    zone: "Catacaos",
    address: "Av. Francisco Bolognesi Mz. 60 Lt. 37 Catacaos - Piura - Piura",
    reference: "Al Lado Del Ex Pronei",
    lat: -5.267972200001,
    lng: -80.672388229458,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "La Union",
    zone: "La Union",
    address: "Av. Lima N° 590",
    reference: "Frente A Tiendas Chancafe",
    lat: -5.3993284,
    lng: -80.742189,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "Las Lomas",
    zone: "Las Lomas",
    address: "Jr. Miguel Grau Mz. H Lt. 7, Las Lomas - Piura",
    reference: "Al Costado De Caja Huancayo Y Al Costado De Comisaria Las Lomas",
    lat: -4.6565833861674,
    lng: -80.243888252653,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Av Raul Mata La Cruz- Dos Grifos",
    address: "Av. Raúl Mata La Cruz Lt. 11 Mz. C Urb. Los Jardines - Corpiura, - Piura - Piura - Piura",
    reference: "A Una Cdra. De Los 2 Grifos En Toda La Av. Raúl Mata La Cruz",
    lat: -5.166389,
    lng: -80.653667,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Av. Grau",
    address: "Av. Grau Manzana N, Lote 33 - Urbanización La Alborada",
    reference: "Grau Con Marcavelica",
    lat: -5.1867475,
    lng: -80.6547354,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "015007878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Av. Luis Eguiguren",
    address: "Av. Málaga Mz. A Lt.20 Int. 105 Piura",
    reference: "A Media Cuadra De Honda Del Peru S.a. En El Cruce De Av. Luis Eguiguren Con Sullana Norte",
    lat: -5.1854726017121475,
    lng: -80.63332306469526,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Piura",
    district: "Tambo Grande",
    zone: "Tambo Grande",
    address: "Aa. Hh. El Huerto Mz. E Lt. 08 Tambo Grande – Piura - Piura",
    reference: "Atrás Del Colegio Ina 54 Agropecuario, A La Altura Del Campo Campestre Rivera Del Río",
    lat: -4.9350843412188,
    lng: -80.34533475739,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Sechura",
    district: "Sechura",
    zone: "Sechura",
    address: "Mz. B Lt. 23 A. H. Los Jardines Sur Este, Sechura - Sechura - Piura",
    reference: "al Costado De La Empresa Fundicion Coronado Srl",
    lat: -5.5669187021603,
    lng: -80.81336177055,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Sullana",
    district: "Bellavista",
    zone: "Bellavista Sullana",
    address: "Calle Moquegua 381, Bellavista",
    reference: "Rest. Parrilladas Chavelos",
    lat: -4.8911773362203,
    lng: -80.678927709773,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Sullana",
    district: "Ignacio Escudero",
    zone: "Ignacio Escudero",
    address: "Av. Panamericana Calle 26 Lote 3, Ignacio Escudero - Sullana - Piura",
    reference: "Frente A La Institución Educativa Ignacio Escudero",
    lat: -4.8464431521603,
    lng: -80.873376309797,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Sullana",
    district: "Sullana",
    zone: "Sullana Co Zona Industrial",
    address: "Ctra. Sullana Nº S/n Mz. K, Lt. 06 - Zona Industrial Municipal",
    reference: "Al Costado Del Hotel Coco Suite",
    lat: -4.924883,
    lng: -80.696031,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Sullana",
    district: "Sullana",
    zone: "Sullana Santa Rosa",
    address: "Carretera Panamericana Norte Nº 790 Sullana",
    reference: "Frente Al Colegio Chiquititos",
    lat: -4.908899,
    lng: -80.697109,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Talara",
    district: "El Alto",
    zone: "El Alto",
    address: "Av. Bolognesi O-37 Centro El Alto",
    reference: "A Espaldas De La Municipalidad De El Alto",
    lat: -4.268178,
    lng: -81.221744,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Talara",
    district: "Los Organos",
    zone: "Los Organos",
    address: "Av. Panamericana Norte P-29 - Urb. Cercado Zona Urbana",
    reference: "Al Frente De Grifo De Troncos O Grifo San Pedro",
    lat: -4.1747753095423,
    lng: -81.123411684872,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Talara",
    district: "Mancora",
    zone: "Máncora",
    address: "Av. Grau Nro. 432 Máncora - Talara - Piura",
    reference: "Frente Al Paradero De Autos De Los Órganos En Toda La Panamericana Norte.",
    lat: -4.1067198549527,
    lng: -81.048832633167,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Talara",
    district: "Parinas",
    zone: "Talara Alta 9 De Octubre",
    address: "Mz. N-10 Aa.hh 9 De Octubre talara Alta, pariñas - Talara - Piura",
    reference: "A 1 Cdra. Antes De Amecfa",
    lat: -4.591314005199,
    lng: -81.252495670549,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:30 PM",
      "DOMINGOS",
      "08:00 AM A 04:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Talara",
    district: "Parinas",
    zone: "Talara Baja Parque 22",
    address: "Parque 22 – 03 Lateral. Talara Baja, Pariñas - Talara - Piura",
    reference: "Frente A Minsa",
    lat: -4.575510000001,
    lng: -81.268615329431,
    type: "Micro",
    hours: [
      "LUNES A VIERNES",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Piura",
    province: "Talara",
    district: "Parinas",
    zone: "Talara Co Asoc California",
    address: "Asociación California C - 03 Frente A Carretera Negritos, Talara - Pariñas",
    reference: "Al Costado Del Restaurante Mi Torete",
    lat: -4.5895156321892,
    lng: -81.27349917493,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "Azangaro",
    district: "Azangaro",
    zone: "Azangaro",
    address: "Av. Próceres S/n, Azángaro - Puno",
    reference: "a Dos Cdras. Del Parque De La Madre / A Orillas De La Misma Av. Proceres",
    lat: -14.917112408676,
    lng: -70.198471956773,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "Chucuito",
    district: "Desaguadero",
    zone: "Desaguadero",
    address: "Av. Panamericana n° 1158 - 1160, Desaguadero - Chucuito - Puno",
    reference: "al Costado Del Grifo Bartolomé",
    lat: -16.554333203811,
    lng: -69.042694052504,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "El Collao",
    district: "Ilave",
    zone: "Ilave",
    address: "Jr. Bolognesi Nro. 866 Barrio Cruzani, El Collao - Puno",
    reference: "A Una Cuadra Del Coliseo Y Del Cementerio De Ilave",
    lat: -16.082861100001,
    lng: -69.644722199963,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "Melgar",
    district: "Ayaviri",
    zone: "Ayaviri",
    address: "Jr. Santa Rosa Prolongación S/n Magisterial - Puno - Melgar - Ayaviri",
    reference: "A 50 Metros Del Óvalo, Salida A Juliaca",
    lat: -14.886554,
    lng: -70.598362,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "Puno",
    district: "Puno",
    zone: "Alto Puno",
    address: "Urb. San Pedro-alto Puno, Av La Cultura N° 160, Puno - Puno - Puno",
    reference: "A Tres Cdras. De La Av. Que Va A Juliaca / A Dos Cdras. Del Grifo Bronco",
    lat: -15.817227035489,
    lng: -70.0309222,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "Puno",
    district: "Puno",
    zone: "Av 4 De Noviembre Co",
    address: "Av. 4 De Noviembre N° 474-b Y 486-b Barrio Santa Rosa, Puno - Puno – Puno",
    reference: "A Una Cdra. De Sunafil",
    lat: -15.855167345042,
    lng: -70.015778470551,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 03:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "Puno",
    district: "Puno",
    zone: "Av Costanera",
    address: "Av. Costanera N° 211 Con Jr. Los Incas - Puno",
    reference: "",
    lat: -15.834283484814,
    lng: -70.018396968946,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "Puno",
    district: "Puno",
    zone: "Salcedo",
    address: "Urb. Aziruni Tepro I Etapa Mz. 18 Lt. 52 Jr Los Rosales – Salcedo Puno",
    reference: "A Una Cdra. De La Av. Estudiante / A Dos Cdras. De Senati Puno",
    lat: -15.871121071441,
    lng: -69.996589930673,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Av Heroes Del Pacifico Co",
    address: "Av. Héroes De La Guerra Del Pacifico Km 3.5, Juliaca - San Román - Puno",
    reference: "Al Frente Del Grifo Leon Service",
    lat: -15.507667505495,
    lng: -70.165000342215,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Av Independencia",
    address: "Av. Independencia Nro. 1538 Mz. A1 Lt. 04 Urb. Horacio Zeballos Gamez, Juliaca - San Román - Puno, Al Frente Del Grifo San Carlos / Cruce Con Jr 21 De Eneroref.",
    reference: "",
    lat: -15.467833299999,
    lng: -70.137583970548,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Av. Huancane Cdra. 9",
    address: "Jr. Sillustani N° 202, San Roman - Juliaca",
    reference: "A 3 Cdras. Del Hospital Carlos Monge Medrano",
    lat: -15.480556232291,
    lng: -70.117833304412,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Av. Lampa",
    address: "Av. Lampa Mz. B2 Lt. 3 Urb. Santa Adriana, Juliaca - San Román - Puno",
    reference: "A Media Cdra. De La Posta De Salud De La Urb. Santa Adriana",
    lat: -15.483557842074,
    lng: -70.15544291753,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Av. Modesto Borda",
    address: "Av. Modesto Borda Mz. A Lt. 04 Urb. Arrabal Don Julio, Juliaca - San Roman - Puno",
    reference: "Dos Cdras. Antes Del Grifo Blanco / A Dos Cdras. Del Salon De Eventos Paraiso Azul",
    lat: -15.507584214102,
    lng: -70.108751042171,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Jr Agustin Gamarra",
    address: "Jr. Agustin Gamarra Mz. R1 Lt. 09 Urb. Huancane, Juliaca - San Román - Puno",
    reference: "A Una Cdra. De La Av. Huancane / Cruce Con Jr. Alberto Cuentas Zabala",
    lat: -15.473583959348,
    lng: -70.112417233275,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Jr. Mama Ocllo",
    address: "Jr. Mama Ocllo 915 - B ( Cruce Con Jr Azángaro )",
    reference: "",
    lat: -15.490571,
    lng: -70.119498,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Las Mercedes",
    address: "Jr. Porvenir N° 228 Urb. Las Mercedes, San Roman - Puno",
    reference: "A Una Cdra. De La Av. Circunvalacion Oeste - A Una Cdra. Del Terminal Las Mercedes",
    lat: -15.483920800815,
    lng: -70.141390859993,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Bellavista",
    district: "Bellavista",
    zone: "San Martin Bellavista",
    address: "Av. Lima S/n C-4 Mz 71 – Lote A – Tercer Piso, Bellavista- Bellavista- San Martin",
    reference: "espaldas De Ferretería El Iman",
    lat: -7.0574980035849,
    lng: -76.590528470552,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "El Dorado",
    district: "San Jose De Sisa",
    zone: "San Jose De Sisa",
    address: "Jr. Bolognesi Cdra 6, San Jose De Sisa - El Dorado - San Martin",
    reference: "Altura De Jr Lamas Y Jr Eladio Tapullima",
    lat: -6.6129721999995,
    lng: -76.691166029444,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Huallaga",
    district: "Saposoa",
    zone: "Saposoa",
    address: "Av. Loreto S/n - Saposoa - El Huallaga - San Martin",
    reference: "En El Hostal El Gato, A Una Cdra. Y Media De La Plaza De Armas",
    lat: -6.9342505921754,
    lng: -76.772416367679,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Lamas",
    district: "Lamas",
    zone: "Lamas",
    address: "Jr. 16 De Octubre N°1137",
    reference: "A La Espalda Del Grifo Vargas Tello",
    lat: -6.4187426338969,
    lng: -76.517489745486,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Mariscal Caceres",
    district: "Juanjui",
    zone: "Juanjui Centro",
    address: "Jr. Sargento Lorez N° 568, Juanjui - Mariscal Cáceres - San Martin",
    reference: "A una Cdra. De Del Jr. Huallaga Cdra. 11 Y A Una Cdra. De Importaciones Patricia",
    lat: -7.1799173139874,
    lng: -76.731222452114,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Mariscal Caceres",
    district: "Juanjui",
    zone: "Juanjuí Fernando Belaunde Terry Co",
    address: "Carretera Fernando Terry Km. 1 S/n",
    reference: "Al Costado De Paradero De Autos Huallaga Express",
    lat: -7.1779108,
    lng: -76.737078,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Moyobamba",
    district: "Moyobamba",
    zone: "Moyobamba Centro",
    address: "Jr. Serafín Filomeno N°279, Moyobamba - Moyobamba - San Martín",
    reference: "A Una Cuadra Imedia Del Cumo (centro Cultural De Moyobamba)",
    lat: -6.0335151300825,
    lng: -76.971054929448,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Moyobamba",
    district: "Moyobamba",
    zone: "Moyobamba Co",
    address: "Jr. 20 De Abril 2138 -",
    reference: "Altura De La Pampa Del Hambre",
    lat: -6.0465912,
    lng: -76.9725996,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Moyobamba",
    district: "Soritor",
    zone: "Soritor",
    address: "Jr. Miguel Grau Cdra 7 N°741 Mz.05 Lte.16b, Soritor - Moyobamba - San Martín",
    reference: "A Media Cdra. De La Iglesia Asambleas De Dios",
    lat: -6.1398617667064,
    lng: -77.1038333,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Picota",
    district: "Picota",
    zone: "Picota",
    address: "Av. Fernando Belaunde Terry Lote 2b Picota - Picota - San Martin",
    reference: ", A Una Cdra. De La Comisaria De Picota Salida A Bellavista",
    lat: -6.9200547910068,
    lng: -76.33327738221,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Rioja",
    district: "Elias Soplin Vargas",
    zone: "Segunda Jerusalen",
    address: "Jr. Lima Mz. 43 Lt. 08 , Elias Soplin Vargas - Rioja - San Martin",
    reference: "Al Costado De Tienda Chingay",
    lat: -5.9887225879191,
    lng: -77.279860552607,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 12:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Rioja",
    district: "Nueva Cajamarca",
    zone: "Nueva Cajamarca",
    address: "Av. Cajamarca Norte Mz. 51 Lt. 15",
    reference: "Al Costado De Essalud",
    lat: -5.92927759481,
    lng: -77.3132981226,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "015007878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Rioja",
    district: "Pardo Miguel",
    zone: "Pardo Miguel Naranjos",
    address: "Jr. Miguel Grau 101 Mz. 34 Lt. 6, Pardo Miguel - Rioja - San Martin",
    reference: "Av. Marginal Cdra 5",
    lat: -5.739746366208,
    lng: -77.501779316434,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Rioja",
    district: "Rioja",
    zone: "Rioja",
    address: "Ctra. Fernando Belaúnde Terry N° 415",
    reference: "Al Costado De La Clínica Chilcon Hope",
    lat: -6.053861100001365,
    lng: -77.16166602945009,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "San Martin",
    district: "La Banda De Shilcayo",
    zone: "Tarapoto La Banda De Shilcayo",
    address: "Jr. Perú N°186",
    reference: "A 2 Cdrs. De La Plaza De La Banda De Shilcayo",
    lat: -6.4914695349871,
    lng: -76.35514024111,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "San Martin",
    district: "Morales",
    zone: "Tarapoto Jr. Sargento Lorez",
    address: "Jr. Sargento Lorez N° 264, Morales - San Martin",
    reference: "A Una Cdra. Y Media De La Plaza De Morales, Frente A Vulcano Gas",
    lat: -6.4774160027321,
    lng: -76.385222238053,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "San Martin",
    district: "Tarapoto",
    zone: "Jr Leoncio Prado",
    address: "Jr. Leoncio Prado N° 1175",
    reference: "A Una Cuadra Del Instituto María Parado De Bellido",
    lat: -6.4786878039267,
    lng: -76.365822199258,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "San Martin",
    district: "Tarapoto",
    zone: "Jr. Ramón Castilla",
    address: "Jr. Ramon Castilla N°1362 Tarapoto - San Martin",
    reference: "A Media Cdra. De Mannucci Motor S.a.",
    lat: -6.4959447897907,
    lng: -76.372085319981,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "San Martin",
    district: "Tarapoto",
    zone: "Jr. Tahuantinsuyo",
    address: "Jr. Tahuantinsuyo N° 158 - Tarapoto - San Martín",
    reference: "Al Costado Del Grifo San Martín",
    lat: -6.489609616265,
    lng: -76.363556270566,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "San Martin",
    district: "Tarapoto",
    zone: "Tarapoto Co Jr Alfonso Ugarte",
    address: "Jr. Alfonso Ugarte N°2283 - Tarapoto - San Martin - San Martin",
    reference: "frente A La Cancha Sintético El Golazo",
    lat: -6.4952242568055,
    lng: -76.383499958709,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Tocache",
    district: "Tocache",
    zone: "Av Fernando Belaunde",
    address: "Av. Fernando Belaunde C-09 Mz H6 (21), Lt. 04, Cercado De Tocache",
    reference: "Frente Al Mercadillo De Tocache",
    lat: -8.186307,
    lng: -76.517989,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Tocache",
    district: "Tocache",
    zone: "Jr Fredy Aliaga Co",
    address: "Jr. Fredy Aliaga N°3046 -tocache - Tocache - San Martin",
    reference: "al Costado Del Recreo Campestre Estragos",
    lat: -8.1900825478844,
    lng: -76.535472388443,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "San Martin",
    province: "Tocache",
    district: "Uchiza",
    zone: "Uchiza",
    address: "Av. Leoncio Prado N°524 - Uchiza - Tocache - San Martin",
    reference: "A Media Cdra. De La Plaza Central / Frente A Coopact",
    lat: -8.4599452725746,
    lng: -76.462081959446,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tacna",
    province: "Tacna",
    district: "Ciudad Nueva",
    zone: "Tacna Ciudad Nueva",
    address: "Ciudad Nueva Mz 46 Lt 12 Comité 10 Ciudad Nueva - Tacna",
    reference: "A Una Cdra. De La Plaza José Olaya De Ciudad Nueva",
    lat: -17.984471588057,
    lng: -70.236055095903,
    type: "Mini-micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tacna",
    province: "Tacna",
    district: "Coronel Gregorio Albarracin Lanchipa",
    zone: "Av. Municipal",
    address: "Asociación Las vilcas mz. E Lt. 16, Gregorio Albarracín Lanchipa - Tacna",
    reference: "Frente Al Mercado Héroes Del Cenepa",
    lat: -18.033417923278,
    lng: -70.250918108114,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tacna",
    province: "Tacna",
    district: "Coronel Gregorio Albarracin Lanchipa",
    zone: "Villa San Francisco",
    address: "Asoc. Villa San Francisco Mz. 94 Lt. 22",
    reference: "Cerca A Caja Cusco",
    lat: -18.047103237436,
    lng: -70.255889232014,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tacna",
    province: "Tacna",
    district: "Coronel Gregorio Albarracin Lanchipa",
    zone: "Viñanis",
    address: "Promuvi Viñani, Amp. I Etapa, Mz. 574, Lt. 09 – Coronel Gregorio Albarracín Lanchipa – Tacna - Tacna",
    reference: "A Media Cdra. Del Óvalo Los Molles",
    lat: -18.062945787541,
    lng: -70.251860014921,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Av Ejercito",
    address: "Av. Litoral Nro. 306 – Para Chico (anterior Av. Ejército Prolongación 306 Tacna), Tacna - Tacna - Tacna",
    reference: "Dentro Del Establecimiento Del Grifo Primax",
    lat: -18.029249633968,
    lng: -70.274333272827,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Av Vigil",
    address: "Av. Vigil 1636",
    reference: "A Una Cdra. De La Plaza Grau",
    lat: -17.999550724531,
    lng: -70.239101658895,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Av. Arias Araguez",
    address: "Calle Arias Araguez N° 836 tacna",
    reference: "A Una Cdra. Antes De Llegar Al Coliseo Perú",
    lat: -18.006778378004,
    lng: -70.252973965232,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Pocollay",
    address: "Pueblo Tradicional Pocollay Mz. T Lote 01 , Pocollay - Tacna - Tacna",
    reference: "A Una Cdra. Del Centro De Salud Pocollay",
    lat: -17.993277680713,
    lng: -70.218443730944,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Tacna Co Av. Jorge Basadre",
    address: "Av. Jorge Basadre Grohmann Oeste N° 366 - Tacna",
    reference: "",
    lat: -18.014034875512,
    lng: -70.259915218194,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Tumbes",
    province: "Contralmirante Villa",
    district: "Zorritos",
    zone: "Zorritos",
    address: "Av. 28 De Julio n° 205 Mz. 14 Lt. 04 Los Pinos Tumbes, contralmiraante Villar - Zorritos - Tumbes",
    reference: "",
    lat: -3.6826429893427,
    lng: -80.686485170117,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "09:00 AM A 07:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Tumbes",
    province: "Tumbes",
    district: "Corrales",
    zone: "Corrales",
    address: "Av. Huáscar Nº 311 Int. 01 Centro, Corrales - Tumbes",
    reference: "A Espaldas De La Plaza De Armas",
    lat: -3.602026086071,
    lng: -80.480083521582,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tumbes",
    province: "Tumbes",
    district: "La Cruz",
    zone: "La Cruz Tumbes",
    address: "Jr. Piura 105 Caleta La Cruz, La Cruz - Tumbes",
    reference: "Frente a ctr. panamericana Norte Y Al Frente De Motorepuestos Y Multiservicios Lujan",
    lat: -3.6376008662908,
    lng: -80.586921583879,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "09:00 AM A 06:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Pampa Grande Tumbes",
    address: "Mz. 0u Lt. 00a Aa.hh. Pampa Grande, Tumbes",
    reference: "Frente a la Av. Universitaria, Y Al Frente A La iglesia Mormones Y Al Lado De Un Lavadero De Autos.",
    lat: -3.5777440688748,
    lng: -80.451575070302,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "09:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Tumbes - Av Arica",
    address: "Av. Arica N° 227 - Tumbes.",
    reference: "",
    lat: -3.5654275,
    lng: -80.4590402,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Tumbes Co - Panamericana Norte Km 2360",
    address: "Av. Panamericana Norte S/n Villa Primavera - Tumbes",
    reference: "Pasando Senati Frente A Agripac",
    lat: -3.5524449279815,
    lng: -80.419805284875,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 07:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Tumbes Puyango",
    address: "Urb. Andrés Araujo Morán Mz. 28-a Lote 03 Calle Jacinto Seminario",
    reference: "Al Costado Del Mercado Puyango",
    lat: -3.5630010344404,
    lng: -80.426500210134,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tumbes",
    province: "Zarumilla",
    district: "Aguas Verdes",
    zone: "Aguas Verdes",
    address: "Av Tumbes S/n Lote 09 Mz 17 , A.h Tomas Arizola Olaya , Sector Ii -",
    reference: "A Una Cuadra Del Parque Tomas Arizola.",
    lat: -3.4805719,
    lng: -80.2469869,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Tumbes",
    province: "Zarumilla",
    district: "Zarumilla",
    zone: "Zarumilla",
    address: "Jiron Independencia 309 Zarumilla",
    reference: "Atrás De La Plaza De Armas Y Frente Al Dorado Pasando 5 Casas",
    lat: -3.5026340959138,
    lng: -80.274779168572,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa Calleria",
    zone: "Calleria Av Saenz Peña",
    address: "Av. Saenz Peña 229, Calleria - Coronel Portillo - Ucayali",
    reference: "A Dos Cuadras Del Ovalo De Federico Basadre Y Saenz Peña",
    lat: -8.3798995267862,
    lng: -74.538027470552,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa Calleria",
    zone: "Calleria Jr Jose Galvez",
    address: "Jr. Jose Galvez 147 Calleria - Coronel Portillo - Ucayali",
    reference: "A Media Cuadra De La Av. Centenario",
    lat: -8.382759,
    lng: -74.545825,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "01 5007878"
  },
  {
    courier: "shalom",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa Manantay",
    zone: "Manantay Av Aguaytia",
    address: "Av. Aguaytia Mz., 26 Lt. 20 manantay - Coronel Portillo - Ucayali",
    reference: "A Media Cdra. Del Nuevo Mercado De San Fernando",
    lat: -8.3978536633598,
    lng: -74.540658011659,
    type: "Mediana",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa Manantay",
    zone: "Manantay Av Tupac Amaru",
    address: "Av. Tupac Amaru 2315 manantay - Coronel Portillo - Ucayali",
    reference: "A Media Cdra. De La Polleria Emanuel",
    lat: -8.3984739366528,
    lng: -74.555353799976,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa Yarinacocha",
    zone: "Pucallpa Co Federico Basadre",
    address: "Carretera Federico Basadre Km 6.800 Yarinacocha - Coronel Portillo - Ucayali",
    reference: "Entrada Del Asentamiento Humano Alan Sisley/al Costado De La Empresa Jvj Service Oriente Sac",
    lat: -8.3937480000004,
    lng: -74.588120999999,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa Yarinacocha",
    zone: "Yarinacocha Av Universitaria",
    address: "Av. Universitaria Mza A Lote 6, Yarinacocha - Coronel Portillo - Ucayali",
    reference: "A Media Cdra. Del Local Rokalpa",
    lat: -8.3800171366071,
    lng: -74.568467158895,
    type: "Micro",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa Yarinacocha",
    zone: "Yarinacocha Centro",
    address: "Jr. Tupac Amaru, Mz. 50, Lt. 07",
    reference: "A Espalda De Maestranza De Yarinacocha",
    lat: -8.3577486634305,
    lng: -74.576310341108,
    type: "Pequeña",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "10:00 AM A 02:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "shalom",
    department: "Ucayali",
    province: "Padre Abad",
    district: "Aguaytia",
    zone: "Aguaytía",
    address: "U. Vecinal Barrio Unido Mz. 1 Lt. 2, Padre Abad - Ucayali",
    reference: "Al Costado Del Terminal Terrestre De Aguaytia",
    lat: -9.0356284532572,
    lng: -75.496011504332,
    type: "Grande / Co",
    hours: [
      "LUNES A SÁBADOS",
      "08:00 AM A 08:00 PM",
      "DOMINGOS",
      "08:00 AM A 05:00 PM"
    ],
    phone: "(01) 500 7878"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Bagua",
    district: "Bagua",
    zone: "Bagua Chica",
    address: "Pj Alfonso Ugarte Nro 171 Bagua Chica",
    reference: "",
    lat: -5.639389283780608,
    lng: -78.5320928571186,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:00 A 19:30"
    ],
    phone: "",
    ubigeo: "010201"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Bagua",
    district: "Imaza",
    zone: "Imaza (Imacita) Chiriaco",
    address: "Ca las Delicias S/N. S/N (Ref. A Espaldas de la Botica Mi Salu)",
    reference: "",
    lat: -4.979005,
    lng: -78.412794,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:00"
    ],
    phone: "",
    ubigeo: "010205"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Chachapoyas",
    district: "Chachapoyas",
    zone: "Tienda Chachapoyas",
    address: "Jr. Ortiz Arrieta Nº 270 S/N",
    reference: "",
    lat: -6.226970099021466,
    lng: -77.87291566856221,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:00 A 14:30"
    ],
    phone: "",
    ubigeo: "010101"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Condorcanqui",
    district: "Santa Maria de Nieva",
    zone: "Santa Maria de Nieva",
    address: "Simon Bolivar Nro 401 Galerias El Puerto, Stand 24, Nieva. (Frente A la Plaza de Armas)",
    reference: "",
    lat: -4.595295669287801,
    lng: -77.8657363925363,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 19:30"
    ],
    phone: "",
    ubigeo: "010401"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Luya",
    district: "Camporredondo",
    zone: "Camporredondo (Bgr)",
    address: "Av. Cahuide S/N, Camporredondo, Luya -Amazonas S/N",
    reference: "",
    lat: -6.123113288647647,
    lng: -78.35092271760894,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 12:00"
    ],
    phone: "",
    ubigeo: "010502"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Luya",
    district: "Ocalli",
    zone: "Ocalli (Jaen)",
    address: "Av la Libertad S/N Barr. la Libertad, Ocalli, Luya - Amazon S/N",
    reference: "",
    lat: -6.2360048721076,
    lng: -78.2682537975737,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 12:00"
    ],
    phone: "",
    ubigeo: "010512"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Rodriguez de Mendoza",
    district: "Rodriguez de Mendoza",
    zone: "Rodriguez de Mendoza",
    address: "Jr Rotibio Rodriguez de Mendoza Nro 407 (Al Costado de la Caja Trujillo)",
    reference: "",
    lat: -6.3951225812643155,
    lng: -77.4818574337554,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "010601"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Utcubamba",
    district: "Bagua Grande",
    zone: "Bagua Grande",
    address: "Jr Mesone Muro Nro 394 Bagua Grande (Ref. Frente A la Pnp)",
    reference: "",
    lat: -5.756088539591343,
    lng: -78.4402365383666,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 21:00",
      "SÁBADO",
      "08:00 A 20:00"
    ],
    phone: "",
    ubigeo: "010701"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Utcubamba",
    district: "Cumba",
    zone: "Cumba (Bgr)",
    address: "Jr Comercio Nro 701 Cumba",
    reference: "",
    lat: -5.934664259899733,
    lng: -78.66476927006246,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 19:00"
    ],
    phone: "",
    ubigeo: "010703"
  },
  {
    courier: "olva",
    department: "Amazonas",
    province: "Utcubamba",
    district: "El Milagro",
    zone: "El Milagro (Bgr)",
    address: "Jr San Martin Nro 199 El Milagro",
    reference: "",
    lat: -5.637266876760326,
    lng: -78.5583699294674,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "010704"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Antonio Raymondi",
    district: "Llamellin",
    zone: "Llamellin",
    address: "Plaza de Armas Nro 330 Llamellin",
    reference: "",
    lat: -9.1008357373162,
    lng: -77.01651760449711,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "020301"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Asuncion",
    district: "Chacas",
    zone: "Chacas",
    address: "Jr San Martin S/N Chacas",
    reference: "",
    lat: -9.163225232266157,
    lng: -77.36888315394702,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "020401"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Bolognesi",
    district: "Chiquian",
    zone: "Chiquian (Hrz)",
    address: "Jr Saenz Peña S/N (- Frente Al Colegio Coronel Bolognesi)",
    reference: "",
    lat: -10.150409868992849,
    lng: -77.1582683337594,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "020501"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Carhuaz",
    district: "Carhuaz",
    zone: "Carhuaz (Hrz)",
    address: "Carretera Central S/N Carhuaz (Frente Al Estadio)",
    reference: "",
    lat: -9.28326777892985,
    lng: -77.64870964543795,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 17:30",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "020601"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Carlos Fermin Fitzcarrald",
    district: "San Luis",
    zone: "San Luis",
    address: "Av Ramon Castilla Nro 321 - A (Frente A Reniec)",
    reference: "",
    lat: -9.093761592897787,
    lng: -77.32874968039688,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "10:00 A 17:00",
      "SÁBADO",
      "09:00 A 12:00"
    ],
    phone: "",
    ubigeo: "020701"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Casma",
    district: "Casma",
    zone: "Casma",
    address: "Av Magdalena Nro 240 Casma",
    reference: "",
    lat: -9.474894734439193,
    lng: -78.30587563523171,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "020801"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Huaraz",
    district: "Huaraz",
    zone: "Tienda Olva Huaraz",
    address: "Av Mariscal Agustin Gamarra Nro 743",
    reference: "",
    lat: -9.530641546956524,
    lng: -77.526693987772,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "020101"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Huaraz",
    district: "Independencia",
    zone: "Agente Olva Independencia",
    address: "Av Centenario 808 (Cruce Con Jr. Recuay, A 1 Cdra de Iglesia Sgrado Corazón Jes)",
    reference: "",
    lat: -9.516780795764676,
    lng: -77.53022492876214,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "07:00 A 21:00"
    ],
    phone: "",
    ubigeo: "020105"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Huari",
    district: "Huari",
    zone: "Huari",
    address: "Jr Manuel Alvarez Nro 1065 Barrio San Bartolomé - Huari.",
    reference: "",
    lat: -9.34852096361053,
    lng: -77.17359942387365,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "021001"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Huarmey",
    district: "Huarmey",
    zone: "Huarmey",
    address: "Av Alberto Reyes Nro 239 Huarmey",
    reference: "",
    lat: -10.06916352036051,
    lng: -78.15472778860797,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 20:30",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "021101"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Huaylas",
    district: "Caraz",
    zone: "Caraz",
    address: "Av Ramon Castilla Cdra 8 S/N Caraz",
    reference: "",
    lat: -9.048491279646552,
    lng: -77.8070828908358,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "021201"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Huaylas",
    district: "Caraz",
    zone: "Tienda Caraz",
    address: "Av Ramon Castilla S/N (Cdra 8)",
    reference: "",
    lat: -9.048491279646552,
    lng: -77.8070828908358,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:30 A 13:00"
    ],
    phone: "",
    ubigeo: "021201"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Mariscal Luzuriaga",
    district: "Piscobamba",
    zone: "Piscobamba",
    address: "Jr Capac Yupanqui Nro 120",
    reference: "",
    lat: -8.864636087102856,
    lng: -77.35834535582188,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 16:00"
    ],
    phone: "",
    ubigeo: "021301"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Pomabamba",
    district: "Pomabamba",
    zone: "Pomabamba",
    address: "Jr Huaraz Nro 707 Pomabamba",
    reference: "",
    lat: -8.81822995184197,
    lng: -77.4632813221187,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:30 A 17:30"
    ],
    phone: "",
    ubigeo: "021601"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Recuay",
    district: "Recuay",
    zone: "Recuay(Hrz)",
    address: "Jr Hércules Nro 280",
    reference: "",
    lat: -9.7237442045123,
    lng: -77.4555459440129,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "021701"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Santa",
    district: "Chimbote",
    zone: "Tienda Chimbote",
    address: "Av Jose Pardo Nro 490",
    reference: "",
    lat: -9.075452440260014,
    lng: -78.59409420072784,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 22:00",
      "SÁBADO",
      "08:30 A 21:00"
    ],
    phone: "",
    ubigeo: "021801"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Santa",
    district: "Nuevo Chimbote",
    zone: "Nuevo Chimbote",
    address: "Av Pacifico Mz. S3 Lt. 36 Mz S3 Lte 36 (Urb José Mariátegui, Nuevo )",
    reference: "",
    lat: -9.128020046390095,
    lng: -78.51903308199428,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 20:00",
      "SÁBADO",
      "08:30 A 19:00"
    ],
    phone: "",
    ubigeo: "021809"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Santa",
    district: "Nuevo Chimbote",
    zone: "Nuevo Chimbote (Av Pacifico Mz. S3 Lt. Nro 36 Urb José Mariátegui, Nuevo Chimbote (Frente A la Ferreteria Becor))",
    address: "Av Pacifico Mz. S3 Lt. Nro 36 Urb José Mariátegui, Nuevo Chimbote (Frente A la Ferreteria Becor)",
    reference: "",
    lat: -9.128020046390095,
    lng: -78.51903308199428,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 20:30",
      "SÁBADO",
      "08:30 A 19:00"
    ],
    phone: "",
    ubigeo: "021809"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Sihuas",
    district: "Sihuas",
    zone: "Sihuas",
    address: "Av 28 de Julio Nro 330 Sihuas",
    reference: "",
    lat: -8.555069098751295,
    lng: -77.63084663378568,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "021901"
  },
  {
    courier: "olva",
    department: "Ancash",
    province: "Yungay",
    district: "Yungay",
    zone: "Tienda Yungay",
    address: "Av Arias Graziani S/N",
    reference: "",
    lat: -9.141794946996644,
    lng: -77.74440349819909,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "022001"
  },
  {
    courier: "olva",
    department: "Apurimac",
    province: "Abancay",
    district: "Abancay",
    zone: "Tienda Abancay",
    address: "Av Elias Nro 118 (Costado de Onp)",
    reference: "",
    lat: -13.635552745779922,
    lng: -72.8752806194583,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:30",
      "SÁBADO",
      "08:00 A 19:30"
    ],
    phone: "",
    ubigeo: "030101"
  },
  {
    courier: "olva",
    department: "Apurimac",
    province: "Abancay",
    district: "Curahuasi",
    zone: "Curahuasi (Aby)",
    address: "Ca Apurimac S/N (S/N A Media Cuadra del Banco de la Nacion)",
    reference: "",
    lat: -13.541076511967095,
    lng: -72.696613663153,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 12:30"
    ],
    phone: "",
    ubigeo: "030104"
  },
  {
    courier: "olva",
    department: "Apurimac",
    province: "Andahuaylas",
    district: "Andahuaylas",
    zone: "Andahuaylas",
    address: "Jr Juan Francisco Ramos Nro 559 Andahuaylas",
    reference: "",
    lat: -13.65737198863764,
    lng: -73.38919604961839,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 17:00",
      "SÁBADO",
      "08:30 A 13:00"
    ],
    phone: "",
    ubigeo: "030201"
  },
  {
    courier: "olva",
    department: "Apurimac",
    province: "Aymaraes",
    district: "Chalhuanca",
    zone: "Chalhuanca (Aby)",
    address: "Av Panamericana Nro 528 Chalhuanca",
    reference: "",
    lat: -14.296005987849489,
    lng: -73.24606181942157,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "030401"
  },
  {
    courier: "olva",
    department: "Apurimac",
    province: "Chincheros",
    district: "Chincheros",
    zone: "Uripa",
    address: "Av los Incas S/N",
    reference: "",
    lat: -13.532173536164477,
    lng: -73.67851541109879,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "030601"
  },
  {
    courier: "olva",
    department: "Apurimac",
    province: "Grau",
    district: "Chuquibambilla",
    zone: "Chuquibambilla",
    address: "Av Bolivar S/N (Al Costado de la Escuela Señor de la Exaltación)",
    reference: "",
    lat: -14.103713,
    lng: -72.763313,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "15:00 A 18:00"
    ],
    phone: "",
    ubigeo: "030701"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Arequipa",
    zone: "Tienda Iv- Centenario",
    address: "Cal Mayta Capac Nro 601 (Iv Centenario)",
    reference: "",
    lat: -16.407661567889907,
    lng: -71.53415841336778,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:00",
      "SÁBADO",
      "09:30 A 15:00"
    ],
    phone: "",
    ubigeo: "040101"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Arequipa",
    zone: "Tienda Moral (Ex",
    address: "Calle Moral Nro 105",
    reference: "",
    lat: -16.3976372,
    lng: -71.5350769,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:30",
      "SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "040101"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Arequipa",
    zone: "Tienda Parra",
    address: "Av Parra Nro 388 Arequipa",
    reference: "",
    lat: -16.415184,
    lng: -71.5474957,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:30",
      "SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "040101"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cayma",
    zone: "Agente Enace",
    address: "Mz P5 Lte 24 Conjunto Habitacional Dean Valdivia (Enace)",
    reference: "",
    lat: -16.33141,
    lng: -71.546231,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:30 A 19:00"
    ],
    phone: "",
    ubigeo: "040103"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cayma",
    zone: "Tienda Cayma (Aqp)",
    address: "Av Ramon Castilla 1021 Nro 1021",
    reference: "",
    lat: -16.357274670412504,
    lng: -71.54378226553119,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 15:00",
      "SÁBADO",
      "09:30 A 15:00"
    ],
    phone: "",
    ubigeo: "040103"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Ag. Olva",
    address: "Cr Carretera Yura Mz C Lte 12 Eduardo de la Pinella (Frente A Semaforo Ciudad Municipal)",
    reference: "",
    lat: -16.3268611111111,
    lng: -71.5951666666666,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:30 A 19:00"
    ],
    phone: "",
    ubigeo: "040104"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Agente Piñateria Dulce Fantasia-Cerro Colorado",
    address: "Jr Progreso Mz 12 Lte 4 Zn A Pachacutec- Cerro Colorado, Arequipa",
    reference: "",
    lat: -16.3945395,
    lng: -71.5692392,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 12:00",
      "SÁBADO",
      "14:00 A 19:00"
    ],
    phone: "",
    ubigeo: "040104"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Colorado",
    zone: "Tienda Cerro Colorado",
    address: "Ca Miguel Grau Nro 214 Plaza de las Américas - Cerro Colorado - Arequipa",
    reference: "",
    lat: -16.37616659604099,
    lng: -71.56062790389406,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 19:30"
    ],
    phone: "",
    ubigeo: "040104"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Jacobo Hunter",
    zone: "Agente Hunter",
    address: "Ca Mariscal Ureta Mz U Lte 1 Urbanizacion San Juan de Dios (Esquina Estadio Juan Velazco Alvarado)",
    reference: "",
    lat: -16.4507689,
    lng: -71.5538838,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "040107"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Jacobo Hunter",
    zone: "Agente Hunter (Av las Americas Mz J Lte 1 Urbanizacion la Colina I (Costado de Metro))",
    address: "Av las Americas Mz J Lte 1 Urbanizacion la Colina I (Costado de Metro)",
    reference: "",
    lat: -16.4379705583189,
    lng: -71.5609674596215,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "040107"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Jose Luis Bustamante y Rivero",
    zone: "Agente Simon Bolivar",
    address: "Av Caracas Nro 714 (Frente A Comisaria Simon Bolivar )",
    reference: "",
    lat: -16.42,
    lng: -71.53,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "040129",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Jose Luis Bustamante y Rivero",
    zone: "Tienda Jose Luis Bustamante y Rivero",
    address: "Av Daniel Alcides Carrión Nro 241 José Luis Bustamante Rive",
    reference: "",
    lat: -16.4227234,
    lng: -71.5317239,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "040129"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Jose Luis Bustamante y Rivero",
    zone: "Tienda Pizarro",
    address: "Av Pizarro Nro 127 (Sub Lote 4)",
    reference: "",
    lat: -16.423370354531432,
    lng: -71.51616787619838,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:30",
      "SÁBADO",
      "09:00 A 15:00"
    ],
    phone: "",
    ubigeo: "040129"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "La Joya",
    zone: "La Joya-Arequipa",
    address: "Av Panamericana - Pueblo Joven Zona B Mz A Lte 12 la Joya - Arequipa",
    reference: "",
    lat: -16.4941934,
    lng: -71.8405559,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:30",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040108"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Mariano Melgar",
    zone: "Agente Mariano Melgar",
    address: "Huascar 323 S/N",
    reference: "",
    lat: -16.4035063,
    lng: -71.5002758,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 12:00",
      "SÁBADO",
      "14:00 A 19:00"
    ],
    phone: "",
    ubigeo: "040109"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Miraflores",
    zone: "Agente Alameda Salaverry",
    address: "Mz O Lte 1 Urbanizacion Alameda Salaverry (Esquina Yango Corporación)",
    reference: "",
    lat: -12.12,
    lng: -77.03,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "040110",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Miraflores",
    zone: "Tienda Miraflores",
    address: "Av San Martin Nro 427",
    reference: "",
    lat: -16.3932632,
    lng: -71.5203926,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:30",
      "SÁBADO",
      "09:30 A 15:00"
    ],
    phone: "",
    ubigeo: "040110"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Paucarpata",
    zone: "Agente Av Argentina",
    address: "Av Argentina 209 Pueblo Joven Francisco Mostajo",
    reference: "",
    lat: -16.41140970109983,
    lng: -71.51167588165967,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "040112"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Paucarpata",
    zone: "Agente Av Kennedy",
    address: "Av Kennedy 1300 Urbanizacion Jesus Maria",
    reference: "",
    lat: -16.419750436664813,
    lng: -71.50906080738656,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 17:30"
    ],
    phone: "",
    ubigeo: "040112"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Paucarpata",
    zone: "Tienda Paucarpata",
    address: "Urb El Cayro Mz A Lte 6 Mz A Lte 6 D-Arequipa - Arequipa - Paucarpata",
    reference: "",
    lat: -16.416985439791755,
    lng: -71.50670582368267,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:30",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "040112"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Santa Rita de Siguas",
    zone: "Agente Santa Rita de Siguas",
    address: "Agusto Guilardi Mz I Lte 13",
    reference: "",
    lat: -16.4892189,
    lng: -72.0940792,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 12:00",
      "SÁBADO",
      "14:00 A 19:00"
    ],
    phone: "",
    ubigeo: "040121"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Socabaya",
    zone: "Agente Horacio Zeballos -Socabaya-Botica Flores",
    address: "Av San Fernando Mz 1 Lte 15",
    reference: "",
    lat: -16.4889211294952,
    lng: -71.5101478032154,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040122"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Socabaya",
    zone: "Tienda Socabaya",
    address: "Socabaya Nro 435",
    reference: "",
    lat: -16.441579661944747,
    lng: -71.52888445345492,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:30",
      "SÁBADO",
      "08:30 A 15:00"
    ],
    phone: "",
    ubigeo: "040122"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Arequipa",
    district: "Yanahuara",
    zone: "Tienda Almacen Aqp",
    address: "Ca Pampita Zevallos Nro 175 Yanahuara, Arequipa",
    reference: "",
    lat: -16.392298,
    lng: -71.5464064,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:00",
      "SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "040126"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Camana",
    district: "Camana",
    zone: "Camana",
    address: "Av Mariscal Castilla Nro 156 Cercado, Camana",
    reference: "",
    lat: -16.62345371323128,
    lng: -72.70986183677175,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:30",
      "SÁBADO",
      "08:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040201"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caraveli",
    district: "Acari",
    zone: "Agente Acari",
    address: "S. Barranca N°1012 Mz 29 Lte 5",
    reference: "",
    lat: -15.4336175,
    lng: -74.6169235,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "040302"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caraveli",
    district: "Atico",
    zone: "Agente Atico",
    address: "Caraveli Nro 402",
    reference: "",
    lat: -16.2272245,
    lng: -73.6129852,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040303"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caraveli",
    district: "Atico",
    zone: "Agente Atico (Caraveli Nro 402)",
    address: "Caraveli Nro 402",
    reference: "",
    lat: -16.2272245,
    lng: -73.6129852,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040303"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caraveli",
    district: "Atico",
    zone: "Agente Atico-Arequipa",
    address: "Caraveli Nro 402",
    reference: "",
    lat: -16.2272245,
    lng: -73.6129852,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040303"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caraveli",
    district: "Caraveli",
    zone: "Agente Caraveli",
    address: "Av. Peru Nro 104",
    reference: "",
    lat: -15.7763342,
    lng: -73.3656253,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040301"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caraveli",
    district: "Caraveli",
    zone: "Agente Caraveli (Av Peru Nro 104)",
    address: "Av Peru Nro 104",
    reference: "",
    lat: -15.7763342,
    lng: -73.3656253,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "040301"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caraveli",
    district: "Chala",
    zone: "Agente Chala",
    address: "Ah Manuel Prado Mz 50 Av Progreso Chala S/N",
    reference: "",
    lat: -15.8484255,
    lng: -74.2527168,
    type: "Agente Olva",
    hours: [
      "LUNES A JUEVES",
      "09:00 A 19:00",
      "VIERNES A SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "040307"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Castilla",
    district: "Aplao",
    zone: "Aplao",
    address: "Av Av 3 de Abril Mz C2 Lte 3 ((Frente A Transportes del Carpio))",
    reference: "",
    lat: -16.0754919,
    lng: -72.4906913,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:30",
      "SÁBADO",
      "09:00 A 14:30"
    ],
    phone: "",
    ubigeo: "040401"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Castilla",
    district: "Orcopampa",
    zone: "Agente Orcopampa",
    address: "Buenaventura Con Av. Orcopampa S/N",
    reference: "",
    lat: -15.26825,
    lng: -72.3441388888888,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040409"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caylloma",
    district: "Chivay",
    zone: "Agente Multipel Chivay-Arequipa",
    address: "Calle Leticia S/N (Ñ 9 Esq Con Siglo Xx A Una Cdra de la Plaza de Chivay, Frent)",
    reference: "",
    lat: -15.641042,
    lng: -71.573034,
    type: "Agente Olva",
    hours: [
      "LUNES A MIÉRCOLES",
      "09:00 A 17:00",
      "JUEVES",
      "09:00 A 18:00",
      "VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "040501"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caylloma",
    district: "El Pedregal",
    zone: "Agente Mi Libreria Mercado Metropolitano Majes",
    address: "Ca Municipal Mz H Lte 11 (Mercado Metropolitano Tienda Exterior A-10)",
    reference: "",
    lat: -16.4,
    lng: -71.54,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "040520",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Caylloma",
    district: "El Pedregal",
    zone: "Majes",
    address: "Av Carlos Shutton Mz A 21 Lte 1 El Pedregal - Arequipa",
    reference: "",
    lat: -16.361238496077167,
    lng: -72.19215527957056,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:00",
      "SÁBADO",
      "08:30 A 14:00"
    ],
    phone: "",
    ubigeo: "040520"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Condesuyos",
    district: "Chuquibamba",
    zone: "Agente Chuquibamba",
    address: "Terminal Terrestre S/N",
    reference: "",
    lat: -15.8398665,
    lng: -72.6530348,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040601"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "Islay",
    district: "Mollendo",
    zone: "Tienda Mollendo",
    address: "Ca Comercio Nro 472 (B)",
    reference: "",
    lat: -17.027213786642783,
    lng: -72.01543626771263,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "040701"
  },
  {
    courier: "olva",
    department: "Arequipa",
    province: "La Union",
    district: "Cotahuasi",
    zone: "Agente Cotahuasi",
    address: "Lima Nro 113",
    reference: "",
    lat: -15.2126388888888,
    lng: -72.8886388888888,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "040801"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Cangallo",
    district: "Cangallo",
    zone: "Cangallo",
    address: "Av Faustino Sanchez Carrion Nro 198 Cangallo",
    reference: "",
    lat: -13.6304831017495,
    lng: -74.14385441592319,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "050201"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Huamanga",
    district: "Ayacucho",
    zone: "Olva Centro",
    address: "Jr Sol Nro 388",
    reference: "",
    lat: -74.2227737197785,
    lng: -13.16017032823708,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "050101"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Huamanga",
    district: "Ayacucho",
    zone: "Olva Principal",
    address: "Jr Prolongacion Manco Capac Nro 940 Ayacucho",
    reference: "",
    lat: -13.155542663354057,
    lng: -74.22829466907923,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "050101"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Huamanga",
    district: "Ayacucho",
    zone: "Olva Terminal",
    address: "Av Cantuta Asociación los Artesanos Mz P Lte 19 (Frente Al Terminal)",
    reference: "",
    lat: -13.134633463060604,
    lng: -74.23170680442902,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "050101"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Huanta",
    district: "Huanta",
    zone: "Huanta",
    address: "Gervasio Santillana Nro 340 Huanta",
    reference: "",
    lat: -12.940629048800627,
    lng: -74.25011444986876,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:30 A 18:00"
    ],
    phone: "",
    ubigeo: "050401"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "La Mar",
    district: "San Francisco",
    zone: "San Francisco",
    address: "Av Huanta S/N (Frente Al Hospital Nuevo)",
    reference: "",
    lat: -12.699066,
    lng: -73.862671,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:00",
      "SÁBADO",
      "08:30 A 18:00"
    ],
    phone: "",
    ubigeo: "050503"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "La Mar",
    district: "San Francisco",
    zone: "Tienda San Francisco",
    address: "Av Huanta S/N (Frente Al Hospital Nuevo)",
    reference: "",
    lat: -12.699066,
    lng: -73.862671,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:00",
      "SÁBADO",
      "08:30 A 18:00"
    ],
    phone: "",
    ubigeo: "050503"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "La Mar",
    district: "San Miguel",
    zone: "San Miguel (Ayacuc)",
    address: "Jr la Mar Nro 217 San Miguel - Ayacucho",
    reference: "",
    lat: -13.011596747280933,
    lng: -73.98106554537198,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:00 A 14:00"
    ],
    phone: "",
    ubigeo: "050501"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Lucanas",
    district: "Puquio",
    zone: "Puquio",
    address: "Jr San Pedro Nro 214 (- Al Costado de la Reniec)",
    reference: "",
    lat: -14.694314528534589,
    lng: -74.12267907706305,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:00",
      "SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "050601"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Parinacochas",
    district: "Coracora",
    zone: "Cora Cora",
    address: "Jr 2 de Mayo Nro 924 Cora Cora",
    reference: "",
    lat: -15.016787880117315,
    lng: -73.78255638643952,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "050701"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Paucar del Sara Sara",
    district: "Pausa",
    zone: "Pausa (Paucar del Sa",
    address: "Jr Comercio Nro 252 Pausa",
    reference: "",
    lat: -15.27920799513547,
    lng: -73.3459156747773,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 12:00"
    ],
    phone: "",
    ubigeo: "050801"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Sucre",
    district: "Querobamba",
    zone: "Querobamba",
    address: "Jr Alfonso Ugarte S/N (A Unos Metros de la Polleria \" Entre Patas\")",
    reference: "",
    lat: -14.011358241419464,
    lng: -73.8400139626535,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "050901"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Victor Fajardo",
    district: "Huancapi",
    zone: "Huancapi (Ayp)",
    address: "Jr Ayacucho Nro 390 Huancapi",
    reference: "",
    lat: -13.751714568009325,
    lng: -74.0669161748066,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "14:00 A 18:00"
    ],
    phone: "",
    ubigeo: "051001"
  },
  {
    courier: "olva",
    department: "Ayacucho",
    province: "Vilcas Huaman",
    district: "Vilcas Huaman",
    zone: "Vilcashuaman",
    address: "Jr Inca Pachacutec Nro 304 Vilcashuaman",
    reference: "",
    lat: -13.652073699767099,
    lng: -73.9524065337039,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "10:00 A 17:00",
      "SÁBADO",
      "00:00 A 00:00"
    ],
    phone: "",
    ubigeo: "051101"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Cajabamba",
    district: "Cajabamba",
    zone: "Cajabamba",
    address: "Jr Bolognesi Nro 117 Cajabamba (A Una Cuadra de la Reniec)",
    reference: "",
    lat: -7.620411025601716,
    lng: -78.0475052332751,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "11:00 A 19:30",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "060201"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Cajabamba",
    district: "Cajabamba",
    zone: "Tienda Cajabamba",
    address: "Jr Bolognesi Nro 117 Urbanizacion la Alameda (1 Cuadra Reniec)",
    reference: "",
    lat: -7.620411025601716,
    lng: -78.0475052332751,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "11:00 A 19:30",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "060201"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Cajamarca",
    address: "Jr los Nogales Nro 426 Villa Universitaria - Cajamarca",
    reference: "",
    lat: -7.620657282460302,
    lng: -78.0474940453589,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "060101"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Tienda Cajamarca-Almacen Central",
    address: "Los Nogales Nro 426 (Villa Universit)",
    reference: "",
    lat: -7.620657282460302,
    lng: -78.0474940453589,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "060101"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Tienda Eten -Cajamarca",
    address: "Jr Eten Nro 159",
    reference: "",
    lat: -7.15974059351153,
    lng: -78.51504631938964,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "060101"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Celendin",
    district: "Celendin",
    zone: "Celendin",
    address: "Jr Esquina Entre Bolognesi y Pedro Otiz de Montoya S/N",
    reference: "",
    lat: -6.867588178239083,
    lng: -78.14338630267342,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 12:00"
    ],
    phone: "",
    ubigeo: "060301"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Chota",
    district: "Chota",
    zone: "Chota",
    address: "Jr Gregorio Malca Nro 625 Chota (A Una Cdra de la Plaza de Armas)",
    reference: "",
    lat: -6.560469741530443,
    lng: -78.65030409278027,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "060401"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Chota",
    district: "Chota",
    zone: "Tienda Chota",
    address: "Jr Gregorio Malca Nro 625 (Centro de Chota Cajamarca)",
    reference: "",
    lat: -6.560469741530443,
    lng: -78.65030409278027,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "060401"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Contumaza",
    district: "Chilete",
    zone: "Chilete",
    address: "Jr Sanchez Carrión Nro 439 (Alt. del Parque Infantil)",
    reference: "",
    lat: -7.223207038295139,
    lng: -78.83826161057712,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:30"
    ],
    phone: "",
    ubigeo: "060502"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Contumaza",
    district: "Contumaza",
    zone: "Contumaza (Caj)",
    address: "Jr Jose Galvez S/N S/N - Contumaza",
    reference: "",
    lat: -7.364546882354694,
    lng: -78.79981826325042,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 12:00"
    ],
    phone: "",
    ubigeo: "060501"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Contumaza",
    district: "Tembladera",
    zone: "Tembladera (Caj)",
    address: "Jr Buenos Aires Nro 325 (1/2 Cuadra de la Plaza de Armas)",
    reference: "",
    lat: -7.253795740841578,
    lng: -79.12985081801115,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 21:00"
    ],
    phone: "",
    ubigeo: "060508"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Cutervo",
    district: "Cutervo",
    zone: "Cutervo",
    address: "Jr Ramon Castilla Nro 353 Cutervo (A Media Cuadra de la Plaza de Armas)",
    reference: "",
    lat: -6.376532704758642,
    lng: -78.81827999675168,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "060601"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Cutervo",
    district: "Cutervo",
    zone: "Tienda Cutervo",
    address: "Jr Ramon Castilla Nro 353 (A 1/2 Cuadra de la Plaza de Armas)",
    reference: "",
    lat: -6.376532704758642,
    lng: -78.81827999675168,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "060601"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Hualgayoc",
    district: "Bambamarca",
    zone: "Bambamarca",
    address: "Jr San Carlos Nro 1015 Bambamarca",
    reference: "",
    lat: -6.680303515638402,
    lng: -78.5217822004585,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:30",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "060701"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Jaen",
    district: "Jaen",
    zone: "Jaen",
    address: "Ca San Martin Nro 1255 Jaen",
    reference: "",
    lat: -5.70873988103543,
    lng: -78.80708575113424,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "060801"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Jaen",
    district: "Pucara",
    zone: "Pucara",
    address: "Av Lindo Nro 150 Pucara",
    reference: "",
    lat: -6.039232131554113,
    lng: -79.1285931266526,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "060808"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Jaen",
    district: "Pucara",
    zone: "Pucara (Av Lindo Nro 150 - Pucara)",
    address: "Av Lindo Nro 150 - Pucara",
    reference: "",
    lat: -6.039232131554113,
    lng: -79.1285931266526,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "060808"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "San Ignacio",
    district: "Namballe",
    zone: "Namballe (Sig)",
    address: "Jr Señor Cautivo S/N",
    reference: "",
    lat: -5.0025538920777795,
    lng: -79.08786597548736,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "060905"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "San Ignacio",
    district: "Namballe",
    zone: "Namballe (Sig) (Jr Cautivo S/N Namballe)",
    address: "Jr Cautivo S/N Namballe",
    reference: "",
    lat: -5.0025538920777795,
    lng: -79.08786597548736,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "060905"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "San Ignacio",
    district: "San Ignacio",
    zone: "San Ignacio",
    address: "Jr San Martin Nro 456 - San Ignacio (Frente Al Parque Principal)",
    reference: "",
    lat: -5.146415351111655,
    lng: -79.00533291466135,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "060901"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "San Ignacio",
    district: "San Ignacio",
    zone: "Tienda San Ignacio",
    address: "Jr San Martin Nro 456 - San Ignacio (Frente Al Parque Principal)",
    reference: "",
    lat: -5.146415351111655,
    lng: -79.00533291466135,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "060901"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "San Marcos",
    district: "San Marcos",
    zone: "San Marcos (Caj)",
    address: "Entre Jr. Miguel Grau y Jr. Tupac Amaru S/N San Marcos (A Una Cuadra de la Notaría Rodriguez)",
    reference: "",
    lat: -7.333461656397988,
    lng: -78.17090791600184,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "07:00 A 14:00",
      "SÁBADO",
      "14:00 A 17:00"
    ],
    phone: "",
    ubigeo: "061001"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "San Miguel",
    district: "San Miguel",
    zone: "San Miguel",
    address: "Jr Miguel Grau Nro 338 San Miguel",
    reference: "",
    lat: -6.999759849136942,
    lng: -78.8504730338042,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 15:00"
    ],
    phone: "",
    ubigeo: "061101"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "San Pablo",
    district: "San Pablo",
    zone: "San Pablo (Caj)",
    address: "Jr Nestor Batanero Nro 478 San Pablo",
    reference: "",
    lat: -7.116902771128757,
    lng: -78.8224858804498,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 20:00"
    ],
    phone: "",
    ubigeo: "061201"
  },
  {
    courier: "olva",
    department: "Cajamarca",
    province: "Santa Cruz",
    district: "Santa Cruz",
    zone: "Santa Cruz (Cix)",
    address: "Jr Zarumilla Nro 150 Santa Cruz",
    reference: "",
    lat: -6.6244815060131375,
    lng: -78.94506922936944,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 12:00"
    ],
    phone: "",
    ubigeo: "061301"
  },
  {
    courier: "olva",
    department: "Callao",
    province: "Callao",
    district: "Callao",
    zone: "Olva Almacen",
    address: "Av Argentina Nro 4458",
    reference: "",
    lat: -12.048736,
    lng: -77.099411,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "070101"
  },
  {
    courier: "olva",
    department: "Callao",
    province: "Callao",
    district: "Callao",
    zone: "Olva Canta Callao",
    address: "Av Oficina Olva Canta Callao S/N Urbanizacion San Juan Masias",
    reference: "",
    lat: -11.99749108,
    lng: -77.11394587,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:30",
      "SÁBADO",
      "08:00 A 14:00"
    ],
    phone: "",
    ubigeo: "070101"
  },
  {
    courier: "olva",
    department: "Callao",
    province: "Callao",
    district: "La Perla",
    zone: "Agente Olva Callao",
    address: "Avenida la Marina 571(Av la Marira 570 Frente A Frente del Banco Continental Bodega Don Pedrito)",
    reference: "",
    lat: -12.068144,
    lng: -77.115414,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "070104"
  },
  {
    courier: "olva",
    department: "Callao",
    province: "Callao",
    district: "Ventanilla",
    zone: "Agente Olva Ventanilla",
    address: "Ca Mz K Lte 1 Sector Pesquero Ii Pachacutec Mz K",
    reference: "",
    lat: -11.838469775197908,
    lng: -77.15543419772983,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "070106"
  },
  {
    courier: "olva",
    department: "Callao",
    province: "Callao",
    district: "Ventanilla",
    zone: "Olva Ventanilla",
    address: "Ca Oficina Ventanilla Mz O5 Urbanizacion los Licenciados",
    reference: "",
    lat: -11.878057,
    lng: -77.12748,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:30",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "070106"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Canchis",
    district: "Sicuani",
    zone: "Sicuani",
    address: "Jr Dos de Mayo Nro 758 - Sicuani",
    reference: "",
    lat: -14.266264923832908,
    lng: -71.22711229092312,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "080601"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Canchis",
    district: "Sicuani",
    zone: "Tienda Sicuani",
    address: "Jr Dos de Mayo Nro 758",
    reference: "",
    lat: -14.266264923832908,
    lng: -71.22711229092312,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "080601"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Chumbivilcas",
    district: "Santo Tomas",
    zone: "Santo Tomas",
    address: "Ca Loreto S/N",
    reference: "",
    lat: -14.44319362690782,
    lng: -72.08505354674305,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "080701"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Cusco",
    district: "Cusco",
    zone: "Tienda Miraflores",
    address: "Ca Damian Acuna Mz B Lte 11 Cooperativa Miraflores, Sector Tica Tica - Cusco",
    reference: "",
    lat: -13.506267108860396,
    lng: -71.99766845713268,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "080101"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Cusco",
    district: "Cusco",
    zone: "Tienda Pardo-Cusco",
    address: "Av Pardo Nro 575 B-Paseo de los Heroes - Cusco",
    reference: "",
    lat: -13.5315221835103,
    lng: -71.9800560036339,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "080101"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Cusco",
    district: "San Jeronimo",
    zone: "Tienda Av 3 C-8 Larapa Grande S/N",
    address: "Av 3 C-8 Larapa Grande S/N",
    reference: "",
    lat: -13.532755,
    lng: -71.902941,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:30",
      "SÁBADO",
      "08:30 A 13:00"
    ],
    phone: "",
    ubigeo: "080104"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Cusco",
    district: "San Sebastian",
    zone: "Tienda los Nogales",
    address: "Av Pachacamac Mz L Lte 1 Urbanizacion los Nogales (Paradero Kiosko los Nogales)",
    reference: "",
    lat: -71.9360411,
    lng: -13.540499,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "080105"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Cusco",
    district: "Wanchaq",
    zone: "Tienda Wanchaq Cusco",
    address: "Wanchaq Mz C Lte 5 Prolongacion Tupac Amaru (Urb El Periodista)",
    reference: "",
    lat: -13.530011798323821,
    lng: -71.94458550434148,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "080108"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Espinar",
    district: "Espinar",
    zone: "Yauri-Espinar",
    address: "Ca Magma Tintaya Nro 217",
    reference: "",
    lat: -14.795481632569148,
    lng: -71.41015414718875,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "080801"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "La Convencion",
    district: "Pichari",
    zone: "Pichari",
    address: "Av Inca Garcilazo de la Vega Nro 649 - Pichari",
    reference: "",
    lat: -12.520042555783938,
    lng: -73.82975244173043,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:30"
    ],
    phone: "",
    ubigeo: "080910"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "La Convencion",
    district: "Quillabamba",
    zone: "Quillabamba",
    address: "Av San Martin Nro 685 Santa Ana, la Convencion (Quillabamba)",
    reference: "",
    lat: -12.866872452157436,
    lng: -72.697265416115,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "080901"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "La Convencion",
    district: "Quillabamba",
    zone: "Tienda Quillabamba",
    address: "Av San Martin Nro 685",
    reference: "",
    lat: -12.866872452157436,
    lng: -72.697265416115,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "080901"
  },
  {
    courier: "olva",
    department: "Cusco",
    province: "Urubamba",
    district: "Urubamba",
    zone: "Urubamba (Cuzco)",
    address: "Av Mariscal Castilla Nro 501 -B, Urubamba",
    reference: "",
    lat: -13.304958650412274,
    lng: -72.11367595665426,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 12:30"
    ],
    phone: "",
    ubigeo: "081301"
  },
  {
    courier: "olva",
    department: "Huancavelica",
    province: "Acobamba",
    district: "Acobamba",
    zone: "Acobamba (Hcv)",
    address: "Av Manuel Candamo Nro 620 Cercado Acobamba",
    reference: "",
    lat: -12.841485320827674,
    lng: -74.57096819125064,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "090201"
  },
  {
    courier: "olva",
    department: "Huancavelica",
    province: "Acobamba",
    district: "Paucara",
    zone: "Paucara",
    address: "Jr Huascar S/N S/N (Costado Mega Centro Centro de Paucara)",
    reference: "",
    lat: -12.72773996749592,
    lng: -74.66673157483233,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 13:00",
      "SÁBADO",
      "09:00 A 12:00"
    ],
    phone: "",
    ubigeo: "090206"
  },
  {
    courier: "olva",
    department: "Huancavelica",
    province: "Angaraes",
    district: "Lircay",
    zone: "Lircay (Hcv)",
    address: "Jr Cahuide Nro 146 Pueblo Nuevo - Lircay",
    reference: "",
    lat: -12.992109298841546,
    lng: -74.72194067625152,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "090301"
  },
  {
    courier: "olva",
    department: "Huancavelica",
    province: "Castrovirreyna",
    district: "Castrovirreyna",
    zone: "Castrovirreyna",
    address: "Jr Castrovirreyna S/N - S/N Ref. Al Costado del Banco de la Nacion",
    reference: "",
    lat: -13.282632292623589,
    lng: -75.31917405702438,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 12:00"
    ],
    phone: "",
    ubigeo: "090401"
  },
  {
    courier: "olva",
    department: "Huancavelica",
    province: "Churcampa",
    district: "Churcampa",
    zone: "Churcampa",
    address: "Jr Antonio Raymondi Nro 615 Churcampa",
    reference: "",
    lat: -12.739090522324899,
    lng: -74.38631696276629,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "090501"
  },
  {
    courier: "olva",
    department: "Huancavelica",
    province: "Huancavelica",
    district: "Huancavelica",
    zone: "Huancavelica",
    address: "Jr Agustin Gamarra Nro 305 Huancavelica",
    reference: "",
    lat: -12.786507032051441,
    lng: -74.97467804742038,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 17:30",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "090101"
  },
  {
    courier: "olva",
    department: "Huancavelica",
    province: "Huaytara",
    district: "Huaytara",
    zone: "Huaytara",
    address: "Ca 26 de Setiembre S/N Plaza de Armas - Huaytara",
    reference: "",
    lat: -13.604563947470709,
    lng: -75.35273114817302,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 17:30",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "090601"
  },
  {
    courier: "olva",
    department: "Huancavelica",
    province: "Tayacaja",
    district: "Pampas",
    zone: "Pampas",
    address: "Jr San Martin Nro 370 (A Dos Cdras. del Parque Pampas)",
    reference: "",
    lat: -12.398903508893335,
    lng: -74.87012492044695,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 16:30",
      "SÁBADO",
      "08:00 A 12:30"
    ],
    phone: "",
    ubigeo: "090701"
  },
  {
    courier: "olva",
    department: "Huancavelica",
    province: "Tayacaja",
    district: "Pampas",
    zone: "Tienda Pampas",
    address: "Jr San Martin Nro 370 (A Dos Cdras. del Parque de Pampas)",
    reference: "",
    lat: -12.398903508893335,
    lng: -74.87012492044695,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 16:30",
      "SÁBADO",
      "08:00 A 12:30"
    ],
    phone: "",
    ubigeo: "090701"
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Ambo",
    district: "Ambo",
    zone: "Agente Ambo",
    address: "Jr 28 de Julio Nro 609",
    reference: "",
    lat: -9.93,
    lng: -76.24,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "100201",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Huacaybamba",
    district: "Huacaybamba",
    zone: "Huacaybamba",
    address: "Av Lima S/N Huacaybamba",
    reference: "",
    lat: -8.953813,
    lng: -76.803698,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "100401"
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Huanuco",
    district: "Amarilis",
    zone: "Agente Portales",
    address: "Av Colectora Mz F Lte 3 Urbanizacion Urb Santa Maria (Frente A la Ladrilleria Chapacuete)",
    reference: "",
    lat: -9.912366162461282,
    lng: -76.22769212208284,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:30 A 19:00"
    ],
    phone: "",
    ubigeo: "100102"
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Huanuco",
    district: "Huanuco",
    zone: "Operaciones Huanuco",
    address: "Jr Damaso Beraun Nro 999 Huanuco",
    reference: "",
    lat: -9.930205374531932,
    lng: -76.2371966299376,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 22:00",
      "SÁBADO",
      "09:00 A 22:00"
    ],
    phone: "",
    ubigeo: "100101"
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Huanuco",
    district: "Huanuco",
    zone: "Tienda Huanuco",
    address: "Jr Damaso Beraun Nro 999",
    reference: "",
    lat: -9.930205374531932,
    lng: -76.2371966299376,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 10:00",
      "SÁBADO",
      "09:00 A 22:00"
    ],
    phone: "",
    ubigeo: "100101"
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Huanuco",
    district: "Pillco Marca",
    zone: "Agente Pillco Marca",
    address: "Av Juan Velasco Alvarado Nro 729 Urbanizacion Pillco Marca",
    reference: "",
    lat: -9.951976077021145,
    lng: -76.2517834763201,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 19:00"
    ],
    phone: "",
    ubigeo: "100111"
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Leoncio Prado",
    district: "Aucayacu",
    zone: "Aucayacu-Tingo Maria",
    address: "Jr Huanuco 522 Nro 522 (Aucayacu)",
    reference: "",
    lat: -8.929364345412395,
    lng: -76.11663388060418,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 14:30"
    ],
    phone: "",
    ubigeo: "100604"
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Leoncio Prado",
    district: "Aucayacu",
    zone: "Tienda Aucayacu",
    address: "Jr Huanuco Nro 522",
    reference: "",
    lat: -8.929364345412395,
    lng: -76.11663388060418,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 19:00"
    ],
    phone: "",
    ubigeo: "100604"
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Leoncio Prado",
    district: "Tingo Maria",
    zone: "Operaciones Tingo Maria",
    address: "Av Tito Jaime Nro 841 Tingo Maria",
    reference: "",
    lat: -9.294408166514257,
    lng: -75.99943187232655,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:30 A 19:00"
    ],
    phone: "",
    ubigeo: "100601"
  },
  {
    courier: "olva",
    department: "Huanuco",
    province: "Marañon",
    district: "Huacrachuco",
    zone: "Huacrachuco",
    address: "Av 28 de Julio Nro 503 Mercado de Abastos - Huacrachuco",
    reference: "",
    lat: -8.605628346394822,
    lng: -77.14860067488902,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 12:00"
    ],
    phone: "",
    ubigeo: "100701"
  },
  {
    courier: "olva",
    department: "Ica",
    province: "Chincha",
    district: "Chincha Alta",
    zone: "Tienda Chincha",
    address: "Ca Junin Nro 183 (A Media Cuadra de la Plaza de Armas)",
    reference: "",
    lat: -13.418788727914258,
    lng: -76.13109821728685,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:30",
      "SÁBADO",
      "09:00 A 19:30"
    ],
    phone: "",
    ubigeo: "110201"
  },
  {
    courier: "olva",
    department: "Ica",
    province: "Ica",
    district: "Ica",
    zone: "Ica",
    address: "Ca Guatemala Nro 161 Urbanizacion San Francisco, Ica (A Espaldas de Oeshle)",
    reference: "",
    lat: -14.065448684190407,
    lng: -75.73127545828511,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:15 A 21:00",
      "SÁBADO",
      "08:15 A 20:00"
    ],
    phone: "",
    ubigeo: "110101"
  },
  {
    courier: "olva",
    department: "Ica",
    province: "Nazca",
    district: "Marcona",
    zone: "Marcona",
    address: "Agrup-. Popular Villa Magistral Mz A Lte 3",
    reference: "",
    lat: -15.365364151149807,
    lng: -75.16321839090155,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:30"
    ],
    phone: "",
    ubigeo: "110304"
  },
  {
    courier: "olva",
    department: "Ica",
    province: "Nazca",
    district: "Nazca",
    zone: "Nazca",
    address: "A.a.h.h los Jardines Mz.b Lt.42 S/N Asentamiento Humano Nazca",
    reference: "",
    lat: -14.829428013381392,
    lng: -74.9406856909122,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "10:00 A 18:30",
      "SÁBADO",
      "10:00 A 14:00"
    ],
    phone: "",
    ubigeo: "110301"
  },
  {
    courier: "olva",
    department: "Ica",
    province: "Pisco",
    district: "Pisco",
    zone: "Pisco",
    address: "Jr Callao Nro 556 Pisco",
    reference: "",
    lat: -13.710149554859472,
    lng: -76.20890216131195,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "110501"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Chanchamayo",
    district: "La Merced",
    zone: "Tienda la Merced",
    address: "Jr Lima Nro 227",
    reference: "",
    lat: -11.057029403367595,
    lng: -75.32825283211591,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "120301"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Chanchamayo",
    district: "Perene",
    zone: "Tienda Perene -Jr 22 de Octubre S/N S/N Urbanizacion Esperanza-Pampa Silva",
    address: "Jr 22 de Octubre S/N S/N Urbanizacion Esperanza-Pampa Silva",
    reference: "",
    lat: -10.9474131,
    lng: -75.2250397,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 13:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "120302"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Chanchamayo",
    district: "Pichanaki",
    zone: "Pichanaki",
    address: "Av Micaela Bastidas Nro 796",
    reference: "",
    lat: -10.926831528109256,
    lng: -74.87377255496367,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "120303"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Chanchamayo",
    district: "San Ramon",
    zone: "Tienda San Ramon",
    address: "Jr Progreso Nro 414 San Ramon (Costado de Polleria la Madera)",
    reference: "",
    lat: -11.122103646598577,
    lng: -75.35369008539219,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:30",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "120305"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Chupaca",
    district: "Chupaca",
    zone: "Agente Olva Chupaca",
    address: "Jr. Andrea Arauco 109",
    reference: "",
    lat: -12.0621879517404,
    lng: -75.2875808112385,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 20:00",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "120901"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Concepcion",
    district: "Concepcion",
    zone: "Agente Olva Concepcion",
    address: "Jr Nro 560 Grau (A Una Cuadra del Parque Principal de Concepcion)",
    reference: "",
    lat: -11.91672467770027,
    lng: -75.31330737562257,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "07:00 A 21:00"
    ],
    phone: "",
    ubigeo: "120201"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Huancayo",
    district: "Chilca",
    zone: "Agente Olva Chilca",
    address: "Av Huancavelica Nro 721 (A Una Cuadra de la Municipalidad de Chilca O del Ovalo de Co)",
    reference: "",
    lat: -12.087555796270031,
    lng: -75.2080930396886,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 20:00"
    ],
    phone: "",
    ubigeo: "120107"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Huancayo",
    district: "El Tambo",
    zone: "Agente Olva El Tambo",
    address: "Av Nro 198 Julio Sumar (Frente del Restaurant los Conquistadores)",
    reference: "",
    lat: -12.050211148050147,
    lng: -75.22273668911429,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "120114"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Huancayo",
    district: "El Tambo",
    zone: "Tienda Olva Mariategui",
    address: "Jr Jose Carlos Mariategui Nro 825 Nro 825 ( (A Media Cuadra de Makro) )",
    reference: "",
    lat: -12.047291242177625,
    lng: -75.20799169866508,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "120114"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Huancayo",
    district: "Huancayo",
    zone: "Agente Olva San Carlos",
    address: "Av Psj Niño Jesus 101 Tronco Seco (Frente Al Parque Grau) - S/N Urbanizacion",
    reference: "",
    lat: -12.07,
    lng: -75.2,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "120101",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Huancayo",
    district: "Huancayo",
    zone: "Tienda Olva Omar Yali",
    address: "Jr Omar Yali Nro 370 Nro 370 Urbanizacion ( A Media Cdra Dl Colegio de Abogados, Entre Omar Yali y Puno)",
    reference: "",
    lat: -12.065852835570336,
    lng: -75.20777726278251,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "120101"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Jauja",
    district: "Jauja",
    zone: "Agente Olva Jauja",
    address: "Jr Bolivar Nro 875",
    reference: "",
    lat: -11.77454219687986,
    lng: -75.49890140445994,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "120401"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Junin",
    district: "Junin",
    zone: "Junin",
    address: "Jr Jose de la Torre Ugarte Nro 620 Oeste - Junin",
    reference: "",
    lat: -11.163640080155432,
    lng: -75.99779169201209,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "120501"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Satipo",
    district: "Mazamari",
    zone: "Mazamari",
    address: "Pj Miguel Sandoval Nro 662 (Al Costado de Miltiservicios Farfan)",
    reference: "",
    lat: -11.327721059632935,
    lng: -74.53102208252399,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:30",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "120604"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Satipo",
    district: "Mazamari",
    zone: "Tienda Mazamari",
    address: "Pj Miguel Sandoval Nro 662 (Al Costado de Miltiservicios Farfan)",
    reference: "",
    lat: -11.327721059632935,
    lng: -74.53102208252399,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "120604"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Satipo",
    district: "Pangoa",
    zone: "Pangoa",
    address: "Ca Ucayali Galeria Mendoza Stand B2 Mz 19 Lte 1 Galeria Mendoza Stand B2",
    reference: "",
    lat: -74.48932149097139,
    lng: -11.428657740858416,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "120606"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Satipo",
    district: "Pangoa",
    zone: "Tienda Pangoa",
    address: "Ca Ucayali Mz 19 Lte 1 Galeria Mendoza Stand B2",
    reference: "",
    lat: -74.48932149097139,
    lng: -11.428657740858416,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "120606"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Satipo",
    district: "Satipo",
    zone: "Tiendasatipo",
    address: "Av Antonio Raymondi Norte Nro 241",
    reference: "",
    lat: -11.245699345883557,
    lng: -74.63664363004055,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "120601"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Tarma",
    district: "Tarma",
    zone: "Tarma",
    address: "Jr Pasco Nro 464 Tarma",
    reference: "",
    lat: -11.41931575845651,
    lng: -75.69137664745257,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "120701"
  },
  {
    courier: "olva",
    department: "Junin",
    province: "Yauli",
    district: "La Oroya",
    zone: "Tienda Olva la Oroya",
    address: "Ca Lima Nro 132 la Oroya",
    reference: "",
    lat: -11.52478070399386,
    lng: -75.91249148824016,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "120801"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Ascope",
    district: "Chocope",
    zone: "Chocope",
    address: "Ca Diego de Mora Nro 235 Chocope (Al Costado del Hotel Cesar Palace)",
    reference: "",
    lat: -7.791300351298854,
    lng: -79.22193160872988,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "18:00 A 17:00",
      "SÁBADO",
      "08:00 A 12:00"
    ],
    phone: "",
    ubigeo: "130203"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Ascope",
    district: "Chocope",
    zone: "Tienda Chocope",
    address: "Calle Diego de Mora Nro 235",
    reference: "",
    lat: -7.791300351298854,
    lng: -79.22193160872988,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:15",
      "SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "130203"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Bolivar",
    district: "Bolivar (Prov. Bolivar - Dpto. la Libertad)",
    zone: "Bolivar ( Prov. Bolivar",
    address: "Jr Cordova Nro 605 Bolivar (Esquina de la Plaza de Armas)",
    reference: "",
    lat: -7.154205635548105,
    lng: -77.70207380520417,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "130301"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Chepen",
    district: "Chepen",
    zone: "Chepen",
    address: "Ca Lima Nro 129",
    reference: "",
    lat: -7.22612248865395,
    lng: -79.43121267849412,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "130401"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Chepen",
    district: "Chepen",
    zone: "Tienda Chepen",
    address: "Ca Lima Nro 129",
    reference: "",
    lat: -7.22612248865395,
    lng: -79.43121267849412,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "130401"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Chepen",
    district: "Pacanga",
    zone: "Agente Olva Pacanguilla",
    address: "Chiclayo Nro 760 (Pacanguilla)",
    reference: "",
    lat: -7.153822795563934,
    lng: -79.4435823305459,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "130402"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Gran Chimu",
    district: "Cascas",
    zone: "Cascas",
    address: "Ca 28 de Julio Nro 301 Cascas - Trujillo",
    reference: "",
    lat: -7.478726859302016,
    lng: -78.82075420071776,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "131101"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Julcan",
    district: "Julcan",
    zone: "Julcan (Trujillo)",
    address: "Pj San Bartolo S/N S/N (Espalda del Coliseo Ismael Carranza Robles)",
    reference: "",
    lat: -78.48740110865525,
    lng: -8.04128734892438,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 16:00"
    ],
    phone: "",
    ubigeo: "130501"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Pacasmayo",
    zone: "Pacasmayo",
    address: "Av Gonzalo Ugas Salcedo 09 - Tienda 3 S/N (Ref. Grifo Primax Ovalo Paseo de la Paz)",
    reference: "",
    lat: -7.3989672551389285,
    lng: -79.56791266679816,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:30"
    ],
    phone: "",
    ubigeo: "130704"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Pacasmayo",
    zone: "Pacasmayo Tienda -Av Gonzalo Ugas Salcedo 09",
    address: "Av Gonzalo Ugas Salcedo 09 - Tienda 3 S/N S/N ( Ref. Grifo Primax Ovalo Paseo de la Paz )",
    reference: "",
    lat: -7.3989672551389285,
    lng: -79.56791266679816,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:30"
    ],
    phone: "",
    ubigeo: "130704"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "San Pedro de Lloc",
    zone: "Agente Olva San Pedro",
    address: "Jr Alianza Nro 515 la Libertad - Pacasmayo - San Pedro de Ll",
    reference: "",
    lat: -7.428692415860987,
    lng: -79.50421472951447,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:30 A 18:30"
    ],
    phone: "",
    ubigeo: "130701"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Pataz",
    district: "Tayabamba",
    zone: "Tayabamba (Tru)",
    address: "Jr Salaverry Nro 121 Tayabamba - Pataz",
    reference: "",
    lat: -8.275785514736485,
    lng: -77.2952885340313,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:00",
      "SÁBADO",
      "08:30 A 13:00"
    ],
    phone: "",
    ubigeo: "130801"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Sanchez Carrion",
    district: "Huamachuco",
    zone: "Huamachuco",
    address: "Jr Leoncio Prado Nro 527 Huamachuco",
    reference: "",
    lat: -7.816250566760828,
    lng: -78.04777535896326,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:30",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "130901"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Santiago de Chuco",
    district: "Santiago de Chuco",
    zone: "Santiago de Chuco",
    address: "Ca Mariscal Castilla Nro 1239",
    reference: "",
    lat: -8.380496,
    lng: -78.281919,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "131001"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "El Porvenir",
    zone: "Agente Olvatru- El Porvenir / Bodega Bazar Nena",
    address: "Gabriel Aguilar Nro 1384",
    reference: "",
    lat: -8.082566,
    lng: -78.999985,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "130102"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "Huanchaco",
    zone: "Agente Olvatru- Huanchaco / Happy Cell",
    address: "Los Pinos Nro 141",
    reference: "",
    lat: -8.08174,
    lng: -79.12198,
    type: "Agente Olva",
    hours: [
      "LUNES A MARTES",
      "10:00 A 20:00",
      "MIÉRCOLES",
      "09:00 A 20:00",
      "JUEVES",
      "10:00 A 21:00",
      "VIERNES A SÁBADO",
      "10:00 A 20:00"
    ],
    phone: "",
    ubigeo: "130104"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "La Esperanza",
    zone: "Agente Olvatru- M. Arevalo / Novedades Alexis",
    address: "Mz C25 Lte 16 Urb. Manuel Arevalo (Av. los Jardines-Ie Gean Piaget)",
    reference: "",
    lat: -8.068411,
    lng: -79.067778,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 20:00"
    ],
    phone: "",
    ubigeo: "130105"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "Laredo",
    zone: "Agente Olvatru- Laredo / Bazar Metrito",
    address: "Calle San Ignacio Nro 690 (Ex Campamento Laredo)",
    reference: "",
    lat: -8.11,
    lng: -79.03,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "130106",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "Moche",
    zone: "Agente Olvatru- Moche / Multiservicios D¿veras",
    address: "Sepulveda Nro 369",
    reference: "",
    lat: -8.17227,
    lng: -79.00963,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "10:00 A 13:00"
    ],
    phone: "",
    ubigeo: "130107"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo",
    address: "Av Mansiche Nro 1870 - Trujillo",
    reference: "",
    lat: -8.100793787019335,
    lng: -79.04615079169939,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "130101"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo (Av Santa Nro 1260 Trujillo (A Media Cuadra del Cruce Con Av. América))",
    address: "Av Santa Nro 1260 Trujillo (A Media Cuadra del Cruce Con Av. América)",
    reference: "",
    lat: -8.09805615554966,
    lng: -79.01635911475952,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "130101"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo (Jr Zepita Nro 572 Trujillo)",
    address: "Jr Zepita Nro 572 Trujillo",
    reference: "",
    lat: -8.108217746594883,
    lng: -79.02954497679605,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 21:00",
      "SÁBADO",
      "08:30 A 19:30"
    ],
    phone: "",
    ubigeo: "130101"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo (Pj los Paujiles Mz A Lte 4 Urbanizacion los Pinos - Victor Larco Herrera - Trujillo)",
    address: "Pj los Paujiles Mz A Lte 4 Urbanizacion los Pinos - Victor Larco Herrera - Trujillo",
    reference: "",
    lat: -8.127930870684553,
    lng: -79.04233534751805,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "130101"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo- Tienda Tupac Amaru",
    address: "Tupac Amaru Nro 1675 (Urb Alto Mochica)",
    reference: "",
    lat: -8.088568993015944,
    lng: -79.03925790704429,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "130101"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Trujillo",
    district: "Victor Larco Herrera",
    zone: "Agente Olvatru- Victor Larco / Fotos Digitales Juan Diego",
    address: "Avenida Víctor Larco Nro 1112 V.alegre",
    reference: "",
    lat: -8.134455,
    lng: -79.047361,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 12:30"
    ],
    phone: "",
    ubigeo: "130111"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Viru",
    district: "Viru",
    zone: "Tienda Viru",
    address: "Av Panamericana Norte Nro 381",
    reference: "",
    lat: -8.424033243096298,
    lng: -78.78149214751292,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 12:00"
    ],
    phone: "",
    ubigeo: "131201"
  },
  {
    courier: "olva",
    department: "La Libertad",
    province: "Viru",
    district: "Viru",
    zone: "Viru",
    address: "Av Panamericana Norte Nro 381",
    reference: "",
    lat: -8.424033243096298,
    lng: -78.78149214751292,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 12:00"
    ],
    phone: "",
    ubigeo: "131201"
  },
  {
    courier: "olva",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Oficina Almacen-Chiclayo",
    address: "Ca Mariscal Castilla Nro 208 Chiclayo (Por Cruz del Sur)",
    reference: "",
    lat: -6.775385000228167,
    lng: -79.83663279216125,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "140101"
  },
  {
    courier: "olva",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Tienda Chiclayo",
    address: "Mariscal Castilla Nro 208",
    reference: "",
    lat: -6.775385000228167,
    lng: -79.83663279216125,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 19:00"
    ],
    phone: "",
    ubigeo: "140101"
  },
  {
    courier: "olva",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Tienda Santa Victoria-Chiclayo",
    address: "Av Miguel Grau Nro 675 Urbanizacion Santa Victoria - Chiclayo",
    reference: "",
    lat: -6.785723826671396,
    lng: -79.84595443224748,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "140101"
  },
  {
    courier: "olva",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Tienda Tacna-Chiclayo",
    address: "Av Tacna Nro 164 Chiclayo",
    reference: "",
    lat: -6.774709438302577,
    lng: -79.84308872099685,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "140101"
  },
  {
    courier: "olva",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Jose Leonardo Ortiz",
    zone: "Tienda Moshoqueque",
    address: "Bolivar Nro 316 (- 312)",
    reference: "",
    lat: -6.758440637728478,
    lng: -79.84165511801582,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "140105"
  },
  {
    courier: "olva",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Pimentel",
    zone: "Tienda Pimentel-Chiclayo",
    address: "Jr Torres Paz Nro 244 Mz 1324 Lte 01",
    reference: "",
    lat: -6.836245536925052,
    lng: -79.9358697432229,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "140112"
  },
  {
    courier: "olva",
    department: "Lambayeque",
    province: "Ferreñafe",
    district: "Ferreñafe",
    zone: "Agente Ferreñafe-Chiclayo",
    address: "Bolivar Nro 853",
    reference: "",
    lat: -6.635513070331542,
    lng: -79.7863405276686,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "140201"
  },
  {
    courier: "olva",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Lambayeque",
    zone: "Lambayeque",
    address: "Av Huamachuco Nro 809 Lambayeque (Frente Al Parque Infantil)",
    reference: "",
    lat: -6.704623048783972,
    lng: -79.90415737607371,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "140301"
  },
  {
    courier: "olva",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Lambayeque",
    zone: "Tienda Lambayeque",
    address: "Huamachuco Nro 809",
    reference: "",
    lat: -6.704623048783972,
    lng: -79.90415737607371,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "140301"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Barranca",
    district: "Barranca",
    zone: "Barranca",
    address: "Av Primavera Nro 275 Barranca",
    reference: "",
    lat: -10.755437844943705,
    lng: -77.75956102492972,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150201"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Cañete",
    district: "Chilca",
    zone: "Chilca (Mala)",
    address: "Nicolas de Pierola Mz 97 Lte 4",
    reference: "",
    lat: -12.517158,
    lng: -76.737946,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:30",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150505"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Cañete",
    district: "Chilca",
    zone: "Tienda Chilca",
    address: "Av Nicolas de Pierola Mz 97 Lte 4",
    reference: "",
    lat: -12.517158,
    lng: -76.737946,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:30",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150505"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Cañete",
    district: "Mala",
    zone: "Mala",
    address: "Av Antigua Panamericana Sur Nro 243 Mala - Cañete",
    reference: "",
    lat: -12.656532,
    lng: -76.635811,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:30",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150509"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Cañete",
    district: "San Vicente de Cañete",
    zone: "Cañete",
    address: "Jr 2 de Mayo Nro 601 D- San Vicente - Cañete",
    reference: "",
    lat: -13.077650960789104,
    lng: -76.38833284788376,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150501"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Canta",
    district: "Canta",
    zone: "Canta",
    address: "Av 26 de Junio Nro 405 Canta - Lima",
    reference: "",
    lat: -11.46871811706901,
    lng: -76.62333299216029,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "150401"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Huaral",
    district: "Chancay",
    zone: "Tienda Chancay",
    address: "Ca Mariscal Sucre Nro. 104, Chancay. Frente A Panaderia Tanta S/N",
    reference: "",
    lat: -11.561734670465157,
    lng: -77.26970278938535,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150605"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Huaral",
    district: "Huaral",
    zone: "Tienda Huaral",
    address: "Av Estación Nro 600 ( Frente Parque Ortiz Dueñas)",
    reference: "",
    lat: -11.499279756776952,
    lng: -77.20776973329957,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150601"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Huaura",
    district: "Huacho",
    zone: "Huacho",
    address: "Jr Mariscal Castilla Nro 117 Huacho",
    reference: "",
    lat: -11.106664335058214,
    lng: -77.6050352183427,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 20:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150801"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Ancon",
    zone: "Agente Olva Ancon",
    address: "Av Florida Mz R Lte 3 Asentamiento Humano Miguel Grau (A Espaldas del Colegio I.e \"carlos Gutiérrez Merino\")",
    reference: "",
    lat: -11.77450924223903,
    lng: -77.17049040402964,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 18:30"
    ],
    phone: "",
    ubigeo: "150102"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Ate",
    zone: "Agente Ate-Virgen del Carmen",
    address: "Mz A Lte 4 Virgen del Carm (Carretera Central Paradero Soldadura A 1 Cdra del Mall de Pu)",
    reference: "",
    lat: -12.036469336064835,
    lng: -76.93003427724985,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "150103"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Ate",
    zone: "Agente Olva Ate -Nicolas Ayllon C30 (Kasnet)",
    address: "Av Nicolas Ayllon Nro 3080 (Al Frente del Mall Santa Anita)",
    reference: "",
    lat: -12.057069052952446,
    lng: -76.96979731122059,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 20:30"
    ],
    phone: "",
    ubigeo: "150103"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Ate",
    zone: "Agente Olva Salamanca",
    address: "Calle los Sauces 353(Urb los Recaudadores Salamanca-Espalda Plaza Vea de Circunvalacion - Salamanca)",
    reference: "",
    lat: -12.0791371,
    lng: -76.9849704,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:30",
      "SÁBADO",
      "09:00 A 16:00"
    ],
    phone: "",
    ubigeo: "150103"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Ate",
    zone: "Olva Ate",
    address: "Av Prolongacion Javier Prado Nro 9288",
    reference: "",
    lat: -12.038356,
    lng: -76.924026,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150103"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Ate",
    zone: "Olva Ate-Huaycan Kasnet",
    address: "Mz Ucv 25 Asentamiento Humano Huaycan Zona B (Ucv 25 Lt 14)",
    reference: "",
    lat: -12.03,
    lng: -76.92,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:30",
      "SÁBADO",
      "08:30 A 13:00"
    ],
    phone: "",
    ubigeo: "150103",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Ate",
    zone: "Olva Real Plaza Puruchuco",
    address: "Av Javier Prado Este Nro 8680 Urbanizacion Urb Mayorazgo",
    reference: "",
    lat: -12.040151495952836,
    lng: -76.9323838977266,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150103"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Ate",
    zone: "Olva Real Plaza Santa Clara",
    address: "Av la Estrella S/N Urb Santa Clara ((Centro Comercial Real Plaza ) Al Frente de Tai Loy)",
    reference: "",
    lat: -12.015099918576226,
    lng: -76.8857338265623,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150103"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Barranco",
    zone: "Agente Olva Barranco",
    address: "Ca Lima Nro 256 (Frente Al Colegio Arnaes)",
    reference: "",
    lat: -12.148797830018118,
    lng: -77.01854530813429,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 21:00"
    ],
    phone: "",
    ubigeo: "150104"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Barranco",
    zone: "Agente Olva Barranco -Av Grau",
    address: "Av Almte Miguel Grau Nro 375 (A Media Cuadra de la Plaza de Armas de Barranco)",
    reference: "",
    lat: -12.147802283381091,
    lng: -77.021398561877,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 21:00"
    ],
    phone: "",
    ubigeo: "150104"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Breña",
    zone: "Agente Olva Breña",
    address: "Ca Juan Pablo Fernandini Nro 656 (Dentro C.comercial las Flores Stand 175 )",
    reference: "",
    lat: -12.064406258974417,
    lng: -77.04734646889095,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150105"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Breña",
    zone: "Agente Olva Breña -Morona",
    address: "Jirón Morona 663, Breña, Perú(Alt. Cdra. 12 Av. Venezuela)",
    reference: "",
    lat: -12.054449374000226,
    lng: -77.05114591863398,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "10:00 A 19:00",
      "SÁBADO",
      "10:00 A 15:00"
    ],
    phone: "",
    ubigeo: "150105"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Breña",
    zone: "Agente Olva Breña (Jr Felipe Varela Nro 1853 Urbanizacion Azcona Breña (Altura de la Comisaria de Breña))",
    address: "Jr Felipe Varela Nro 1853 Urbanizacion Azcona Breña (Altura de la Comisaria de Breña)",
    reference: "",
    lat: -12.066010160279943,
    lng: -77.05160699020466,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 21:00"
    ],
    phone: "",
    ubigeo: "150105"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Breña",
    zone: "Olva Breña",
    address: "Avenida Republica de Venezuela 617(Frente A Metro de Alfonso Ugarte)",
    reference: "",
    lat: -12.05466,
    lng: -77.042641,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150105"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Agente Olva Carabayllo",
    address: "Av Mariano Condorcanqui Mz E1 Lte 51 Urbanizacion Edwin Vasquez (Paradero Mercado la Frontera)",
    reference: "",
    lat: -11.887908616398123,
    lng: -77.0364885842349,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:30",
      "SÁBADO",
      "09:00 A 15:30"
    ],
    phone: "",
    ubigeo: "150106"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Agente Olva Carabayllo (Av Merino Reyna Nro 186 Asentamiento Humano Raul Porras Barrenechea (A Media Cuadra de la Municipalidad de Carabayllo))",
    address: "Av Merino Reyna Nro 186 Asentamiento Humano Raul Porras Barrenechea (A Media Cuadra de la Municipalidad de Carabayllo)",
    reference: "",
    lat: -11.890806916072538,
    lng: -77.02627494190536,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:30 A 19:00"
    ],
    phone: "",
    ubigeo: "150106"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Agente Olva Carabayllo San Antonio Distribuciones Slam S.a.c",
    address: "Ca los Alamos Mz M3 Lte 32 Urb San Antonio (Av. Saco Rojas, Paradero Caseta Menorca)",
    reference: "",
    lat: -11.861997394971937,
    lng: -77.04467444747284,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "150106"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Chaclacayo",
    zone: "Olva Chaclacayo",
    address: "Avenida Nicolas Ayllon 460, Chaclacayo, Lima, Lima, Perú(Centro Comercial Chaclacenter )",
    reference: "",
    lat: -11.9766053,
    lng: -76.7729153,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:00",
      "SÁBADO",
      "08:30 A 17:00"
    ],
    phone: "",
    ubigeo: "150107"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Chorrillos",
    zone: "Megaplaza Chorrilos",
    address: "Al Alameda Sur S/N Urb los Cedros de Villa (Av Alameda Sur 5, Chorrillos 15067 )",
    reference: "",
    lat: -12.17,
    lng: -77.02,
    type: "Agente Olva",
    hours: [
      "LUNES",
      "11:00 A 20:00",
      "MARTES",
      "13:00 A 20:00",
      "MIÉRCOLES A SÁBADO",
      "11:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150108",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Chorrillos",
    zone: "Olva Chorrillos",
    address: "Av Prol Paseo de la Republica Nro 1429",
    reference: "",
    lat: -12.177269,
    lng: -77.01107,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150108"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Chorrillos",
    zone: "Olva Real Plaza Guardia Civil",
    address: "Av Guardia Civil S/N Urb la Campiña ((Centro Comercial Real Plaza ) Cruce Con Avenida los Gorrion)",
    reference: "",
    lat: -12.171913059987718,
    lng: -76.99299826190257,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150108"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Chosica",
    zone: "Agente Olva Chosica-Kasnet",
    address: "Av Lima Norte Nro 127 Chosica Centro (Referencia, Parque Echenique Chosica)",
    reference: "",
    lat: -11.933107866589047,
    lng: -76.69364654083623,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:30 A 21:00"
    ],
    phone: "",
    ubigeo: "150118"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Chosica",
    zone: "Olva Chosica",
    address: "Av Lima Sur Nro 853",
    reference: "",
    lat: -11.939965,
    lng: -76.6987,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150118"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Cieneguilla",
    zone: "Agente Olva Cp Cieneguilla",
    address: "Av San Martin Zona C Mz C Urbanizacion Tambo Viejo (Frente A Reniec de Cieneguilla)",
    reference: "",
    lat: -12.110667322328124,
    lng: -76.82117037609997,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 22:00"
    ],
    phone: "",
    ubigeo: "150109"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Cieneguilla",
    zone: "Olva Musa",
    address: "Av Mz C Lt 10 Aahh Pedro Paulet Of Olva Mz C Lte 10 Asentamiento Humano Ah Paul Poblet",
    reference: "",
    lat: -12.084798513361513,
    lng: -76.87654488811393,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:30",
      "SÁBADO",
      "09:30 A 14:30"
    ],
    phone: "",
    ubigeo: "150109"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Agente Comas-Alvarado",
    address: "Ca Alvarado Nro 624 Ah la Libertad ( Urb. Pampa de Comas-Sobre El Jr. Arnaldo Alvarado, Distrito)",
    reference: "",
    lat: -11.955925367245648,
    lng: -77.04797154076245,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "150110"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Agente Olva Comas",
    address: "Micaela Bastidas Nro 779 Urbanizacion Retablo (A Una Cuadra de la Av Universitaria )",
    reference: "",
    lat: -11.929302448668976,
    lng: -77.05575602656373,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "07:00 A 19:00",
      "SÁBADO",
      "07:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150110"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Olva Comas",
    address: "Av Universitaria Norte Nro 6971 Urbanizacion Santa Luzmila",
    reference: "",
    lat: -11.94054,
    lng: -77.059799,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150110"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Independencia",
    zone: "Agente Olva Megaplaza Independencia",
    address: "Av Afredo Mendiola Nro 3698 (1er Piso de Megaplaza, Cerca Al Estacionamiento de Bicicleta)",
    reference: "",
    lat: -11.992767011016682,
    lng: -77.06151064190381,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150112"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Independencia",
    zone: "Olva Independencia",
    address: "Av Gerardo Unger Nro 7001 (Cruce Av. Gerardo Unger y Jiron Sanchez Cerro)",
    reference: "",
    lat: -12.003642,
    lng: -77.054718,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150112"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Jesus Maria",
    zone: "Agente Olva Jesus Maria",
    address: "Av Republica Dominicana Nro 174 Urbanizacion Jesus Maria",
    reference: "",
    lat: -12.072848169273662,
    lng: -77.05080490859399,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 21:00"
    ],
    phone: "",
    ubigeo: "150113"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Jesus Maria",
    zone: "Agente Olva Jesus Maria (San Felipe Nro 1195 (Cruce Av. Salaverry Con Av. San Felipe))",
    address: "San Felipe Nro 1195 (Cruce Av. Salaverry Con Av. San Felipe)",
    reference: "",
    lat: -12.082066138169198,
    lng: -77.0460601553965,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 20:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150113"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Jesus Maria",
    zone: "Olva Real Plaza",
    address: "Avenida General Salaverry 2370, Jesús María, Perú()",
    reference: "",
    lat: -12.0898448,
    lng: -77.0552231,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150113"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Agente Olva la Molina",
    address: "Avenida los Constructores 1092(Ref:frente la Peluqueria Estacio , A Lado de la Tienda Mas)",
    reference: "",
    lat: -12.062680665619665,
    lng: -76.94636880402402,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "150114"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Agente Olva la Molina (Av Alameda del Corregidor Nro 1737 Isla del Sol (A Media Cuadra de Cascadas y Frente Al Sanguchon Campesino))",
    address: "Av Alameda del Corregidor Nro 1737 Isla del Sol (A Media Cuadra de Cascadas y Frente Al Sanguchon Campesino)",
    reference: "",
    lat: -12.100562163687444,
    lng: -76.94963117927618,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150114"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Agente Olva la Molina Corregidor Cuadra 22",
    address: "Av Alameda del Corregidor Nro 2985 Urb los Robles (Cruce Con Calle El Cisne (Pasando la Facultad Usmp))",
    reference: "",
    lat: -12.112510198544635,
    lng: -76.94152882656073,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "07:00 A 22:00"
    ],
    phone: "",
    ubigeo: "150114"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Agente Olva Parque la Molina",
    address: "Av la Molina Nro 2448 (Centro Comercial Parque la Molina - Nivel 3)",
    reference: "",
    lat: -12.09,
    lng: -76.95,
    type: "Agente Olva",
    hours: [
      "LUNES",
      "10:00 A 18:00",
      "MARTES A SÁBADO",
      "10:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150114",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "Olva la Molina",
    address: "Av la Fontana Tienda 1017 Nro 440 Urbanizacion Urb San Cesar Ii Etapa",
    reference: "",
    lat: -12.072854,
    lng: -76.954338,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150114"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Agente-Mexico la Victoria",
    address: "Mexico Nro 981 (Cruce de Av. Mexico Con Jr. Huamanga, A Una Cuadra de Shalom)",
    reference: "",
    lat: -12.073520746193418,
    lng: -77.01933841990706,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "10:00 A 17:00",
      "SÁBADO",
      "10:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150115"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Olva Gamarra",
    address: "Jr Antonio Bazo Nro 1280",
    reference: "",
    lat: -12.070858,
    lng: -77.013084,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150115"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Lima",
    zone: "Agente Lima-Sullana",
    address: "Ca Sullana Nro 2001 Urb Chacra Rios (Urb. Chacra Ríos Norte, Cerca de la Av. Universitaria y Av. )",
    reference: "",
    lat: -12.053730634774395,
    lng: -77.060529555397,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "150101"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Lima",
    zone: "Agente Olva Argentina",
    address: "Av Argentina S/N (7 Mz A1 Lt 7 (Cruce de Av Argetina Cuadra 7 Con Jr Carcamo))",
    reference: "",
    lat: -12.043601041908214,
    lng: -77.05131423306837,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 23:00"
    ],
    phone: "",
    ubigeo: "150101"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Lima",
    zone: "Agente Olva Lima-Francisco Moreyra",
    address: "Ca Gral Francisco Moreyra y Riglos Nro 593 Urb Benavides (Altura de la Puerta 3 de la Unmsm)",
    reference: "",
    lat: -12.057436905661115,
    lng: -77.07877880800366,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 19:00"
    ],
    phone: "",
    ubigeo: "150101"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Lima",
    zone: "Olva Cercado de Lima",
    address: "Pj Santiago Acuña Nro 131",
    reference: "",
    lat: -12.048548,
    lng: -77.031082,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150101"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Lima",
    zone: "Olva Plaza Tec",
    address: "Avenida Inca Garcilazo de la Vega 1358 Int. 351, Lima, Lima, Lima, Perú",
    reference: "",
    lat: -12.057217,
    lng: -77.03862,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:15 A 19:00",
      "SÁBADO",
      "09:15 A 17:00"
    ],
    phone: "",
    ubigeo: "150101"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Lima",
    zone: "Olva Real Plaza Centro Civico",
    address: "Av Garcilazo de la Vega S/N ((Centro Comercial Real Plaza ) Al Frente C.c Compuplaza)",
    reference: "",
    lat: -12.0560220260204,
    lng: -77.0367729355637,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150101"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Lince",
    zone: "Olva Lince",
    address: "Av General Alvarez de Arenales Nro 1775",
    reference: "",
    lat: -12.082338,
    lng: -77.035904,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150116"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Agente -Huandoy los Olivos",
    address: "Huand Mz 205 Lte 23 (Aahh San Martin de Porres)",
    reference: "",
    lat: -11.962681663266052,
    lng: -77.07718584338137,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 21:30",
      "SÁBADO",
      "09:00 A 21:00"
    ],
    phone: "",
    ubigeo: "150117"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Agente los Olvios.calle 11",
    address: "Ca Calle 11 Mz Bbb-5 Urbanizacion Pro (Ii Etapa Int 6)",
    reference: "",
    lat: -11.935056456443883,
    lng: -77.07733499772826,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 22:00"
    ],
    phone: "",
    ubigeo: "150117"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Agente Olva los Olivos",
    address: "Av Proceres de Huandoy Mz Dd4 Urbanizacion Pro (Cruce de Av. Cordialidad)",
    reference: "",
    lat: -11.939212459981407,
    lng: -77.07732067073982,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150117"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Agente Olva los Olivos (Av Universitaria Norte Mz O1 Lte 3 Asentamiento Humano Daniel Alcides Carrion (Cruce Con Av Tomas Valle - A Media Cdra de Plaza Vea))",
    address: "Av Universitaria Norte Mz O1 Lte 3 Asentamiento Humano Daniel Alcides Carrion (Cruce Con Av Tomas Valle - A Media Cdra de Plaza Vea)",
    reference: "",
    lat: -12.01103208038496,
    lng: -77.08021427554648,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 21:00"
    ],
    phone: "",
    ubigeo: "150117"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Olva los Olivos",
    address: "Av Carlos Izaguirre Nro 1006 Urbanizacion Palmeras",
    reference: "",
    lat: -11.991245,
    lng: -77.07357,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150117"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Olva San Martin de Porres",
    address: "Jirón Juan Cajahuamán 873, los Olivos, Perú(Ref. Jr. Cajahuaman Cruce Con Calle Beta)",
    reference: "",
    lat: -12.007177,
    lng: -77.072151,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:00",
      "SÁBADO",
      "08:30 A 17:00"
    ],
    phone: "",
    ubigeo: "150117"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Lurin",
    zone: "Lurin (Lima)",
    address: "Jr Francisco Bolognesi Nro 398 Lurin",
    reference: "",
    lat: -12.272971584337299,
    lng: -76.86826983437778,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150119"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Lurin",
    zone: "Tienda Lurin",
    address: "Jr Bolognesi Nro 398 (A Nueve Casas de la Catedral)",
    reference: "",
    lat: -12.272971584337299,
    lng: -76.86826983437778,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150119"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Magdalena del Mar",
    zone: "Agente Olva Magdalena",
    address: "Ca Miguel de Echenique Nro 739",
    reference: "",
    lat: -12.089292379426242,
    lng: -77.0744741419022,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "150120"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Magdalena del Mar",
    zone: "Agente Olva Magdalena Av Brasil C36 la Oficina On Line Eirl",
    address: "Avenida Brasil 3676, Magdalena del Mar, Perú()",
    reference: "",
    lat: -12.092677172311765,
    lng: -77.06872255062031,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150120"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Miraflores",
    zone: "Agente Olva Miraflores",
    address: "Ca Porta Nro 178 (Entre las Avenidas Benavides y Schell)",
    reference: "",
    lat: -12.123477486678484,
    lng: -77.0315554112195,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150122"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Miraflores",
    zone: "Agente Olva Miraflores (Av Alfredo Benavides Nro 1851 (Cruce Av. Alfredo Benavides Con Av. Gral. Ernesto Montagne ))",
    address: "Av Alfredo Benavides Nro 1851 (Cruce Av. Alfredo Benavides Con Av. Gral. Ernesto Montagne )",
    reference: "",
    lat: -12.12658131014885,
    lng: -77.01324405539584,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 20:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150122"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Miraflores",
    zone: "Larcomar",
    address: "Mc de la Reserva S/N (Al Frente del Marriot Miraflores - Larcomar )",
    reference: "",
    lat: -12.1318697154768,
    lng: -77.0304996141724,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 18:00"
    ],
    phone: "",
    ubigeo: "150122"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Miraflores",
    zone: "Olva Miraflores",
    address: "Av Cmdate Ladislao Espinar Nro 659",
    reference: "",
    lat: -12.112927,
    lng: -77.037041,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150122"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Pueblo Libre",
    zone: "Olva Pueblo Libre",
    address: "Av Simon Bolivar Nro 1427",
    reference: "",
    lat: -12.072392,
    lng: -77.069283,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150121"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Agente Olva Puente Piedra -Transportes Medina",
    address: "Av Puente Piedra Nro 916",
    reference: "",
    lat: -11.857260490701542,
    lng: -77.08388913213182,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "150125"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Agente Puente Piedra",
    address: "Tambo Inga Mz F Lte 37 (Frente Al Mercado El Tambo)",
    reference: "",
    lat: -11.884446004304802,
    lng: -77.06986725539969,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "150125"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Olva Puente Piedra",
    address: "Av Saenz Peña Nro 316",
    reference: "",
    lat: -11.864851,
    lng: -77.077423,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:30",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150125"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Punta Hermosa",
    zone: "Minimarket Panaderia Neldy",
    address: "Av Gaston Garcia Rada Mz C1 Lte 41",
    reference: "",
    lat: -12.05,
    lng: -77.04,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "150126",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Rimac",
    zone: "Agente Olva Rimac",
    address: "Pj Villacampa S/N (Altura de la Preventiva, Altura del Essalud de Pizarro, Cruc)",
    reference: "",
    lat: -12.034383699541355,
    lng: -77.03449861122088,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "10:00 A 07:00",
      "SÁBADO",
      "00:00 A 23:59"
    ],
    phone: "",
    ubigeo: "150128"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Rimac",
    zone: "Olva Rimac",
    address: "Av Lorenzo de Encalada Nro 188",
    reference: "",
    lat: -12.026352,
    lng: -77.028343,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:00",
      "SÁBADO",
      "08:30 A 17:00"
    ],
    phone: "",
    ubigeo: "150128"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Borja",
    zone: "Agente Olva Aviacion",
    address: "Av Aviacion Nro 2410 (Cruce Avenida Aviacion Con Avenida Javier Prado Int 9 -10 )",
    reference: "",
    lat: -12.088588581611164,
    lng: -77.00381062208818,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150130"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Borja",
    zone: "Agente Olva San Borja Sur (Tcopia)",
    address: "Av Aviacion Nro 2999 (Cruce Cl. Matier Con Av. Aviación (Estacion San Borja Sur))",
    reference: "",
    lat: -12.099231725620152,
    lng: -77.00190327073734,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 20:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150130"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Borja",
    zone: "Olva Real Plaza Primavera",
    address: "Angamos Este Nro 2681 (Bajar Por las Escaleras de la Puerta Acceso Angamos)",
    reference: "",
    lat: -12.111035057467578,
    lng: -77.00211995539604,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150130"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Borja",
    zone: "Olva San Borja",
    address: "Av Aviacion Nro 3532",
    reference: "",
    lat: -12.107656,
    lng: -77.001076,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150130"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Isidro",
    zone: "Agente Olva San Isidro",
    address: "Ca Ricardo Rivera Navarrete Nro 465 (Cruce Av. Javier Prado Este Con Av. Rivera Navarrete)",
    reference: "",
    lat: -12.091878581542804,
    lng: -77.02671207486135,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 20:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150131"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Isidro",
    zone: "Agente Olva San Isidro (Ca Miguel Dasso Nro 126 (Cruce Cl. Leonidas Yerovi Con Cl. Miguel Dasso ))",
    address: "Ca Miguel Dasso Nro 126 (Cruce Cl. Leonidas Yerovi Con Cl. Miguel Dasso )",
    reference: "",
    lat: -12.106013483422666,
    lng: -77.04048441306671,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 20:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "150131"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Olva C.p Sjl",
    address: "Jr Crucinelas Nro 698 (Altura Paradero 4 de las Flores - Mz 50 Lt 2)",
    reference: "",
    lat: -12.017400288955265,
    lng: -77.011045497727,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:30 A 22:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Olva Sjl",
    address: "Av Gran Chimu Nro 1268 Urbanizacion Zarate (Alt Cruce Con Av las Lomas)",
    reference: "",
    lat: -12.024151480037037,
    lng: -76.99060026889164,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Olva Sjl (Av Canto Grande Mz G2 Lte 23 (Altura Paradero 5 de Mariscal Caceres))",
    address: "Av Canto Grande Mz G2 Lte 23 (Altura Paradero 5 de Mariscal Caceres)",
    reference: "",
    lat: -11.946963684263883,
    lng: -76.98551066886223,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:30",
      "SÁBADO",
      "10:30 A 18:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Olva Sjl (Ca Santa Rosa Mz F1 Lte 7 los Alamos (Altura Paradero 13 de Av Canto Grande))",
    address: "Ca Santa Rosa Mz F1 Lte 7 los Alamos (Altura Paradero 13 de Av Canto Grande)",
    reference: "",
    lat: -11.96403779381676,
    lng: -76.99909289772783,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "07:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Olva Sjl (Ca Satelite S/N Up Santa Elizabeth (Paradero 21 de las Flores))",
    address: "Ca Satelite S/N Up Santa Elizabeth (Paradero 21 de las Flores)",
    reference: "",
    lat: -11.986820149640595,
    lng: -77.01545744220329,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "12:00 A 22:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Olva Sjl (Jr Este Mz F12 Urbanizacion Mariscal Caceres (Cruce Con Jr Intermedio (Frente Pre San Marcos)))",
    address: "Jr Este Mz F12 Urbanizacion Mariscal Caceres (Cruce Con Jr Intermedio (Frente Pre San Marcos))",
    reference: "",
    lat: -11.953633939039987,
    lng: -76.98569467703003,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 18:45",
      "SÁBADO",
      "09:30 A 15:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Olva Sjl (Jr los Huertos Nro 125 Urbanizacion las Flores de Lima (Frente Metro Hacienda - Estacion Jardines del Metro de Lima))",
    address: "Jr los Huertos Nro 125 Urbanizacion las Flores de Lima (Frente Metro Hacienda - Estacion Jardines del Metro de Lima)",
    reference: "",
    lat: -12.008293321128912,
    lng: -77.00534183729229,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:40",
      "SÁBADO",
      "09:00 A 19:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Olva Sjl Mangomarca",
    address: "Av Templo del Sol Nro 617 (Altura de la Cuadra 9 y 10 de Av las Lomas / Cerca A la Entr)",
    reference: "",
    lat: -12.015357218786658,
    lng: -76.98870084190337,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 21:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Olva Sjl- Piramides del Sol",
    address: "Av los Proceres de la Independencia Nro 1077 Asentamiento Humano Ah Chacarilla de Ote (A Media Cuadra de la Estacion Piramide del Sol)",
    reference: "",
    lat: -12.016946087441871,
    lng: -77.00242045108595,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Agente Sjl-Ampliacion",
    address: "Ca Ampliacion Este Mz P1 Lte 12 Mariscal Caceres ( Mz P1 Lt12-Sobre la Av. Ampliación Este, Zona Comercial y R)",
    reference: "",
    lat: -11.943876070840968,
    lng: -76.98103722656346,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Olva San Juan de Lurigancho",
    address: "Av los Proceres de la Independencia Nro 2532",
    reference: "",
    lat: -11.98932,
    lng: -77.010223,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "Olva Zarate",
    address: "Av Gran Chimu Nro 170 Urbanizacion Zarate (1era Cuadra de Chimu)",
    reference: "",
    lat: -12.029535,
    lng: -77.011108,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150132"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Miraflores",
    zone: "Agente Olva San Juan de Miraflores",
    address: "Av los Heroes Nro 119 (Galeria Plataforma 3 - A 1 Cuadra de Estacion Atocongo)",
    reference: "",
    lat: -12.14977850466975,
    lng: -76.97907625768036,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150133"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Miraflores",
    zone: "Agente Olva Sjm",
    address: "Ca Mz B Lte 33 las Flores de Villa (Paradero Principal Parque Zonal Huayna Capac de la Panameric)",
    reference: "",
    lat: -12.190452227320579,
    lng: -76.97369737975873,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150133"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Miraflores",
    zone: "Agente Olva Sjm -Belisario",
    address: "Av Gral Belisario Suarez Vargas Nro 833 Urb San Juan Zona A (Sobre la Av. Belisario Suárez, San Juan de Miraflores, Cerca)",
    reference: "",
    lat: -12.161579686896484,
    lng: -76.96781352655998,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:45 A 19:00",
      "SÁBADO",
      "09:45 A 15:00"
    ],
    phone: "",
    ubigeo: "150133"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Miraflores",
    zone: "Agente Olva Sjm (Av Miguel Iglesias Nro 869 Zona Industrial San Juan Zona D (Frente Al Instituto Arzobispo Loayza))",
    address: "Av Miguel Iglesias Nro 869 Zona Industrial San Juan Zona D (Frente Al Instituto Arzobispo Loayza)",
    reference: "",
    lat: -12.161596539083135,
    lng: -76.95991355539518,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "10:00 A 18:00",
      "SÁBADO",
      "10:00 A 15:00"
    ],
    phone: "",
    ubigeo: "150133"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Miraflores",
    zone: "Olva San Juan Miraflores",
    address: "Av San Juan Nro 713",
    reference: "",
    lat: -12.162266,
    lng: -76.973129,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150133"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Luis",
    zone: "Agente Olva San Luis",
    address: "Ca Pomacanchi S/N Urbanizacion Urb Tupac Amaru (Mercado la Libertad - Videna - Interior 23)",
    reference: "",
    lat: -12.078959582769388,
    lng: -77.00747386441765,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150134"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Luis",
    zone: "Olva San Luis",
    address: "Avenida Canada 3807(3809)",
    reference: "",
    lat: -12.079377,
    lng: -76.9916,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150134"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Agente Olva los Olivos",
    address: "Los Nisperos Mz F Lt 15(Av. Carlos Izaguirre (1er Piso) (Mercado Puente Camote) Lima - Lima - San Martin de Porres)",
    reference: "",
    lat: -11.990564738868853,
    lng: -77.09572811233022,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:30 A 19:00"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Agente Olva Smp",
    address: "Av Quilca Nro 746 (Entre Tienda Lomas E Iglesia Adventista, Entre Jr. Arequipa )",
    reference: "",
    lat: -12.032257884458259,
    lng: -77.09595099957367,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:30 A 18:30"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Agente Olva Smp (Av Angelica Gamarra Nro 729)",
    address: "Av Angelica Gamarra Nro 729",
    reference: "",
    lat: -12.005808375890705,
    lng: -77.07018251122143,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Agente Olva Smp (Av Eduardo de Habich Nro 426 Urbanizacion Ingenieria (Frente Al Chifa Jumbo E Interbank))",
    address: "Av Eduardo de Habich Nro 426 Urbanizacion Ingenieria (Frente Al Chifa Jumbo E Interbank)",
    reference: "",
    lat: -12.026377101198523,
    lng: -77.05513231306803,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 22:00"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Agente Olva Smp Av.peru",
    address: "Av Peru 3328 Agente Nro 3328 (Referencia A 3 Cuadras de Av Univertitaria y Av Peru)",
    reference: "",
    lat: -12.0320812,
    lng: -77.073133,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "10:15 A 18:00",
      "SÁBADO",
      "10:15 A 14:00"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Agente Olva Smp C.p",
    address: "Av Caqueta Nro 493 (Centro Comercial Unicahi Tienda 33)",
    reference: "",
    lat: -12.0320812,
    lng: -77.073133,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:30",
      "SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Agente Smp-Gerardo Unger",
    address: "Ca Gerardo Unger Nro 4669 (Interior 21)",
    reference: "",
    lat: -11.978975184276285,
    lng: -77.05993764190394,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:30 A 19:00"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Agente Smp-Jose Granda",
    address: "Jose Grand Nro 3437 ( la Av. José Granda, San Martín de Porres, Cerca de la Av. U)",
    reference: "",
    lat: -12.0320812,
    lng: -77.073133,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 21:00"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Agente Smp-Jr Callao",
    address: "Jirón Callao 574(Urb Peru 1er Piso Altura de la Cuadra 35 de la Av Perú Frente A la Plaza de Armas de Smp)",
    reference: "",
    lat: -12.031844,
    lng: -77.086757,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 22:00"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "Olva Smp Av Peru",
    address: "Avenida Peru 2243(Frente A Tienda Efe)",
    reference: "",
    lat: -12.032046,
    lng: -77.069378,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150135"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Miguel",
    zone: "Agente Olva San Miguel",
    address: "Av Federico Gallesse Nro 884 (A Cuatro Cuadras del Parque Media Luna)",
    reference: "",
    lat: -12.090020589309532,
    lng: -77.0835437942397,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "150136"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Miguel",
    zone: "Agente Olva San Miguel (Av Brigida Silva de Ochoa Nro 330 Urbanizacion Pando)",
    address: "Av Brigida Silva de Ochoa Nro 330 Urbanizacion Pando",
    reference: "",
    lat: -12.07935545380955,
    lng: -77.08751085539654,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "10:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150136"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Miguel",
    zone: "Agente Olva San Miguel (Av la Mar Nro 2275 Urbanizacion Pando Etapa 6 (Detrás de Plaza San Miguel Tienda 9 del Cc Shopping Center))",
    address: "Av la Mar Nro 2275 Urbanizacion Pando Etapa 6 (Detrás de Plaza San Miguel Tienda 9 del Cc Shopping Center)",
    reference: "",
    lat: -12.074967184751662,
    lng: -77.08168404190242,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:30 A 20:30"
    ],
    phone: "",
    ubigeo: "150136"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "San Miguel",
    zone: "Olva San Miguel",
    address: "Ca Intisuyo Nro 295",
    reference: "",
    lat: -12.074314,
    lng: -77.091789,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150136"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Santa Anita",
    zone: "Agente Olva Santa Anita",
    address: "Ca Jose Carlos Mariategui Nro 606 Coop Universal (Cerca A la Reniec Santa Anita)",
    reference: "",
    lat: -12.044901458512992,
    lng: -76.97526634023438,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "150137"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Santa Anita",
    zone: "Olva Santa Anita",
    address: "Av Santa Rosa Nro 131",
    reference: "",
    lat: -12.052505,
    lng: -76.961525,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150137"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Santiago de Surco",
    zone: "Agente Olva Surco",
    address: "Av Aviacion Nro 5095 (2do Piso Tienda 111 C.c Polvos Rosados (Nuevo Edificio))",
    reference: "",
    lat: -12.126866731512763,
    lng: -76.9999477474679,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150140"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Santiago de Surco",
    zone: "Agente Olva Surco (Jr Doña Delmira Nro 321 Urbanizacion los Rosales (A Media Cuadra del Plaza Vea de Av Ayacucho))",
    address: "Jr Doña Delmira Nro 321 Urbanizacion los Rosales (A Media Cuadra del Plaza Vea de Av Ayacucho)",
    reference: "",
    lat: -12.1432662245911,
    lng: -77.0022688932529,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150140"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Santiago de Surco",
    zone: "Agente Olva Surco (Proceres Nro 498 (Frente Al Icpna , A 1 Cuadra de Prosegur ,2 Cuadras de Plaza))",
    address: "Proceres Nro 498 (Frente Al Icpna , A 1 Cuadra de Prosegur ,2 Cuadras de Plaza)",
    reference: "",
    lat: -12.151074830368763,
    lng: -76.98894331903819,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 20:30"
    ],
    phone: "",
    ubigeo: "150140"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Santiago de Surco",
    zone: "Agente-Surco Guardia Civil -Lavanderia Lava Alegre S.a.c.",
    address: "Av Guardia Civil Nro 266 Urb Villa Alegre (Al Costado de Intani)",
    reference: "",
    lat: -12.14,
    lng: -76.99,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "150140",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Santiago de Surco",
    zone: "Olva Surco El Polo",
    address: "Av El Polo Nro 108",
    reference: "",
    lat: -12.109547,
    lng: -76.974899,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150140"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Santiago de Surco",
    zone: "Olva Surco Higuereta",
    address: "Jr Preciados Nro 133 Urbanizacion Higuereta (Cerca Al Centro Comercial Higuereta)",
    reference: "",
    lat: -12.128224,
    lng: -77.000053,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150140"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Surquillo",
    zone: "Olva San Isidro",
    address: "Av Andres Aramburu Nro 978",
    reference: "",
    lat: -12.102163,
    lng: -77.02018,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150141"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Villa El Salvador",
    zone: "Agente Olva Ves",
    address: "Centro Habitacional Iv Etapa Sec2 B2 Mz J Lte 1 (Av Maria Reiche Agente Kasnet)",
    reference: "",
    lat: -12.241347033464752,
    lng: -76.91539578742906,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "07:00 A 22:00"
    ],
    phone: "",
    ubigeo: "150142"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Villa El Salvador",
    zone: "Olva Villa El Salvador",
    address: "Av 1ro de Mayo Mz E Urbanizacion Coop Virgen de Cocharcas",
    reference: "",
    lat: -12.199744,
    lng: -76.956924,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150142"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria del Triunfo",
    zone: "Agente Olva Vmt",
    address: "Ca Esmeralda Nro 104 Jose Carlos Mariategui",
    reference: "",
    lat: -12.153070455271857,
    lng: -76.9521614688896,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "150143"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria del Triunfo",
    zone: "Agente Olva Vmt- Distribuidora Clc Moviles S.a.c",
    address: "Avenida Villa María del Triunfo 672, Villa María del Triunfo, Perú(Frente Mercado Cooperativo San Francisco)",
    reference: "",
    lat: -12.163080764293,
    lng: -76.94592983397307,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "10:00 A 20:30"
    ],
    phone: "",
    ubigeo: "150143"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria del Triunfo",
    zone: "Olva Real Plaza Villa Maria",
    address: "Av Pachacutec S/N (Interseccion Entre Av Pachacutec y Av 26 de Noviembre)",
    reference: "",
    lat: -12.180258841844818,
    lng: -76.94275386888908,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "11:00 A 20:00"
    ],
    phone: "",
    ubigeo: "150143"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria del Triunfo",
    zone: "Olva Villa Maria del Triunfo",
    address: "Avenida 26 de Noviembre 1229()",
    reference: "",
    lat: -12.170763,
    lng: -76.930626,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150143"
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria del Triunfo",
    zone: "Olva Villa Maria del Triunfo Pachacutec",
    address: "Avenida Pachacutec 2261, Villa Maria del Triunfo, Lima, Lima, Perú(A Una Cuadra de la Av. El Triunfo)",
    reference: "",
    lat: -12.16,
    lng: -76.94,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:45",
      "SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "150143",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Lima",
    province: "Yauyos",
    district: "Yauyos",
    zone: "Yauyos",
    address: "Ca Comercio S/N S/N (- Frente Al Hotel Inga)",
    reference: "",
    lat: -12.460299592652143,
    lng: -75.91872044538145,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 15:00"
    ],
    phone: "",
    ubigeo: "151001"
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Alto Amazonas",
    district: "Yurimaguas",
    zone: "Tienda Yurimaguas",
    address: "Ca Arica Nro 318 (Costado del Hostal El Naranjo)",
    reference: "",
    lat: -5.896282744028233,
    lng: -76.10447691696709,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "160201"
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Datem del Marañon",
    district: "San Lorenzo",
    zone: "San Lorenzo",
    address: "Jr Marañon Nro 1256 - San Lorenzo - Barranca - Datem Marañon",
    reference: "",
    lat: -4.828277829464385,
    lng: -76.56136201523209,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 13:00",
      "SÁBADO",
      "15:00 A 18:00"
    ],
    phone: "",
    ubigeo: "160701"
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Loreto",
    district: "Nauta",
    zone: "Nauta",
    address: "Jr Junin Nro 279 Nauta",
    reference: "",
    lat: -4.506499474120997,
    lng: -73.57468513393846,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 16:00",
      "SÁBADO",
      "08:00 A 14:00"
    ],
    phone: "",
    ubigeo: "160301"
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Mariscal Ramon Castilla",
    district: "Caballococha",
    zone: "Caballococha",
    address: "Ca 28 de Julio Nro 711 Caballococha",
    reference: "",
    lat: -3.9118683248869495,
    lng: -70.52104554707033,
    type: "Tienda Olva",
    hours: [
      "LUNES A MARTES",
      "07:30 A 16:00",
      "MIÉRCOLES",
      "07:30 A 15:00",
      "JUEVES A VIERNES",
      "07:30 A 16:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "160401"
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Maynas",
    district: "Iquitos",
    zone: "Tienda Olva Putumayo",
    address: "Jr Putumayo Nro 448",
    reference: "",
    lat: -3.748089549114302,
    lng: -73.24611254802294,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 15:00"
    ],
    phone: "",
    ubigeo: "160101"
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Maynas",
    district: "Punchana",
    zone: "Tienda Olva Punchana",
    address: "Av 28 de Julio Nro 194",
    reference: "",
    lat: -3.782916410704604,
    lng: -73.28495832214259,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 15:00"
    ],
    phone: "",
    ubigeo: "160108"
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Maynas",
    district: "San Juan Bautista",
    zone: "Agente Olva San Juan",
    address: "Av Participacion Nro 4250 (Cdra 26, Al Costado de la Polleria El Dorado)",
    reference: "",
    lat: -3.75,
    lng: -73.25,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "160113",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Maynas",
    district: "San Juan Bautista",
    zone: "Tienda Olva San Juan",
    address: "Av Quinonez Km 1.5 S/N S/N ( Frente Al Colegio del Cni, Por El Mall Aventura)",
    reference: "",
    lat: -3.7659579281910944,
    lng: -73.26840009092608,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "160113"
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Requena",
    district: "Requena",
    zone: "Requena",
    address: "Ca Union Nro 200 Requena",
    reference: "",
    lat: -5.066419317314008,
    lng: -73.84774449033607,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 16:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "160501"
  },
  {
    courier: "olva",
    department: "Loreto",
    province: "Ucayali",
    district: "Contamana",
    zone: "Contamana",
    address: "Ca Buenaventura Marquez Nro 135 Contamana",
    reference: "",
    lat: -7.348016463226688,
    lng: -75.00748237680928,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 12:00"
    ],
    phone: "",
    ubigeo: "160601"
  },
  {
    courier: "olva",
    department: "Madre de Dios",
    province: "Manu",
    district: "Huepetuhe",
    zone: "Huepetuhe",
    address: "Urb. Barrio Nuevo Expansión Mz.r Lte 07 S/N (Frente A las Iglesia Arca de Israel, A Tres Cuadras del Cole)",
    reference: "",
    lat: -12.993093814983663,
    lng: -70.52270981954484,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 15:00"
    ],
    phone: "",
    ubigeo: "170204"
  },
  {
    courier: "olva",
    department: "Madre de Dios",
    province: "Manu",
    district: "Huepetuhe",
    zone: "Huepetuhe (Urb. Barrio Nuevo Expansión Mz R Lte 7 S/N (Frente A las Iglesia Arca de Israel, A Tres Cuadras del Cole))",
    address: "Urb. Barrio Nuevo Expansión Mz R Lte 7 S/N (Frente A las Iglesia Arca de Israel, A Tres Cuadras del Cole)",
    reference: "",
    lat: -12.993093814983663,
    lng: -70.52270981954484,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 15:00"
    ],
    phone: "",
    ubigeo: "170204"
  },
  {
    courier: "olva",
    department: "Madre de Dios",
    province: "Tambopata",
    district: "Mazuco (Inambari)",
    zone: "Mazuco",
    address: "Jr Conquistadores S/N Con Pasaje Paucar",
    reference: "",
    lat: -13.06513799517001,
    lng: -70.36149968210407,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 18:30"
    ],
    phone: "",
    ubigeo: "170102"
  },
  {
    courier: "olva",
    department: "Madre de Dios",
    province: "Tambopata",
    district: "Puerto Maldonado",
    zone: "Puerto Maldonado",
    address: "Av 28 de Julio Nro 1249 Puerto Maldonado",
    reference: "",
    lat: -12.599830485414621,
    lng: -69.19141926048701,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "170101"
  },
  {
    courier: "olva",
    department: "Madre de Dios",
    province: "Tambopata",
    district: "Puerto Maldonado",
    zone: "Tienda Puerto Maldonado",
    address: "Av 28 de Julio Nro 1249",
    reference: "",
    lat: -12.599830485414621,
    lng: -69.19141926048701,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "170101"
  },
  {
    courier: "olva",
    department: "Moquegua",
    province: "Ilo",
    district: "Ilo",
    zone: "Ilo",
    address: "Ca Mariano Lino Urquieta Nro 138 Ilo (A Dos Cuadras del Mercado Tacocha)",
    reference: "",
    lat: -17.64281829744038,
    lng: -71.34079252736998,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:30",
      "SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "180301"
  },
  {
    courier: "olva",
    department: "Moquegua",
    province: "Mariscal Nieto",
    district: "Moquegua",
    zone: "Moquegua",
    address: "Ca Lima Nro 748",
    reference: "",
    lat: -17.191939691209043,
    lng: -70.93405881852533,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 14:30"
    ],
    phone: "",
    ubigeo: "180101"
  },
  {
    courier: "olva",
    department: "Pasco",
    province: "Oxapampa",
    district: "Constitucion",
    zone: "Tienda Constitucion",
    address: "Av Fernando Belaunde Terry S/N Constitucion (Frente A la Salida del Terminal - Internet la Chinita)",
    reference: "",
    lat: -9.852686884280136,
    lng: -75.0164869688335,
    type: "Tienda Olva",
    hours: [
      "LUNES A MIÉRCOLES",
      "08:30 A 18:30",
      "JUEVES A VIERNES",
      "08:30 A 16:30",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "190308"
  },
  {
    courier: "olva",
    department: "Pasco",
    province: "Oxapampa",
    district: "Iscozacin",
    zone: "Palcazu (Iscozacin)",
    address: "Av Juan Frantzen Mz R Lte 6",
    reference: "",
    lat: -10.185484234537965,
    lng: -75.15179576030646,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 14:00"
    ],
    phone: "",
    ubigeo: "190304"
  },
  {
    courier: "olva",
    department: "Pasco",
    province: "Oxapampa",
    district: "Oxapampa",
    zone: "Oxapampa -Jr Mullembruck Nro 876 Oxapampa",
    address: "Jr Mullembruck Nro 876 (- Oxapampa)",
    reference: "",
    lat: -10.577840974787645,
    lng: -75.40460427859597,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "190301"
  },
  {
    courier: "olva",
    department: "Pasco",
    province: "Oxapampa",
    district: "Puerto Bermudez",
    zone: "Puerto Bermundez",
    address: "Jr Sector Bosquecillo Puesto Nro 2 Puerto Bermudez",
    reference: "",
    lat: -10.298641875632928,
    lng: -74.93708225955181,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "07:30 A 17:30",
      "SÁBADO",
      "07:30 A 13:00"
    ],
    phone: "",
    ubigeo: "190306"
  },
  {
    courier: "olva",
    department: "Pasco",
    province: "Oxapampa",
    district: "Villa Rica",
    zone: "Tienda Villa Rica",
    address: "Av Leopoldo Krausse Nro 515",
    reference: "",
    lat: -10.736124352154537,
    lng: -75.2690026468048,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:30",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "190307"
  },
  {
    courier: "olva",
    department: "Pasco",
    province: "Pasco",
    district: "Cerro de Pasco",
    zone: "Tienda Chaupimarca",
    address: "Av la Plata Mz A Lte 3 (Frente Al Parque El Minero)",
    reference: "",
    lat: -10.687805715837323,
    lng: -76.25720138775824,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:50",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "190101"
  },
  {
    courier: "olva",
    department: "Pasco",
    province: "Pasco",
    district: "Yanacancha",
    zone: "Tienda Yanacancha",
    address: "Pj Agustin Gamarra Nro 103 Urbanizacion San Juan, Yanacancha - Cerro de Pasco",
    reference: "",
    lat: -10.666838001067433,
    lng: -76.25416493030663,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "10:00 A 18:00"
    ],
    phone: "",
    ubigeo: "190113"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Huancabamba",
    district: "Huancabamba",
    zone: "Huancabamba (Piu)",
    address: "Av Aquiles Escala Nro 210 Barrio San Francisco - Huancabamba",
    reference: "",
    lat: -5.244293079979369,
    lng: -79.44703403210657,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "200301"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Morropon",
    district: "Chulucanas",
    zone: "Tienda Chulucanas",
    address: "Jiron Callao Nro 159",
    reference: "",
    lat: -5.096872211088871,
    lng: -80.16216691788917,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "200401"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Morropon",
    district: "Morropon",
    zone: "Morropon",
    address: "Jr Cordova Nro 517 Morropon",
    reference: "",
    lat: -5.184130845299112,
    lng: -79.9722170345128,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 16:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "200405"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Paita",
    district: "Paita",
    zone: "Paita",
    address: "Mz R Lte 17 Urbanizacion Urb. Isabel Barreto 2da Etapa",
    reference: "",
    lat: -5.095364333541057,
    lng: -81.09519987657517,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "200501"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Paita",
    district: "Paita",
    zone: "Tienda Paita Alta",
    address: "Mz R Lte 17 Urbanizacion Urb. Isabel Barreto 2da Etapa",
    reference: "",
    lat: -5.095364333541057,
    lng: -81.09519987657517,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "200501"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Piura",
    district: "Catacaos",
    zone: "Piura-Tienda Catacaos",
    address: "Jr Comercio Nro 508 Galeria El Regalo, Int. 17, Catacaos",
    reference: "",
    lat: -5.265409801846249,
    lng: -80.676410835559,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "200105"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Piura",
    address: "Calle las Dalias Mz A Lte 23 (Urb. Geranios)",
    reference: "",
    lat: -5.173495162512463,
    lng: -80.62879572655127,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "200101"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Piura-Oficina Almacen Ficus",
    address: "Av. Marcavelica Mza D2 Lote 13 Ii Etapa los Ficus",
    reference: "",
    lat: -5.190633805857678,
    lng: -80.6564372289021,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "200101"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Piura-Tienda Santa Isabel",
    address: "Panamericana Nro 137 (Urb. Santa Isabel)",
    reference: "",
    lat: -5.182956709825246,
    lng: -80.62909734546668,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "200101"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Piura-Tiendasanchez Cerro",
    address: "Sanchez S/N (Av Sanchez Cerro 103 Cercado)",
    reference: "",
    lat: -5.193770240142175,
    lng: -80.62452271587676,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "200101"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Piura",
    district: "Tambo Grande",
    zone: "Tambo Grande",
    address: "Ca Lima Nro 397 ((Frente A Essalud y Caja Sullana).)",
    reference: "",
    lat: -4.934499490978602,
    lng: -80.34158461795494,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "200114"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Sechura",
    district: "Sechura",
    zone: "Sechura",
    address: "Ca Calle Cesar Pinglo Nro 602 - Sechura",
    reference: "",
    lat: -5.558301888903493,
    lng: -80.82161746334347,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:30",
      "SÁBADO",
      "09:00 A 12:30"
    ],
    phone: "",
    ubigeo: "200801"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Sullana",
    district: "Sullana",
    zone: "Sullana",
    address: "Ca Bolivar Nro 489",
    reference: "",
    lat: -4.893179702492394,
    lng: -80.690652470467,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 15:00"
    ],
    phone: "",
    ubigeo: "200601"
  },
  {
    courier: "olva",
    department: "Piura",
    province: "Talara",
    district: "Talara",
    zone: "Talara",
    address: "Av D - 02 S/N Pariña - Talara",
    reference: "",
    lat: -4.487205,
    lng: -81.060969,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "200701"
  },
  {
    courier: "olva",
    department: "Puno",
    province: "Carabaya",
    district: "Macusani",
    zone: "Macusani-Juliaca",
    address: "Jr Grau Nro 429 Macusani - Juliaca",
    reference: "",
    lat: -14.070866393854121,
    lng: -70.4298053179559,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 17:30",
      "SÁBADO",
      "08:30 A 14:00"
    ],
    phone: "",
    ubigeo: "210301"
  },
  {
    courier: "olva",
    department: "Puno",
    province: "Chucuito",
    district: "Desaguadero",
    zone: "Desaguadero-Puno Av Panamericana Nro 365 2do Piso",
    address: "Av Panamericana Nro 365 2do Piso - Desaguadero, Puno",
    reference: "",
    lat: -16.562346417446378,
    lng: -69.03737757553499,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "14:00 A 17:00",
      "SÁBADO",
      "08:00 A 12:00"
    ],
    phone: "",
    ubigeo: "210402"
  },
  {
    courier: "olva",
    department: "Puno",
    province: "El Collao",
    district: "Ilave",
    zone: "Ilave (Puno)",
    address: "Jr Desaguadero Nro 106 - Ilave",
    reference: "",
    lat: -16.089611881647144,
    lng: -69.63551833427039,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:30",
      "SÁBADO",
      "08:30 A 14:00"
    ],
    phone: "",
    ubigeo: "210501"
  },
  {
    courier: "olva",
    department: "Puno",
    province: "Puno",
    district: "Puno",
    zone: "Puno",
    address: "Jr Arequipa Nro 120 Puno",
    reference: "",
    lat: -15.836631091930467,
    lng: -70.02797390234296,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "210101"
  },
  {
    courier: "olva",
    department: "Puno",
    province: "Puno",
    district: "Puno",
    zone: "Tienda Puno",
    address: "Arequipa Nro 120",
    reference: "",
    lat: -15.836631091930467,
    lng: -70.02797390234296,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "210101"
  },
  {
    courier: "olva",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Juliaca Central",
    address: "Av Argentina Mz F Lte 14 la Rinconada, Juliaca",
    reference: "",
    lat: -15.502414546276302,
    lng: -70.13558075685876,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:30",
      "SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "211101"
  },
  {
    courier: "olva",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Juliaca Tienda",
    address: "Jr San Martín Nro 112 ( Int. S 106)",
    reference: "",
    lat: -15.494431041849502,
    lng: -70.13181157114343,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "211101"
  },
  {
    courier: "olva",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Juliaca-Tienda Terminal Terrestre",
    address: "Jr San Agustin Nro 620",
    reference: "",
    lat: -15.490641498638286,
    lng: -70.12027259196013,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 16:00"
    ],
    phone: "",
    ubigeo: "211101"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Bellavista",
    district: "Bellavista",
    zone: "Bellavista",
    address: "Prolongación Augusto B Leguia Nro 344 Barrio San Juan - Bellavista",
    reference: "",
    lat: -7.0663745392980895,
    lng: -76.59274294412786,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "220201"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Bellavista",
    district: "Bellavista",
    zone: "Tienda Bellavista",
    address: "Av Prolog Augusto B Leguia Nro 344",
    reference: "",
    lat: -7.0663745392980895,
    lng: -76.59274294412786,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "09:00 A 01:00"
    ],
    phone: "",
    ubigeo: "220201"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "El Dorado",
    district: "San Jose de Sisa",
    zone: "San Jose de Sisa",
    address: "Jr Comercio Nro 615",
    reference: "",
    lat: -6.613784115111001,
    lng: -76.69161798725796,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "15:30 A 20:30",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "220301"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Huallaga",
    district: "Saposoa",
    zone: "Saposoa",
    address: "Jr Arica Nro 416 Saposoa",
    reference: "",
    lat: -6.936684329658469,
    lng: -76.77080639543455,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 12:30"
    ],
    phone: "",
    ubigeo: "220401"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Lamas",
    district: "Caynarachi",
    zone: "Caynarachi",
    address: "Jr Ricardo Palma S/N Caynarachi - Lamas (Esquina del Colegio Juan Guillermo Castillo Delgado)",
    reference: "",
    lat: -6.330564656171565,
    lng: -76.282792362843,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "07:00 A 19:00"
    ],
    phone: "",
    ubigeo: "220504"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Lamas",
    district: "Lamas",
    zone: "Tienda Lamas",
    address: "Jr Tobias Noriega Nro 174 Plaza de Armas - Lamas",
    reference: "",
    lat: -6.421543306427274,
    lng: -76.5160153811509,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:00 A 15:00"
    ],
    phone: "",
    ubigeo: "220501"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Lamas",
    district: "Roque",
    zone: "Alonso de Alva-Roque",
    address: "Jr Lima Nro 441 Plaza de Armas, Alonso de Alvarado - Roque",
    reference: "",
    lat: -6.355307929457977,
    lng: -76.7747007686957,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00",
      "SÁBADO",
      "08:00 A 16:00"
    ],
    phone: "",
    ubigeo: "220502"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Lamas",
    district: "Tabalosos",
    zone: "Tabalosos",
    address: "Pj Grau Mz 71 Lte 7 Plaza de Armas - Tabalosos",
    reference: "",
    lat: -6.389550300313824,
    lng: -76.63409995160391,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "07:30 A 18:00",
      "SÁBADO",
      "07:30 A 16:00"
    ],
    phone: "",
    ubigeo: "220510"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Mariscal Caceres",
    district: "Campanilla",
    zone: "Campanilla",
    address: "Jr Julio Romero Castro S/N Plaza de Armas - Campanilla",
    reference: "",
    lat: -7.481704073960467,
    lng: -76.64976643335034,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "220602"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Mariscal Caceres",
    district: "Juanjui",
    zone: "Olva Juanjui",
    address: "Pj Guillermo Arevalo Nro 126 (Telef. 918745624)",
    reference: "",
    lat: -7.175002661202759,
    lng: -76.72893755092387,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:30",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "220601"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Moyobamba",
    district: "Moyobamba",
    zone: "Tienda Olva Moyobamba",
    address: "Jr: Reyes Guerra 411 S/N",
    reference: "",
    lat: -6.032991078176623,
    lng: -76.97245791695806,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:30",
      "SÁBADO",
      "08:00 A 15:00"
    ],
    phone: "",
    ubigeo: "220101"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Moyobamba",
    district: "Soritor",
    zone: "Soritor",
    address: "Jr Ramón Castilla Nro 850",
    reference: "",
    lat: -6.138184972766461,
    lng: -77.10201999619026,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "220105"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Picota",
    district: "Picota",
    zone: "Picota",
    address: "Jr Bolognesi Nro 384 Picota",
    reference: "",
    lat: -6.918354028671004,
    lng: -76.33023841229544,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 18:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "220701"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Picota",
    district: "San Hilarion",
    zone: "San Hilarion",
    address: "Jr Huallaga Nro 152 San Hilarion",
    reference: "",
    lat: -6.999967473771577,
    lng: -76.4424793803544,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "220707"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Rioja",
    district: "Naranjos",
    zone: "Pardo Miguel-Naranjo",
    address: "Av Pardo Miguel Nro 903",
    reference: "",
    lat: -5.741009568707852,
    lng: -77.50276704004018,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 17:30"
    ],
    phone: "",
    ubigeo: "220805"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Rioja",
    district: "Nueva Cajamarca",
    zone: "Nueva Cajamarca",
    address: "Jr San Luis Nro 545 Nueva Cajamarca (A Espaldas de la Policia Nacional)",
    reference: "",
    lat: -5.942250064817748,
    lng: -77.3054058696702,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 16:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "220804"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Rioja",
    district: "Nueva Cajamarca",
    zone: "Tienda Nueva Cajamarca",
    address: "Jr San Luis Nro 545 (Espalda de la Pnp)",
    reference: "",
    lat: -5.942250064817748,
    lng: -77.3054058696702,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 16:00",
      "SÁBADO",
      "09:00 A 12:00"
    ],
    phone: "",
    ubigeo: "220804"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Rioja",
    district: "Rioja",
    zone: "Rioja",
    address: "Jr Santo Toribio Nro 408 Barrio de Quinapata",
    reference: "",
    lat: -6.057173869040205,
    lng: -77.16860165215198,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "220801"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "San Martin",
    district: "La Banda de Shilcayo",
    zone: "Agente Olva la Banda de Shilcayo",
    address: "Jr Peru Nro 114 (Frente Al Parque del Amor)",
    reference: "",
    lat: -6.491715462628182,
    lng: -76.3559907332857,
    type: "Agente Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 17:00"
    ],
    phone: "",
    ubigeo: "220909"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "San Martin",
    district: "Tarapoto",
    zone: "Agente Olva Alonso de Alvarado",
    address: "Jr Alonso de Alvarado Nro 859 (Barrio Comercio - Altura Cdra 8 de Jiron Lima)",
    reference: "",
    lat: -6.49,
    lng: -76.37,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "220901",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "San Martin",
    district: "Tarapoto",
    zone: "Agente Olva Leoncio Prado- Tete Market",
    address: "Jr Leoncio Prado Nro 1581 (Frente A la Clinica Sagrado Corazon de Jesus)",
    reference: "",
    lat: -6.49,
    lng: -76.37,
    type: "Agente Olva",
    hours: [],
    phone: "",
    ubigeo: "220901",
    approxCoords: true
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "San Martin",
    district: "Tarapoto",
    zone: "Tienda Olva Alfonso Ugarte -Tpp",
    address: "Alfonso Ugarte Nro 1588",
    reference: "",
    lat: -6.493253320051588,
    lng: -76.37484831583326,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 19:00",
      "SÁBADO",
      "08:00 A 15:00"
    ],
    phone: "",
    ubigeo: "220901"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "San Martin",
    district: "Tarapoto",
    zone: "Tienda Olva Antonio Raymondi",
    address: "Jr Antonio Raymondi Nro 394 (Referencia: Frente Al Comercial El Sol)",
    reference: "",
    lat: -6.4900358067793364,
    lng: -76.36090998943847,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 19:00",
      "SÁBADO",
      "09:00 A 15:00"
    ],
    phone: "",
    ubigeo: "220901"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Tocache",
    district: "Nuevo Progreso",
    zone: "Nuevo Progreso",
    address: "Huayranga S/N (Cuadra 2 S/N)",
    reference: "",
    lat: -8.454843947778805,
    lng: -76.32548986637865,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "08:00 A 12:00"
    ],
    phone: "",
    ubigeo: "221002"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Tocache",
    district: "Santa Lucia",
    zone: "Santa Lucia",
    address: "Av los Pijuayos Mz 19 Lte 6",
    reference: "",
    lat: -8.344444599471256,
    lng: -76.39085236294346,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "221006"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Tocache",
    district: "Tocache",
    zone: "Tienda Tocache",
    address: "Jr Tocache Nro 505 - Tocahe",
    reference: "",
    lat: -8.188680002911068,
    lng: -76.51315201912328,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 19:00"
    ],
    phone: "",
    ubigeo: "221001"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Tocache",
    district: "Tocache",
    zone: "Tocache",
    address: "Jr Tocache Nro 505 Tocache - San Martin",
    reference: "",
    lat: -8.188680002911068,
    lng: -76.51315201912328,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "08:00 A 19:00"
    ],
    phone: "",
    ubigeo: "221001"
  },
  {
    courier: "olva",
    department: "San Martin",
    province: "Tocache",
    district: "Uchiza",
    zone: "Uchiza",
    address: "Av Leoncio Prado Nro 809 Uchiza",
    reference: "",
    lat: -8.457486420097883,
    lng: -76.46242633929883,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:00 A 14:00",
      "SÁBADO",
      "09:00 A 18:00"
    ],
    phone: "",
    ubigeo: "221005"
  },
  {
    courier: "olva",
    department: "Tacna",
    province: "Tacna",
    district: "Coronel Gregorio Albarracin Lanchipa",
    zone: "Tienda Cono Sur-Tacna",
    address: "Asociacion Villa El Periodista Mz B Lte 6 Coronel Gregorio Albarrin, Tacna",
    reference: "",
    lat: -18.035381570610074,
    lng: -70.25118528590193,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:00",
      "SÁBADO",
      "08:00 A 14:00"
    ],
    phone: "",
    ubigeo: "230110"
  },
  {
    courier: "olva",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Tacna-Almacen",
    address: "Ca Callao Nro 251 Tacna",
    reference: "",
    lat: -18.01791113983213,
    lng: -70.25603131801464,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "230101"
  },
  {
    courier: "olva",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Tienda Bolivar-Tacna",
    address: "Ca Bolivar Nro 667 Tacna",
    reference: "",
    lat: -18.012079640051645,
    lng: -70.24762307685033,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 20:00",
      "SÁBADO",
      "09:00 A 20:00"
    ],
    phone: "",
    ubigeo: "230101"
  },
  {
    courier: "olva",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Tienda Bolognesi-Tacna-Calle Atahualpa Nro 115",
    address: "Calle Atahualpa Nro 115 (Por El Mercadillo Bolognesi)",
    reference: "",
    lat: -18.000118662529065,
    lng: -70.23887168640536,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 18:00",
      "SÁBADO",
      "09:00 A 14:00"
    ],
    phone: "",
    ubigeo: "230101"
  },
  {
    courier: "olva",
    department: "Tumbes",
    province: "Contralmirante Villar",
    district: "Zorritos",
    zone: "Tumbes-Tienda Zorritos",
    address: "Av Grau Nro 521 Contralmirante Villar - Zorritos, Tumbes",
    reference: "",
    lat: -3.6812698709452243,
    lng: -80.67801069407278,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 16:00"
    ],
    phone: "",
    ubigeo: "240201"
  },
  {
    courier: "olva",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Minimarket R&r",
    address: "Jose Linsher Tudela Mz D Lte 26",
    reference: "",
    lat: -3.56278934799364,
    lng: -80.42547963985395,
    type: "Agente Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "240101"
  },
  {
    courier: "olva",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Tumbes",
    address: "Mc Benavides Nro 904 (Cercado)",
    reference: "",
    lat: -3.571471952428203,
    lng: -80.4599986191891,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "08:30 A 19:00",
      "SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "240101"
  },
  {
    courier: "olva",
    department: "Tumbes",
    province: "Zarumilla",
    district: "Zarumilla",
    zone: "Tumbes-Tienda Zarumilla",
    address: "Ca Tumbes Nro 505 Plaza de Armas Zarumilla, Tumbes",
    reference: "",
    lat: -3.5007030513246407,
    lng: -80.27506269970499,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "08:00 A 18:00"
    ],
    phone: "",
    ubigeo: "240301"
  },
  {
    courier: "olva",
    department: "Ucayali",
    province: "Atalaya",
    district: "Atalaya",
    zone: "Atalaya (Pcl)",
    address: "Jr Iquitos Mz 41 Lte 9 A ( Media Cuadra de la Plaza de Armas )",
    reference: "",
    lat: -10.730175446662418,
    lng: -73.75580587741551,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 16:30",
      "SÁBADO",
      "09:00 A 12:00"
    ],
    phone: "",
    ubigeo: "250201"
  },
  {
    courier: "olva",
    department: "Ucayali",
    province: "Atalaya",
    district: "Atalaya",
    zone: "Tienda Atalaya",
    address: "Jr Iquitos Mz 41 (Lote 9a)",
    reference: "",
    lat: -10.730175446662418,
    lng: -73.75580587741551,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 18:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "250201"
  },
  {
    courier: "olva",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa",
    zone: "Pucallpa",
    address: "Jr Tacna Nro 727 Calleria - Pucallpa",
    reference: "",
    lat: -8.385273816399277,
    lng: -74.53006102521067,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:30 A 17:00",
      "SÁBADO",
      "09:30 A 13:00"
    ],
    phone: "",
    ubigeo: "250101"
  },
  {
    courier: "olva",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Yarinacocha",
    zone: "Tienda Pucallpa Almacen",
    address: "Av Aeropuerto Nro 818 Yarinacocha - Pucallpa",
    reference: "",
    lat: -8.38610210483483,
    lng: -74.57201024127639,
    type: "Tienda Olva",
    hours: [
      "LUNES A SÁBADO",
      "09:00 A 17:00"
    ],
    phone: "",
    ubigeo: "250105"
  },
  {
    courier: "olva",
    department: "Ucayali",
    province: "Padre Abad",
    district: "Aguaytia",
    zone: "Aguaytia",
    address: "Jr Vargas Guerra Nro 199",
    reference: "",
    lat: -9.037034011082477,
    lng: -75.51049885031063,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "09:00 A 13:00"
    ],
    phone: "",
    ubigeo: "250301"
  },
  {
    courier: "olva",
    department: "Ucayali",
    province: "Padre Abad",
    district: "Aguaytia",
    zone: "Tienda Aguaytia",
    address: "Vargas Guerra Nro 199",
    reference: "",
    lat: -9.037034011082477,
    lng: -75.51049885031063,
    type: "Tienda Olva",
    hours: [],
    phone: "",
    ubigeo: "250301"
  },
  {
    courier: "olva",
    department: "Ucayali",
    province: "Purus",
    district: "Purus",
    zone: "Purus",
    address: "Av Luis Muñoz Nagal S/N Purus",
    reference: "",
    lat: -9.770695039543128,
    lng: -70.71092307750078,
    type: "Tienda Olva",
    hours: [
      "LUNES A VIERNES",
      "09:00 A 17:00",
      "SÁBADO",
      "08:00 A 13:00"
    ],
    phone: "",
    ubigeo: "250401"
  },
  {
    courier: "emtrafesa",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Cajamarca",
    address: "Av. Atahualpa 606",
    reference: "Referencia óvalo musical",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Virú",
    district: "Chao",
    zone: "Chao",
    address: "Av. Víctor Raúl 449",
    reference: "",
    lat: -8.55,
    lng: -78.68
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Chepén",
    district: "Chepén",
    zone: "Chepen",
    address: "Panamericana Norte Terminal S/N predio pampas de San Juan Lote 2. Frente a Tottus Encomiendas y Carga:",
    reference: "",
    lat: -7.22,
    lng: -79.43
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Chepén",
    district: "Chepén",
    zone: "Chepen 2",
    address: "Calle Lima 294 Chepén Centro Venta de pasajes:",
    reference: "",
    lat: -7.22,
    lng: -79.43
  },
  {
    courier: "emtrafesa",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Chiclayo",
    address: "Av. Balta 110 Urb. Cercado",
    reference: "",
    lat: -6.77,
    lng: -79.84
  },
  {
    courier: "emtrafesa",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Chiclayo 2",
    address: "Av. Balta 1820, José Leonardo Ortiz, Chiclayo, LambayequeTerminal Chiclayo",
    reference: "",
    lat: -6.77,
    lng: -79.84
  },
  {
    courier: "emtrafesa",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Chiclayo 3",
    address: "Panamericana Norte km 772 Agencia Reque",
    reference: "a media cuadra del parque de la madre Reque",
    lat: -6.77,
    lng: -79.84
  },
  {
    courier: "emtrafesa",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Chiclayo 4",
    address: "Dirección: Av. Víctor Raúl Haya de la Torre N° 517",
    reference: "",
    lat: -6.77,
    lng: -79.84
  },
  {
    courier: "emtrafesa",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Chiclayo 5",
    address: "Av. Los Amautas N° 1416",
    reference: "a dos cuadras del Policlínico “Carlos Castañeda”",
    lat: -6.77,
    lng: -79.84
  },
  {
    courier: "emtrafesa",
    department: "Áncash",
    province: "Santa",
    district: "Chimbote",
    zone: "Chimbote",
    address: "Mz. D Int. D – 16 Lote 1 Zona IndustrialTerminal El Chimbador",
    reference: "",
    lat: -9.08,
    lng: -78.58
  },
  {
    courier: "emtrafesa",
    department: "Áncash",
    province: "Santa",
    district: "Nuevo Chimbote",
    zone: "Chimbote 2",
    address: "Mz. L Lote 18, Urb. 1ero de Mayo, Nuevo Chimbote, Santa, AncashTerminal Nuevo Chimbote",
    reference: "",
    lat: -9.12,
    lng: -78.53
  },
  {
    courier: "emtrafesa",
    department: "Áncash",
    province: "Santa",
    district: "Coishco",
    zone: "Chimbote 3",
    address: "Av. Panamericana antigua N° 319, Mz M1 LT 2Coishco",
    reference: "",
    lat: -9.53,
    lng: -77.53
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Ascope",
    district: "Chocope",
    zone: "Chocope",
    address: "Centro Poblado Chocope MZ 17 LOTE 32",
    reference: "",
    lat: -7.79,
    lng: -79.22
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Guadalupe",
    zone: "Cruce De Cajamarca",
    address: "Carretera Panamericana Norte Mz C Lote-14Sector El Triángulo del Centro Poblado Pakatnamú",
    reference: "",
    lat: -7.25,
    lng: -79.58
  },
  {
    courier: "emtrafesa",
    department: "Lambayeque",
    province: "Ferreñafe",
    district: "Ferreñafe",
    zone: "Ferrenafe",
    address: "Av. Augusto B. Leguía 420Pueblo Nuevo – Ferreñafe",
    reference: "",
    lat: -6.64,
    lng: -79.79
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Guadalupe",
    zone: "Guadalupe",
    address: "Av Nila Cerruti N° 263",
    reference: "",
    lat: -7.25,
    lng: -79.58
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Guadalupe",
    zone: "Guadalupe 2",
    address: "Av. Nila Cerruti N° 290 1er Piso B",
    reference: "",
    lat: -7.25,
    lng: -79.58
  },
  {
    courier: "emtrafesa",
    department: "Cajamarca",
    province: "Jaén",
    district: "Jaén",
    zone: "Jaen",
    address: "Calle Luis Castillo Caballero N° 113Sector Morro Solar",
    reference: "",
    lat: -5.71,
    lng: -78.81
  },
  {
    courier: "emtrafesa",
    department: "Cajamarca",
    province: "Jaén",
    district: "Jaén",
    zone: "Jaen 2",
    address: "Av. Mesones Muro Lote 3 – Zanja Honda – Jaén. / Modulo N°18",
    reference: "",
    lat: -5.71,
    lng: -78.81
  },
  {
    courier: "emtrafesa",
    department: "Cajamarca",
    province: "Jaén",
    district: "Jaén",
    zone: "Jaen 3",
    address: "Calle nicida de Calleja S/N",
    reference: "",
    lat: -5.71,
    lng: -78.81
  },
  {
    courier: "emtrafesa",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Lambayeque",
    zone: "Lambayeque",
    address: "Av. Mariscal Castilla N°647",
    reference: "",
    lat: -6.7,
    lng: -79.91
  },
  {
    courier: "emtrafesa",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Lima",
    address: "Jr. Alexander Von Humbolt 109 – La VictoriaFrente al Estadio Nacional Pasaje – Encomiendas –",
    reference: "",
    lat: -12.07,
    lng: -77.02
  },
  {
    courier: "emtrafesa",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Lima 2",
    address: "Terminal Terrestre Av. G. Unger 6917 Int. LB",
    reference: "",
    lat: -12.07,
    lng: -77.02
  },
  {
    courier: "emtrafesa",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Lima 3",
    address: "Tomas Valle Cal. N°04 Mz. H Lote.12 A.H Luis Alberto Sánchez",
    reference: "",
    lat: -12.07,
    lng: -77.02
  },
  {
    courier: "emtrafesa",
    department: "Lima",
    province: "Lima",
    district: "San Martín de Porres",
    zone: "Lima 4",
    address: "AV. Miguel Angel Lt. 04 Mz 01 Urb. Fiori 4° Etapa – San Martin de Porres",
    reference: "",
    lat: -12,
    lng: -77.08
  },
  {
    courier: "emtrafesa",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Lima 5",
    address: "Av. Puente Piedra Mz.Y Lt.7 Zona 03, sector 09, Copacabana.",
    reference: "",
    lat: -11.87,
    lng: -77.07
  },
  {
    courier: "emtrafesa",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Lima 6",
    address: "Av. Las palmeras 5309 – Los Olivos",
    reference: "",
    lat: -11.97,
    lng: -77.07
  },
  {
    courier: "emtrafesa",
    department: "Piura",
    province: "Talara",
    district: "Máncora",
    zone: "Mancora",
    address: "Av. Grau 600, Máncora 20850",
    reference: "",
    lat: -4.1,
    lng: -81.05
  },
  {
    courier: "emtrafesa",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Lagunas",
    zone: "Nuevo Mocupe",
    address: "C.P.M. Nuevo Mocupe Mz. A5 Lote 04Av. Panamericana Norte 691",
    reference: "",
    lat: -6.77,
    lng: -79.84
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Chepén",
    district: "Pacanga",
    zone: "Pacanguilla",
    address: "Panamericana Norte 248",
    reference: "Frente al Grifo Pacanguilla en el desvio a Pacanga",
    lat: -7.22,
    lng: -79.43
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Pacasmayo",
    zone: "Pacasmayo",
    address: "Leoncio Prado Mz. B Lt. 01 Urb. Andrés Razuri – Pacasmayo",
    reference: "Al costado de la división policial",
    lat: -7.4,
    lng: -79.6
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Pacasmayo",
    zone: "Pacasmayo 2",
    address: "Prolongación Leoncio Prado S/NTerrapuerto de Pacasmayo",
    reference: "",
    lat: -7.4,
    lng: -79.6
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Ascope",
    district: "Paiján",
    zone: "Paijan",
    address: "Av. Panamericana Norte #1388",
    reference: "",
    lat: -7.73,
    lng: -79.28
  },
  {
    courier: "emtrafesa",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Piura",
    address: "Los Naranjos 225 – Urb. Club Grau N° 193A espaldas de repuestos Merino",
    reference: "",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "emtrafesa",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Piura 2",
    address: "Terminal Gechisa Av. Prolongación Sánchez Cerro Mz. 09 Lt. S/N – Zona industrial 2da etapa distrito de 26 de Octubre",
    reference: "",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "San Pedro de Lloc",
    zone: "San Pedro",
    address: "Pje el Níspero s/n Vía de Evitamiento San Pedro de Lloc.",
    reference: "",
    lat: -7.4,
    lng: -79.6
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo",
    address: "Av. Túpac Amaru 185Urb. Huerta Grande",
    reference: "",
    lat: -8.11,
    lng: -79.03
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo 2",
    address: "Av. Nicolás de Piérola 1404 – 1406 Urb. Mochica.",
    reference: "",
    lat: -8.11,
    lng: -79.03
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo 3",
    address: "Avenida América Sur 1804 – Frente al complejo Chan ChanUrb. Chicago.",
    reference: "",
    lat: -8.11,
    lng: -79.03
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Trujillo",
    district: "El Porvenir",
    zone: "Trujillo 4",
    address: "Av. Pumacahua – El Porvenir 1344",
    reference: "",
    lat: -8.08,
    lng: -79.02
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Trujillo",
    district: "Moche",
    zone: "Trujillo 5",
    address: "Av. La Marina LT. 25 – Sector del Rosario – MocheFrente al grifo “El Che”",
    reference: "",
    lat: -8.17,
    lng: -79
  },
  {
    courier: "emtrafesa",
    department: "La Libertad",
    province: "Trujillo",
    district: "La Esperanza",
    zone: "Trujillo 6",
    address: "Sector Wichanzao – La Esperanza Mz. 14 Lt. 24 Frente a revisiones técnicas del Senati",
    reference: "",
    lat: -8.07,
    lng: -79.05
  },
  {
    courier: "emtrafesa",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Tumbes",
    address: "Av. Tumbes Norte 968",
    reference: "Frente a Plaza Vea",
    lat: -3.57,
    lng: -80.45
  },
  {
    courier: "emtrafesa",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Tumbes 2",
    address: "Av. Tumbes 369",
    reference: "",
    lat: -3.57,
    lng: -80.45
  },
  {
    courier: "emtrafesa",
    department: "Áncash",
    province: "Huarmey",
    district: "Huarmey",
    zone: "Huarmey",
    address: "Asentamiento Humano Santiago Antunez de Mayolo Mz. C Lote 3",
    reference: "",
    lat: -10.07,
    lng: -78.15
  },
  {
    courier: "marvisur",
    department: "Amazonas",
    province: "Bagua",
    district: "Bagua Chica",
    zone: "Bagua Chica",
    address: "Av. Heroes del Cenepa 1786 - Bagua - Bagua - Amazonas",
    reference: "Al Costado del Grifo Gavilán",
    lat: -5.64,
    lng: -78.53
  },
  {
    courier: "marvisur",
    department: "Amazonas",
    province: "Bongara",
    district: "Pedro Ruiz Gallo",
    zone: "Pedro Ruiz Gallo",
    address: "Av. Cahuide 729 Mz. 5 Lt. 32 - Jazán Bongorá - Amazonas",
    reference: "Al Frente de la Tapiceria Chávez",
    lat: -6.23,
    lng: -77.87
  },
  {
    courier: "marvisur",
    department: "Amazonas",
    province: "Chachapoyas",
    district: "Chachapoyas",
    zone: "Chachapoyas",
    address: "Av. San Juan de la Frontera N 103 Barrio Luya Urco Chachapoyas Chachapoyas Amazonas",
    reference: "Al Costado del Paradero A Huancas",
    lat: -6.23,
    lng: -77.87
  },
  {
    courier: "marvisur",
    department: "Amazonas",
    province: "Utcubamba",
    district: "Bagua Grande",
    zone: "Bagua Grande",
    address: "Ca. Francisco Pizarro 460 - Sector Visalot Mz V22 Lote 12 - Bagua Grande",
    reference: "A Media Cuadra de la Botica \"salud y Vida\"",
    lat: -5.76,
    lng: -78.44
  },
  {
    courier: "marvisur",
    department: "Ancash",
    province: "Casma",
    district: "Casma",
    zone: "Casma",
    address: "H.u. Programa de Vivienda Zona Este Ii Barrio 4 Mz. G3 Lt.1 - Ancash-casma-casma",
    reference: "Cruce Miguel Grau Con Túpac Amaru",
    lat: -9.47,
    lng: -78.3
  },
  {
    courier: "marvisur",
    department: "Ancash",
    province: "Huaraz",
    district: "Huaraz",
    zone: "Huaraz",
    address: "Urb. Pedregal Medio Mz 2 Sub Lote 5-a-1 Huaraz - Huaraz - Ancash",
    reference: "A la Espalda del Colegio la Soledad",
    lat: -9.53,
    lng: -77.53
  },
  {
    courier: "marvisur",
    department: "Ancash",
    province: "Huarmey",
    district: "Huarmey",
    zone: "Huarmey",
    address: "Aa.hh. Santiago Antunez de Mayolo Mz. G Lt 25 Huarmey Huarmey Ancash",
    reference: "Frente Al Hostal la Posada de Huarmey",
    lat: -10.07,
    lng: -78.15
  },
  {
    courier: "marvisur",
    department: "Ancash",
    province: "Santa",
    district: "Chimbote",
    zone: "Chimbote",
    address: "Av. José Pardo N° 2667 (víctor Raúl Haya de la Torre) Mz. L Lt. 19",
    reference: "Frente A la Policía de Tránsito",
    lat: -9.08,
    lng: -78.58
  },
  {
    courier: "marvisur",
    department: "Apurimac",
    province: "Abancay",
    district: "Abancay",
    zone: "Abancay",
    address: "Av. Panamericana Lt. 10 Km. 2.5. Sect. Ñacchero - Abancay",
    reference: "200m Pasando el Terminal Wari Palomino, Antes del Cruce Con Evitamiento",
    lat: -13.63,
    lng: -72.88
  },
  {
    courier: "marvisur",
    department: "Apurimac",
    province: "Abancay",
    district: "Curahuasi",
    zone: "Curahuasi",
    address: "Urb Casco Urbano Av Panamericana S/n-apurimac -abancay -curahuasi",
    reference: "Al Frente del Grifo Petro Perú",
    lat: -13.63,
    lng: -72.88
  },
  {
    courier: "marvisur",
    department: "Apurimac",
    province: "Andahuaylas",
    district: "Andahuaylas",
    zone: "Andahuaylas",
    address: "Av. los Cedros S/n Pochccota -andahuaylas-andahuaylas -apurimac",
    reference: "Frente de la Feria Dominical",
    lat: -13.66,
    lng: -73.39
  },
  {
    courier: "marvisur",
    department: "Apurimac",
    province: "Aymaraes",
    district: "Chalhuanca",
    zone: "Chalhuanca",
    address: "Urb. Urubamba Pairaca Av. Panamericana Mz E Lote 26 - Chalhuanca - Aymaraes - Apurimac",
    reference: "Al Frente del Colegio María Auxiliadora",
    lat: -13.63,
    lng: -72.88
  },
  {
    courier: "marvisur",
    department: "Apurimac",
    province: "Cotabambas",
    district: "Challhuahuacho",
    zone: "Challhuahuacho",
    address: "Av. 25 de Abril Con Calle Llallahua - San Marcos",
    reference: "Terminal de la Empresa Patrón Santiago las Bambas",
    lat: -13.63,
    lng: -72.88
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cerro Juli",
    zone: "Cerro Juli",
    address: "Fundo el Pepito Sn Urb. Bellavista - Jacobo Hunter- Arequipa - Arequipa",
    reference: "A Espaldas de la Fia (feria Internacional de Arequipa)",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Arequipa",
    district: "Cono Norte",
    zone: "Cono Norte",
    address: "Car. Carretera A Yura Km 9 Lote 9 Arequipa Arequipa Cerro Colorado",
    reference: "Al Frente del Centro Comercial Plaza Arequipa Norte",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Arequipa",
    district: "Garci Carbajal",
    zone: "Garci Carbajal",
    address: "Cal. Garci Carbajal Nro. 511 Urb. Iv Centenario - Arequipa - Arequipa - Arequipa",
    reference: "A 1 Cuadra del Estadio Melgar",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Arequipa",
    district: "La Joya",
    zone: "La Joya",
    address: "A.h. el Triunfo Sector 1 , Manzana D Sub Lote 3 Sector 1 Zona C Arequipa - Arequipa - la Joya",
    reference: "Al Media Cuadra de la Comisaria el Triunfo",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Camana",
    district: "Camana",
    zone: "Camana",
    address: "Cal.garci Carbajal Nro. 116 Camaná - Camaná Arequipa",
    reference: "Frente Al Gran Hostal Premier",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Caraveli",
    district: "Atico",
    zone: "Atico",
    address: "Av. Arequipa S/n Mz 123 Lote 2 la Florida - Atico - Caraveli - Arequipa",
    reference: "Frente A la Comisaria de Atico",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Caraveli",
    district: "Chala",
    zone: "Chala",
    address: "Av. Emancipacion Mza. 85 Lote 1 A.h. Manuel Prado - Chala - Caraveli - Arequipa",
    reference: "A Media Cuadra de Ofina de Minera Esperanza",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Caraveli",
    district: "Yauca",
    zone: "Yauca",
    address: "Carretera Panamericana Sur 572 los Olivos Yauca Caraveli Arequipa",
    reference: "Al Costado de la Empresa de Transportes Hnos Ponce",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Caylloma",
    district: "Pedregal",
    zone: "Pedregal",
    address: "U.c. Parcela N 180-12, Sección A - Pedregal - Caylloma - Arequipa",
    reference: "Antes de Llegar A la Balanza de la Colina",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Arequipa",
    province: "Islay",
    district: "Mollendo",
    zone: "Mollendo",
    address: "C.p. Mz. A1 Lt. 27 Aurelio de la Fuente 403 - Mollendo - Islay",
    reference: "A Un Costado del Estadio Juan Carlos Oblitas",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "marvisur",
    department: "Ayacucho",
    province: "Huamanga",
    district: "Ayacucho",
    zone: "Ayacucho",
    address: "Asociacion Asentamiento Humano Complejo Artesanal de Ayacucho Mz. T Lote 04 - Distrito Ayacucho - Provincia Huamanga",
    reference: "A Media Cuadra Pasando el Terminal Terrestre",
    lat: -13.16,
    lng: -74.22
  },
  {
    courier: "marvisur",
    department: "Ayacucho",
    province: "Huanta",
    district: "Huanta",
    zone: "Huanta",
    address: "Jr. Chávez Gavilan 609 - Huanta Huanta - Ayacucho",
    reference: "A Espaldas del Penal de Huanta",
    lat: -12.94,
    lng: -74.25
  },
  {
    courier: "marvisur",
    department: "Ayacucho",
    province: "Lucanas",
    district: "Puquio",
    zone: "Puquio",
    address: "Jirón Tupac Amaru Lote 1 Mz 57 Sector la Florida, Centro Poblado Puquio Barrio Ccollana -puquio-lucanas-ayacucho",
    reference: "Frente Al Hotel los Andes.",
    lat: -13.16,
    lng: -74.22
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "Cajabamba",
    district: "Cajabamba",
    zone: "Cajabamba",
    address: "Jr. Silva Sn - Cajamarca - Cajabamba - Cajabamba",
    reference: "Frente Al Paradero Algamarca / Espaldas del Colegio José Gálvez Egúsquiza",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Cajamarca",
    address: "Jr. Ricardo Palma 129 Cajamarca - Cajamarca Cajamarca",
    reference: "Altura 2 de la Av. Independencia Salida A la Costa",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca Ii",
    zone: "Cajamarca Ii",
    address: "Av. Heroes del Cenepa 1960-cajamarca-cajamarca-cajamarca",
    reference: "Frente Al Hotel Jem Caribe",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "Celendin",
    district: "Celendin",
    zone: "Celendin",
    address: "C.p. Celendin Jr. Tupac Amaru 114 - Celendín – Celendín - Cajamarca",
    reference: "Frente A la Iglesia Pentecostal Dios Es Amor",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "Chota",
    district: "Chota",
    zone: "Chota",
    address: "Jr. Ponciano Vigil N105 Chota Cajamarca",
    reference: "A Media Cuadra del Terminal Ángel Divino",
    lat: -6.56,
    lng: -78.65
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "Cutervo",
    district: "Cutervo",
    zone: "Cutervo",
    address: "Av. Salomón Vilchez Murga S/n - Cajamarca- Cutervo-cutervo",
    reference: "A Media Cuadra de la Clínica Cutervo",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "Hualgayoc",
    district: "Bambamarca",
    zone: "Bambamarca",
    address: "Av. Tupac Amaru Lt. 9, Mz. 36 - Cajamarca-hualgayoc-bambamarca",
    reference: "A Media Cuadra del Grifo el Triunfo",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "Jaen",
    district: "Jaen",
    zone: "Jaen",
    address: "Calle Prolongación Orellana Nro. 420-424 Morro Solar-alto - Jaen - Jaen - Cajamarca",
    reference: "Al Costado de la Losa San Luis",
    lat: -5.71,
    lng: -78.81
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "San Ignacio",
    district: "San Ignacio",
    zone: "San Ignacio",
    address: "Av. Mariano Melgar S/n",
    reference: "Por el Paradero de Autos Para Jaén",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "marvisur",
    department: "Cajamarca",
    province: "San Marcos",
    district: "San Marcos",
    zone: "San Marcos",
    address: "Jr. José Gálvez N° 105 Pedro Gálvez - San Marcos",
    reference: "Al Costado de Distribuidora Lucho Gas",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Anta",
    district: "Anta",
    zone: "Anta",
    address: "Virgen del Carmen Mz. A Lt. 4 Anta Cusco",
    reference: "Frente Al Paradero del Carmen",
    lat: -13.53,
    lng: -71.97
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Calca",
    district: "Calca",
    zone: "Calca",
    address: "Av. Vilcanota 706 Calca - Calca - Cusco",
    reference: "Esquina Con Av. Almte. Miguel Grau 7 A Espaldas de Serpost",
    lat: -13.53,
    lng: -71.97
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Canchis",
    district: "Sicuani",
    zone: "Sicuani",
    address: "Carretera Panamericana Nro. S/n Sicuani - Canchis -cusco",
    reference: "Por el Grifo Eduardo Entre el Óvalo",
    lat: -14.27,
    lng: -71.23
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Chumbivilcas",
    district: "Santo Tomas",
    zone: "Santo Tomas",
    address: "Barrio Miraflores,calle Santa Bárbara S/n - Santo Tomás -cusco",
    reference: "Al Costado del Paradero de Minivan de la Empresa Ancalla",
    lat: -13.53,
    lng: -71.97
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Chumbivilcas",
    district: "Velille",
    zone: "Velille",
    address: "Urb. Buenos Aires de Patacsillo Mz F Lote 6 - Cusco – Chumbivilcas – Velille",
    reference: "Frente A la Posta de Salud",
    lat: -13.53,
    lng: -71.97
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Cusco",
    district: "Cusco",
    zone: "Cusco",
    address: "Urb.surihuaylla Mza. A Lote C1, San Sebastian - Cusco - Cusco",
    reference: "A Una Cuadra de la Puerta Principal del Aeropuerto Velasco Astete - Paradero Hilario",
    lat: -13.52,
    lng: -71.98
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Cusco",
    district: "Cusco Ii",
    zone: "Cusco Ii",
    address: "Av San Martin 499 Mz B-cusco -cusco -santiago",
    reference: "A la Altura del C.c. Confraternidad / Frente A la Estación del Tren",
    lat: -13.52,
    lng: -71.98
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Espinar",
    district: "Espinar",
    zone: "Espinar",
    address: "Av. Macchu Picchu Barrio Túpac Amaru Etapa Ii - Espinar",
    reference: "A 4 Cuadras del Hospital de Espinar",
    lat: -13.53,
    lng: -71.97
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "La Convencion",
    district: "Quillabamba",
    zone: "Quillabamba",
    address: "General Gamarra S/n Santa Ana - la Convencion-cusco",
    reference: "Al Costado de la Iglesia de los Mormones",
    lat: -13.53,
    lng: -71.97
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Urubamba",
    district: "Chinchero",
    zone: "Chinchero",
    address: "C.p. Chinchero Av. Mateo Pumaccahua Mz K4 Lt 7- Cusco-urubamba-chinchero",
    reference: "A Media Cuadra de la Plaza de Armas de Chinchero",
    lat: -13.3,
    lng: -72.12
  },
  {
    courier: "marvisur",
    department: "Cusco",
    province: "Urubamba",
    district: "Urubamba",
    zone: "Urubamba",
    address: "Av. la Convencion 384-cusco-urubamba-urubamba",
    reference: "A 100 Metros Plazoleta de Pumacahua",
    lat: -13.3,
    lng: -72.12
  },
  {
    courier: "marvisur",
    department: "Huancavelica",
    province: "Huancavelica",
    district: "Huancavelica",
    zone: "Huancavelica",
    address: "Av. Manchego Muñoz Nro. 1055 Barrio Santa Ana Huancavelica - Huancavelica-huancavelica",
    reference: "Antes de Llegar Al Cruce del Tren",
    lat: -12.79,
    lng: -74.97
  },
  {
    courier: "marvisur",
    department: "Huanuco",
    province: "Huanuco",
    district: "Huanuco",
    zone: "Huanuco",
    address: "Jr Seichi Izumi 607-609 Huanuco - Huanuco",
    reference: "Al Costado de Supermercados Tottus",
    lat: -9.93,
    lng: -76.24
  },
  {
    courier: "marvisur",
    department: "Huanuco",
    province: "Leoncio Prado",
    district: "Tingo Maria",
    zone: "Tingo Maria",
    address: "Av Ucayali 1039 Rupa Rupa Leoncio Prado Huanuco",
    reference: "A Una Cuadra del Colegio Amazonas",
    lat: -9.29,
    lng: -75.99
  },
  {
    courier: "marvisur",
    department: "Ica",
    province: "Chincha",
    district: "Chincha",
    zone: "Chincha",
    address: "Prol. Oscar R. Benavides N 1669 - Sunampe- Chincha - Ica",
    reference: "A Media Cuadra de la Salida de Grocio Prado",
    lat: -14.07,
    lng: -75.73
  },
  {
    courier: "marvisur",
    department: "Ica",
    province: "Ica",
    district: "Ica",
    zone: "Ica",
    address: "C.p San Joaquin Viejo Mz B Lote 38-a Ica Ica Ica",
    reference: "A Una Cuadra del Óvalo del Estadio",
    lat: -14.07,
    lng: -75.73
  },
  {
    courier: "marvisur",
    department: "Ica",
    province: "Nazca",
    district: "Marcona",
    zone: "Marcona",
    address: "Aa.hh San Juan Bautista Mz O Lt 1 Marcona - Nazca Ica",
    reference: "A la Espalda del Local Comunal San Juan Bautista",
    lat: -14.83,
    lng: -74.94
  },
  {
    courier: "marvisur",
    department: "Ica",
    province: "Nazca",
    district: "Nazca",
    zone: "Nazca",
    address: "Av. Circunvalacion S/n Urb. San Mauricio Nazca - Ica",
    reference: "A Media Cuadra del Coliseo de Gallos Virgen de Guadalupe O Al Costado de la Bodega Orveti",
    lat: -14.83,
    lng: -74.94
  },
  {
    courier: "marvisur",
    department: "Ica",
    province: "Pisco",
    district: "Pisco",
    zone: "Pisco",
    address: "Av. las Américas 1915 Ica-pisco-pisco",
    reference: "A Media Cuadra de Essalud",
    lat: -13.71,
    lng: -76.2
  },
  {
    courier: "marvisur",
    department: "Junin",
    province: "Chanchamayo",
    district: "La Merced",
    zone: "La Merced",
    address: "Av. Carlos Peschiera 652 Urb. Cercado - Chanchamayo - Junín",
    reference: "Frente A Mototiendas Honda de la Merced",
    lat: -12.07,
    lng: -75.2
  },
  {
    courier: "marvisur",
    department: "Junin",
    province: "Chanchamayo",
    district: "Pichanaqui",
    zone: "Pichanaqui",
    address: "A.h. Iv Sector Bajo Pichanaqui Jr. 9 de Diciembre Mz J Lote 1 -junin- Chanchamayo -pichanaqui",
    reference: "Una Cuadra Antes del Colegio Manual Gonzales Prada",
    lat: -12.07,
    lng: -75.2
  },
  {
    courier: "marvisur",
    department: "Junin",
    province: "Huancayo",
    district: "Huancayo",
    zone: "Huancayo",
    address: "Avenida Leoncio Prado 814 – Chilca – Huancayo – Junin",
    reference: "Al Frente del Local de Recepciones Chaleco Huanca",
    lat: -12.07,
    lng: -75.2
  },
  {
    courier: "marvisur",
    department: "Junin",
    province: "Jauja",
    district: "Jauja",
    zone: "Jauja",
    address: "Jr. 25 de Abril N° 190 Jauja - Jauja - Junín",
    reference: "Al Frente de Electrocentro",
    lat: -11.78,
    lng: -75.5
  },
  {
    courier: "marvisur",
    department: "Junin",
    province: "Satipo",
    district: "Satipo",
    zone: "Satipo",
    address: "Jr. Agricultura N439 Junin-satipo-satipo",
    reference: "A Espaldas del Colegio Pamer",
    lat: -12.07,
    lng: -75.2
  },
  {
    courier: "marvisur",
    department: "Junin",
    province: "Tarma",
    district: "Tarma",
    zone: "Tarma",
    address: "Jr. Huánuco 1116, Tarma - Tarma - Junin",
    reference: "Al Costado de Expreso el Ruso / A Una Cuadra de Óvalo Héroes de Tarma",
    lat: -12.07,
    lng: -75.2
  },
  {
    courier: "marvisur",
    department: "Junin",
    province: "Yauli",
    district: "La Oroya",
    zone: "La Oroya",
    address: "Av. Miguel Grau Nro. 1081 Int 1083 Sec Santa Rosa de Sacco - Yauli Junin",
    reference: "Al Lado de la Financiera Confianza",
    lat: -12.07,
    lng: -75.2
  },
  {
    courier: "marvisur",
    department: "La Libertad",
    province: "Chepen",
    district: "Chepen",
    zone: "Chepen",
    address: "Mz E Lote 9 Aahh Genaro Silva Chepen Chepen la Libertad",
    reference: "A Tres Cuadras del Cementerio de Chepén",
    lat: -7.22,
    lng: -79.43
  },
  {
    courier: "marvisur",
    department: "La Libertad",
    province: "Otuzco",
    district: "Otuzco",
    zone: "Otuzco",
    address: "Av. Trujillo 155 -la Libertad -otuzco-otuzco",
    reference: "A Media Cuadra del Banco de la Nación / A Un Costado del Grifo Petronorte",
    lat: -8.11,
    lng: -79.03
  },
  {
    courier: "marvisur",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Ciudad de Dios",
    zone: "Ciudad de Dios",
    address: "Av. Cajamarca Mz. G Lt. 1 C.p.m. Pakatnamu, Guadalupe",
    reference: "Frente Al Grifo Primax",
    lat: -7.4,
    lng: -79.6
  },
  {
    courier: "marvisur",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Guadalupe",
    zone: "Guadalupe",
    address: "Av. Nilla Cerruti 290 Cafetal Ii - Guadalupe - Pascasmayo",
    reference: "Al Costado de Emtrafesa O Al Frente Al Grifo Repsol",
    lat: -7.25,
    lng: -79.58
  },
  {
    courier: "marvisur",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "Pacasmayo",
    zone: "Pacasmayo",
    address: "Mz. P Lt. 1 Int. A Aa.hh. las Palmeras - Pacasmayo - la Libertad",
    reference: "Frente A Servicios Lubricantes Jg el Chalan.",
    lat: -7.4,
    lng: -79.6
  },
  {
    courier: "marvisur",
    department: "La Libertad",
    province: "Pacasmayo",
    district: "San Pedro de Lloc",
    zone: "San Pedro de Lloc",
    address: "Otr. la Venturosa S/n",
    reference: "Cerca Al Paradero San Pedro de Lloc",
    lat: -7.4,
    lng: -79.6
  },
  {
    courier: "marvisur",
    department: "La Libertad",
    province: "Sanchez Carrion",
    district: "Huamachuco",
    zone: "Huamachuco",
    address: "Jr. Simón Bolivar 1337 - Huamachuco - Sanchez Carrión - la Libertad",
    reference: "Cruce de Jr. Simón Bolivar Con Vía Evitamiento",
    lat: -8.11,
    lng: -79.03
  },
  {
    courier: "marvisur",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Trujillo",
    address: "Jr. Atahualpa Nro. 590 Urb. Santa Maria (atahualpa 590-592) Trujillo - Trujillo - la Libertad",
    reference: "A Una Cuadra de la Av. los Incas O Al Costado del Colegio Salazar Bondy",
    lat: -8.11,
    lng: -79.03
  },
  {
    courier: "marvisur",
    department: "La Libertad",
    province: "Viru",
    district: "Chao",
    zone: "Chao",
    address: "Av. Víctor Raúl Haya de la Torre 780 - Chao - la Libertad",
    reference: "Frente A la Comisaría de Chao",
    lat: -8.55,
    lng: -78.68
  },
  {
    courier: "marvisur",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Chiclayo",
    address: "Calle Tacna Nro. 999 Esq.con Sarmiento Chiclayo - Chiclayo - Lambayeque",
    reference: "A Espaldas de Makro",
    lat: -6.77,
    lng: -79.84
  },
  {
    courier: "marvisur",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo Almacen",
    zone: "Chiclayo Almacen",
    address: "Av. Paul Harris Nro. 2003 la Victoria - Chiclayo - Lambayeque",
    reference: "A 1 Cuadra de Vía Evitamiento. Pasando el Grifo Petro Perú",
    lat: -6.77,
    lng: -79.84
  },
  {
    courier: "marvisur",
    department: "Lambayeque",
    province: "Ferreñafe",
    district: "Ferreñafe",
    zone: "Ferreñafe",
    address: "Urb. Ramiro Priale Mz. A, Lt. 3",
    reference: "Frente Al Estadio Carlos Samamé. Al Lado de Junta de Usuarios.",
    lat: -6.64,
    lng: -79.79
  },
  {
    courier: "marvisur",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Lambayeque",
    zone: "Lambayeque",
    address: "Calle la Tina Mz A Lote 01 la Dunas Lambayeque - Lambayeque - Lambayeque",
    reference: "Al Costado del Hotel la Posada Norteña Frente Al Almacén Indoamérica",
    lat: -6.7,
    lng: -79.91
  },
  {
    courier: "marvisur",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Motupe",
    zone: "Motupe",
    address: "Calle los Laureles N 102, Lt. Z Primavera - Motupe",
    reference: "A Una Cuadra del Parque Primavera de Motupe",
    lat: -6.7,
    lng: -79.91
  },
  {
    courier: "marvisur",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Olmos",
    zone: "Olmos",
    address: "Panamericana Antigua Km 874,olmos - Lambayeque",
    reference: "Entrada Al Arco de Olmos",
    lat: -6.7,
    lng: -79.91
  },
  {
    courier: "marvisur",
    department: "Lambayeque",
    province: "Lambayeque",
    district: "Tucume",
    zone: "Tucume",
    address: "A.h. Prolongación Av. Federico Villareal Mz.c, Lt.2",
    reference: "Carretera Fernando Belaunde Terry. Carretera Motupe - Olmos",
    lat: -6.7,
    lng: -79.91
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Barranca",
    district: "Barranca",
    zone: "Barranca",
    address: "Jr. Lima Nro. 217 Barranca - Barranca - Lima",
    reference: "A Media Cuadra del Depósito Municipal de Barranca",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Cañete",
    district: "Cañete",
    zone: "Cañete",
    address: "Urb. Tercer Mundo Mz. \"a -1\" Lt. 13 - San Vicente de Cañete - Cañete - Lima",
    reference: "Cerca A la Ferretería Sofía Cruce Con Av. Libertadores",
    lat: -13.08,
    lng: -76.39
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Huaral",
    district: "Huaral",
    zone: "Huaral",
    address: "Av. Jorge Chavez N 635 Huaral Huaral Lima",
    reference: "A Dos Cuadras de la Notaria Narvaez O Al Frente de la Vidrieria Ronald",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Huaura",
    district: "Huacho",
    zone: "Huacho",
    address: "Av. Centenario S/n, Urb. Valdivia , Santa Maria –huaura – Lima",
    reference: "Frente Al Restaurante “el Cevicheff”",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Ancon",
    zone: "Ancon",
    address: "Av. Alejandro Bertello, Asc. Santa Rosa de Lima Mz. A Lote 23",
    reference: "Al Frente de la Cevichería Tumbes",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Ate",
    zone: "Ate",
    address: "Urb. Asociacion Pro Vivienda Villa Vitarte Mz G Lote 2",
    reference: "Frente Al Terminal Terrestre de Ate Vitarte",
    lat: -12.03,
    lng: -76.92
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Ate Ii",
    zone: "Ate Ii",
    address: "Av.nicolas Ayllon N.º 3050 Centro Comercial Jessie Ref: Al Frente de Mall de Santa Anita",
    reference: "Frente Al Mall de Santa Anita / Al Costado del Complejo Santa Rosa",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Breña",
    zone: "Breña",
    address: "Urb.azcona Av. Arica 1543",
    reference: "Frente Al Grifo Progreso / Antes de Llegar Al Puente Tingo María",
    lat: -12.06,
    lng: -77.05
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Campoy",
    zone: "Campoy",
    address: "Urb. Lotización Campoy Primera Etapa Av. A Mz. Ll Lt. 3",
    reference: "Al Costado de Cevichería \"sabor &amp; Punto\"",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo",
    zone: "Carabayllo",
    address: "Av. Túpac Amaru 324 - Carabayllo - Lima - Lima",
    reference: "Al Costado del Mercado Establo",
    lat: -11.9,
    lng: -77.03
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Carabayllo Ii",
    zone: "Carabayllo Ii",
    address: "Av. Trapiche Mz. F Lt. 74 Urb. Tungasuca, Carabayllo - Lima - Lima",
    reference: "Frente del Paradero Peycar O En la Misma Recta de Anypsa",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Chorrillos",
    zone: "Chorrillos",
    address: "Urb. Parcelacion Semirustica S.j. Bautista de Villa 1ra.etapa Av. Camino del Inca Mz N Lote 35, Chorrillos - Lima - Lima",
    reference: "Frente Al Penitenciario de Mujeres Virgen de Fatima",
    lat: -12.17,
    lng: -77.02
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Chorrillos Ii",
    zone: "Chorrillos Ii",
    address: "Av. Santa Anita N° 312 -lima -lima-chorrillos",
    reference: "Frente A la Calle Santa Mónica",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Comas",
    zone: "Comas",
    address: "Av. José de la Torre Ugarte Nro. 415 Urb. el Retablo 2da Etapa",
    reference: "Frente A la Cevicheria \"el Huarique del Pez\"",
    lat: -11.94,
    lng: -77.06
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "El Agustino",
    zone: "El Agustino",
    address: "Av. Primero de Mayo 3013, Cooperativa Huancayo - Lima - Lima -el Agustino",
    reference: "Frente Al Grifo Repsol",
    lat: -12.04,
    lng: -77
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Fiori",
    zone: "Fiori",
    address: "Av. Miguel Angel N 129 Urb Fiori San Martin de Porres Lima Lima",
    reference: "Cerca Al Cruce Con Av. Germán Aguirre",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Huaycan",
    zone: "Huaycan",
    address: "Av. el Manantial de Pariachi Con Av. Jose Carlos Mariategui 112 Ate-huaycan - Lima - Lima - Ref. 1 Cuadra de la Entrada de Huaycan",
    reference: "A Una Cuadra de la Entrada de Huaycán, Ex Paradero Elektra / Al Costado de Supermercados Mina",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Independencia",
    zone: "Independencia",
    address: "Av Tupac Amaru Mz N Lote 18 - Lima-lima-independencia",
    reference: "A Una Cuadra del Paradero el Naranjal",
    lat: -11.99,
    lng: -77.06
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "La Molina",
    zone: "La Molina",
    address: "Nro 1019 Otr. Centro Comercial la Rotonda Ii 1er Piso Tienda 1019 Lima Lima la Molina",
    reference: "Dentro de la Galería Comercial la Rotonda Ii",
    lat: -12.09,
    lng: -76.95
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Las Malvinas",
    zone: "Las Malvinas",
    address: "Av Colonial 868 -lima -lima-lima",
    reference: "Primer Piso del Edificio Gran Colonial",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Lima Almacen",
    zone: "Lima Almacen",
    address: "Jr. Sebastian Lorente N 596 Barrios Altos - Lima - Lima",
    reference: "Al Costado del Grifo los Inkas",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Lince",
    zone: "Lince",
    address: "Av Militar 2180 -lima -lima-lince",
    reference: "Frente A la Pollería la Fogata O A Espaldas del Mercado Lobatón",
    lat: -12.09,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos",
    zone: "Los Olivos",
    address: "Av. las Palmeras Nro. 5343 Urb. Peregrinos del Señor (1er. Piso)",
    reference: "Al Costado del Market Vega",
    lat: -11.97,
    lng: -77.07
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos Ii",
    zone: "Los Olivos Ii",
    address: "Av. Alfredo Mendiola N 3265. Urbanización Villa los Ángeles",
    reference: "Al Frente de Mega Plaza. Al Costado del Battery Plaza",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos Iii",
    zone: "Los Olivos Iii",
    address: "Urb.puerta de Pro I Etapa Av . Proceres de Huandoy Mza B4 Lote 20 -lima -lima-los Olivos",
    reference: "Frente Al Grifo Repsol",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Los Olivos Iv",
    zone: "Los Olivos Iv",
    address: "Av. Alfredo Mendiola Mz. U, Lte. 33, Urb. Villa del Norte",
    reference: "Al Frente del Terminal Terrestre Lima Norte/a Media Cuadra del Paradero Caseta - los Olivos",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Lurin",
    zone: "Lurin",
    address: "Las Salinas A-19 Antigua Panamericana Km36.5-lima-lima-lurin",
    reference: "Antigua Panamericana Sur (km 36.5)",
    lat: -12.27,
    lng: -76.87
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Magdalena",
    zone: "Magdalena",
    address: "Urb. Orbea Jr. Junin 661-lima-lima-magdalena del Mar",
    reference: "A Media Cuadra del Cruce Con Jr. Leoncio Prado y A Dos Cuadras del Mercado Magdalena",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Manchay",
    zone: "Manchay",
    address: "Mza C Lote 1 A.h. Paul Poblet Lind Pachacamac - Lima - Lima",
    reference: "A la Altura de Mi Banco de Manchay - Carretera Cieneguilla",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Pueblo Libre",
    zone: "Pueblo Libre",
    address: "Av. la Marina Nro. 1640 (lote 19 Mz A) Pueblo Libre-lima -lima",
    reference: "A Media Cuadra de la Av. Universitaria/ A Media Cuadra del C.c. Plaza San Miguel",
    lat: -12.07,
    lng: -77.06
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra",
    zone: "Puente Piedra",
    address: "Av. Puente Piedra Mz. N Lt. 149 H Pj. los Gramadales",
    reference: "Al Costado de la Llantería \"san Martín\"",
    lat: -11.87,
    lng: -77.07
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra Ii",
    zone: "Puente Piedra Ii",
    address: "Asociacion de Propietarios Naranjito Mz B Lote C1-lima -lima-puente Piedra",
    reference: "A Dos Cuadras del Puente Peatonal Rosa Luz / Antes del Cementerio Buen Retiro",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Puente Piedra Iii",
    zone: "Puente Piedra Iii",
    address: "P.j Jerusalen Av Ancon Nro.976 Mz C Lote 10 -lima -lima -puente Piedra",
    reference: "Paradero la Flecha / A Espaldas del Grifo \"petro Americana\"",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Raymondi",
    zone: "Raymondi",
    address: "Jr. Raymondi 571 la Victoria Lima - Lima",
    reference: "Frente Al C.c. el Palacio de la Moda - Paralela A Av. Grau",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Rimac",
    zone: "Rimac",
    address: "Av. Amancaes 598 - Rimac Lima - Lima",
    reference: "A Una Cuadra de la Biblioteca Armando Filomeno",
    lat: -12.03,
    lng: -77.03
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho",
    zone: "San Juan de Lurigancho",
    address: "Av 13 de Enero 2064 Ref: los Postes - Lima -lima-san Juan de Lurigancho",
    reference: "Cerca Al Cruce Entre Av. 13 de Enero y Av. los Postes",
    lat: -11.98,
    lng: -77
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho Ii",
    zone: "San Juan de Lurigancho Ii",
    address: "Coo. de Vivienda Mariscal Luzuriaga Ltda. 551 Mz L Lote 4 Ref: Santa Rosa - Lima -lima-san Juan de Lurigancho",
    reference: "A la Altura de la Estación Santa Rosa del Tren / Cerca Al Colegio Sor Ana",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho Iii",
    zone: "San Juan de Lurigancho Iii",
    address: "Jr. Saturno 381 Urb . Ganimedes Ref: las Flores- Lima -lima-san Juan de Lurigancho",
    reference: "Altura del Paradero 21 de las Flores A Tres Cuadras de Plaza Vea",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho Iv",
    zone: "San Juan de Lurigancho Iv",
    address: "P.j Cruz de Motupe Etapa Segunda Mz E Lote 10",
    reference: "Paradero 4 de Motupe / Al Costado de Ramses Gym Extreme",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Lurigancho V",
    zone: "San Juan de Lurigancho V",
    address: "Urb. los Jardines de San Juan Et. Dos Av. Proceres de la Independencia 1325",
    reference: "A Una Cuadra y Media del Banco de la Nación",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "San Juan de Miraflores",
    zone: "San Juan de Miraflores",
    address: "Av. de los Héroes N. 232 A y Jr. las Almendras Manzana U Lote 12 - Local No. 6 - San Juan de Miraflores - Lima",
    reference: "Frente Al Supermercado Metro del Paradero el Pozo",
    lat: -12.16,
    lng: -76.97
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres",
    zone: "San Martin de Porres",
    address: "Av. Canta Callao Mz. D Lt. 17 Urb. los Lirios - San Martin de Porres - Lima",
    reference: "A Tres Cuadras del Óvalo Canta Callao",
    lat: -12,
    lng: -77.08
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres Ii",
    zone: "San Martin de Porres Ii",
    address: "Urb. Peru Av. Peru 1557",
    reference: "A Tres Cuadras de la Av.canada (puente Dueñas)",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "San Martin de Porres Iii",
    zone: "San Martin de Porres Iii",
    address: "Av. los Proceres 340",
    reference: "Al Costado del Hostal los Faroles",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Santa Anita",
    zone: "Santa Anita",
    address: "Av. Huancaray Mz. A Lt. 3 – Santa Anita",
    reference: "A Una Cuadra del Oxxo",
    lat: -12.04,
    lng: -76.97
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Santa Clara",
    zone: "Santa Clara",
    address: "Urb. Sol de las Viñas Otr. Carretera Central Km 11.5 Mz. A Lote 01",
    reference: "Altura del Restaurante Manya",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Surquillo",
    zone: "Surquillo",
    address: "Av. Republica de Panama 5053 Surquillo - Lima - Lima",
    reference: "A Lado del Grifo Enpex",
    lat: -12.11,
    lng: -77.01
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Villa el Salvador",
    zone: "Villa el Salvador",
    address: "Parcela Ii Mz. H-1 Lt. 6 (calle los Forjadores) Parque Industrial de Villa el Salvador - Lima Lima",
    reference: "Al Costado de la Riel del Tren - Calle los Forjadores Con Separadora Industrial",
    lat: -12.21,
    lng: -76.94
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Villa el Salvador Ii",
    zone: "Villa el Salvador Ii",
    address: "Asc.villa 2000 Mz A Lt 2-lima-lima-villa el Salvador",
    reference: "Al Costado de Essalud Uldarico Rocca Fernández",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Villa el Salvador Iii",
    zone: "Villa el Salvador Iii",
    address: "Urb Pachacamac 4ta Etapa Mz “a” Lote 3 Barrio 3 Sector 2 - Villa el Salvador - Lima - Lima",
    reference: "A Una Cuadra del Óvalo Lomas de Pastor Sevilla (ruta C)",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria",
    zone: "Villa Maria",
    address: "Av. Lima 2190 - Lim A-lima-villa Maria del Triunfo",
    reference: "Altura Paradero 12 de Av. Lima, José Galvez",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Lima",
    province: "Lima",
    district: "Villa Maria Ii",
    zone: "Villa Maria Ii",
    address: "A.h.mariano Melgar Av. Pachacutec 3576- Lima-lima-villa Maria del Triunfo",
    reference: "Frente A Real Plaza O Al Costado de Mayorsa",
    lat: -12.05,
    lng: -77.04
  },
  {
    courier: "marvisur",
    department: "Loreto",
    province: "Alto Amazonas",
    district: "Yurimaguas",
    zone: "Yurimaguas",
    address: "Jr. Mariscal Caceres Nro. 301 las Flores Yurimaguas - Alto Amazonas Loreto",
    reference: "Al Costado del Taller Municipal",
    lat: -5.9,
    lng: -76.11
  },
  {
    courier: "marvisur",
    department: "Loreto",
    province: "Loreto",
    district: "Nauta",
    zone: "Nauta",
    address: "Cal. Junin Mz E Lote 14 - Loreto - Loreto - Nauta",
    reference: "Frente Al Hospedaje Jayko - A Espaldas del Colegio Nuestra Señora de Loreto",
    lat: -3.75,
    lng: -73.25
  },
  {
    courier: "marvisur",
    department: "Loreto",
    province: "Maynas",
    district: "Iquitos",
    zone: "Iquitos",
    address: "Calle Angel Brusco Nro. 580 Iquitos - Maynas - Loreto",
    reference: "Frente Al Mercado Modelo",
    lat: -3.75,
    lng: -73.25
  },
  {
    courier: "marvisur",
    department: "Madre de Dios",
    province: "Tambopata",
    district: "Mazuko",
    zone: "Mazuko",
    address: "Jr. Ramon Castilla S/n Con Esquina Gregorio Barasorda S/n Inambari - Tambopata - Madre de Dios",
    reference: "Una Cuadra Antes del Municipio de Inambari",
    lat: -12.6,
    lng: -69.19
  },
  {
    courier: "marvisur",
    department: "Madre de Dios",
    province: "Tambopata",
    district: "Puerto Maldonado",
    zone: "Puerto Maldonado",
    address: "Jr. Piura Mza. 3d Lote. 7 Esquina .jiron Apurimac, Tambopata - Tambopata - Madre de Dios",
    reference: "A Espaldas de Electro Sur Madre de Dios",
    lat: -12.6,
    lng: -69.19
  },
  {
    courier: "marvisur",
    department: "Moquegua",
    province: "Ilo",
    district: "Ilo",
    zone: "Ilo",
    address: "Urb.costa Azul Av Industrial Mz B Lote 36-moquegua-ilo-ilo",
    reference: "Frente de Patio Puerto, Primera Cuadra Costa Azul",
    lat: -17.64,
    lng: -71.34
  },
  {
    courier: "marvisur",
    department: "Moquegua",
    province: "Mariscal Nieto",
    district: "Moquegua",
    zone: "Moquegua",
    address: "Calle los Damascos Mza. D Lt. 01 Urb. los Olivos Moquegua - Mariscal Nieto-moquegua",
    reference: "A Una Cuadra del Terminal Terrestre de Moquegua",
    lat: -17.19,
    lng: -70.93
  },
  {
    courier: "marvisur",
    department: "Pasco",
    province: "Oxapampa",
    district: "Oxapampa",
    zone: "Oxapampa",
    address: "Jr.muller Mz 198 Lote 4 - Pasco -oxapampa-oxapampa",
    reference: "Al Costado del Terminal Terrestre de Oxapampa",
    lat: -10.68,
    lng: -76.26
  },
  {
    courier: "marvisur",
    department: "Pasco",
    province: "Oxapampa",
    district: "Villa Rica",
    zone: "Villa Rica",
    address: "Av. Leopoldo Krausse 919-pasco-oxapampa-villa Rica",
    reference: "A Una Cuadra del Hipermarket Segoviana",
    lat: -10.68,
    lng: -76.26
  },
  {
    courier: "marvisur",
    department: "Pasco",
    province: "Pasco",
    district: "Cerro de Pasco",
    zone: "Cerro de Pasco",
    address: "A.h Tupac Amaru -sector Chaquicocha Mz D Lote 8- Pasco - Pasco -chaupimarca",
    reference: "Frente Al Nuevo Terminal de Chaupimarca",
    lat: -10.68,
    lng: -76.26
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Ayabaca",
    district: "Ayabaca",
    zone: "Ayabaca",
    address: "Cal.caceres N 201 Ayabaca-ayabaca-piura",
    reference: "A Una Cuadra de la Plaza de Armas - A Una Cuadra de la Comisaria",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Ayabaca",
    district: "Paimas",
    zone: "Paimas",
    address: "Calle Fernando Belaunde Terry S/n",
    reference: "A Una Cuadra de la Comisaria - A Dos Cuadras de la Municipalidad",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Morropon",
    district: "Chulucanas",
    zone: "Chulucanas",
    address: "Jr. Ayacucho N°. 451 Piura- Morropon - Chulucanas",
    reference: "A Una Cuadra de la Plaza de Armas de Chulucanas A Espaldas de Centro Médico las Mercedes",
    lat: -5.09,
    lng: -80.16
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Paita",
    district: "Paita",
    zone: "Paita",
    address: "Calle Independencia Mza. C Lote. 7 Urb. las Mercedes, Parte Alta -paita - Paita -piura",
    reference: "Frente A la Notaría Maldonado O A Espaldas de la Pollería Brisas del Mar",
    lat: -5.09,
    lng: -81.11
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Piura",
    district: "La Union",
    zone: "La Union",
    address: "Calle Lima 617 Piura - la Union",
    reference: "En el Ex Local de Enosa",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Piura",
    district: "Las Lomas",
    zone: "Las Lomas",
    address: "Cal. Grau 400 las Lomas-piura-piura",
    reference: "Esquina de la Plaza de Armas - A Cuadra y Media de la Comisaria",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Piura",
    address: "Jr. Circunvalacion Nro. 948 Piura - Piura-piura",
    reference: "Entre Av. Loreto y Av. Sullana",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Piura",
    district: "Piura Ii",
    zone: "Piura Ii",
    address: "Terreno Mz. A Lote 2 Tercera Zona Registral I1-i2 Distrito 26 de Octubre - Piura",
    reference: "A Espaldas del Grifo Digma, Ahora Grifo Ava, X el Terminal Pesquero de Piura (3 Cuadras)",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Piura",
    district: "Tambo Grande",
    zone: "Tambo Grande",
    address: "A.h. Jose Andres Razuri Mz C Lt 23a-piura-piura-tambo Grande",
    reference: "A Dos Cuadras del Estadio Municipal Fernando Arámbulu Santín",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Sullana",
    district: "Ignacio Escudero",
    zone: "Ignacio Escudero",
    address: "C.p. San Jacinto Mz.69 Lt. 6 - Ignacio Escudero, Sullana, Piura",
    reference: "Al Costado del Sindicato de Agricultores",
    lat: -4.9,
    lng: -80.68
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Sullana",
    district: "Sullana",
    zone: "Sullana",
    address: "Sullana-zona Industrial Municipal N2 Mz.\"e\" Lote N05",
    reference: "Al Costado de la Ex Planta Lechera Lado Izquierdo",
    lat: -4.9,
    lng: -80.68
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Sullana",
    district: "Sullana Ii",
    zone: "Sullana Ii",
    address: "Urbanizacion Santa Rosa Mz 166 Lote 6 Departamento A - Sullana- Sullana - Piura",
    reference: "Frente Al Colegio de Ingenieros del Perú",
    lat: -4.9,
    lng: -80.68
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Talara",
    district: "Los Organos",
    zone: "Los Organos",
    address: "Av. Panamericana Norte Mz. A Lt. 14 Sect. José Peña Quiroga",
    reference: "Frente A la I.e Augusto Salazar Bondy",
    lat: -4.58,
    lng: -81.27
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Talara",
    district: "Mancora",
    zone: "Mancora",
    address: "Calle Martin Waiss N 541 Mz 45 - Mancora-talara- Piura",
    reference: "A Espaldas de la Agencia Flores",
    lat: -4.1,
    lng: -81.05
  },
  {
    courier: "marvisur",
    department: "Piura",
    province: "Talara",
    district: "Talara",
    zone: "Talara",
    address: "Av. Ignacio Merino Mz. F Lote 13 - Piura -talara-pariñas",
    reference: "Detrás de Ittza Al Costado de Serenazgo",
    lat: -4.58,
    lng: -81.27
  },
  {
    courier: "marvisur",
    department: "Callao",
    province: "Callao",
    district: "Callao",
    zone: "Callao",
    address: "Av. Elmer Faucett Nro. 435 Urb. Tarapaca, Callao - Prov. Const. del Callao - Prov. Const. del Callao",
    reference: "A la Altura de la Av. Argentina y Av. Elmer Faucett",
    lat: -12.05,
    lng: -77.12
  },
  {
    courier: "marvisur",
    department: "Callao",
    province: "Callao",
    district: "Callao Ii",
    zone: "Callao Ii",
    address: "A.h. Bocanegra Sector 5 Mz G62 Lote 19 - Av. Tomas Valle",
    reference: "A Media Cuadra del Hotel Holiday O Frente Al Policlínico Chalaco",
    lat: -12.05,
    lng: -77.12
  },
  {
    courier: "marvisur",
    department: "Callao",
    province: "Callao",
    district: "Canta Callao",
    zone: "Canta Callao",
    address: "Mza. A Lote. 3 Asc. de Propietarios 7 de Agosto",
    reference: "Al Costado de Tottus de Bertelo Con Av. Canta Callao",
    lat: -12.05,
    lng: -77.12
  },
  {
    courier: "marvisur",
    department: "Callao",
    province: "Callao",
    district: "Ventanilla",
    zone: "Ventanilla",
    address: "Jr Jupiter N°107 Urb Almirante Miguel Grau",
    reference: "Frente A Grifo Repsol O Frente A la Empresa Marbal",
    lat: -11.87,
    lng: -77.13
  },
  {
    courier: "marvisur",
    department: "Puno",
    province: "Chucuito",
    district: "Desaguadero",
    zone: "Desaguadero",
    address: "Av. Cultura Nro 206 Int 1 Desaguadero - Chucuito - Puno",
    reference: "Al Frente del Colegio Tahuantinsuyo",
    lat: -15.84,
    lng: -70.02
  },
  {
    courier: "marvisur",
    department: "Puno",
    province: "El Collao",
    district: "Ilave",
    zone: "Ilave",
    address: "Av. Panamericana Nro. 114 Barrio Cruzani Ilave - el Collao - Puno",
    reference: "Al Frente del Terminal Terrestre",
    lat: -16.09,
    lng: -69.64
  },
  {
    courier: "marvisur",
    department: "Puno",
    province: "Puno",
    district: "Puno",
    zone: "Puno",
    address: "Av. Costanera Ii Mza D Lote 1 Urb. Señor de Huanca Puno-puno-puno",
    reference: "Cerca Al Terminal Terrestre Con Jr. Túpac Amaru",
    lat: -15.84,
    lng: -70.02
  },
  {
    courier: "marvisur",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca",
    zone: "Juliaca",
    address: "Urb. 9 de Octubre Jr Federico More Esq. Jr Santa Rosa y Esq Jr Coata 440",
    reference: "A Dos Cuadras de la Av. Circunvalación",
    lat: -15.5,
    lng: -70.13
  },
  {
    courier: "marvisur",
    department: "Puno",
    province: "San Roman",
    district: "Juliaca Ii",
    zone: "Juliaca Ii",
    address: "Jirón San Agustín N°635 Urb. San Santiago",
    reference: "A Media Cuadra del Terminal Terrestre de Juliaca",
    lat: -15.84,
    lng: -70.02
  },
  {
    courier: "marvisur",
    department: "San Martin",
    province: "Mariscal Caceres",
    district: "Juanjui",
    zone: "Juanjui",
    address: "Carretera Marginal Fernando Belaunde Terry S/n Juanjui Mariscal Caceres - San Martin",
    reference: "A Dos Casas del Ministerio de Agricultura",
    lat: -7.18,
    lng: -76.73
  },
  {
    courier: "marvisur",
    department: "San Martin",
    province: "Moyobamba",
    district: "Moyobamba",
    zone: "Moyobamba",
    address: "Av. Grau Nro. 690 Moyobamba - Moyobamba - San Martin",
    reference: "Al Costado del Senati O de Móvil Bus",
    lat: -6.03,
    lng: -76.97
  },
  {
    courier: "marvisur",
    department: "San Martin",
    province: "Rioja",
    district: "Nueva Cajamarca",
    zone: "Nueva Cajamarca",
    address: "Jr. Garcilazo de la Vega Mz 18 Lote 1 A-1 - Nueva Cajamarca - Rioja - San Martin",
    reference: "Esquina Con Jr. Tacna, Frente A la Sunarp (explanada las Malvinas)",
    lat: -5.94,
    lng: -77.31
  },
  {
    courier: "marvisur",
    department: "San Martin",
    province: "Rioja",
    district: "Rioja",
    zone: "Rioja",
    address: "Av. Campo Ferial Mz 39 A - Lote 12, Sec. Nueva Rioja, Rioja - Rioja - San Martin",
    reference: "Al Frente de la Morgue de Rioja",
    lat: -6.06,
    lng: -77.16
  },
  {
    courier: "marvisur",
    department: "San Martin",
    province: "San Martin",
    district: "Tarapoto",
    zone: "Tarapoto",
    address: "Jr. Manco Inca Nro. 688 Tarapoto - San Martin -san Martin",
    reference: "A Dos Cuadras Antes de Llegar A Essalud",
    lat: -6.49,
    lng: -76.37
  },
  {
    courier: "marvisur",
    department: "San Martin",
    province: "Tocache",
    district: "Tocache",
    zone: "Tocache",
    address: "Jr. Jorge Chavez Nº 210 (esq. Con Jacinta Cartagena) Tocache- Tocache- San Martin",
    reference: "A Una Cuadra del Cementerio General",
    lat: -6.49,
    lng: -76.37
  },
  {
    courier: "marvisur",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Tacna",
    address: "Avenida Industrial N485- A1 -tacna",
    reference: "A 50 Mts del Grifo Primax,dos Cuadras Abajo de la Plaza Leoncio Prado",
    lat: -18.01,
    lng: -70.25
  },
  {
    courier: "marvisur",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna Ii",
    zone: "Tacna Ii",
    address: "Cal. Banchero Rossi 140 Mz. A Lt. 20-a Zona Auxiliar Parque Industrial",
    reference: "Altura del Grifo Centenario 2 O Grifo Repsol Mano Izquierda",
    lat: -18.01,
    lng: -70.25
  },
  {
    courier: "marvisur",
    department: "Tumbes",
    province: "Contralmirante Villar",
    district: "Zorritos",
    zone: "Zorritos",
    address: "Av. Republica del Perú N 102 - Zorritos - Contralmirante Villar - Tumbes",
    reference: "Frente A la Comisaría de Zorritos",
    lat: -3.57,
    lng: -80.45
  },
  {
    courier: "marvisur",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Tumbes",
    address: "Calle 24 de Julio 800 Centro Poblado Barrio San Jose Mz F Lt01 Tumbes - Tumbes - Tumbes",
    reference: "Al Costado del Ministerio de Agricultura",
    lat: -3.57,
    lng: -80.45
  },
  {
    courier: "marvisur",
    department: "Tumbes",
    province: "Zarumilla",
    district: "Aguas Verdes",
    zone: "Aguas Verdes",
    address: "Av Tumbes Mz 18 Lote 24 Aa.hh. Tomas Arizola Olaya Tumbes - Zarumilla - Aguas Verdes",
    reference: "Al Costado de Neumacentro",
    lat: -3.5,
    lng: -80.27
  },
  {
    courier: "marvisur",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa",
    zone: "Pucallpa",
    address: "Jr. 2 de Mayo Nro. 263 Calleria - Coronel Portillo - Ucayali",
    reference: "A Una Cuadra de la Dirección Regional de Turismo",
    lat: -8.38,
    lng: -74.55
  },
  {
    courier: "marvisur",
    department: "Ucayali",
    province: "Coronel Portillo",
    district: "Pucallpa Ii",
    zone: "Pucallpa Ii",
    address: "Fundo Villa Teresita Lt. B-1 Km 4.100 Av. Centenario Km 4.100 Yarinacocha - Coronel Portillo - Ucayali",
    reference: "A 25 M. del Grifo Espinoza O Al Costado de Naysha Cards",
    lat: -8.38,
    lng: -74.55
  },
  {
    courier: "marvisur",
    department: "Ucayali",
    province: "Padre Abad",
    district: "Aguaytia",
    zone: "Aguaytia",
    address: "Cal. Carr. Federico Basadre Mz A Lote 5-ucayali-padre Abad -padre Abad",
    reference: "Al Costado del Terminal de Aguaytía",
    lat: -8.38,
    lng: -74.55
  },
  {
    courier: "marvisur",
    department: "Ucayali",
    province: "Padre Abad",
    district: "Neshuya",
    zone: "Neshuya",
    address: "C.v. Manuel Gambini Rupay Mz 21 Lote 1",
    reference: "Al Costado de Financiera Caja Huancayo",
    lat: -8.38,
    lng: -74.55
  },
  {
    courier: "flores",
    department: "Arequipa",
    province: "Arequipa",
    district: "José Luis Bustamante y Rivero",
    zone: "Terminal Central Flores Hnos.",
    address: "Av. Miguel Forga esq. Av. Los Incas Mz. N Lt. 2",
    reference: "",
    lat: -16.42,
    lng: -71.53
  },
  {
    courier: "flores",
    department: "Arequipa",
    province: "Camaná",
    district: "Camaná",
    zone: "Agencia Camaná",
    address: "Av. Lima 319",
    reference: "",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "flores",
    department: "Arequipa",
    province: "Caravelí",
    district: "Chala",
    zone: "Agencia Chala",
    address: "Panamericana Sur s/n",
    reference: "",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "flores",
    department: "Arequipa",
    province: "Caylloma",
    district: "Majes",
    zone: "Agencia Alto Siguas",
    address: "Km 914 Carretera Panamericana Sur",
    reference: "",
    lat: -16.4,
    lng: -71.54
  },
  {
    courier: "flores",
    department: "Cajamarca",
    province: "Cajamarca",
    district: "Cajamarca",
    zone: "Agencia Cajamarca",
    address: "Av. Atahualpa 315",
    reference: "",
    lat: -7.16,
    lng: -78.51
  },
  {
    courier: "flores",
    department: "Ica",
    province: "Ica",
    district: "Ica",
    zone: "Terminal Ica",
    address: "Av. Fray Ramón Rojas 266",
    reference: "",
    lat: -14.07,
    lng: -75.73
  },
  {
    courier: "flores",
    department: "Ica",
    province: "Nasca",
    district: "Nasca",
    zone: "Agencia Nasca",
    address: "Av. Los Incas 108",
    reference: "",
    lat: -14.83,
    lng: -74.94
  },
  {
    courier: "flores",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Terminal Av. del Ejército",
    address: "Av. del Ejército 346",
    reference: "",
    lat: -8.11,
    lng: -79.03
  },
  {
    courier: "flores",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Encomiendas Flores",
    address: "Av. Túpac Amaru 281",
    reference: "",
    lat: -8.11,
    lng: -79.03
  },
  {
    courier: "flores",
    department: "La Libertad",
    province: "Trujillo",
    district: "Trujillo",
    zone: "Flores Express",
    address: "Av. César Vallejo 1539",
    reference: "",
    lat: -8.11,
    lng: -79.03
  },
  {
    courier: "flores",
    department: "La Libertad",
    province: "Trujillo",
    district: "Moche",
    zone: "Stand Terrapuerto Moche",
    address: "Panamericana Norte Km 558 Stand C5-C6",
    reference: "",
    lat: -8.17,
    lng: -79
  },
  {
    courier: "flores",
    department: "Lambayeque",
    province: "Chiclayo",
    district: "Chiclayo",
    zone: "Terminal Chiclayo",
    address: "Av. Víctor Raúl Haya de la Torre 240",
    reference: "",
    lat: -6.77,
    lng: -79.84
  },
  {
    courier: "flores",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Terminal Paseo de la República",
    address: "Av. Paseo de la República 627",
    reference: "",
    lat: -12.07,
    lng: -77.02
  },
  {
    courier: "flores",
    department: "Lima",
    province: "Lima",
    district: "La Victoria",
    zone: "Terminal 28 de Julio",
    address: "Av. 28 de Julio 1374",
    reference: "",
    lat: -12.07,
    lng: -77.02
  },
  {
    courier: "flores",
    department: "Lima",
    province: "Lima",
    district: "Independencia",
    zone: "Terminal Plaza Norte",
    address: "Av. Túpac Amaru / Panamericana Norte",
    reference: "",
    lat: -11.99,
    lng: -77.06
  },
  {
    courier: "flores",
    department: "Moquegua",
    province: "Ilo",
    district: "Ilo",
    zone: "Agencia Ilo",
    address: "Av. Moquegua 1020",
    reference: "",
    lat: -17.64,
    lng: -71.34
  },
  {
    courier: "flores",
    department: "Moquegua",
    province: "Mariscal Nieto",
    district: "Moquegua",
    zone: "Agencia Moquegua",
    address: "Av. Ejército 100",
    reference: "",
    lat: -17.19,
    lng: -70.93
  },
  {
    courier: "flores",
    department: "Piura",
    province: "Piura",
    district: "Piura",
    zone: "Terminal Piura",
    address: "Av. Loreto 1301",
    reference: "",
    lat: -5.19,
    lng: -80.63
  },
  {
    courier: "flores",
    department: "Piura",
    province: "Sullana",
    district: "Sullana",
    zone: "Agencia Sullana",
    address: "Panamericana Norte s/n",
    reference: "",
    lat: -4.9,
    lng: -80.68
  },
  {
    courier: "flores",
    department: "Piura",
    province: "Talara",
    district: "Máncora",
    zone: "Agencia Máncora",
    address: "Av. Piura 516",
    reference: "",
    lat: -4.1,
    lng: -81.05
  },
  {
    courier: "flores",
    department: "Puno",
    province: "Puno",
    district: "Puno",
    zone: "Agencia Puno",
    address: "Jr. Primero de Mayo 710",
    reference: "",
    lat: -15.84,
    lng: -70.02
  },
  {
    courier: "flores",
    department: "Puno",
    province: "San Román",
    district: "Juliaca",
    zone: "Agencia Juliaca",
    address: "Av. Ferrocarril 155",
    reference: "",
    lat: -15.5,
    lng: -70.13
  },
  {
    courier: "flores",
    department: "Puno",
    province: "Chucuito",
    district: "Desaguadero",
    zone: "Agencia Desaguadero",
    address: "Av. Panamericana s/n",
    reference: "",
    lat: -15.84,
    lng: -70.02
  },
  {
    courier: "flores",
    department: "Tacna",
    province: "Tacna",
    district: "Tacna",
    zone: "Terminal Tacna",
    address: "Av. Hipólito Unanue 110",
    reference: "",
    lat: -18.01,
    lng: -70.25
  },
  {
    courier: "flores",
    department: "Tumbes",
    province: "Tumbes",
    district: "Tumbes",
    zone: "Terminal Tumbes",
    address: "Av. Tumbes Norte 481",
    reference: "",
    lat: -3.57,
    lng: -80.45
  },
  {
    courier: "flores",
    department: "Tumbes",
    province: "Zarumilla",
    district: "Aguas Verdes",
    zone: "Agencia Aguas Verdes",
    address: "Av. República del Perú 312",
    reference: "",
    lat: -3.5,
    lng: -80.27
  }
]
