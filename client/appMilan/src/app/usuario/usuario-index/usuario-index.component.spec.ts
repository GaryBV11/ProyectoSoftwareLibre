import { ComponentFixture, TestBed,waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { UsuarioIndexComponent } from './usuario-index.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
describe('UsuarioIndexComponent', () => {
  let component: UsuarioIndexComponent;
  let fixture: ComponentFixture<UsuarioIndexComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsuarioIndexComponent],
      imports: [
        NoopAnimationsModule,
        MatPaginatorModule,
        MatSortModule,
        MatTableModule,
      ]
    }).compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(UsuarioIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
