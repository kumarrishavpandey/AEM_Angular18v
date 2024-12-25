import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonDropdownComponent } from './common-dropdown.component';

describe('CommonDropdownComponent', () => {
  let component: CommonDropdownComponent;
  let fixture: ComponentFixture<CommonDropdownComponent>;
  let formBuilder: FormBuilder;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonDropdownComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
    });

    fixture = TestBed.createComponent(CommonDropdownComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.customFormGroup = formBuilder.group({
      selectInput: [''], // Example form control, adjust as needed
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit value when isUserInput is true', fakeAsync(() => {
    spyOn(component.selectValueChanged, 'emit');
    const value = {};
    const event = { isUserInput: true };

    component.onSelectValueChange(value, event);
    tick(); // Simulate the passage of time for the setTimeout

    expect(component.selectValueChanged.emit).toHaveBeenCalledWith(value);
  }));

  it('should not emit value when isUserInput is false', () => {
    spyOn(component.selectValueChanged, 'emit');
    const value = {};
    const event = { isUserInput: false };

    component.onSelectValueChange(value, event);

    expect(component.selectValueChanged.emit).not.toHaveBeenCalled();
  });
});
