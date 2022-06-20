import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-pdf-report-mensual',
  templateUrl: './pdf-report-mensual.component.html',
  styleUrls: ['./pdf-report-mensual.component.css']
})
export class PdfReportMensualComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
