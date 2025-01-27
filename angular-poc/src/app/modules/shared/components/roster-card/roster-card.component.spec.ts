import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RosterCardComponent } from './roster-card.component';

describe('RosterCardComponent', () => {
  let component: RosterCardComponent;
  let fixture: ComponentFixture<RosterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RosterCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RosterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getPlaneAndPathIcon should be called', () => {
    spyOn(component, 'getPlaneAndPathIcon');
    component.ngOnInit();
    expect(component.getPlaneAndPathIcon).toHaveBeenCalled();
  });
  it('recent cards count', () => {
    component.recentCards = [{}, {}, {}];
    component.numberOfCards = 2;
    component.ngOnChanges();
    expect(component.recentCards.length).toBe(2);
  });
});
