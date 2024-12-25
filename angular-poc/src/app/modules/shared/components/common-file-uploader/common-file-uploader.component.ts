import {
  Component, EventEmitter, Input, OnChanges, Output,
} from '@angular/core';
import { checkDevice } from '../../../../../utils/utils';


@Component({
  selector: 'app-common-file-uploader',
  templateUrl: './common-file-uploader.component.html',
  styleUrls: ['./common-file-uploader.component.scss'],
})
export class CommonFileUploaderComponent implements OnChanges {
  @Output() selectedDocument = new EventEmitter<any>();

  @Output() sizeOrTypeError = new EventEmitter<any>();

  @Output() doubleFileExtensionError = new EventEmitter<any>();

  @Input() errorFileUploadingMultipleTimes: boolean;

  @Input() isAttachmentFileUploaded: boolean;

  @Input() isMultiple: boolean = false;

  files: any[] = [];

  progress = 0;

  maxFileSizeAllowed = 5 * 1024 * 1000;

  checkDevice = checkDevice();

  @Input() uploadDocumentLabels: any;

  ngOnChanges(changes: any) {
    this.errorFileUploadingMultipleTimes = changes.errorFileUploadingMultipleTimes.currentValue;
  }

  /**
   * on file drop handler
   */
  onFileDropped($event: any) {
    this.prepareFilesList($event);
  }

  /**
   * handle file from browsing
   */
  onFileSelected(event: any) {
    /* Reset the error once file changed  */
    this.sizeOrTypeError.emit(false);
    this.doubleFileExtensionError.emit(false);

    const { files } = event.target;
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    // const ext = files[0].name.match(/\.(.+)$/)[1];
    const multipleExtentionRegEx = /\.([a-z0-9]+)\.(?:[a-z0-9]+)$/i;

    if (multipleExtentionRegEx.test(files[0].name)) {
      this.doubleFileExtensionError.emit(true);
      if (event.target instanceof HTMLInputElement) {
        // eslint-disable-next-line no-param-reassign
        event.target.value = ''; // Reset the value
      }
    } else if (
      allowedTypes.includes(files[0].type)
      && files[0].size <= this.maxFileSizeAllowed
    ) {
      if (event.target.files.length > 0) {
        this.prepareFilesList(files);
      }
    } else {
      this.sizeOrTypeError.emit(true);
      if (event.target instanceof HTMLInputElement) {
        // eslint-disable-next-line no-param-reassign
        event.target.value = ''; // Reset the value
      }
    }
  }
  // fileBrowseHandler(files: any) {
  //   this.prepareFilesList(files);
  // }

  /**
   * Delete file from files list
   * @param index (File index)
   */
  deleteFile(index: number) {
    this.files.splice(index, 1);
  }

  /**
   * Simulate the upload process
   */
  uploadFilesSimulator(index: number) {
    setTimeout(() => {
      if (index === this.files.length) {
        // eslint-disable-next-line no-empty
      } else {
        const progressInterval = setInterval(() => {
          if (this.isAttachmentFileUploaded === true) {
            this.files[index].progress = 100;
          }
          if (this.files[index].progress === 100) {
            clearInterval(progressInterval);
            this.uploadFilesSimulator(index + 1);
          } else {
            this.files[index].progress += 5;
          }
        }, 1000);
      }
    }, 1000);
  }

  // File Upload API
  callFileUploadApi() {
    const inputFile = this.files[0];
    const formData = new FormData();
    formData.append('files', inputFile);
    this.selectedDocument.emit(inputFile);
  }

  /**
   * Convert Files list to normal array list
   * @param files (Files List)
   */
  prepareFilesList(files: Array<any>) {
    for (const item of files) {
      item.progress = 0;
      this.files.push(item);
    }
    this.callFileUploadApi();

    this.uploadFilesSimulator(0);
  }

  /**
   * format bytes
   * @param bytes (File size in bytes)
   * @param decimals (Decimals point)
   */
  formatBytes(bytes: any, decimals: any) {
    if (bytes === 0) {
      return '0 Bytes';
    }
    const k = 1024;
    const dm = decimals <= 0 ? 0 : decimals || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
  }
}
