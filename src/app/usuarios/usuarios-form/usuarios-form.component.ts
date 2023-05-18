import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';
import { AlertModalService } from 'src/app/shared/alert-modal/alert-modal.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UsuarioDetalhes } from '../usuario';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit{

  form!: FormGroup;
  enviado: boolean = false;
  usuarioDetalhes$!: any;
  email: boolean = false;

  constructor(
    private fb: FormBuilder,
    private service: UsuariosService,
    private alertService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params
    .subscribe(
     (params: any) => {
      const id = params['id'];
      if(id) {
        this.email = true;
        this.usuarioDetalhes$ = this.service.detalhes(id);
        this.usuarioDetalhes$.subscribe((usuario:any) => {
          this.atualizarForm(usuario)
        });
      }
    })

    this.form = this.fb.group({
      id: [null],
      foto: [null],
      pronome: [""],
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      sobrenome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: [{value: null, disabled: this.email}, [Validators.required, Validators.email]]
    })
  }

  salvar() {
    this.enviado = true;   
    if(this.usuarioDetalhes$) {
      if(this.form.valid) {
        this.service.atualizar(this.form.value).subscribe({
          next: () => {
            this.modalSucesso('Usuário atualizado com sucesso!');
            this.location.back();
          },
          error: () => this.modalErro('Não foi possível atualizar o usuário. Tente novamente mais tarde.')
      })
      }
    }
    else {
      if(this.form.valid) {
        this.service.criar(this.form.value).subscribe({
          next: () => {
            this.modalSucesso('Usuário cadastrado com sucesso!');
            this.location.back();
          },
          error: (erro) =>  {
            if(erro.error.data.title)this.modalErro('Erro ao criar usuário. Pronome em formato inválido')
            if(erro.error.data.email) this.modalErro('Erro ao criar usuário. E-mail já cadastrado')
            else this.modalErro('Erro ao criar usuário. Tente novamente mais tarde.')
          },
          complete: () =>  this.cancelar()
      })
      }
    }
    
  }

  atualizarForm(usuario: UsuarioDetalhes) {
    this.form.patchValue({
      id: usuario.id,
      foto: usuario.picture,
      pronome: usuario.title,
      nome: usuario.firstName,
      sobrenome: usuario.lastName,
      email: usuario.email
    }) 
  }

  cancelar() {
    this.enviado = false;
      this.form.reset();
  }

  verificarErros(input: string) {
    return this.form.get(input)?.errors;
  }

  modalErro(mensagem: string) {
    this.alertService.mostrarAlertErro(mensagem);
   }
 
   modalSucesso(mensagem: string) {
     this.alertService.mostrarAlertSucesso(mensagem);
    }

}
