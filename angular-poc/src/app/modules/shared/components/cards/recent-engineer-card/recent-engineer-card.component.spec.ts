import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentEngineerCardComponent } from './recent-engineer-card.component';

describe('RecentEngineerCardComponent', () => {
  let component: RecentEngineerCardComponent;
  let fixture: ComponentFixture<RecentEngineerCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecentEngineerCardComponent],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentEngineerCardComponent);
    component = fixture.componentInstance;

    component.cardData = {
      employeeId: '123',
      designationDesc: '123',
      departmentDescription: '123',
      carrier: '123',
    };
    component.labelRecentEngineerCard = {
      labelBtnRecentTrips: 'test',
      labelBtnSelect: 'test',
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
