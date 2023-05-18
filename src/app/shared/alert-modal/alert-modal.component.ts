import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: ['./alert-modal.component.scss']
})
export class AlertModalComponent implements OnInit{

  @Input() mensagem: string = "";
  @Input() tipo: string = "secondary";

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {}

  fechar() {
    this.bsModalRef.hide();
  }

}
