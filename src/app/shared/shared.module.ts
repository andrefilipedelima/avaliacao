import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginacaoComponent } from './paginacao/paginacao.component';
import { AlertModalComponent } from './alert-modal/alert-modal.component';

@NgModule({
  declarations: [
    PaginacaoComponent,
    AlertModalComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginacaoComponent,
    AlertModalComponent
  ],
  entryComponents: [AlertModalComponent]
})
export class SharedModule { }
