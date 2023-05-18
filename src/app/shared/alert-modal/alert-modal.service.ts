import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './alert-modal.component';

export enum AlertTypes {
  ERRO = 'danger',
  SUCESSO = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  private mostrarAlert(mensagem: string, tipo: AlertTypes, fecharTimeout?: number) {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.tipo = tipo;
    bsModalRef.content.mensagem = mensagem;

    if(fecharTimeout) {
      setTimeout(() => bsModalRef.hide(), fecharTimeout);
    }
  }

  mostrarAlertErro(mensagem: string) {
    this.mostrarAlert(mensagem, AlertTypes.ERRO);
  }

  mostrarAlertSucesso(mensagem: string) {
    this.mostrarAlert(mensagem, AlertTypes.SUCESSO, 3000);
  }
}
