import { Component } from '@angular/core';

@Component({
  selector: 'app-boton-simulador',
  standalone: true,
  imports: [],
  templateUrl: './boton-simulador.html',
  styleUrl: './boton-simulador.css',
})
export class BotonSimuladorComponent { 
  
  abrirSimulador() {
    window.open('/simulador.html', '_blank');
  }
}