import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog, MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { of } from 'rxjs';
import { BaseManagerService } from 'src/app/modules/base-manager/base-manager.service';
import { CommonSuccessDialogWithoutButtonsComponent } from 'src/app/shared/components/common-success-dialog-without-buttons/common-success-dialog-without-buttons.component';
import { AdobeAnalyticsService } from 'src/app/shared/services/adobe-analytics.service';
import { DebugService } from 'src/app/shared/services/debug.service';
import { DebugServiceMock } from 'src/app/shared/services/debug.service.mock';
import { declineRequestComment, declineRequestData, mockData } from './constants';
import { DeclineRequestDialogComponent } from './decline-request-dialog.component';

describe('DeclineRequestDialogComponent', () => {
  let component: DeclineRequestDialogComponent;
  let fixture: ComponentFixture<DeclineRequestDialogComponent>;
  let mockDialogRef: jasmine.SpyObj<MatDialogRef<DeclineRequestDialogComponent>>;
  let mockBaseManagerService: jasmine.SpyObj<BaseManagerService>;
  let mockAnalyticsService: jasmine.SpyObj<AdobeAnalyticsService>;
  let mockDialog: jasmine.SpyObj<MatDialog>;
  let debugServiceSpy: jasmine.SpyObj<DebugService>;

  beforeEach(async () => {
    mockDialogRef = jasmine.createSpyObj('MatDialogRef', ['close']);
    mockBaseManagerService = jasmine.createSpyObj('BaseManagerService', ['submitDeclineRequest']);
    mockAnalyticsService = jasmine.createSpyObj('AdobeAnalyticsService', ['trackClickEvent', 'formStartDatalayer', 'formCompleteDatalayer']);
    mockDialog = jasmine.createSpyObj('MatDialog', ['open']);
    debugServiceSpy = new DebugServiceMock().debugServiceSpy;

    TestBed.configureTestingModule({
      declarations: [DeclineRequestDialogComponent, CommonSuccessDialogWithoutButtonsComponent],
      imports: [
        MatDialogModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
        { provide: BaseManagerService, useValue: mockBaseManagerService },
        { provide: AdobeAnalyticsService, useValue: mockAnalyticsService },
        { provide: MatDialog, useValue: mockDialog },
        {
          provide: DebugService,
          useValue: debugServiceSpy,
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclineRequestDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form and set max length on ngOnInit', () => {
    expect(component.rejectForm).toBeDefined();
    expect(component.rejectForm.get('comment')).toBeDefined();
    expect(component.commentMaxLength).toEqual(200);
  });

  it('should call submitDeclineRequest and close dialog on valid form submission', () => {
    mockBaseManagerService.submitDeclineRequest.and.returnValue(of({ status: { code: 200 } }));
    component.rejectForm.get('comment').setValue('Some comment');
    component.onSubmit();
    expect(mockBaseManagerService.submitDeclineRequest).toHaveBeenCalledWith(declineRequestComment);
    expect(mockDialogRef.close).toHaveBeenCalledWith({ event: 'refresh' });
    expect(mockDialog.open).toHaveBeenCalledWith(CommonSuccessDialogWithoutButtonsComponent, {
      autoFocus: false,
      data: { iconPath: jasmine.any(String), ...declineRequestData },
    });
  });

  it('should not submit if the form is invalid', () => {
    component.onSubmit();
    expect(mockBaseManagerService.submitDeclineRequest).not.toHaveBeenCalled();
  });

  it('should handle keydown event and prevent invalid keys', () => {
    const event = new KeyboardEvent('keydown', { key: '!' });
    spyOn(event, 'preventDefault');
    component.onKeydown(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should allow valid keys on keydown', () => {
    const event = new KeyboardEvent('keydown', { key: 'a' });
    spyOn(event, 'preventDefault');
    component.onKeydown(event);
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should handle paste event and filter invalid characters', () => {
    const mockClipboardData = {
      getData: jasmine.createSpy('getData').and.returnValue('Valid text!'),
    };
    const event = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(event, 'clipboardData', { value: mockClipboardData });
    spyOn(event, 'preventDefault');
    const target = document.createElement('textarea');
    target.value = 'Initial text';
    Object.defineProperty(event, 'target', { value: target });
    component.onPaste(event);
    expect(event.preventDefault).toHaveBeenCalled();
    expect(target.value).toContain('Valid text');
  });

  it('should only allow valid characters on paste', () => {
    const validInput = 'Valid text, with - special_@ characters!';
    const invalidInput = 'Invalid text!@#';

    // Create mock clipboard data with valid and invalid characters
    const mockClipboardData = {
      getData: jasmine.createSpy('getData').and.returnValue(validInput + invalidInput),
    };

    const event = new ClipboardEvent('paste', {
      bubbles: true,
      cancelable: true,
    });

    Object.defineProperty(event, 'clipboardData', { value: mockClipboardData });
    spyOn(event, 'preventDefault');

    const target = document.createElement('textarea');
    target.value = 'Initial text';
    Object.defineProperty(event, 'target', { value: target });

    component.onPaste(event);

    expect(event.preventDefault).toHaveBeenCalled();
  });
});
