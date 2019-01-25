import { IndemnitesEntretien } from './../parametrage/IndemnitesEntretien';

export class ModelEmploye {
  id: string;
  nom: string;
  prenom: string;
  tauxHoraireNormalBrut: number;
  tauxHoraireNormalNet: number;
  tauxHoraireComplementaireBrut: number;
  tauxHoraireComplementaireNet: number;
  indemnitesKm: number;
  indemnitesEntretien: IndemnitesEntretien;
  fraisDejeuner: number;
  fraisGouter: number;
  tauxCongesPayes: number;
}
