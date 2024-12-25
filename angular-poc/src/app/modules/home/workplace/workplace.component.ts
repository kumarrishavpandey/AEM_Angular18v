import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { marked } from 'marked';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { LOGGEDIN_EMP_FUCTION, WORKPLACE_CONFIG } from '../../../app.api';
import { workplaceData } from '../home.constant';
import { AnalyticsComponent } from '../../shared/constants';
import { CommonService } from '../../shared/services/common.service';
import { DebugService } from '../../shared/services/debug.service';
import { getAemDamFullPath } from '../../../../utils/utils';
import { StorageEncryptionService } from '../../shared/services/storage-encryption.service';
import { HomeService } from '../home.service';
import { SlideInterface, WorkplaceResponse } from './workplace';

declare let bootstrap: any;

@Component({
  selector: 'app-workplace',
  templateUrl: './workplace.component.html',
  styleUrls: ['./workplace.component.scss'],
})
export class WorkplaceComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input()
  siteSection: string;

  @Input()
  heading: string;

  @Input()
  subheading: string;

  @Input()
  workPlaceLabels: any;

  isDataLoaded: boolean = false;

  isError: boolean = false;

  workplaceDateFormat: string;

  private readonly _destroying$ = new Subject<void>();

  initialized: boolean = false;

  constructor(
    private workplaceservice: HomeService,
    private storageEncryptionService: StorageEncryptionService,
    private commonService: CommonService,
    private datePipe: DatePipe,
    // private analyticsService: AdobeAnalyticsService,
    private debugService: DebugService
  ) {}

  workplacetestdata: WorkplaceResponse[] = [];

  workplaceApiData: any = {};

  slides: SlideInterface[] = [];

  HOME_CONSTANT = workplaceData;

  qureyParam = 'crew';

  limit = '1';

  functionId = '';

  groupIds = [];

  workplaceFuncGrpMapping = [];

  errorTxt = 'Data not available. Please try again later.';

  ngOnInit() {
    this.commonService
      .getDateFormat()
      .pipe(distinctUntilChanged(), takeUntil(this._destroying$))
      .subscribe((data) => {
        this.workplaceDateFormat = data?.workplace;
      });
    this.commonService
      .getEmpDataStatus()
      .pipe(distinctUntilChanged(), takeUntil(this._destroying$))
      .subscribe((loaded: boolean) => {
        if (loaded && !this.initialized) {
          this.initialized = true;
          this.functionId =
            this.storageEncryptionService.getvalue(LOGGEDIN_EMP_FUCTION);
          this.workplaceservice.getWorkplaceConfig(WORKPLACE_CONFIG).subscribe(
            (mapping: any[]) => {
              this.workplaceFuncGrpMapping = mapping;
              this.fetchGroups('common');

              if (!this.commonService.checkIfVistaraLocale()) {
                this.fetchGroups(this.functionId);
              }
              this.getWorkplaceData();
            },
            (error) => {
              // Handle errors here
              this.workplaceApiData = {};
              this.isError = true;
              this.isDataLoaded = true;
              this.debugService.error('Error fetching workplace data:', error);
            }
          );
        }
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      /* eslint-disable no-new */
      new bootstrap.Carousel(
        document.getElementById('workplace-carouselExample'),
        {
          interval: 5000,
        }
      );
    }, 1000);
  }

  ngOnDestroy(): void {
    this._destroying$.next();
    this._destroying$.complete();
  }

  getWorkplaceData() {
    let limit = 1;

    this.groupIds.forEach((item, index) => {
      limit = index === this.groupIds.length - 1 ? 2 : 1;
      this.workplaceservice
        .getWorkplace(item?.groupId, limit)
        .pipe(takeUntil(this._destroying$))
        .subscribe(
          (data) => {
            // Handle successful response data here
            if (data.data !== null) {
              this.workplaceApiData = data.data;
              this.workplaceApiData.forEach((resp) => {
                const workplaceObj = {
                  url: resp.attachments?.data[0].media
                    ? resp.attachments.data[0].media.image.src
                    : getAemDamFullPath(workplaceData.defaultImagePath),
                  imageWidth: resp.attachments?.data[0].media
                    ? resp.attachments.data[0].media.image.width
                    : 1,
                  imageHeight: resp.attachments?.data[0].media
                    ? resp.attachments.data[0].media.image.height
                    : 1,
                  title: resp.message
                    ? this.formatDescription(
                        marked.parseInline(this.removeFirstHash(resp.message))
                      ).description
                    : '',
                  name: resp.from.name,
                  description: ' ',
                  buttonLink: resp.permalink_url,
                  isShowMoreEnabled: this.formatDescription(resp.message)
                    .isSeeMoreEnabled,
                  buttonText: this.workPlaceLabels?.seeMoreTextBTn,
                  likecount: resp.like_count.summary.total_count,
                  commentcount: resp.comments.summary.total_count,
                  diffTime: resp.diff_time,
                  profilePic: resp.from.picture.data.url,
                  time: this.formatLastTime(resp.created_time),
                  groupName: item.groupName,
                  order: item.order,
                };

                this.slides.push(workplaceObj);
              });
              this.orderSkides();
              this.isDataLoaded = true;
            } else {
              this.isDataLoaded = true;
              this.workplaceApiData = {};
            }
          },
          (error) => {
            // Handle errors here
            this.workplaceApiData = {};
            this.isError = true;
            this.isDataLoaded = true;
            this.debugService.error('Error fetching workplace data:', error);
          }
        );
    });
  }

  fetchGroups(funcName) {
    const group = this.workplaceFuncGrpMapping.filter(
      (item) => item.functionId === funcName
    );
    if (group.length > 0) {
      this.groupIds.push(...group);
    }
  }

  formatDescription(desc) {
    let text = desc;
    let isEnabled = false;
    if (desc && desc.startsWith('#')) {
      text = desc.slice(1);
    }
    if (text && text.length > workplaceData.charLimit) {
      text = text.slice(0, workplaceData.charLimit);
      isEnabled = true;
    }
    return { description: text, isSeeMoreEnabled: isEnabled };
  }

  removeFirstHash(desc) {
    let text = desc;
    if (desc && desc.startsWith('#')) {
      text = desc.slice(1);
    }
    const txtArr = text.split('**');
    txtArr.forEach((item, i) => {
      if (i % 2 !== 0) {
        if (item.startsWith(' ')) {
          txtArr[i - 1] = `${txtArr[i - 1]} `;
        }
        if (item.endsWith(' ')) {
          txtArr[i + 1] = ` ${txtArr[i + 1]}`;
        }
        txtArr[i] = txtArr[i].trim();
      }
    });
    text = txtArr.join('**');
    return text;
  }

  formatLastTime(date) {
    return this.formatDateTime(date, this.workplaceDateFormat);
  }

  formatDateTime(dateString: string, format: string) {
    const dateFormat = format?.split(' at ')[0];
    const timeFormat = format?.split(' at ')[1]?.trim();

    const formattedDate = this.datePipe.transform(dateString, dateFormat);
    const formattedTime = this.datePipe.transform(dateString, timeFormat);
    return `${formattedDate} at ${formattedTime}`;
  }

  orderSkides() {
    this.slides.sort((a, b) => a.order - b.order);
  }

  // marked(componentName: string, clickName: string, linkURL: string) {
  //   this.analyticsService.trackClickEvent({
  //     siteSection: this.siteSection,
  //     siteSubSection: this.workPlaceLabels.title,
  //     clickName,
  //     clickComponentType: AnalyticsComponent.LINK,
  //     componentName,
  //     linkURL,
  //   });
  // }
}
