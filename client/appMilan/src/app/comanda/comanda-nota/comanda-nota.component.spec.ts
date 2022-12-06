import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComandaNotaComponent } from './comanda-nota.component';

describe('ComandaNotaComponent', () => {
  let component: ComandaNotaComponent;
  let fixture: ComponentFixture<ComandaNotaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComandaNotaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComandaNotaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
