import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { GetReportMongoService } from '../get-report-mongo-service/get-report-mongo.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-admin-patrimoine',
  templateUrl: './admin-patrimoine.component.html',
  styleUrls: ['./admin-patrimoine.component.css']
})
export class AdminPatrimoineComponent implements OnInit {

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
           function myFunction(value) {
             return  value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat";
           }
          this.tmp = this.tabReportMongo.filter(myFunction);
          console.log(this.tmp);
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
         return value.region=="Vatovavy-Fitovinany" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

        ...this.newTab.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

              }),
        {
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center' }, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Vakinankaratra" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Sofia" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Sava" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Menabe" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center' }, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Ihorombe" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Haute Matsiatra" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Diana" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Boeny" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Betsiboka" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Antsinanana" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Antsimo-Antsinanana" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Antsimo-Andrefana" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Anosy" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Androy" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Analanjirofo"&& value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Analamanga"&& value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Amoron i Mania" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Alaotra-Mangoro"&& value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center' }, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Itasy" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Melaky" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
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
              return value.region=="Bongolava" && value.nom_rapport=="Réalisations de la Division Patrimoine de l’Etat"
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
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.newTab.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),

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
          text: 'Réalisations de la Division Patrimoine de l’Etat', alignment: 'center', margin: [5, 20, 10, 20],
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
                return [{ text: el.produit, alignment: 'center' }, { text: el.realisation,alignment:'center'}, { text: el.valeurCible, alignment: 'center' }, { text: el.pourcentageRealisation, alignment: 'center' }]
              }),

            ]
          },

        },

        ...this.newTab.map(el => {
            return { text:'A  ' + el.region  +', le ' + d.getDate()+'-'+ el.mois+'-'+d.getFullYear(),alignment: 'right',margin: [0, 60, 0, 0] }
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
