import { Injectable } from '@angular/core';
import { BarChartDataset } from '../Interface/barras.interface';

@Injectable({
  providedIn: 'root'
})
export class GraficasService {

  private _barChartData: BarChartDataset[] = [];


  constructor() {

    this._barChartData=[
      { data: [80, 59, 54, 81, 56, 55, 40], label: 'Series A',color: this.cambiarColorRGB() },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' , color : this.cambiarColorRGB()}
 
    ]

   }

get barChartData(){
  return [...this._barChartData]
}

randomize(): void {
  // Only Change 3 values

for (let i in this._barChartData)
  this._barChartData[i].data = [
    Math.floor(Math.random()* 100),
    Math.floor(Math.random()* 100),
    Math.floor(Math.random()* 100),
    Math.floor(Math.random()* 100),
    Math.floor(Math.random()* 100),
    Math.floor(Math.random()* 100),
    Math.floor(Math.random()* 100)
  
  ];

     console.log(this._barChartData)
}

cambiarColorRGB():string {
  
  return `rgb(${(Math.random() * 255).toFixed()}, ${(Math.random() * 255).toFixed()}, ${(Math.random() * 255).toFixed()} , 0.8)`
}
cambiarColor():string {
  const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));
  return color
}
}
