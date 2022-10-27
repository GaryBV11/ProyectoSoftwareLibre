import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandaDetalleComponent } from './comanda-detalle.component';

describe('ComandaDetalleComponent', () => {
  let component: ComandaDetalleComponent;
  let fixture: ComponentFixture<ComandaDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComandaDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComandaDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
