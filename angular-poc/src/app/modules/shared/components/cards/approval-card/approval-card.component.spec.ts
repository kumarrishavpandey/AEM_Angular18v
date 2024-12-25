import { ComponentFixture, TestBed } from '@angular/core/testing';
import { labelsApprovalCard } from 'src/app/modules/approvals/__mocks__/approvals-sling.data';
import { ApprovalCardComponent } from './approval-card.component';
import { IDataApprovalCard } from './approval-card.model';

describe('ApprovalCardComponent', () => {
  let component: ApprovalCardComponent;
  let fixture: ComponentFixture<ApprovalCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ApprovalCardComponent],
    }).compileComponents();
  });

  const mockData = {
    employee: {
      id: '12345',
      firstName: 'John',
      middleName: 'A.',
      lastName: 'Doe',
      email: 'john.doe@example.com',
    },
    pendingFor: 'Manager Approval',
    queryParamsGoTo: {
      param1: 'value1',
      param2: true,
      param3: 'value3',
    },
    requestId: 'REQ-67890',
    status: 'Pending',
    submittedOn: new Date('2024-10-08T14:46:43Z'), // Convert string to Date
    lastModifiedDateTime: new Date('2023-10-02T12:00:00Z'),
    tagData: 'Urgent',
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovalCardComponent);
    component = fixture.componentInstance;

    component.index = 1;
    component.cardData = mockData;
    component.labelsApprovalCard = labelsApprovalCard;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set className based on index', () => {
    component.ngOnInit();
    expect(component.className).toBe('card-two');
  });

  it('should format CTC correctly', () => {
    const formattedCTC = component.formatCTC(500000);
    expect(formattedCTC).toBe('5.00LPA');
  });

  it('should emit handleCancelClick event', () => {
    spyOn(component.handleCancelClick, 'emit');
    const cardData: IDataApprovalCard = mockData;
    component.handleCancelClick.emit(cardData);
    expect(component.handleCancelClick.emit).toHaveBeenCalledWith(cardData);
  });

  it('should emit handleSubmitClick event', () => {
    spyOn(component.handleSubmitClick, 'emit');
    const cardData: IDataApprovalCard = mockData;
    component.handleSubmitClick.emit(cardData);
    expect(component.handleSubmitClick.emit).toHaveBeenCalledWith(cardData);
  });
});
