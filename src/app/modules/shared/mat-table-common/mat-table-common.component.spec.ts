import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatTableCommonComponent } from './mat-table-common.component';

describe('MatTableCommonComponent', () => {
  let component: MatTableCommonComponent;
  let fixture: ComponentFixture<MatTableCommonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatTableCommonComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatTableCommonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
