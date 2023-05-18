import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-paginacao',
  templateUrl: './paginacao.component.html',
  styleUrls: ['./paginacao.component.scss']
})
export class PaginacaoComponent implements OnInit{
   @Input() paginaAtual: number = 0;
   @Input() limite: number = 0;
   @Input() total: number = 0;
   @Output() trocarPagina = new EventEmitter<number>();

   paginas: number[] = [];

   ngOnInit() {
    const contadorPagina = Math.ceil(this.total/this.limite);
    this.paginas = this.alcance(1, contadorPagina);
   }

   alcance(inicio: number, fim: number): number[] {
    return [...Array(fim).keys()].map(item => item + inicio);
   }
}
