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
      telefono:['', Validators.required],
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

  validateEmailTel():boolean{
    var validEmail = new RegExp(/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/);
    var validTelefono = new RegExp("^(\\+34|0034|34)?[6789]\\d{8}$");

    if( validEmail.test(this.formularioEmpleado.value.email) 
      && validTelefono.test(this.formularioEmpleado.value.telefono) ){
      console.log('Email and Telephone is valid, continue with form submission');
      this.formularioEmpleado.value.telefono = Number(this.formularioEmpleado.value.telefono);
      console.log(this.formularioEmpleado.value.telefono);
      return true;
    }else{
      if( !validEmail.test(this.formularioEmpleado.value.email) 
        && !validTelefono.test(this.formularioEmpleado.value.telefono) ){
        alert('Email and telephone is invalid, skip form submission');
        this.formularioEmpleado.value.email = "";
        this.formularioEmpleado.value.telefono = "";
      }else{
        if( !validEmail.test(this.formularioEmpleado.value.email) ){
          alert('Email is invalid, skip form submission');
          this.formularioEmpleado.value.email = "";
        }
        if( !validTelefono.test(this.formularioEmpleado.value.telefono) ){
          alert('Telephone is invalid, skip form submission');
          this.formularioEmpleado.value.telefono = "";
        }
      }
      
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

  nextPage(){

  }

  agregarEmpleado(){
    const request = {
      id:Math.floor(Math.random() * 500) + 1,
      nombre:this.formularioEmpleado.value.nombre,
      apellido:this.formularioEmpleado.value.apellido,
      email:this.formularioEmpleado.value.email,
      telefono:this.formularioEmpleado.value.telefono,
      puesto:this.formularioEmpleado.value.puesto,
    }

    console.log(request);
    this.validateEmailTel() ? this._empleadoServicio.addEmployee(request).subscribe({
      next:(data) => {
        if(this.listaEmplados.length < 10) {
          this.listaEmplados.push(data);
        };
        console.log(data);
        this.formularioEmpleado.patchValue({
          nombre:"",
          apellido:"",
          email:"",
          telefono:"",
          puesto:""
        })
        console.log(this.listaEmplados);
      }, error:(e) => {console.log(e)}
    }) : 
    this.formularioEmpleado.patchValue({
      email:this.formularioEmpleado.value.email,
      telefono:this.formularioEmpleado.value.telefono
    });
  }
}
