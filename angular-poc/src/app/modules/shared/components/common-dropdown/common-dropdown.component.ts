import {
  Component, EventEmitter, Input, Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DropdownOptions } from './common-dropdown.model';

interface Options {
  value: string;
  label: string;
}

@Component({
  selector: 'app-common-dropdown',
  templateUrl: './common-dropdown.component.html',
  styleUrls: ['./common-dropdown.component.scss'],
})
export class CommonDropdownComponent {
  @Output() selectValueChanged = new EventEmitter<any>();

  @Input() customFormGroup!: FormGroup;

  @Input() selectInputOptions: Options[] = [];

  @Input() selectInputName = '';

  @Input() customFormControlName!: string;

  @Input() dropdownDisabled = false;

  getMatOptionValue(item: DropdownOptions | string) {
    return typeof item === 'string' ? item : item.value;
  }

  getMatOptionLabel(item: DropdownOptions | string) {
    return typeof item === 'string' ? item : item.label;
  }

  onSelectValueChange(value: {}, event: { isUserInput: boolean }) {
    if (event.isUserInput) {
      setTimeout(() => {
        this.selectValueChanged.emit(value);
      });
    }
  }
}
