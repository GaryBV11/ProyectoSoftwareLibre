import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuMesasComponent } from './menu-mesas.component';

describe('MenuMesasComponent', () => {
  let component: MenuMesasComponent;
  let fixture: ComponentFixture<MenuMesasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuMesasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuMesasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
