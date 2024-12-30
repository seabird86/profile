import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasourelGuideComponent } from './casourel-guide.component';

describe('CasourelGuideComponent', () => {
  let component: CasourelGuideComponent;
  let fixture: ComponentFixture<CasourelGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasourelGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasourelGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
