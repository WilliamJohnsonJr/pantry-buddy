
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AppNavShellComponent } from '@app/app-nav-shell/app-nav-shell.component';

describe('AppNavShellComponent', () => {
  let component: AppNavShellComponent;
  let fixture: ComponentFixture<AppNavShellComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [AppNavShellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppNavShellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
