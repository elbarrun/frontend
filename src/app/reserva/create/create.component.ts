import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, NgForm, FormBuilder} from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  form!: FormGroup;
  selectedImage: any;
  categorias:any = [];

  /*------------------------------------------
  --------------------------------------------
  Created constructor
  --------------------------------------------
  --------------------------------------------*/
  constructor(
    public reservaService: ReservaService,
    private router: Router,
    private http: HttpClient,
    public fb: FormBuilder,
  ) { }
}

  /**
   * Write code on Method
   *
   * @return response()
   */
  ngOnInit() {
    this.form = new FormGroup({
      user_id: new FormControl(null, Validators.required),
      coche_id: new FormControl(null, Validators.required),
      fecha_inicio: new FormControl('', Validators.required),
      fecha_fin: new FormControl('', Validators.required),
      precio_total: new FormControl(null, Validators.required),
      estado: new FormControl(null, Validators.required)
    });

  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  get f(){
    return this.form.controls;
  }

  /**
   * Write code on Method
   *
   * @return response()
   */

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      file: file
    });
  }
  submit(){
    const reserva = {
      user_id: this.form.value.user_id,
      coche_id: this.form.value.coche_id,
      fecha_inicio: this.form.value.fecha_inicio,
      fecha_fin: this.form.value.fecha_fin,
      precio_total: this.form.value.precio_total,
      estado: this.form.value.estado
    };

    this.reservaService.create(reserva).subscribe(
      (response:any) => {
        console.log(response);
        this.router.navigate(['/reservas']);
      },
      (error:any) => {
        console.log(error);
      }
    );
  }

