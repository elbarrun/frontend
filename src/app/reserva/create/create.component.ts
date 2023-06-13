import { Component, OnInit } from '@angular/core';
import { ReservaService } from '../reserva.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { Reserva } from '../reserva';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  reserva!:Reserva ;
  form!: FormGroup;
  userId: any;

  constructor(
    public reservaService: ReservaService,
    private router: Router,
    private http: HttpClient,
    public fb: FormBuilder,
    private route: ActivatedRoute,
    public auth: AuthService
  ) { }

  ngOnInit() {
    const cocheId = this.route.snapshot.paramMap.get('cocheId');
    console.log(cocheId);

    this.auth.profileUser().pipe(map((user: any) => user['id'])).subscribe(id => {
      this.userId = id;
      console.log(this.userId);

      this.form = new FormGroup({
        user_id: new FormControl(this.userId, Validators.required),
        coche_id: new FormControl(cocheId, Validators.required),
        fecha_inicio: new FormControl('', Validators.required),
        fecha_fin: new FormControl('', Validators.required),
        precio_total: new FormControl(null, Validators.required),
        estado: new FormControl('pendiente', Validators.required)
      });
    });
  }


  get f() {
    return this.form.controls;
  }


  submit() {
    let formData = new FormData();
    formData.append('user_id', this.form.value.user_id);
    formData.append('coche_id', this.form.value.coche_id);
    formData.append('fecha_inicio', this.form.value.fecha_inicio);
    formData.append('fecha_fin', this.form.value.fecha_fin);
    formData.append('precio_total', this.form.value.precio_total);
    formData.append('estado', this.form.value.estado);
console.log(this.form.value)

    this.reservaService.create(this.form.value).subscribe(
      (response: any) => {
        console.log(response);
       //   this.form=response.data;
        this.router.navigate(['/index']);
      }

    );
  }
}
