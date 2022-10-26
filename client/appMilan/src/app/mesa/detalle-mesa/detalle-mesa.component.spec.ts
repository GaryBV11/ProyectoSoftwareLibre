import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMesaComponent } from './detalle-mesa.component';

describe('DetalleMesaComponent', () => {
  let component: DetalleMesaComponent;
  let fixture: ComponentFixture<DetalleMesaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleMesaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleMesaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
