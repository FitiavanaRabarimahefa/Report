import { Component, OnInit } from '@angular/core';
import { GetReportMongoService } from '../get-report-mongo-service/get-report-mongo.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { ThisReceiver } from '@angular/compiler';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private getReportService: GetReportMongoService) { }
  tabReportMongo: any = [];
  tabRegion: any = [];
  tmp: any = [];
   newTab = [];





  ngOnInit(): void {
    this.getReportService.getData().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.tabReportMongo = res.success;
          this.tmp = this.tabReportMongo;

          for (let i = 0; i <= this.tmp.length; i++){
            this.tabRegion.push(this.tmp[i].region);

          }


        }
      },
      error: (err: any) => {

      }
    })


  }


  getItasy() {
     function myFunction(value) {
              return value.region=="Itasy"
     }
      this.tmp=this.tabReportMongo.filter(myFunction);
  }
  getMelaky() {
       function myFunction(value) {
              return value.region=="Melaky"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);

    /*const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({ produit: [elem.produit], region: elem.region, nameReport: elem.nom_rapport, date: elem.date })
      else {
        response[index].produit.push(elem.produit);
      };
      return response;
    }, []);
    console.log(filtred);*/
  }
  getBongolava() {
       function myFunction(value) {
              return value.region=="Bongolava"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
  }

  genererPdf() {

      function myFunction(value) {
         return value.region=="Melaky"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);

     const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({ produit: [elem.produit], region:elem.region,nameReport:elem.nom_rapport,date:elem.date})
      else {
        response[index].produit.push(elem.produit);
      };
      return response;
    }, [])

    this.newTab = filtred;
    console.log(this.newTab);
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
          text: 'Choisir service :.........', margin: [5, 20, 10, 20],

        },
        {
          text: [
                ...this.newTab.map(el => {
                return { text:'Numéro :'+ el.region,margin: [5, 40, 10, 20] }
              }),

          ]
         // text: 'Numero', margin: [5, 40, 10, 20]
        },
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 40, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [170, '*', 150, 120],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation, alignment: 'center' }, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le' + el.date,alignment: 'right',margin: [0, 60, 0, 0] }
        }),


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
        },


      }
    }


    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }



}
