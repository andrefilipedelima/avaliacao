import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosListaComponent } from './usuarios-lista/usuarios-lista.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginacaoModule } from '../paginacao/paginacao.module';


@NgModule({
  declarations: [
    UsuariosListaComponent,
    UsuariosFormComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    ReactiveFormsModule,
    PaginacaoModule
  ]
})
export class UsuariosModule { }
