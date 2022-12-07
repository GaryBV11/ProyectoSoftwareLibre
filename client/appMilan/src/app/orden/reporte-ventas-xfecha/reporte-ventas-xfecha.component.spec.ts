import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteVentasXFechaComponent } from './reporte-ventas-xfecha.component';

describe('ReporteVentasXFechaComponent', () => {
  let component: ReporteVentasXFechaComponent;
  let fixture: ComponentFixture<ReporteVentasXFechaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteVentasXFechaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteVentasXFechaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
