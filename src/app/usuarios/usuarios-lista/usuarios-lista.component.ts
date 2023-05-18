import { Component, OnInit } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Usuario } from '../usuario';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.scss']
})
export class UsuariosListaComponent implements OnInit {

  usuarios$!: Observable<Usuario[]>;
  error$ = new Subject<boolean>;

  limite: number = 20;
  total: number = 100;
  paginaAtual: number = 1;


  constructor(private service: UsuariosService) {}

  ngOnInit() {
    this.atualizarLista(this.paginaAtual);
  }

  atualizarLista(pagina: number) {
    this.usuarios$ = this.service.listar(pagina, this.limite)
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return EMPTY;
      })
    );
  }

  listarUsuarioCriado() {
    this.usuarios$ = this.service.listarUsuarioCriado()
    .pipe(
      catchError(error => {
        console.error(error);
        this.error$.next(true);
        return EMPTY;
      })
    );
  }

  trocarPagina(pagina: any) {
    console.log("pagina",pagina)
    this.paginaAtual = pagina;
    this.atualizarLista(this.paginaAtual);
  }

  

}
