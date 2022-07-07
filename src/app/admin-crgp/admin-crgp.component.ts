import { Component, OnInit } from '@angular/core';
import { GetdataService } from '../service-getdata-crgp/getdata.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-admin-crgp',
  templateUrl: './admin-crgp.component.html',
  styleUrls: ['./admin-crgp.component.css']
})
export class AdminCrgpComponent implements OnInit {

  tabReportMongo: any = [];
  tabRegion: any = [];
  tmp: any = [];
  NbrEvaluation: number;
  NbrParticipant: any = [];

  constructor(private getDataMongo:GetdataService) { }

  ngOnInit(): void {
    this.getDataMongo.getData().subscribe({
      next: (res: any) => {
       if (res.success) {
          this.tabReportMongo= res.success;
             for (let i = 0; i <= this.tabReportMongo.length; i++){
            this.tabRegion.push(this.tabReportMongo[i].region);
            console.log(this.tabRegion)
          }
         }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  getVF() {

      function myFunction(value) {
        return value.region == "Vatovavy-Fitovinany";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Vakinankaratra";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Sofia";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Sava";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Menabe";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Melaky";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Itasy";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Ihorombe";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Haute Matsiatra";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Diana";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Bongolava";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Boeny";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Betsiboka";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Antsinanana";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Antsimo-Antsinanana";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Antsimo-Andrefana";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Anosy";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Androy";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Analanjirofo";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Analamanga";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Amoron i Mania";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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
        return value.region == "Alaotra-Mangoro";
      }
    this.tmp = this.tabReportMongo.filter(myFunction);
    const d = new Date(this.tmp[0].date);

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

          ...this.tmp.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

          }),
           {
          text: 'COMPTE-RENDU DU CLUB REGIONAL DE LA GESTION PUBLIQUE', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

           {
          table: {
            widths: [150,350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              //[{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:'salut'},{text:'Bonjour'}]],
               ...this.tmp.map(el => {
                return [{ text: 'ORDRE DU JOUR', alignment: 'center' },[{text:el.ordreJour+','}]]
               }),

               ...this.tmp.map(el => {
                return [{ text: 'DATE', alignment: 'center' },[{text:d.getDay()+'/'+d.getMonth()+'/'+d.getFullYear(),alignment:'center'}]]
               }),

                ...this.tmp.map(el => {
                return [{ text: 'LIEU', alignment: 'center' },{text:el.lieu,alignment:'center'}]
                }),

                ...this.tmp.map(el => {
                return [{ text: 'PARTICIPANTS', alignment: 'center' },[{text:el.participant+','}]]
                }),


                ...this.tmp.map(el => {
                return [{ text: 'NOMBRES PARTICIPANTS', alignment: 'center' },[{text:el.participant.length,alignment:'center'}]]
                }),

                 ...this.tmp.map(el => {
                return [{ text: ' OBSERVATIONS PARTICULIERES ', alignment: 'center' },{text:el.observation}]
                }),

            ]
             },
        },
         {
          text: 'EVALUATIONS', alignment: 'center', margin: [5, 20, 10, 20],
          style: 'title_rapport'
        },

        {
          table: {
            widths: [175, 175, 175],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'left',
            body: [
              [{ text: 'THEMES EVOQUES', alignment: 'center' }, { text: 'PROBLEMES RENCONTRES', alignment: 'center' }, { text: 'SOLUTIONS PROPOSEES', alignment: 'center' }],


             ...this.tmp.map(item=> {
                  return [{ text: item.evaluation[0].theme, alignment: 'center' }, { text: item.evaluation[0].probleme }, { text: item.evaluation[0].solution, alignment: 'center' }]
              })

            ]
          },

        },

        ...this.tmp.map(el => {
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


}
