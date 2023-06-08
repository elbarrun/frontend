import { Component } from '@angular/core';
import { CochesService } from 'src/app/shared/coches.service';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent {
  coches!:any[];
  constructor(private CocheService:CochesService, private router:Router){
    this.CocheService.getCoches().subscribe((data:any)=>{
      this.coches=data;
      console.log(this.coches);
    });
  }
}
