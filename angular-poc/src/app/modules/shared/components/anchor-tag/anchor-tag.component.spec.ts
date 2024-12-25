import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterTestingModule } from '@angular/router/testing';
import { AdobeAnalyticsServiceMock } from '../../services/__mock__/adobe-analytics.service.mock';
import { AdobeAnalyticsService } from '../../services/adobe-analytics.service';
import { AnchorTagComponent } from './anchor-tag.component';

describe('AnchorTagComponent', () => {
  let component: AnchorTagComponent;
  let fixture: ComponentFixture<AnchorTagComponent>;
  let adobeAnalyticsServiceSpy: jasmine.SpyObj<AdobeAnalyticsService>;

  beforeEach(async () => {
    adobeAnalyticsServiceSpy = new AdobeAnalyticsServiceMock().adobeAnalyticsServiceSpy;

    await TestBed.configureTestingModule({
      declarations: [AnchorTagComponent],
      imports: [RouterTestingModule],
      providers: [
        {
          provide: AdobeAnalyticsService,
          useValue: adobeAnalyticsServiceSpy,
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AnchorTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
