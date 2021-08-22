import { Directive, ElementRef, HostListener, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';
import { BarChartDataset, BarChartOptions, CordenadasBarras } from 'src/app/graficas/Interface/barras.interface';
import { ChartDataset } from 'chart.js';

@Directive({
  selector: '[barData]'
})
export class BarDataDirective implements OnInit, OnChanges {

 
poligonPoints(points: string,cordenadas: CordenadasBarras):string{
 let result : string=""
   points.split(" ").forEach((point,i)=>{
    if ( i%2===0){// X
      
      result+=`${(+point)+(+cordenadas.xCor)-12} `
    } else {// Y
      result+= `${(+point)+(+cordenadas.yCor)} `
    }
   
  })
  console.log(points) 

  console.log(result)
return result
}

private _pointPoligono:string="11.997 3.517 10.697 2.95 10.68 0 0.047 0.034 0.03 7.017 10.714 7 10.664 4.184 11.997 3.517";
private _pointRect:CordenadasBarras={xCor:"0.78" ,yCor:"0.584"}
private _pointTextLabel:CordenadasBarras={xCor:"4" ,yCor:"1.734"};
private _pointTextValue:CordenadasBarras={xCor:"4.13" ,yCor:"5.75"};
  
  @HostListener('click', ['_cordenadas','_chartData','_chart'])
  onClick(f: any, cordenadas: CordenadasBarras) {
// this.pruebaDesplazamientoMarker(cordenadas)
console.log(this._cordenadas)
console.log(this._chartData)
console.log(this._chart)
const marker = this.elemento.nativeElement.ownerDocument.getElementsByClassName('marker')[0]
console.log(marker) 
const poligono = marker.children[0]
const rect = marker.children[1]
const textLabel = marker.children[2]
const textValue = marker.children[3]

// const pointsPoligono = poligono.getAttribute('points')
// console.log(pointsPoligono)

const points = this.poligonPoints(this._pointPoligono,this._cordenadas)
poligono.setAttribute("points",`${points}`)

rect.setAttribute('x',`${(+this._pointRect.xCor-12)+(+this._cordenadas.xCor)}`)
rect.setAttribute('y',`${(+this._pointRect.yCor)+(+this._cordenadas.yCor)}`)

textLabel.setAttribute('x',`${(+this._pointTextLabel.xCor-12)+(+this._cordenadas.xCor)}`)
textLabel.setAttribute('y',`${(+this._pointTextLabel.yCor)+(+this._cordenadas.yCor)}`)
textLabel.textContent=`${this._name}`

textValue.setAttribute('x',`${(+this._pointTextLabel.xCor-12)+(+this._cordenadas.xCor)}`)
textValue.setAttribute('y',`${(+this._pointTextValue.yCor)+(+this._cordenadas.yCor)}`)
textValue.textContent=`${this._chartData}`

// console.log(pointsPoligono?.split(" ")) 
marker.classList.remove(`markerOff`)

  }


  elemento: ElementRef<HTMLElement>
  private _cordenadas! :CordenadasBarras;

  private _name!: string;
  @Input() set name(name: string) {
    this._name = name;
    // this.muestra();
    //console.log(this._chartsData)
  }

  private _barras!: number;
  @Input() set barras(barras: number) {
    this._barras = barras;
    // this.muestra();
    //console.log(this._chartsData)
  }

  private _chartData!: number;
  @Input() set data(chartData: number) {
    this._chartData = chartData;
    this.muestra();
    //console.log(this._chartsData)
  }

  private _chart!: number;
  @Input() set iChart(chart: number) {
    this._chart = chart;
    // this.muestra();
    //console.log(this._chartsData)
  }

  private _chartOptions!: BarChartOptions;
  @Input() set option(valor: BarChartOptions) {
    this._chartOptions = valor;
    //console.log (this._chartOptions)
  }

  private _indice!: number;
  @Input() set indice(valor: number) {
    this._indice = valor;
    //console.log (this._chartOptions)
  }

  private _color!: string;

  @Input() set color(valor: string) {
    this._color = valor;
    //console.log (this._chartOptions)
  }

  constructor(private el: ElementRef<HTMLElement>,
    private renderer: Renderer2
  ) {
    this.elemento = el;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // console.log("paco1")
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    // console.log(this.elemento.nativeElement.children[1])
  }
  muestra() {
   // console.log("data", this._chartData)
    // console.log("xPart",this._chartOptions.xPart)
      console.log("indice",this._indice)
       console.log("chart",this._chart)
    //   console.log("color",this._color)
      console.log("barras",this._barras)


    if (!this._chartOptions && !this._indice) { return }
    // for ( let chart in this._chartsData){
    //   console.log(chart)
    // }
    //  console.log("indice",this.elemento.nativeElement)
    // X
    const vari = 98.3 - 8.5;
    const part = (vari) / this._chartOptions.xPart!
    // Y
    const YCorreccion = (((this._chartData) * 80) / 100)
    // console.log("color", this._chartData)
let partIni=0;
let partMedio=0;

let rectx=  8.5 + (this._indice * part);
let recty=  95 - (YCorreccion);
let rectWigth= part;
let rectHeight= YCorreccion;

if (this._barras!>=2){
  rectWigth=(rectWigth/2)-1.5
  rectx+=1
  if (this._chart>=1)
  rectx+=rectWigth+1
}else {
  rectx+=1
  rectWigth-=2
}

this._cordenadas={
  xCor: `${rectx}`,
  yCor: `${recty}`
}
console.log(this.elemento)
    this.elemento.nativeElement.children[0].setAttribute("x", `${rectx}`)
    this.elemento.nativeElement.children[0].setAttribute("y", `${recty}`)
    this.elemento.nativeElement.children[0].setAttribute("width", `${rectWigth}`)
    this.elemento.nativeElement.children[0].setAttribute("height", `${rectHeight-0.25}`)
    this.elemento.nativeElement.children[0].setAttribute("style", `fill:${this._color}`)
 

    this.elemento.nativeElement.children[1].setAttribute("x", `${8.5 + (rectx)-6.25}`)
    this.elemento.nativeElement.children[1].setAttribute("y", `${95 - (YCorreccion)-1}`)


 

    // this.renderer.appendChild(this.elemento.nativeElement, rect);

    //   const parent = this.elemento.nativeElement.parentNode;
    //   const reference = this.elemento.nativeElement;
    //  //  this.renderer.appendChild(button, buttonText);
    //   this.renderer.insertBefore(parent, rect, reference )
    //   this.renderer.appendChild(this.elemento.nativeElement, rect);
    //  // const text = this.renderer.createText('prova');
    //  // Aggiungo il testo al tag div
    //  // this.renderer.appendChild(div, text);
    //  // Aggiungo il div nel DOM del component
  }

pruebaDesplazamientoMarker(cordenadas:any){
  const marker = this.elemento.nativeElement.ownerDocument

  // const animation = marker.getElementsByTagName('animateMotion').item(0);
  const rect =marker.getElementsByTagName('rect').item(14)
  const circle =marker.getElementsByTagName('circle').item(0)

  console.log("cordenadas", cordenadas)
  const xRect=rect?.getAttribute('x');
  const yRect=rect?.getAttribute('y');
  const xcircle=circle?.getAttribute('cx');
  const ycircle=circle?.getAttribute('cy');

  // rect?.removeAttribute('x')
  // rect?.removeAttribute('y')
  // circle?.removeAttribute('cx')
  // circle?.removeAttribute('cy')
  rect?.setAttribute('x',cordenadas.xCor)
  rect?.setAttribute('y',cordenadas.yCor)
  circle?.setAttribute('cx',cordenadas.xCor)
  circle?.setAttribute('cy',cordenadas.yCor)

  console.log("xRect", xRect)
  console.log("yRect", yRect)
  console.log("xcircle", xcircle)
  console.log("ycircle", ycircle)
  // let cor= `M ${xRect},${yRect} L ${cordenadas.xCor},${cordenadas.yCor}`
  // console.log("cor ", cor)
  // // console.log("rect", rect)
  // // console.log("circle", circle)
  //  animation?.setAttribute(`path`, cor)
  //  console.log("animation ", animation?.getAttribute('path'))

  // animation?.addEventListener('endEvent', () => {
  //   rect?.setAttribute('x',cordenadas.xCor)
  //   rect?.setAttribute('y',cordenadas.yCor)
  //   circle?.setAttribute('cx',cordenadas.xCor)
  //   circle?.setAttribute('cy',cordenadas.yCor)
    
  //         console.log("fin") 
  // })
}
}