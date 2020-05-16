import { Component, Inject, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css'],
})

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AutorComponent {
  public autores: Autores[];
  public http: HttpClient;
  public baseUrl: string;
  formControl = new FormGroup({
    id: new FormControl(''),
    nome: new FormControl([
      Validators.required,
      Validators.minLength(150)
    ])
  });

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private modalService: NgbModal, private datePipe: DatePipe) {
    this.http = http;
    this.baseUrl = baseUrl + 'api/autores';
    this.load();

  }

  async load() {
    await this.http.get<Autores[]>(this.baseUrl).subscribe(result => {
      this.autores = result;
    }, error => console.error(error));
  }


  async Delete(id: number) {
    await this.http.request('DELETE', this.baseUrl + '/' + id).subscribe((res) => {
      this.load();
    }, (err) => {
      console.log(err);
    });
  }

  open(content, autores: Autores) {
    this.formControl.controls['id'].setValue(autores.id);
    this.formControl.controls['nome'].setValue(autores.nome);

    this.modalService.open(content);
  }

  newAutor(content) {
    let autores = new Autores();
    this.open(content, autores);
  }


  close() {
    this.modalService.dismissAll();
  }

  async save() {
    let autores = new Autores();
    autores.id = this.formControl.controls['id'].value;
    autores.nome = this.formControl.controls['nome'].value;

    await this.http.post<Autores[]>(this.baseUrl, autores).subscribe((res) => {
      this.load();
    });

    this.close();
  }
}


export class Autores {
  id: number;
  nome: string;
}
