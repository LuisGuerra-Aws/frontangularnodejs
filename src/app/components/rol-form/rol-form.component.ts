import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Rol } from '../../models/rol.model';
import { RolService } from '../../services/rol.service';
import { AlertService } from '../../services/alert.service';



@Component({
  selector: 'app-rol-form',
    templateUrl: './rol-form.component.html',
  })

export class RolFormComponent implements OnInit{
  @Input() viewMode = true;

  @Input() rol :  Rol = {
    id_rol: 0,
    rol_name: '',
    rol_description:''
  };

  message = '';

  constructor(
    private rolService: RolService, 
    private route: ActivatedRoute,
    private router: Router ,
    private alertService: AlertService      
  ){}


  ngOnInit(): void {

    this.message = '';
    const id = this.route.snapshot.params['id'];
    if (id){
      this.editRol(this.route.snapshot.params['id'])
    }
      
  }

  editRol(id : string) : void {
    this.rolService.get(id)
      .subscribe(
        {
          next: (data: Rol) => {
            this.rol = data;
            console.log('Editar');
            console.log(data);
          },
          error: (e: any) => console.error(e)
        }
      );
    }


  saveRol(): void{
    this.message = '';

    if (this.rol.id_rol)
      this.ejecuteActualizar();
    else
      this.ejecuteInsertar();
  }

  private ejecuteInsertar() {
    const data = {
      rol_name: this.rol.rol_name,
      rol_description: this.rol.rol_description
    };


    // reset alerts on submit
    this.alertService.clear();

    this.rolService.save(data).subscribe({
      next: (res: any) => {
        console.log(res);
        console.log('res.message ' + res );        
        this.alertService.success('Rol Insertado: ' , { autoClose: true, keepAfterRouteChange: true });
  //      alert("Rol ha sido insertado");            

        this.router.navigateByUrl('/roles');
      },
      error: (e: any) => {
          console.error(e.message);          
          this.alertService.error(e.message);
        }
    });
  }

  private ejecuteActualizar() {

   // reset alerts on submit
   this.alertService.clear();

    this.rolService.updatebyobject(this.rol)
      .subscribe(
        {
        next: (res: { message: string; }) => {
          console.log(res);
          this.message = res.message
            ? res.message
            : 'This Rol was updated successfully!';

            console.log('res.message ' + res.message );
            this.alertService.success('Rol Actualizado: ' , { autoClose: true, keepAfterRouteChange: true });
//            alert("Rol ha sido actualizado");            
            this.router.navigateByUrl('/roles');            
        },
        error: (e: any) => {
          console.error(e.message);   
          this.alertService.error(e.message);
        }
      }
      );    
  }


  

}




