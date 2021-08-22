import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {   BarChartOptions } from '../../Interface/barras.interface';
import { GraficasService } from '../../servicios/graficas.service';


@Component({
  selector: 'app-barras',
  templateUrl: './barras.component.html',
  styles: [
    `
  `
  ]
})
export class BarrasComponent implements OnInit, OnChanges {

  public barChartOptions: BarChartOptions = {
    xPart: 7,
    yPart: 10,
    scales: { xAxes: 7, yAxes: 100 },
    
  };

  barChartLabels: string[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartType: string = 'bar';
  barChartLegend = true;
   

  constructor(
    private graficasServicio: GraficasService,
   ) { }
  get barChartData(){
    return this.graficasServicio.barChartData
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("caa")
  }

  ngOnInit(): void {
    // const int = setInterval(() => {
    //   console.log("paco")
    //   this.graficasServicio.randomize();
    // }, 1000)
  }
cambiaValores(){
   
      this.graficasServicio.randomize();
 }

  randomize(): void {
    // Only Change 3 values
    this.barChartData[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      (Math.random() * 100),
      56,
      (Math.random() * 100),
      40];

    this.barChartOptions.xPart = 5
    console.log(this.barChartData)
  }
}
