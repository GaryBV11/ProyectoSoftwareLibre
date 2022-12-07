import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVentasXmetodoPagoComponent } from './reporte-ventas-xmetodo-pago.component';

describe('ReporteVentasXmetodoPagoComponent', () => {
  let component: ReporteVentasXmetodoPagoComponent;
  let fixture: ComponentFixture<ReporteVentasXmetodoPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteVentasXmetodoPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteVentasXmetodoPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
