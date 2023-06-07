import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { ViewComponent } from './view/view.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';

const routes: Routes = [
  { path: 'reserva', redirectTo: 'reserva/index', pathMatch: 'full'},
  { path: 'reserva/index', component: IndexComponent },
  { path: 'reserva/:reservaId/view', component: ViewComponent },
  { path: 'reserva/create', component: CreateComponent },
  { path: 'reserva/:reservaId/edit', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
