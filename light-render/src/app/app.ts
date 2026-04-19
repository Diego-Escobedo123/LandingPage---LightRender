import { Component } from '@angular/core';
import { HeroComponent } from './components/hero/hero';
import { TechnologiesComponent } from './components/technologies/technologies';
import { AudienceComponent } from './components/audience/audience';
import { BusinessComponent } from './components/business/business';
import { PurposeComponent } from './components/purpose/purpose';
import { FutureComponent } from './components/future/future';
import { CtaComponent } from './components/cta/cta';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeroComponent, TechnologiesComponent, AudienceComponent, BusinessComponent, PurposeComponent, FutureComponent, CtaComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {}