/* ============================================================
   NEODRIVE - DONNÉES DE COMPATIBILITÉ VÉHICULE
   ============================================================
   Ce fichier liste, pour chaque marque / modèle / génération,
   le produit recommandé et le type de solution.

   COMMENT AJOUTER UN VÉHICULE :
   Sous la bonne marque, ajoutez un objet модèle avec :
   {
     modele: "Nom du modèle",
     generations: [
       {
         label: "Génération (années)",   // ce que le client choisit
         anneeMin: 2012,                  // année de début
         anneeMax: 2018,                  // année de fin
         systeme: "Nom du système d'origine (ex: MMI 3G)",
         produit: "Nom du produit recommandé",
         type: "boitier" | "autoradio" | "non-compatible",
         note: "Petite précision affichée au client"
       }
     ]
   }

   Le champ "type" sert à afficher la bonne icône / le bon message.
   Mettez "non-compatible" si aucune solution n'existe encore.
   ============================================================ */

window.NEODRIVE_COMPAT = {

  "Audi": [
    {
      modele: "A4 / A5",
      generations: [
        {
          label: "MMI 3G (2008–2015)",
          anneeMin: 2008, anneeMax: 2015,
          systeme: "MMI 3G",
          produit: "Boîtier CarPlay sans fil — Interface MMI 3G",
          type: "boitier",
          note: "Se branche sur la prise d'origine, garde l'écran et les boutons MMI."
        },
        {
          label: "MMI 3G+ / MIB (2015–2019)",
          anneeMin: 2015, anneeMax: 2019,
          systeme: "MMI 3G+ / MIB",
          produit: "Boîtier CarPlay sans fil — Interface MIB",
          type: "boitier",
          note: "Activation CarPlay & Android Auto sans fil, plug & play."
        }
      ]
    },
    {
      modele: "A3",
      generations: [
        {
          label: "8V MIB (2013–2020)",
          anneeMin: 2013, anneeMax: 2020,
          systeme: "MIB1 / MIB2",
          produit: "Boîtier CarPlay sans fil — Interface MIB",
          type: "boitier",
          note: "Compatible écran rétractable d'origine."
        }
      ]
    }
  ],

  "BMW": [
    {
      modele: "Série 1 / Série 3",
      generations: [
        {
          label: "NBT (2012–2016)",
          anneeMin: 2012, anneeMax: 2016,
          systeme: "NBT",
          produit: "Boîtier CarPlay sans fil — Interface NBT",
          type: "boitier",
          note: "CarPlay & Android Auto sans fil sur l'écran d'origine."
        },
        {
          label: "NBT EVO ID5/ID6 (2016–2020)",
          anneeMin: 2016, anneeMax: 2020,
          systeme: "NBT EVO",
          produit: "Boîtier CarPlay sans fil — Interface NBT EVO",
          type: "boitier",
          note: "Activation complète, conserve toutes les fonctions iDrive."
        }
      ]
    }
  ],

  "Mercedes": [
    {
      modele: "Classe A / C / E",
      generations: [
        {
          label: "NTG 4.5 / 4.7 (2011–2014)",
          anneeMin: 2011, anneeMax: 2014,
          systeme: "NTG 4.5",
          produit: "Boîtier CarPlay sans fil — Interface NTG",
          type: "boitier",
          note: "Branchement sur le faisceau d'origine."
        },
        {
          label: "NTG 5.0 / 5.1 (2014–2018)",
          anneeMin: 2014, anneeMax: 2018,
          systeme: "NTG 5.0",
          produit: "Boîtier CarPlay sans fil — Interface NTG 5",
          type: "boitier",
          note: "CarPlay & Android Auto, garde le COMAND d'origine."
        }
      ]
    }
  ],

  "Volkswagen": [
    {
      modele: "Golf 7",
      generations: [
        {
          label: "MIB1 / MIB2 (2013–2020)",
          anneeMin: 2013, anneeMax: 2020,
          systeme: "MIB1 / MIB2",
          produit: "Boîtier CarPlay sans fil — Interface MIB",
          type: "boitier",
          note: "Plug & play sur la prise Quadlock d'origine."
        }
      ]
    },
    {
      modele: "Polo",
      generations: [
        {
          label: "Sans écran d'origine (2009–2017)",
          anneeMin: 2009, anneeMax: 2017,
          systeme: "Autoradio d'origine",
          produit: "Autoradio Android 9\" — Châssis VW",
          type: "autoradio",
          note: "Remplace l'autoradio d'origine, garde les commandes au volant."
        }
      ]
    }
  ],

  "Peugeot": [
    {
      modele: "208 / 2008",
      generations: [
        {
          label: "SMEG / SMEG+ (2012–2019)",
          anneeMin: 2012, anneeMax: 2019,
          systeme: "SMEG",
          produit: "Boîtier CarPlay sans fil — Interface SMEG",
          type: "boitier",
          note: "Activation CarPlay sur l'écran tactile d'origine."
        }
      ]
    }
  ],

  "Ford": [
    {
      modele: "Fiesta / Focus",
      generations: [
        {
          label: "Sans SYNC tactile (2011–2017)",
          anneeMin: 2011, anneeMax: 2017,
          systeme: "Autoradio d'origine",
          produit: "Autoradio Android 9\" — Châssis Ford",
          type: "autoradio",
          note: "Écran tactile complet avec CarPlay & Android Auto intégrés."
        }
      ]
    }
  ]

};
