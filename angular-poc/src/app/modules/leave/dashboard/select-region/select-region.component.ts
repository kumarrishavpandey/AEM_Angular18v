import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { DomSanitizer } from '@angular/platform-browser';
import CountryList from 'country-list-with-dial-code-and-flag';
import CountryFlagSvg from 'country-list-with-dial-code-and-flag/dist/flag-svg';

@Component({
  selector: 'app-select-region',
  templateUrl: './select-region.component.html',
  styleUrls: ['./select-region.component.scss'],
})
export class SelectRegionComponent implements OnInit {
  @Output() updateSelectedRegionInDashboard: EventEmitter<void> =
  new EventEmitter<void>();

  @Output() selectRegionClick: EventEmitter<void> = new EventEmitter<void>();

  @Input() selectedCalendarName: string;

  @Input() selectedCountryName: string;

  @Input() selectedCalendarCode: string;

  @Input() holidayCalendarsList;

  @Input() selectedElementName: string;

  @ViewChild('ddTrigger') ddTrigger: MatMenuTrigger;

  holidayCalendars;

  expandedStates: boolean[] = [];

  countryCodeList: any = CountryList.getAll();

  @Input() dashboardLabels: any;

  constructor(public _sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.holidayCalendars = this.holidayCalendarsList;

    this.holidayCalendars?.forEach((element) => {
      element?.calendarList?.forEach((data) => {
        if (data.calendarCode === this.selectedElementName) {
          this.selectedElementName = `${data.calendarName}, ${element.label}`;
        }
      });
    });

    this.expandedStates = new Array(this.holidayCalendars.length).fill(false);
  }

  /* eslint-disable no-param-reassign */
  onMenuItemClick(el: any) {
    if (el?.size === 0) {
      if (el?.subItem === '') {
        el.subItem = el.subItemCode;
      }
      this.selectedElementName = el?.subItem
        ? `${el?.subItem}, ${el?.item}`
        : `${el?.item}`;
      this.selectedCalendarCode = el?.subItemCode
        ? `${el?.subItemCode}`
        : `${el?.code}`;

      this.updateSelectedRegionInDashboard.emit(el);
      this.ddTrigger.closeMenu();
    }
  }

  toggleClass(code: string, allData: any) {
    allData.forEach((element) => {
      if (element?.countryCode === code) {
        const mainMenu = document.getElementById(`main-menu-${code}`);
        const subMenu = document.getElementById(`sub-menu-${code}`);

        if (subMenu?.classList?.contains('expanded')) {
          subMenu?.classList?.remove('expanded');
          mainMenu?.classList?.remove('expanded');
        } else {
          subMenu?.classList?.add('expanded');
          mainMenu?.classList?.add('expanded');
        }
      } else {
        const mainMenu = document.getElementById(
          `main-menu-${element?.countryCode}`,
        );
        const subMenu = document.getElementById(
          `sub-menu-${element?.countryCode}`,
        );
        mainMenu?.classList?.remove('expanded');
        subMenu?.classList?.remove('expanded');
      }
    });
  }

  onMenuClosed() {
    const mainMenu = document.querySelectorAll('.exapnd-collaps-icon');
    const subMenu = document.querySelectorAll('.sub-region-list');
    mainMenu.forEach((element) => {
      element.classList.remove('expanded');
    });
    subMenu.forEach((element) => {
      element.classList.remove('expanded');
    });
  }

  // show country flag
  /* eslint consistent-return: "off" */
  getSVGbyISD(isd) {
    if (isd !== '' && isd !== null) {
      const myanmar = CountryList?.findOneByCountryCode(isd);

      const flagSvg = CountryFlagSvg[myanmar?.code];
      const base64string = btoa(flagSvg);
      const img = this._sanitizer.bypassSecurityTrustResourceUrl(
        `data:image/svg+xml;base64,${base64string}`,
      );
      return img; // This will return svg string
    }
    return null;
  }

  sortMenuItem(sortArray: any, columnName: string) {
    if (sortArray && sortArray?.length > 0) {
      return sortArray.sort((a, b) => a[columnName]?.localeCompare(b[columnName]));
    }
    return null;
  }

  onSelectRegionButtonClick() {
    this.selectRegionClick.emit();
  }
}
