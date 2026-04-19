import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { TechnologiesComponent } from './components/technologies/technologies';
import { AudienceComponent } from './components/audience/audience';
import { BusinessComponent } from './components/business/business';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, TechnologiesComponent, AudienceComponent, BusinessComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}