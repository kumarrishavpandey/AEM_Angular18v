import { Component, Input, OnInit } from '@angular/core';
import { GET_ROSTER_INFO, LOGGEDIN_EMP } from '../../../../../app/app.api';
import { CommonService } from '../../../shared/services/common.service';
import { RosterService } from '../../../shared/services/roster-http.service';
import { StorageEncryptionService } from '../../../shared/services/storage-encryption.service';
import { environment } from '../../../../../environments/environment';
import {
  calcDuration,
  dateFormat,
  getAemDamFullPath,
  isWithin48Hrs,
  timeFormat,
} from '../../../../../utils/utils';
import { DebugService } from '../../services/debug.service';
import timezone from './timezone';

@Component({
  selector: 'app-roster-section',
  templateUrl: './roster-section.component.html',
  styleUrls: ['./roster-section.component.scss'],
})
export class RosterSectionComponent implements OnInit {
  flightInfo: any;

  recentFl: any[] = [];

  recentCard: any;

  airports: any;

  recentCards: any[] = [];

  @Input() numberOfCards: number;

  isShowMore: boolean;

  airportBgImgs = [];

  // To do: to be taken from AEM response
  aemResponse = {
    noData: 'No scheduled Activity',
    viewMore: 'View More',
    viewLess: 'View Less',
    errorTxt: 'Data not available. Please try again later.',
    noDataTitle: 'No flight',
    noDataDesc: 'You dont have any scheduled flight for today and tomorrow.',
  };

  isApiErr: boolean = false;

  employeeId: any;

  dataNotComingImagePath: any;

  isLoading = true;

  isDataLoaded = false;

  constructor(
    private rosterService: RosterService,
    private storageEncryptionService: StorageEncryptionService,
    private commonService: CommonService,
    private debugService: DebugService
  ) {}

  ngOnInit(): void {
    this.numberOfCards = this.numberOfCards ? Number(this.numberOfCards) : 1;
    this.commonService.getEmpDataStatus().subscribe((loaded: boolean) => {
      if (loaded) {
        this.dataNotComingImagePath = getAemDamFullPath(
          '/content/dam/my-ai/home-page/icon/data-not-coming.svg'
        );
        this.commonService.fetchPersonaInfo().subscribe((userPersona) => {
          if (this.commonService.checkIfVistaraLocale()) {
            this.aemResponse.noDataTitle = '';
            this.aemResponse.noDataDesc =
              'Stay up to date with your flight schedule here.';
            this.isLoading = false;
            this.isDataLoaded = true;
          } else if (userPersona !== 'General') {
            this.employeeId =
              this.storageEncryptionService.getvalue(LOGGEDIN_EMP);
            this.rosterService
              .getRosterData(GET_ROSTER_INFO, this.employeeId)
              .subscribe(
                (resp) => {
                  this.parseRosterResp(resp);
                  this.isLoading = false;
                  this.isDataLoaded = true;
                },
                (err) => {
                  this.isApiErr = true;
                  this.isDataLoaded = true;
                  this.debugService.log(err);
                }
              );
          }
        });
      }
    });
  }

  /* eslint array-callback-return: "off" */
  parseRosterResp(resp) {
    /* eslint consistent-return: off */
    this.recentFl = resp?.roster.filter((item: any) => {
      if (
        new Date(item.sourceTime).getTime() >= new Date().getTime() &&
        isWithin48Hrs(new Date(item.sourceTime), new Date())
      ) {
        return item;
      }
    });
    if (this.recentFl) {
      this.recentFl.sort(
        (a: any, b: any) =>
          new Date(a.sourceTime).valueOf() - new Date(b.sourceTime).valueOf()
      );
      this.prepareRosterData();
    } else {
      this.recentFl = [];
    }
  }

  prepareRosterData() {
    this.recentCards = [];
    this.recentFl.forEach((flight: any) => {
      this.recentCards.push({
        depDate: dateFormat(flight.sourceTime, flight.source, timezone),
        depTime: timeFormat(flight.sourceTime, flight.source, timezone),
        arrDate: dateFormat(
          flight.destinationTime,
          flight.destination,
          timezone
        ),
        arrTime: timeFormat(
          flight.destinationTime,
          flight.destination,
          timezone
        ),
        src: flight.source,
        destination: flight.destination,
        duration: calcDuration(flight.destinationTime, flight.sourceTime),
        day: new Date(flight.sourceTime).toLocaleDateString('en', {
          weekday: 'long',
        }),
        flightNumber: this.formatFlightNumber(flight.flightNumber),
        srcCity: flight.sourceCity,
        destCity: flight.destinationCity,
        srcCountry: flight.sourceCountry,
        destCountry: flight.destinationCountry,
        bgImg: `${environment.DYNAMIC_MEDIA}airport-roster-${flight.destination}${environment.ROSTER_BG_DYNAMIC_MEDIA_PARAMETER}`,
      });
    });
    // save the upcoming flight information (without immediate next flight)
    this.rosterService.setUpcomingRosterInfo(this.recentCards.slice(1));
  }

  showAllCards(numOfCards: number) {
    this.isShowMore = !this.isShowMore;
    this.numberOfCards = numOfCards;
    this.prepareRosterData();
  }

  formatFlightNumber(text) {
    const flno = `${text.substr(0, 2)} ${text.substr(2)}`;
    return flno;
  }
}
