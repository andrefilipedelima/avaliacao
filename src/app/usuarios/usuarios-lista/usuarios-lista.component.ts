import { Component, OnInit, ViewChild } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { Usuario, UsuarioDetalhes } from '../usuario';
import { EMPTY, Observable, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Action } from 'rxjs/internal/scheduler/Action';

@Component({
  selector: 'app-usuarios-lista',
  templateUrl: './usuarios-lista.component.html',
  styleUrls: ['./usuarios-lista.component.scss']
})
export class UsuariosListaComponent implements OnInit {

  bsModalRef!: BsModalRef;
  deleteModalRef!: BsModalRef;
  detalhesModalRef!: BsModalRef;
  @ViewChild('deleteModal') deleteModal!: string;
  @ViewChild('detalhesModal') detalhesModal!: string;

  usuarios$!: Observable<Usuario[]>;
  usuarioDetalhes$!: Observable<UsuarioDetalhes>;
  erro$ = new Subject<boolean>;

  consultaUsuarioCriado: boolean = false;
  limite: number = 30;
  total: number = 90;
  paginaAtual: number = 1;
  usuarioSelecionado!: Usuario;
 

  constructor(
    private service: UsuariosService,
    private alertService: AlertModalService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.atualizarLista(this.paginaAtual);
  }

  atualizarLista(pagina: number) {
    this.consultaUsuarioCriado = false;
    this.usuarios$ = this.service.listar(pagina, this.limite)
      .pipe(
        catchError(error => {
          this.erro$.next(true);
          this.modalErro('Erro ao carregar usuários. Tente novamente mais tarde.');
          return EMPTY;
        })
      );
  }

  listarUsuarioCriado() {
    this.consultaUsuarioCriado = true;
    this.usuarios$ = this.service.listarUsuarioCriado()
      .pipe(
        catchError(error => {
          this.erro$.next(true);
          this.modalErro('Erro ao carregar usuários criados. Tente novamente mais tarde.');
          return EMPTY;
        })
      );
  }

  trocarPagina(pagina: any) {
    this.paginaAtual = pagina;
    this.atualizarLista(this.paginaAtual);
  }

  modalDelete(usuario: Usuario) {
    this.usuarioSelecionado = usuario;
    this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'})
  }

  confirmarDelete() {
    this.deletarUsuario(this.usuarioSelecionado.id);
  }

  cancelarDelete() {
    this.deleteModalRef.hide();
  }

  deletarUsuario(id: string) {
    this.service.deletar(id).subscribe({
      next: () => {
        this.modalSucesso('Usuário removido com sucesso!');
        this.atualizarLista(this.paginaAtual);
      },
      error: () =>  this.modalErro('Erro ao deletar usuário. Tente novamente mais tarde.'),
      complete: () => this.deleteModalRef.hide()
    });
    
  }

  editar(id: string) {
    this.router.navigate(['editar', id], { relativeTo: this.route})
  }

  modalErro(mensagem: string) {
   this.alertService.mostrarAlertErro(mensagem);
  }

  modalSucesso(mensagem: string) {
    this.alertService.mostrarAlertSucesso(mensagem);
   }
  
  modalDetalhes(id: string) {
    this.obterDetalhes(id);
    
  }

  obterDetalhes(id: string) {
    this.usuarioDetalhes$ = this.service.detalhes(id)
      .pipe(
        catchError(error => {
          this.erro$.next(true);
          this.modalErro('Erro ao carregar detalhes do usuário. Tente novamente mais tarde.');
          return EMPTY;
        })
      );
    if(this.usuarioDetalhes$) {
      this.detalhesModalRef = this.modalService.show(this.detalhesModal, {class: 'modal-md'})
    }  
  }

  fecharModalDetalhes() {
    this.detalhesModalRef.hide();
  }
}
