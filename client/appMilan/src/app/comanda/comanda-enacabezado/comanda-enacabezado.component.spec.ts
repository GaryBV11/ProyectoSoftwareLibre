import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComandaEnacabezadoComponent } from './comanda-enacabezado.component';

describe('ComandaEnacabezadoComponent', () => {
  let component: ComandaEnacabezadoComponent;
  let fixture: ComponentFixture<ComandaEnacabezadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComandaEnacabezadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComandaEnacabezadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
