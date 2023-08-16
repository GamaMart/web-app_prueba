import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { HomeUsuarioComponent } from './components/home-usuario/home-usuario.component';


const routes: Routes = [
  {path: '', component: HomeUsuarioComponent},
  {path: '**', redirectTo: 'modal', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
