/* ============================================================
   NEODRIVE - DONNÉES DE COMPATIBILITÉ VÉHICULE
   ============================================================
   Pour chaque marque / modèle / génération : le produit
   recommandé et le type de solution.

   COMMENT AJOUTER / MODIFIER UN VÉHICULE :
   Sous la bonne marque, ajoutez un objet modèle :
   {
     modele: "Nom du modèle",
     generations: [
       {
         label: "Génération (années)",
         anneeMin: 2012,
         anneeMax: 2018,
         systeme: "Système d'origine (ex: MMI 3G)",
         produit: "Produit recommandé",
         type: "boitier" | "autoradio" | "non-compatible",
         note: "Précision affichée au client"
       }
     ]
   }

   type "boitier"        -> interface qui garde l'écran d'origine
   type "autoradio"      -> écran Android qui remplace l'autoradio
   type "non-compatible" -> à étudier au cas par cas

   NOTE : la compatibilité réelle dépend parfois de l'équipement
   exact du véhicule. En cas de doute, le client est invité à
   nous contacter.
   ============================================================ */

window.NEODRIVE_COMPAT = {

  "Audi": [
    { modele:"A1", generations:[
      { label:"MMI / sans écran (2010–2018)", anneeMin:2010, anneeMax:2018, systeme:"MMI ou autoradio", produit:"Boîtier CarPlay ou autoradio Android selon équipement", type:"boitier", note:"Selon présence de l'écran MMI. Nous consulter en cas de doute." }
    ]},
    { modele:"A3", generations:[
      { label:"8P (2003–2012)", anneeMin:2003, anneeMax:2012, systeme:"Concert / Symphony", produit:"Autoradio Android 9\" — Châssis Audi A3 8P", type:"autoradio", note:"Remplace l'autoradio d'origine, conserve les commandes au volant." },
      { label:"8V MIB (2012–2020)", anneeMin:2012, anneeMax:2020, systeme:"MIB1 / MIB2", produit:"Boîtier CarPlay sans fil — Interface MIB", type:"boitier", note:"Compatible écran rétractable d'origine, plug & play." }
    ]},
    { modele:"A4 / A5", generations:[
      { label:"MMI 3G (2008–2015)", anneeMin:2008, anneeMax:2015, systeme:"MMI 3G", produit:"Boîtier CarPlay sans fil — Interface MMI 3G", type:"boitier", note:"Se branche sur la prise d'origine, garde l'écran et les boutons MMI." },
      { label:"MMI 3G+ / MIB (2015–2019)", anneeMin:2015, anneeMax:2019, systeme:"MMI 3G+ / MIB", produit:"Boîtier CarPlay sans fil — Interface MIB", type:"boitier", note:"CarPlay & Android Auto sans fil, plug & play." }
    ]},
    { modele:"A6 / A7", generations:[
      { label:"MMI 3G (2011–2018)", anneeMin:2011, anneeMax:2018, systeme:"MMI 3G", produit:"Boîtier CarPlay sans fil — Interface MMI 3G", type:"boitier", note:"Conserve l'écran et la molette MMI d'origine." }
    ]},
    { modele:"Q3", generations:[
      { label:"MMI / MIB (2011–2018)", anneeMin:2011, anneeMax:2018, systeme:"MMI 3G / MIB", produit:"Boîtier CarPlay sans fil — Interface MMI/MIB", type:"boitier", note:"Selon génération du système. Nous consulter pour confirmer." }
    ]},
    { modele:"Q5", generations:[
      { label:"MMI 3G (2008–2017)", anneeMin:2008, anneeMax:2017, systeme:"MMI 3G", produit:"Boîtier CarPlay sans fil — Interface MMI 3G", type:"boitier", note:"Plug & play sur la prise d'origine." }
    ]}
  ],

  "BMW": [
    { modele:"Série 1 (F20/F21)", generations:[
      { label:"NBT (2012–2016)", anneeMin:2012, anneeMax:2016, systeme:"NBT", produit:"Boîtier CarPlay sans fil — Interface NBT", type:"boitier", note:"CarPlay & Android Auto sans fil sur l'écran d'origine." },
      { label:"NBT EVO ID5/ID6 (2016–2019)", anneeMin:2016, anneeMax:2019, systeme:"NBT EVO", produit:"Boîtier CarPlay sans fil — Interface NBT EVO", type:"boitier", note:"Conserve toutes les fonctions iDrive." }
    ]},
    { modele:"Série 2 (F22/F45)", generations:[
      { label:"NBT / NBT EVO (2014–2021)", anneeMin:2014, anneeMax:2021, systeme:"NBT / NBT EVO", produit:"Boîtier CarPlay sans fil — Interface NBT/NBT EVO", type:"boitier", note:"Selon génération iDrive. Nous consulter pour confirmer." }
    ]},
    { modele:"Série 3 (F30/F31)", generations:[
      { label:"NBT (2012–2016)", anneeMin:2012, anneeMax:2016, systeme:"NBT", produit:"Boîtier CarPlay sans fil — Interface NBT", type:"boitier", note:"Sur l'écran d'origine, sans modification visible." },
      { label:"NBT EVO (2016–2019)", anneeMin:2016, anneeMax:2019, systeme:"NBT EVO", produit:"Boîtier CarPlay sans fil — Interface NBT EVO", type:"boitier", note:"Conserve toutes les fonctions iDrive." }
    ]},
    { modele:"Série 4 (F32/F33/F36)", generations:[
      { label:"NBT / NBT EVO (2013–2020)", anneeMin:2013, anneeMax:2020, systeme:"NBT / NBT EVO", produit:"Boîtier CarPlay sans fil — Interface NBT/NBT EVO", type:"boitier", note:"Selon génération iDrive." }
    ]},
    { modele:"Série 5 (F10/G30)", generations:[
      { label:"CIC / NBT (2010–2016)", anneeMin:2010, anneeMax:2016, systeme:"CIC / NBT", produit:"Boîtier CarPlay sans fil — Interface CIC/NBT", type:"boitier", note:"Selon système. Nous consulter pour confirmer." },
      { label:"G30 NBT EVO (2017–2020)", anneeMin:2017, anneeMax:2020, systeme:"NBT EVO", produit:"Boîtier CarPlay sans fil — Interface NBT EVO", type:"boitier", note:"Plug & play sur l'écran d'origine." }
    ]},
    { modele:"X1 / X3", generations:[
      { label:"NBT / NBT EVO (2012–2020)", anneeMin:2012, anneeMax:2020, systeme:"NBT / NBT EVO", produit:"Boîtier CarPlay sans fil — Interface NBT/NBT EVO", type:"boitier", note:"Selon génération iDrive." }
    ]}
  ],

  "Mini": [
    { modele:"Cooper (F56)", generations:[
      { label:"NBT / NBT EVO (2014–2020)", anneeMin:2014, anneeMax:2020, systeme:"NBT / NBT EVO", produit:"Boîtier CarPlay sans fil — Interface NBT/NBT EVO", type:"boitier", note:"Sur l'écran rond central d'origine." }
    ]},
    { modele:"Countryman", generations:[
      { label:"NBT EVO (2017–2020)", anneeMin:2017, anneeMax:2020, systeme:"NBT EVO", produit:"Boîtier CarPlay sans fil — Interface NBT EVO", type:"boitier", note:"Conserve toutes les fonctions d'origine." }
    ]}
  ],

  "Mercedes": [
    { modele:"Classe A (W176)", generations:[
      { label:"NTG 4.5 (2012–2015)", anneeMin:2012, anneeMax:2015, systeme:"NTG 4.5", produit:"Boîtier CarPlay sans fil — Interface NTG 4.5", type:"boitier", note:"Branchement sur le faisceau d'origine." },
      { label:"NTG 5.0/5.1 (2015–2018)", anneeMin:2015, anneeMax:2018, systeme:"NTG 5.0", produit:"Boîtier CarPlay sans fil — Interface NTG 5", type:"boitier", note:"Garde le COMAND/Audio d'origine." }
    ]},
    { modele:"Classe C (W204/W205)", generations:[
      { label:"NTG 4.5 (2011–2014)", anneeMin:2011, anneeMax:2014, systeme:"NTG 4.5", produit:"Boîtier CarPlay sans fil — Interface NTG 4.5", type:"boitier", note:"Plug & play sur la prise d'origine." },
      { label:"NTG 5.0/5.1 (2014–2018)", anneeMin:2014, anneeMax:2018, systeme:"NTG 5.0", produit:"Boîtier CarPlay sans fil — Interface NTG 5", type:"boitier", note:"CarPlay & Android Auto, conserve le COMAND." }
    ]},
    { modele:"Classe E (W212/W213)", generations:[
      { label:"NTG 4.5 (2009–2016)", anneeMin:2009, anneeMax:2016, systeme:"NTG 4.5", produit:"Boîtier CarPlay sans fil — Interface NTG 4.5", type:"boitier", note:"Sur l'écran d'origine." },
      { label:"NTG 5.5 (2016–2020)", anneeMin:2016, anneeMax:2020, systeme:"NTG 5.5", produit:"Boîtier CarPlay sans fil — Interface NTG 5.5", type:"boitier", note:"Conserve toutes les fonctions COMAND." }
    ]},
    { modele:"GLA / GLC", generations:[
      { label:"NTG 5.0/5.1 (2014–2019)", anneeMin:2014, anneeMax:2019, systeme:"NTG 5.0", produit:"Boîtier CarPlay sans fil — Interface NTG 5", type:"boitier", note:"Branchement discret sur le faisceau d'origine." }
    ]}
  ],

  "Volkswagen": [
    { modele:"Golf 6", generations:[
      { label:"RCD/RNS (2008–2012)", anneeMin:2008, anneeMax:2012, systeme:"RCD/RNS 310/510", produit:"Autoradio Android 9\" — Châssis VW", type:"autoradio", note:"Remplace l'autoradio, garde les commandes au volant." }
    ]},
    { modele:"Golf 7", generations:[
      { label:"MIB1 / MIB2 (2013–2020)", anneeMin:2013, anneeMax:2020, systeme:"MIB1 / MIB2", produit:"Boîtier CarPlay sans fil — Interface MIB", type:"boitier", note:"Plug & play sur la prise Quadlock d'origine." }
    ]},
    { modele:"Polo", generations:[
      { label:"Sans écran (2009–2017)", anneeMin:2009, anneeMax:2017, systeme:"Autoradio d'origine", produit:"Autoradio Android 9\" — Châssis VW", type:"autoradio", note:"Écran tactile, garde les commandes au volant." },
      { label:"MIB (2017–2021)", anneeMin:2017, anneeMax:2021, systeme:"MIB", produit:"Boîtier CarPlay sans fil — Interface MIB", type:"boitier", note:"Sur l'écran d'origine." }
    ]},
    { modele:"Passat", generations:[
      { label:"RCD/RNS (2010–2015)", anneeMin:2010, anneeMax:2015, systeme:"RCD/RNS", produit:"Autoradio Android 9\" — Châssis VW", type:"autoradio", note:"Remplace l'autoradio d'origine." },
      { label:"MIB (2015–2020)", anneeMin:2015, anneeMax:2020, systeme:"MIB2", produit:"Boîtier CarPlay sans fil — Interface MIB", type:"boitier", note:"Plug & play sur Discover Media/Pro." }
    ]},
    { modele:"Tiguan", generations:[
      { label:"MIB (2016–2021)", anneeMin:2016, anneeMax:2021, systeme:"MIB2", produit:"Boîtier CarPlay sans fil — Interface MIB", type:"boitier", note:"Sur l'écran d'origine." }
    ]}
  ],

  "Seat": [
    { modele:"Ibiza / Leon", generations:[
      { label:"MIB (2013–2020)", anneeMin:2013, anneeMax:2020, systeme:"MIB1 / MIB2", produit:"Boîtier CarPlay sans fil — Interface MIB", type:"boitier", note:"Plug & play sur la prise d'origine." },
      { label:"Sans écran (2008–2013)", anneeMin:2008, anneeMax:2013, systeme:"Autoradio d'origine", produit:"Autoradio Android 9\" — Châssis VW/Seat", type:"autoradio", note:"Écran tactile, garde les commandes au volant." }
    ]}
  ],

  "Skoda": [
    { modele:"Octavia / Fabia", generations:[
      { label:"MIB (2013–2020)", anneeMin:2013, anneeMax:2020, systeme:"MIB1 / MIB2", produit:"Boîtier CarPlay sans fil — Interface MIB", type:"boitier", note:"Plug & play sur Swing/Bolero/Amundsen." },
      { label:"Sans écran (2008–2013)", anneeMin:2008, anneeMax:2013, systeme:"Autoradio d'origine", produit:"Autoradio Android 9\" — Châssis VW/Skoda", type:"autoradio", note:"Écran tactile, garde les commandes au volant." }
    ]}
  ],

  "Peugeot": [
    { modele:"208 / 2008", generations:[
      { label:"SMEG / SMEG+ (2012–2019)", anneeMin:2012, anneeMax:2019, systeme:"SMEG", produit:"Boîtier CarPlay sans fil — Interface SMEG", type:"boitier", note:"Activation CarPlay sur l'écran tactile d'origine." }
    ]},
    { modele:"308", generations:[
      { label:"SMEG / NAC (2013–2020)", anneeMin:2013, anneeMax:2020, systeme:"SMEG / NAC", produit:"Boîtier CarPlay sans fil — Interface SMEG/NAC", type:"boitier", note:"Sur certains NAC, CarPlay est déjà d'origine. Nous consulter." }
    ]},
    { modele:"3008 / 5008", generations:[
      { label:"SMEG / NAC (2013–2020)", anneeMin:2013, anneeMax:2020, systeme:"SMEG / NAC", produit:"Boîtier CarPlay sans fil — Interface SMEG/NAC", type:"boitier", note:"Nous consulter pour confirmer selon l'équipement." }
    ]}
  ],

  "Citroën": [
    { modele:"C3 / C4", generations:[
      { label:"SMEG / NAC (2012–2020)", anneeMin:2012, anneeMax:2020, systeme:"SMEG / NAC", produit:"Boîtier CarPlay sans fil — Interface SMEG/NAC", type:"boitier", note:"Active CarPlay sur l'écran tactile d'origine." }
    ]},
    { modele:"C4 Picasso", generations:[
      { label:"SMEG / NAC (2013–2018)", anneeMin:2013, anneeMax:2018, systeme:"SMEG / NAC", produit:"Boîtier CarPlay sans fil — Interface SMEG/NAC", type:"boitier", note:"Caméra de recul intégrable en option." }
    ]}
  ],

  "Renault": [
    { modele:"Clio 4", generations:[
      { label:"MediaNav (2012–2019)", anneeMin:2012, anneeMax:2019, systeme:"MediaNav / R-Link", produit:"Autoradio Android 9\" — Châssis Renault", type:"autoradio", note:"Remplace le MediaNav, garde les commandes au volant." }
    ]},
    { modele:"Mégane", generations:[
      { label:"R-Link (2012–2016)", anneeMin:2012, anneeMax:2016, systeme:"R-Link", produit:"Autoradio Android — Châssis Renault", type:"autoradio", note:"Selon format d'écran. Nous consulter pour confirmer." }
    ]},
    { modele:"Captur", generations:[
      { label:"MediaNav (2013–2019)", anneeMin:2013, anneeMax:2019, systeme:"MediaNav", produit:"Autoradio Android 9\" — Châssis Renault", type:"autoradio", note:"Écran tactile avec CarPlay & Android Auto intégrés." }
    ]}
  ],

  "Ford": [
    { modele:"Fiesta", generations:[
      { label:"Sans SYNC tactile (2011–2017)", anneeMin:2011, anneeMax:2017, systeme:"Autoradio d'origine", produit:"Autoradio Android 9\" — Châssis Ford", type:"autoradio", note:"Écran tactile complet, CarPlay & Android Auto intégrés." }
    ]},
    { modele:"Focus", generations:[
      { label:"Sans SYNC tactile (2011–2018)", anneeMin:2011, anneeMax:2018, systeme:"Autoradio d'origine", produit:"Autoradio Android 9\" — Châssis Ford", type:"autoradio", note:"Garde les commandes au volant." }
    ]},
    { modele:"Kuga", generations:[
      { label:"SYNC 1/2 (2013–2019)", anneeMin:2013, anneeMax:2019, systeme:"SYNC 1/2", produit:"Autoradio Android — Châssis Ford", type:"autoradio", note:"Nous consulter selon l'écran d'origine." }
    ]}
  ],

  "Opel": [
    { modele:"Corsa / Astra", generations:[
      { label:"IntelliLink (2013–2019)", anneeMin:2013, anneeMax:2019, systeme:"IntelliLink", produit:"Autoradio Android — Châssis Opel", type:"autoradio", note:"Selon format d'écran. Nous consulter pour confirmer." }
    ]}
  ],

  "Toyota": [
    { modele:"Yaris / Auris", generations:[
      { label:"Touch & Go (2012–2019)", anneeMin:2012, anneeMax:2019, systeme:"Touch & Go", produit:"Autoradio Android — Châssis Toyota", type:"autoradio", note:"Remplace l'écran d'origine, CarPlay intégré." }
    ]},
    { modele:"C-HR", generations:[
      { label:"Toyota Touch 2 (2016–2019)", anneeMin:2016, anneeMax:2019, systeme:"Touch 2", produit:"Boîtier CarPlay ou autoradio Android selon équipement", type:"boitier", note:"Nous consulter pour confirmer la solution adaptée." }
    ]}
  ],

  "Nissan": [
    { modele:"Qashqai / Juke", generations:[
      { label:"NissanConnect (2014–2019)", anneeMin:2014, anneeMax:2019, systeme:"NissanConnect", produit:"Autoradio Android — Châssis Nissan", type:"autoradio", note:"Écran tactile avec CarPlay & Android Auto." }
    ]}
  ],

  "Mazda": [
    { modele:"Mazda 3 / CX-5", generations:[
      { label:"MZD Connect (2013–2019)", anneeMin:2013, anneeMax:2019, systeme:"MZD Connect", produit:"Boîtier CarPlay sans fil — Interface MZD", type:"boitier", note:"Active CarPlay sur l'écran d'origine, garde la molette." }
    ]}
  ]

};
