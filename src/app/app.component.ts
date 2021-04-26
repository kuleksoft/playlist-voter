import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxCsvParser } from 'ngx-csv-parser';

@Component({
  selector: 'pv-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public currentIndex: number = 0;
  public data: any[];
  public answers: string;

  constructor(private readonly http: HttpClient, private ngxCsvParser: NgxCsvParser) {}

  public ngOnInit(): void {
    this.getData('lata5060');
  }

  public getData(fileName: string): void {

    this.currentIndex = 0;
    this.data = null;
    this.answers = '';

    this.http.get(`assets/${fileName}.csv`, { responseType: 'text' }).subscribe((response: string) => {
      const rawData = this.ngxCsvParser.csvStringToArray(response,',');
      const header = this.ngxCsvParser.getHeaderArray(rawData);
      const data = this.ngxCsvParser.getDataRecordsArrayFromCSVFile(rawData, 4, { header: true });
      const parsedData = [];
      data.map((element: Array<string>) => {
        const entry = {};
        header.forEach((property: string, index: number) => {
          entry[property] = element[index];
        })
        parsedData.push(entry);
      });
      parsedData.forEach(el => el.score = 0);
      this.data = parsedData;
      this.answers = this.data.map(el => el.score).join('\n');
    });
  }

  public getAnswers(): string {
    return this.answers;
  }

  public setIndex(index: number) {
    this.currentIndex = index;
  }

  public setScore(value: number): void {
    this.data[this.currentIndex].score = value;
    this.answers = this.data.map(el => el.score).join('\n');
    if (this.currentIndex !== this.data.length - 1) {
      this.currentIndex++;
    }
  }
}
