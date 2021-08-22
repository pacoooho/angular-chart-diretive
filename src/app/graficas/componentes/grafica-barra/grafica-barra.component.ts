import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
 import { BarChartDataset, BarChartOptions } from '../../Interface/barras.interface';

interface yAxes {
  label?: string,
  yPosLabel?: number,
  yPosAxe?: number

}
interface xAxes {
  label?: string,
  xPosLabel?: number
  xPosAxe?: number

}
@Component({
  selector: 'app-grafica-barra',
  templateUrl: './grafica-barra.component.html',
  styles: [`
    
    .markerOff {
      display: none;
    }
  svg { 
     background-color: red;
     width: 100%;
      height: 100%;
    }
  `
  ]
})
export class GraficaBarraComponent implements OnInit,OnChanges {

 
  @Input() chartOptions!: BarChartOptions
  @Input() chartsDataset!: BarChartDataset[]
  @Input() chartLabels!: string[]

  yAxesData: yAxes[] = []
  xAxesData: xAxes[] = []

  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
// console.log("graficaCompne",changes) 
 }

  ngOnInit(): void {

    // Valores Y
    const yPart = this.chartOptions.yPart || 10
    const yAxes = this.chartOptions.scales.yAxes;
    // if ( yAxes>100)
    for (let f = yPart; f >= 0; f--) {
      const lab = (yAxes * f) / yPart
      const lab2 = (100 * f) / yPart
      // console.log(lab)
      // console.log(f);
      let yData: yAxes = {
        label: `${lab}`,
        yPosLabel: ((100 - (lab2 * 80) / 100) - 5),
        yPosAxe:  ((100 - (lab2 * 80) / 100) - 6.5)
      }
      this.yAxesData.push(yData)
    }
 
    // linea xAxes////////////////////////////////////
     const xPart = this.chartOptions.xPart || 10
    const xAxes = this.chartOptions.scales.xAxes;
    const vari = 98.3-8.5;
    const part = (vari)/xPart
     for (let f = 0; f <= xPart - 1; f++) {
      const lab = (xAxes * f) / xPart
      const lab2 = (100 * f) / xPart
       let xData: xAxes = {
        label: `${this.chartLabels[f]}`,
        xPosLabel: (((lab2 * (vari)) / 100) + 8.5)+part/2,
        xPosAxe: (((lab2 * (vari)) / 100) + 8.5)+part
      }
      this.xAxesData.push(xData)
    }
 
    //Valores X///////////////////////////////////

    // Linea
  }

  color(i:number): string{
    return `fill:${this.chartsDataset[i].color}`
  }
   
}
