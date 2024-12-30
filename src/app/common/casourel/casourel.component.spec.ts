import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasourelComponent } from './casourel.component';

describe('CasourelComponent', () => {
  let component: CasourelComponent;
  let fixture: ComponentFixture<CasourelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasourelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasourelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
