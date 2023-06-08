import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder} from '@angular/forms';
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

  constructor(
    public reservaService: ReservaService,
    private router: Router,
    private http: HttpClient,
    public fb: FormBuilder,
  ) { }

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

  get f(){
    return this.form.controls;
  }

  uploadFile(event: any) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.form.patchValue({
      file: file
    });
  }

  submit(){
    const reserva = new FormData();
    reserva.append('user_id', this.form.value.user_id);
    reserva.append('coche_id', this.form.value.coche_id);
    reserva.append('fecha_inicio', this.form.value.fecha_inicio);
    reserva.append('fecha_fin', this.form.value.fecha_fin);
    reserva.append('precio_total', this.form.value.precio_total);
    reserva.append('estado', this.form.value.estado);


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
}
