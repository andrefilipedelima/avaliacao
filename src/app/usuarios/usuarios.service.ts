import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Retorno } from './usuario';
import { delay, map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly API='https://dummyapi.io/data/v1'
  private readonly token = "6464be45f7790890d871da90";

  constructor(private http: HttpClient) { }

  listar(pagina:number, limite:number) {
    const head= new HttpHeaders().append('app-id', this.token) 
    return this.http.get<Retorno>(this.API + `/user?page=${pagina}&limit=${limite}`, {headers:head})
    .pipe(
      map(i => i.data),
      delay(300),
      tap(console.log)
    );
  }

  criar(usuario: any) {
    const head= new HttpHeaders().append('app-id', this.token) 
    const body = {
      title: usuario.pronome,
      firstName: usuario.nome,
      lastName: usuario.sobrenome,
      email: usuario.email,
      picture: usuario.foto
    }
    return this.http.post(this.API + '/user/create', body, {headers:head})
    .pipe(
      take(1)
    );
  }

  listarUsuarioCriado() {
    const head= new HttpHeaders().append('app-id', this.token) 
    return this.http.get<Retorno>(this.API + '/user?created=1', {headers:head})
    .pipe(
      map(i => i.data),
      delay(300),
      tap(console.log)
    );
  }
}
