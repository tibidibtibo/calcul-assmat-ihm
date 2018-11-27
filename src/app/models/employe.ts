export class Employe {

  id: string;
  nom: string;
  prenom: string;
  tauxHoraireNormalBrut: number;
  tauxHoraireNormalNet: number;
  tauxHoraireComplementaireBrut: number;
  tauxHoraireComplementaireNet: number;
  indemnitesKm: number;
  indemnitesEntretien: number;
  fraisDejeuner: number;
  fraisGouter: number;
  tauxCongesPayes: number;

  public static fork(employe): Employe {
    var newEmploye = new Employe();
    newEmploye.id = employe.id;
    newEmploye.nom = employe.nom;
    newEmploye.prenom = employe.prenom;
    newEmploye.tauxHoraireNormalBrut = employe.tauxHoraireNormalBrut;
    newEmploye.tauxHoraireNormalNet = employe.tauxHoraireNormalNet;
    newEmploye.tauxHoraireComplementaireBrut = employe.tauxHoraireComplementaireBrut;
    newEmploye.tauxHoraireComplementaireNet = employe.tauxHoraireComplementaireNet;
    newEmploye.indemnitesKm = employe.indemnitesKm;
    newEmploye.indemnitesEntretien = employe.indemnitesEntretien;
    newEmploye.fraisDejeuner = employe.fraisDejeuner;
    newEmploye.fraisGouter = employe.fraisGouter;
    newEmploye.tauxCongesPayes = employe.tauxCongesPayes;
    return newEmploye;
  }
}
