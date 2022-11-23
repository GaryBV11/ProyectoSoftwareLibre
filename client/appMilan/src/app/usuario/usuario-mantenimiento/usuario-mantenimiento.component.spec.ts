import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioMantenimientoComponent } from './usuario-mantenimiento.component';

describe('UsuarioMantenimientoComponent', () => {
  let component: UsuarioMantenimientoComponent;
  let fixture: ComponentFixture<UsuarioMantenimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioMantenimientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioMantenimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
