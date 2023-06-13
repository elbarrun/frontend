import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { IndexComponent } from './reserva/index/index.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { CreateComponent } from './reserva/create/create.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'index',  component: IndexComponent  },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'reserva/create/:cocheId',  component: CreateComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
