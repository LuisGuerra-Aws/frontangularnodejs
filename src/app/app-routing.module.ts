import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolListComponent } from './components/rol-list/rol-list.component';
import { RolFormComponent } from './components/rol-form/rol-form.component';


export const routes: Routes = [
    {path: '', redirectTo: 'roles', pathMatch: 'full'},
    {path: 'roles', component: RolListComponent},
    {path: 'Rolform', component: RolFormComponent},
    {path: 'Rolform/:id', component: RolFormComponent}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
  })

  export class AppRoutingModule{

  }


