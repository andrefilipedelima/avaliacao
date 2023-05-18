import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from '../usuarios.service';

@Component({
  selector: 'app-usuarios-form',
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent implements OnInit{

  form!: FormGroup;
  enviado: boolean = false;

  constructor(private fb: FormBuilder, private service: UsuariosService) {}

  ngOnInit() {
    this.form = this.fb.group({
      foto: [null],
      pronome: [null],
      nome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      sobrenome: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(30)]],
      email: [null, [Validators.required, Validators.email]]
    })

  }

  salvar() {
    this.enviado = true;
    if(this.form.valid) {
      this.service.criar(this.form.value).subscribe({
        next: (dados) => console.log("sucesso", dados),
        error: (error) => console.error(error),
        complete: () => console.info('completado!') 
    })
    }
  }

  cancelar() {
    this.enviado = false;
    this.form.reset();
  }

  verificarErros(input: string) {
    return this.form.get(input)?.errors;
  }

}
