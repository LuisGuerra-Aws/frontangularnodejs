import { Component, OnInit } from '@angular/core';

import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';
import { AlertService } from '../../services/alert.service';


@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol_list.component.css'],
})

export class RolListComponent implements OnInit{

  roles?: Rol[];
  selected?: Rol ={};
  currentIndex: number = -1;
  title : string = '';
  message : string = '';

  constructor( private rolService: RolService, private alertService: AlertService ){
  }


  ngOnInit(): void {
    this.getRoles();
  }

  getRoles(): void {
    this.rolService.getAll()
      .subscribe( {
        next : (data) => {
          this.roles = data.data;
          console.log('print' + this.roles);
          console.log(data);
        },
        error : (e: any) => console.error(e)
      }
              );
  }

  refreshList(): void{
    this.getRoles();
    this.selected = {};
    this.currentIndex = -1;
  }

  setSelected(rol: Rol, index: number): void{
      this.selected = rol;
      console.log(rol);
      this.currentIndex = index;
  }

  deleteRol() : void {
    if (!this.selected) {
      return;
    }

    this.message = '';
   // reset alerts on submit
   this.alertService.clear();    

    console.log ('Eliminación ' + this.selected.id_rol);
    this.rolService.delete(this.selected.id_rol)
      .subscribe({
        next : (res: any) => {
          console.log(res);
          this.alertService.success('Rol Eliminado: ' , { autoClose: true, keepAfterRouteChange: true });          
//          alert("Rol ha sido eliminado");
          this.refreshList();
        },
        error: (e: any) => {console.error();
          //alert("Rol No ha sido eliminado" + e);
          this.alertService.error(e.message);
        }
      }
        );
  }




}
