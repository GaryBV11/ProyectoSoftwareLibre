import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteXvariosComponent } from './reporte-xvarios.component';

describe('ReporteXvariosComponent', () => {
  let component: ReporteXvariosComponent;
  let fixture: ComponentFixture<ReporteXvariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteXvariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteXvariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
