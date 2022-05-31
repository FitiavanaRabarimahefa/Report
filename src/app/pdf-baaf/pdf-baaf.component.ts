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
         "produit":"ciment",
         "realisation":"maison",
         "valeurCible":45,
          "pourcentage":50
      },

      {
        "produit":"brique",
        "realisation":"mur",
        "valeurCible":90,
         "pourcentage":50
     },
  ]
  genererPdf(){
  const pdfDefinition:any={
       header:{ text: 'Réalisations du Bureau des Affaires Administratives et Financières', style: 'header'},
         content:[
          {
            table: {
              widths: [100, '*', '*', 200],

              body: [
                [{text:'PRODUIT',alignment:'center'},{text:'REALISATION',alignment:'center'},{text:'VALEUR CIBLE',alignment:'center'},{text:'POURCENTAGE DE REALISATION',alignment:'center'}],
                ...this.tab.map(el =>{
                  return  [{text:el.produit,alignment:'center'},{text:el.realisation,alignment:'center'},{text:el.valeurCible,alignment:'center'},{text:el.pourcentage,alignment:'center'}]
                })

              ]
          },
           }
         ],

         styles:{
            header:{
              alignment:'center',
              fontSize:15,
              decoration:'underline'
            },

         }
     }


     const pdf = pdfMake.createPdf(pdfDefinition);
     pdf.open();
  }
}


/*[
  {
       text : 'PRODUIT',
       style:'tableHeader'
  }
],
[
  {
       text :'REALISATION',
       style:'tableHeader'
  }
],
[
  {
       text : 'VALEUR CIBLE',
       style:'tableHeader'
  }
],
[
{
     text : 'POURCENTAGE DE REALISATION',
     style:'tableHeader'
}
],*/
