import {
  ComponentFixture, TestBed, fakeAsync, tick,
} from '@angular/core/testing';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonSuccessDialogWithoutButtonsComponent } from './common-success-dialog-without-buttons.component';

describe('CommonSuccessDialogWithoutButtonsComponent', () => {
  let component: CommonSuccessDialogWithoutButtonsComponent;
  let fixture: ComponentFixture<CommonSuccessDialogWithoutButtonsComponent>;
  let matDialogRefMock: jasmine.SpyObj<
  MatDialogRef<CommonSuccessDialogWithoutButtonsComponent>
  >;
  let matDialogMock: jasmine.SpyObj<MatDialog>;
  const mockData = {
    iconPath: 'mock-icon',
    title: 'Mock Title',
    message: 'Mock Message',
    iconColor: 'mock-color',
  };

  beforeEach(async () => {
    matDialogRefMock = jasmine.createSpyObj('MatDialogRef', ['close']);
    matDialogMock = jasmine.createSpyObj('MatDialog', ['closeAll']);

    await TestBed.configureTestingModule({
      declarations: [CommonSuccessDialogWithoutButtonsComponent],
      imports: [
        MatDialogModule,
        MatIconModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRefMock },
        { provide: MatDialog, useValue: matDialogMock },
        { provide: MAT_DIALOG_DATA, useValue: mockData },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(
      CommonSuccessDialogWithoutButtonsComponent,
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set updatedIconPath from injected data', () => {
    expect(component.updatedIconPath).toBe(mockData.iconPath);
  });

  it('should close the dialog after 5 seconds', fakeAsync(() => {
    // Act
    component.ngOnInit(); // Trigger ngOnInit
    tick(5000); // Simulate the passage of 5 seconds

    // Assert
    expect(matDialogMock.closeAll).toHaveBeenCalled();
  }));

  it('should initialize the constructor correctly', () => {
    expect(component.dialog).toBeDefined();
    expect(component.dialogRef).toBeDefined();
    expect(component.data).toEqual(mockData);
  });
  it('should call ngOnInit and set updatedIconPath', () => {
    spyOn(component, 'ngOnInit').and.callThrough(); // Spy on ngOnInit

    component.ngOnInit();

    expect(component.ngOnInit).toHaveBeenCalled();
    expect(component.updatedIconPath).toBe(mockData.iconPath);
  });
});
