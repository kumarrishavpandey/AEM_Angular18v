import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonFileUploaderComponent } from './common-file-uploader.component';
import { fileUploaderModule } from './common-file-uploader.component.constant';

describe('CommonFileUploaderComponent', () => {
  let component: CommonFileUploaderComponent;
  let fixture: ComponentFixture<CommonFileUploaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommonFileUploaderComponent],
      imports: [
        MatDialogModule,
        MatIconModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CommonFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit selectedDocument event on calling callFileUploadApi', () => {
    spyOn(component.selectedDocument, 'emit');
    component.files.push(fileUploaderModule.selectedDocumentValues);

    component.callFileUploadApi();

    expect(component.selectedDocument.emit).toHaveBeenCalledWith(
      component.files[0],
    );
  });

  it('should add files to the files array on onFileSelected if file type and size are valid', () => {
    const file = new File(['file content'], 'test.txt', {
      type: 'application/pdf',
    });
    const event = { target: { files: [file] } } as any;

    component.onFileSelected(event);

    expect(component.files.length).toBe(fileUploaderModule.fileLength);
    expect(component.files[0].name).toBe(fileUploaderModule.filename);
    expect(component.files[0].progress).toBe(fileUploaderModule.fileProgress);
  });

  it('should emit sizeOrTypeError event with true if file type or size is invalid on onFileSelected', () => {
    const sizeOrTypeErrorSpy = spyOn(component.sizeOrTypeError, 'emit');
    const file = new File(['file content'], 'test.txt', { type: 'text/plain' });
    const event = { target: { files: [file] } } as any;

    component.onFileSelected(event);

    expect(component.files.length).toBe(fileUploaderModule.fileProgress);
    expect(sizeOrTypeErrorSpy).toHaveBeenCalledWith(fileUploaderModule.fileLoaded);
  });

  it('should delete a file from the files array on deleteFile', () => {
    component.files = [fileUploaderModule.selectedDocumentValues];

    component.deleteFile(fileUploaderModule.fileProgress);

    expect(component.files.length).toBe(fileUploaderModule.fileProgress);
  });

  it('should reset progress when all files are uploaded', fakeAsync(() => {
    component.files = [fileUploaderModule.fileUploadedProgress];

    component.uploadFilesSimulator(fileUploaderModule.fileProgress);
    tick(2000); // Simulate time passing

    expect(component.files[0].progress).toBe(fileUploaderModule.fileProgressHundred);
    expect(component.files.length).toBe(fileUploaderModule.fileLength);

    component.uploadFilesSimulator(fileUploaderModule.fileLength);
    tick(2000); // Simulate time passing

    expect(component.files.length).toBe(fileUploaderModule.fileLength);
  }));

  it('should format bytes correctly', () => {
    const { bytes } = fileUploaderModule;
    const { decimals } = fileUploaderModule;

    const formattedBytes = component.formatBytes(bytes, decimals);

    expect(formattedBytes).toBe(fileUploaderModule.fileSize);
  });
});
