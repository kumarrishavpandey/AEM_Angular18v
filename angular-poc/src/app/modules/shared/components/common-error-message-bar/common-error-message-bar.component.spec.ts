import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { CommonErrorMessageBarComponent } from './common-error-message-bar.component';

describe('CommonErrorMessageBarComponent', () => {
  let component: CommonErrorMessageBarComponent;
  let fixture: ComponentFixture<CommonErrorMessageBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CommonErrorMessageBarComponent],
      imports: [MatIconModule],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonErrorMessageBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an empty errorMessagesList by default', () => {
    expect(component.errorMessagesList).toEqual([]);
  });

  it('should have an empty errorMessage by default', () => {
    expect(component.errorMessage).toBe('');
  });

  it('should update errorMessagesList when input changes', () => {
    component.errorMessagesList = ['Error 1', 'Error 2'];
    fixture.detectChanges();
    expect(component.errorMessagesList).toEqual(['Error 1', 'Error 2']);
  });

  it('should update errorMessage when input changes', () => {
    component.errorMessage = 'Error message';
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Error message');
  });
});
