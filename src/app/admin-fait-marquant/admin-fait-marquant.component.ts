import { Component, OnInit } from '@angular/core';
import { GetFaitService } from '../getFaitService/get-fait.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { NgToastService } from 'ng-angular-popup';
import { SearchReportService } from '../service-search-report/search-report.service';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

interface search{
  region: String,
  mois: string,
  indice: number,
  reportName:String,
}

const EMPTY_MODEL: search={
  region:'',
  mois:'',
  indice:0,
  reportName:'',
}

@Component({
  selector: 'app-admin-fait-marquant',
  templateUrl: './admin-fait-marquant.component.html',
  styleUrls: ['./admin-fait-marquant.component.css']
})
export class AdminFaitMarquantComponent implements OnInit {

  tabReportMongo: any = [];
  tabRegion: any = [];
  tmp: any = [];
  newTab = [];
  newTabRegion: any = [];
  visibilitySuccess = false;
  visibilityError = false;
  tabSearch = [];
  tmpSearch = [];

  newSearch: search = { ...EMPTY_MODEL };

  constructor(
    private getFaitService: GetFaitService,
    private getSearchService: SearchReportService,
    private toast:NgToastService,
  ) { }

  ngOnInit(): void {

    this.getFaitService.getFaitData().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.tabReportMongo = res.success;
          this.tmp = this.tabReportMongo;
           const filtred = this.tmp.reduce((response, elem) => {
           const index = response.findIndex((r) => r.region === elem.region)
           if (index === -1) response.push({ faits: [elem.faits],observations:[elem.observations],region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
           else {
                response[index].faits.push(elem.faits);
                response[index].observations.push(elem.observations);
               };
      return response;
     }, [])

         for (let i = 0; i <= this.tmp.length; i++){
            this.tabRegion.push(this.tmp[i].region);

          }
          }
      },
      error: (err: any) => {
        if (err) return err;
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
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
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

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
        ...this.tmp.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmp.map(el => {
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
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.newTab.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tmp.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

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
        }
      }
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

  regionValue(event) {
    this.newSearch.region = event.target.value;
  }
  monthValue(event) {
    this.newSearch.mois = event.target.value;

  }
  getSearch(yearValue) {
    this.newSearch.indice = yearValue;
    this.newSearch.reportName = "Rapport d'activité mensuel";

    this.getSearchService.result(this.newSearch).subscribe({
      next: (res: any) => {
        if (res.result) {
          this.toast.success({ detail: "Recherche de donnée", summary: "recherche avec succés"});
          this.visibilitySuccess = true;
           this.tabSearch = res.result;
   const filtred = this.tmp.reduce((response, elem) => {
      const index = response.findIndex((r) => r.region === elem.region)
      if (index === -1) response.push({faits: [elem.faits],observations:[elem.observations], region:elem.region,nameReport:elem.nom_rapport,numero:elem.numero,cirfinValue:elem.cirfinValue,date:elem.date,mois:elem.mois,indice:elem.indice})
      else {
        response[index].faits.push(elem.faits);
        response[index].observations.push(elem.observations);

      };
      return response;
    }, [])

    this.tmpSearch = filtred;
    console.log(this.tmpSearch)
        } else if (res.error) {
          this.toast.warning({detail:"Recherche de donnée",summary:res.error})
          this.visibilityError = true;
        }
      },
      error:(err: any) => {
        return err;
      }
    })
  }
  generatePdf() {
    const d = new Date(this.tmpSearch[0].date);
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
        ...this.tmpSearch.map(el => {
            return {text:'SERVICE REGIONAL DU BUDGET '+el.region,style:'header'}
        }),

        ...this.tmpSearch.map(el => {
          if (el.cirfinValue != '') {
               return {text:'CIRFIN-'+ el.cirfinValue,style:'header'}
          } else {
            return ''
             }
        }),
      ...this.tmpSearch.map(el => {
           if (el.cirfinValue == '') {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region,margin: [5, 30, 10, 20] }
           } else {
               return { text:'Numéro :'+ el.numero+'-'+d.getFullYear()+'/MEF/SG/DGFAG/DB/SRB-'+el.region+'/'+'CIRFIN-'+el.cirfinValue,margin: [5, 30, 10, 20] }
          }

       }),
        {
          text: 'RAPPORT D’ACTIVITES MENSUEL ', alignment: 'center', margin: [5, 30, 10, 20],
          style: 'title_rapport'
        },
        {
          table: {
            widths: [170, 350],
            heights: 45,
            margin: [0, 20, 20, 0],
            alignment: 'center',
            body: [
               ...this.tmpSearch.map(el => {
                return [{ text: 'MOIS DES ACTIVITES RAPPORTEES', alignment: 'center' }, { text:el.mois+'-'+d.getFullYear(),alignment:'center'}];
              }),
              ...this.tabSearch.map(el => {
                return [{ text: 'Faits marquants', alignment: 'center' }, { text: el.faits }];
              }),
              ...this.tabSearch.map(el => {
                return [{ text: 'Observations particulières', alignment: 'center' }, { text: el.observations }];
              })

            ]
          },

        },
       ...this.tmpSearch.map(el => {
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
        }
      }
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }

}
