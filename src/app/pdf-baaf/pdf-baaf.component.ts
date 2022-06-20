import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs=pdfFonts.pdfMake.vfs;



@Component({
  selector: 'app-pdf-baaf',
  templateUrl: './pdf-baaf.component.html',
  styleUrls: ['./pdf-baaf.component.css']
})
export class PdfBAAFComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tab = [
    {
      "produit": " taux d'execution ",
      "realisation": "maison",
      "valeurCible": 45,
      "pourcentage": 50
    },

    {
      "produit": "brique",
      "realisation": "mur",
      "valeurCible": 90,
      "pourcentage": 50
    },
    {
      "produit": "brique",
      "realisation": "mur",
      "valeurCible": 90,
      "pourcentage": 50
    },
    {
      "produit": "brique",
      "realisation": "mur",
      "valeurCible": 90,
      "pourcentage": 50
    },
    {
      "produit": "brique",
      "realisation": "mur",
      "valeurCible": 90,
      "pourcentage": 50
    },
  ]
  genererPdf() {
    const pdfDefinition: any = {
      pageSize: 'A4',
      content: [
        {
          text: 'SECRETARIAT GENERAL',
          style: 'header'
        },
        {
          text: 'DIRECTION GENERALE DES FINANCES ',
          style: 'header'
        },
        {
          text: 'ET DES AFFAIRES GENERALES',
          style: 'header'
        },
        {
          text: 'DIRECTION DU BUDGET',
          style: 'header'
        },
        {
          text: 'Choisir service', margin: [5, 20, 10, 20],

        },
        {
          text: 'Numero', margin: [5, 40, 10, 20]
        },
        {
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 40, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [170, '*', 150, 120],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tab.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation, alignment: 'center' }, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentage, alignment: 'center' }]
              }),

            ]
          },

        },
        {
          text: 'A.........le ...........', alignment: 'right', margin: [5, 40, 60, 0],
        }

      ],
      styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: 'center'
        },
        title_rapport: {
          fontSize: 12,
          bold: true,
          decoration: 'underline'
        }
      }
    }


    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

///Rapport mensuel


  genererReport() {
    const pdfDefinition: any = {
      pageSize: 'A4',
      content: [
                {
          text: 'SECRETARIAT GENERAL',
          style: 'header'
        },
        {
          text: 'DIRECTION GENERALE DES FINANCES ',
          style: 'header'
        },
        {
          text: 'ET DES AFFAIRES GENERALES',
          style: 'header'
        },
        {
          text: 'DIRECTION DU BUDGET',
          style: 'header'
        },
        {
          text: 'Choisir service', margin: [5, 20, 10, 20],

        },
        {
          text: 'Numero', margin: [5, 40, 10, 20]
        },
        {
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 40, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
              [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }],
              [{text:'Faits marquants',alignment:'center'},{text:'Le lorem ipsum est, en imprimerie, une suite de mots sans signification utilisée à titre provisoire pour calibrer une mise en page, le texte définitif venant remplacer le faux-texte dès quil est prêt ou que la mise en page est achevée. Généralement, on utilise un texte en faux latin, le Lorem ipsum ou Lipsum '}]

            ]
          },

        },
               {
          text: 'A.........le ...........', alignment: 'right', margin: [5, 40, 60, 0],
        }

      ],
         styles: {
        header: {
          fontSize: 12,
          bold: true,
          alignment: 'center'
        },
        title_rapport: {
          fontSize: 12,
          bold: true,
          decoration: 'underline'
        }
      }
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }
}

