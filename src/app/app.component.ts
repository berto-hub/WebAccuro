import { Component, OnInit } from '@angular/core';
import { environment } from './../environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Empleado } from './Interfaces/empleado';
import { EmpleadosService } from './Services/empleados.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  listaEmplados:Empleado[] = [];
  formularioEmpleado:FormGroup;
  nombreBusqueda: string = '';
  pagina: number = 1;

  constructor(
    private _empleadoServicio:EmpleadosService,
    private fb:FormBuilder
  ){
    this.formularioEmpleado = this.fb.group({
      nombre:['', Validators.required],
      apellido:['', Validators.required],
      email:['', Validators.required],
      telefono:[0, Validators.required],
      puesto:['', Validators.required]
    });
  }

  /*telefonoValidator(telefono:number){
    var telef = new RegExp("^(\\34|0034|34)?[6789]\\d{8}$");
    if (telef.test(telefono)) {
      console.log("valor correcto");
    } else {
      console.log("INTRODUCE OTRO VALOR. EJ: 34666555444");
    }
  }*/

  validateEmail(email:string):boolean{
    var validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  
    if( validEmail.test(email) ){
      console.log('Email is valid, continue with form submission');
      return true;
    }else{
      alert('Email is invalid, skip form submission');
      return false;
    }
  } 

  obtenerEmpleados(){
    this._empleadoServicio.getEmployeeList(this.nombreBusqueda, this.pagina).subscribe({
      next:(data) => {
        this.listaEmplados = data;
      }, error:(e) => {console.log(e)}
    });
  }

  ngOnInit():void{
    this.obtenerEmpleados();
  }

  agregarEmpleado(){
    const request:Empleado = {
      id:Math.floor(Math.random() * 500) + 1,
      nombre:this.formularioEmpleado.value.nombre,
      apellido:this.formularioEmpleado.value.apellido,
      email:this.formularioEmpleado.value.email,
      telefono:this.formularioEmpleado.value.telefono,
      puesto:this.formularioEmpleado.value.puesto,
    }

    console.log(request);
    this.validateEmail(request.email) ? this._empleadoServicio.addEmployee(request).subscribe({
      next:(data) => {
        if(this.listaEmplados.length < 10) {
          this.listaEmplados.push(data);
        };
        console.log(data);
        this.formularioEmpleado.patchValue({
          nombre:"",
          apellido:"",
          email:"",
          telefono:0,
          puesto:""
        })
        console.log(this.listaEmplados);
      }, error:(e) => {console.log(e)}
    }) : 
    this.formularioEmpleado.patchValue({
      email:""
    })
    ;
  }
}
