import { Employe } from './employe';
export class Enfant {


    id: string;
    employesIds: Array<string>;
    employes: Array<Employe>; // transient
    nom: string;
    typeGarde: string;
    salaireNetMensualise: number;
    heuresNormalesMensualisees: number;
    arEcoleKm: number;

    public static fork(enfant): Enfant {
      var newEnfant = new Enfant();
      newEnfant.id = enfant.id;
      newEnfant.employesIds = enfant.employesIds;
      newEnfant.nom = enfant.nom;
      newEnfant.typeGarde = enfant.typeGarde;
      newEnfant.salaireNetMensualise = enfant.salaireNetMensualise;
      newEnfant.heuresNormalesMensualisees = enfant.heuresNormalesMensualisees;
      newEnfant.arEcoleKm = enfant.arEcoleKm;
      return newEnfant;
    }

//     horairesEcole" : [
//         {
//             "jour" : 1,
//             "horairesJournaliersEcole" : {
//                 "am" : "08:50",
//                 "dm" : "12:00",
//                 "aa" : "13:30",
//                 "da" : "16:45"
//             }
//         },
//         {
//             "jour" : 2,
//             "horairesJournaliersEcole" : {
//                 "am" : "08:50",
//                 "dm" : "12:00",
//                 "aa" : "13:30",
//                 "da" : "16:45"
//             }
//         },
//         {
//             "jour" : 3,
//             "horairesJournaliersEcole" : {}
//         },
//         {
//             "jour" : 4,
//             "horairesJournaliersEcole" : {
//                 "am" : "08:50",
//                 "dm" : "12:00",
//                 "aa" : "13:30",
//                 "da" : "16:45"
//             }
//         },
//         {
//             "jour" : 5,
//             "horairesJournaliersEcole" : {
//                 "am" : "08:50",
//                 "dm" : "12:00",
//                 "aa" : "13:30",
//                 "da" : "16:45"
//             }
//         },
//         {
//             "jour" : 6,
//             "horairesJournaliersEcole" : {}
//         },
//         {
//             "jour" : 7,
//             "horairesJournaliersEcole" : {}
//         }
//     ],
//     "heuresNormales" : [
//         {
//             "jour" : 1,
//             "heures" : 1.083
//         },
//         {
//             "jour" : 2,
//             "heures" : 1.083
//         },
//         {
//             "jour" : 3,
//             "heures" : 0
//         },
//         {
//             "jour" : 4,
//             "heures" : 1.083
//         },
//         {
//             "jour" : 5,
//             "heures" : 0
//         },
//         {
//             "jour" : 6,
//             "heures" : 0
//         },
//         {
//             "jour" : 7,
//             "heures" : 0
//         }
//     ]
// }

}
