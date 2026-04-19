import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { TechnologiesComponent } from './components/technologies/technologies';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, TechnologiesComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}