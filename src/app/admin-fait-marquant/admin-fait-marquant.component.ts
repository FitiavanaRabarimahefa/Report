import { Component, OnInit } from '@angular/core';
import { GetFaitService } from '../getFaitService/get-fait.service';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

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
  newTabRegion:any= [];


  constructor(private getFaitService:GetFaitService) { }

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

  getVF() { }

  getVakinankaratra() { }

  getSofia() { }

  getSava() { }

  getMenabe() { }

  getMelaky() { }

  getItasy() { }

  getIhorombe() { }

  getHM() { }

  getDiana() { }

  getBongolava() { }

  getBoeny() { }

  getBetsiboka() { }

  getAntsinanana() { }

  getAntsimoAntsinanana() { }

  getAntsimoAndrefana() { }

  getAnosy() { }

  getAndroy() { }

  getAnalanjirofo() { }

  getAnalamanga() { }

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

  getAlaotraMangoro(){}

}
