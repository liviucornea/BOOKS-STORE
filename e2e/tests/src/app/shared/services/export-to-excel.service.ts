import {Injectable} from '@angular/core';
import * as FileSaver from 'file-saver';
// const XLSX = require('xlsx');
// import * as XLSX from 'ts-xlsx' ;
import {AppSettings} from '../configuration/appSettings';


@Injectable()
export class ExportToExcelService {

  constructor() {
  }

  createExcelFile(inputList: Array<any>) {
    // const bufferedData = this.getBufferedData(inputList);
    const fileName = AppSettings.reportExcelFileNAme;
    // this.saveExcelFile(bufferedData, fileName);

  }



  getBufferedData(data) {
    /*
    const ws_name = 'Sheet1';



    const wb: any = {};
    wb.Sheets = {};
    // wb.Props = {};
    // wb.SSF = {};
    wb.SheetNames = [];


    const ws: any = {};


    const range = {s: {c: 0, r: 0}, e: {c: 0, r: 0}};


    for (let R = 0; R !== data.length; ++R) {
      if (range.e.r < R) {
        range.e.r = R
      }
      ;
      for (let C = 0; C !== data[R].length; ++C) {
        if (range.e.c < C) {
          range.e.c = C
        }
        ;


        const cell: any = {v: data[R][C]};
        if (cell.v == null) {
          continue
        }
        ;


        const cell_ref = XLSX.utils.encode_cell({c: C, r: R});


        if (typeof cell.v === 'number') {
          cell.t = 'n';
        } else if (typeof cell.v === 'boolean') {
          cell.t = 'b';
        } else {
          cell.t = 's'
        }
        ;


        ws[cell_ref] = cell;
      }
    }
    ws['!ref'] = XLSX.utils.encode_range(range.s, range.e);


    wb.SheetNames.push(ws_name);
    wb.Sheets[ws_name] = ws;

    const bufferdata = XLSX.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});

    return bufferdata;
    */
  }

  saveExcelFile(bufferdata, fileName) {
    // FileSaver.saveAs(new Blob([this.s2ab(bufferdata)], {type: 'application/octet-stream'}), fileName);
  }


  s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) {
      view[i] = s.charCodeAt(i) & 0xFF;
    }
    ;
    return buf;
  }


}
