import { Component, Inject, NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from '../app.component';
import { FormControl, FormGroup, Validators, FormBuilder, FormArray } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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

export class HomeComponent {
  formControl = new FormGroup({
    quantidade: new FormControl([
      Validators.required,
      Validators.min(1)
    ])
  });
  NamesformControl: FormGroup
  public http: HttpClient;
  public baseUrl: string;
  public quantity: number;
  public names: Autores[];
  public autores: Autores[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private modalService: NgbModal, private fb: FormBuilder) {
    this.NamesformControl = this.fb.group({
      names: this.fb.array([])
    });
    this.http = http;
    this.baseUrl = baseUrl + 'api/autores';
    this.quantity = 0;
  }

  saveQuantity() {
    this.quantity = this.formControl.controls['quantidade'].value;
    const creds = this.NamesformControl.controls.names as FormArray;
    for (let i = 0; i < this.quantity; i++) {
      creds.push(this.fb.group({
        name: ''
      }));
    }
  }

  saveNames() {
    let nomes = this.NamesformControl.controls.names.value;
    let temp: Autores[];
    temp = [];
    for (let i = 0; i < this.quantity; i++) {
      let autor = new Autores();
      autor.nome = nomes[i].name;
      temp.push(autor)
    }
    this.http.post<Autores[]>(this.baseUrl + "/save", temp)
      .subscribe((res) => this.autores = res);
  }

  trackByFn(index: any, item: any) {
    return index;
  }
}


export class Autores {
  id: number;
  nome: string;
}
