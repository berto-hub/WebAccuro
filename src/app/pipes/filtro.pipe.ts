import { Pipe, PipeTransform } from '@angular/core';
import { Empleado } from '../Interfaces/empleado';

@Pipe({
  name: 'filtro'
})
export class FiltroPipe implements PipeTransform {

  transform(empleados: Empleado[], pagina:number = 1, ...args: unknown[]): Empleado[] {
    
    return empleados.slice(pagina, pagina + 9);
  }

}
