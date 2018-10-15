import React from "react";
import {Form, FormGroup , FormControl, AlertDismissable, Glyphicon, Button} from 'react-bootstrap'
import {FieldGroup} from 'react-bootstrap'

const Main = props => (
  <div className="container">
    <h1>Formulaire de saisie</h1>
    <form>
      <FieldGroup
        id="formMonth"
        type="number"
        label="Mois"
        placeholder="Indiquer le mois"
      />
      <FieldGroup
        id="formFile"
        type="file"
        label="Fichier"
        help="Uploader le fichier de saisie mensuel."
      />
      <Button type="submit">Calculer !</Button>
    </form>
  </div>
);

export default Main;
