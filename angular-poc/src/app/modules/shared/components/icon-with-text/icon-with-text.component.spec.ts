import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { IconWithTextComponent } from './icon-with-text.component';

describe('IconWithTextComponent', () => {
  let component: IconWithTextComponent;
  let fixture: ComponentFixture<IconWithTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IconWithTextComponent],
      imports: [MatIconModule],
    });
    fixture = TestBed.createComponent(IconWithTextComponent);
    component = fixture.componentInstance;
    component.tool = { iconBgColor: 'blue' };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit click event when onClick is called', () => {
    spyOn(component.clickLink, 'emit'); // Spy on the emit function of clickLink EventEmitter

    component.onClick(); // Call the onClick method

    // Expect that emit function was called once
    expect(component.clickLink.emit).toHaveBeenCalled();
  });
});
