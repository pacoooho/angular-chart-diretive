export interface BarChartDataset {
    data: number[],
    label : string,
    color: string
  }
 export interface  BarChartOptions {
   xPart?:number,
   yPart?: number,  
   scales:{
     xAxes: number,
     yAxes:number,
   }
 }

 export interface  CordenadasBarras {
xCor:string,
yCor:string
 }