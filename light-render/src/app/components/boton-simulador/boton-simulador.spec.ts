import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonSimulador } from './boton-simulador';

describe('BotonSimulador', () => {
  let component: BotonSimulador;
  let fixture: ComponentFixture<BotonSimulador>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotonSimulador]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BotonSimulador);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
