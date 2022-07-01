import { Component, OnInit } from '@angular/core';
import { GetReportMongoService } from '../get-report-mongo-service/get-report-mongo.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';


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
  newTabRegion:any= [];




  ngOnInit(): void {
    this.getReportService.getData().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.tabReportMongo = res.success;
          this.tmp = this.tabReportMongo;

      const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({ produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
         response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);

      };
      return response;
     }, [])

         for (let i = 0; i <= this.tmp.length; i++){
            this.tabRegion.push(this.tmp[i].region);

          }
      }
      },
      error: (err: any) => {

      }
    })
  }

  getVF() {
      function myFunction(value) {
         return value.region=="Vatovavy-Fitovinany"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation }, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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


  getVakinankaratra() {

     function myFunction(value) {
              return value.region=="Vakinankaratra"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getSofia() {
     function myFunction(value) {
              return value.region=="Sofia"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getSava() {
     function myFunction(value) {
              return value.region=="Sava"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [130,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getMenabe() {

     function myFunction(value) {
              return value.region=="Menabe"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [130,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation }, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getIhorombe() {
     function myFunction(value) {
              return value.region=="Ihorombe"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getHM() {
    function myFunction(value) {
              return value.region=="Haute Matsiatra"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getDiana() {
     function myFunction(value) {
              return value.region=="Diana"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getBoeny() {
     function myFunction(value) {
              return value.region=="Boeny"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getBetsiboka() {
     function myFunction(value) {
              return value.region=="Betsiboka"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getAntsinanana() {
     function myFunction(value) {
              return value.region=="Antsinanana"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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


  getAntsimoAntsinanana() {
       function myFunction(value) {
              return value.region=="Antsimo-Antsinanana"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getAntsimoAndrefana() {
     function myFunction(value) {
              return value.region=="Antsimo-Andrefana"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getAnosy() {
     function myFunction(value) {
              return value.region=="Anosy"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getAndroy() {

     function myFunction(value) {
              return value.region=="Androy"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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


  getAnalanjirofo() {
     function myFunction(value) {
              return value.region=="Analanjirofo"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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


  getAnalamanga() {
     function myFunction(value) {
              return value.region=="Analamanga"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getAmoroniMania() {
     function myFunction(value) {
              return value.region=="Amoron i Mania"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getAlaotraMangoro() {
     function myFunction(value) {
              return value.region=="Alaotra-Mangoro"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation }, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getItasy() {
    function myFunction(value) {
              return value.region=="Itasy"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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


  getMelaky() {

       function myFunction(value) {
              return value.region=="Melaky"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    const d = new Date(this.newTab[0].date);

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150,130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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



  getBongolava() {
       function myFunction(value) {
              return value.region=="Bongolava"
     }
    this.tmp = this.tabReportMongo.filter(myFunction);

    const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({produit: [elem.produit],valeurCible:[elem.valeurCible],realisation:[elem.realisation],pourcentageRealisation:[elem.pourcentageRealisation], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].produit.push(elem.produit);
        response[index].valeurCible.push(elem.valeurCible);
        response[index].realisation.push(elem.realisation);
        response[index].pourcentageRealisation.push(elem.pourcentageRealisation);
      };
      return response;
    }, [])

    this.newTab = filtred;
    //console.log(this.newTab[0].date);
    const d = new Date(this.newTab[0].date);
    //console.log(tmpDate.getDate());
    //const d = new Date();

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

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
           /*: [
                ...this.newTab.map(el => {
                return { text:el.nameReport,alignment: 'center', margin: [5, 40, 10, 30],style: 'title_rapport' }
              }),

          ]*/
          text: 'Réalisations du Bureau des Affaires Administratives et Financières', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },
        // Tableau
        {
          table: {
            widths: [150, 130, 110, 110],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'PRODUIT', alignment: 'center' }, { text: 'REALISATION', alignment: 'center' }, { text: 'VALEUR CIBLE', alignment: 'center' }, { text: 'POURCENTAGE DE REALISATION', alignment: 'center' }],
              ...this.tmp.map(el => {
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+ el.mois,alignment: 'right',margin: [0, 60, 0, 0] }
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
