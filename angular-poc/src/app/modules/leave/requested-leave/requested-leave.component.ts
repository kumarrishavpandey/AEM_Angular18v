import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LeaveRequestComponent } from '../leave-constant';
import { LeaveData } from '../leave.interface';
import { RequestedLeaveService } from '../services/requested-leave.service';
import { ViewEditLeaveDialogComponent } from './view-edit-leave-dialog/view-edit-leave-dialog.component';
import { StorageEncryptionService } from '../../shared/services/storage-encryption.service';
import { CommonService } from '../../shared/services/common.service';
import { AdobeAnalyticsService } from '../../shared/services/adobe-analytics.service';
import { DebugService } from '../../shared/services/debug.service';
import { LOGGEDIN_EMP } from '../../../app.api';
import { AnalyticsComponent } from '../../shared/constants';

@Component({
  selector: 'app-requested-leave',
  templateUrl: './requested-leave.component.html',
  styleUrls: ['./requested-leave.component.scss'],
})
export class RequestedLeaveComponent implements OnInit, AfterViewInit {
  @Input()
  siteSection: string;

  @Input() requestedLeaveLabels: any;

  @Input() newRequestLabels: any;

  @Input() dialogViewEditLabels: any;

  @Input() dialogDeleteLeaveLabels: any;

  @Input() uploadDocumentLabels: any;

  // Constant
  constantData: any = LeaveRequestComponent;

  // Selected filter
  selectedLeave = this.constantData?.column?.pendingFilter;

  // Table Columns
  leaveColumns: string[];

  // All leave data
  leaveData: LeaveData[];

  // Seprate leave data.
  pendingData: LeaveData[];

  pendingCancellationData: LeaveData[];

  approvedData: LeaveData[];

  rejectedData: LeaveData[];

  // Table data
  dataSource: MatTableDataSource<LeaveData>;

  @ViewChild(MatSort) sort: MatSort;

  requestedLeaveDateFormat: string;

  isDataLoaded: boolean = false;

  constructor(
    public dialog: MatDialog,
    private requestedLeaveService: RequestedLeaveService,
    private storageEncryptionService: StorageEncryptionService,
    private commonService: CommonService,
    private analyticsService: AdobeAnalyticsService,
    private cdr: ChangeDetectorRef,
    private debugService: DebugService,
  ) {}

  ngOnInit() {
    // Response data.
    this.commonService.getDateFormat().subscribe((data) => {
      this.requestedLeaveDateFormat = data?.leaves;
    });
  }

  ngAfterViewInit(): void {
    // this.route.queryParams.subscribe((params) => {
    //   if (params.subTab) {
    //     const tabIndex = parseInt(params.subTab, 10);
    //     if (!Number.isNaN(tabIndex) && tabIndex >= 0) {
    //       if (tabIndex === 1) {
    //         this.onHeaderButtonsClick(
    //           this.leaveData,
    //           this.constantData?.column?.approvedFilter,
    //           this.requestedLeaveLabels?.btnApproved,
    //         );
    //       } else if (tabIndex === 2) {
    //         this.onHeaderButtonsClick(
    //           this.leaveData,
    //           this.constantData?.column?.rejectedFilter,
    //           this.requestedLeaveLabels?.btnRejected,
    //         );
    //       } else {
    //         this.onHeaderButtonsClick(
    //           this.leaveData,
    //           this.constantData?.column?.pendingFilter,
    //           this.requestedLeaveLabels?.btnPending,
    //         );
    //       }
    //     }
    //   }
    // });
  }

  // Open view/ edit dialog box
  openViewEditDialog(elementData) {
    const clickName = elementData.status
        === this.constantData.column.pendingCancellationFilter
      || !elementData.isWithinFinancialYear
      ? this.requestedLeaveLabels.btnView
      : this.requestedLeaveLabels.btnViewEdit;

    this.adobeAnalyticsOnButtonClick(clickName);

    const filteredPendingCancellationData = this.pendingCancellationData.find(
      (data) => data.leaveId === elementData.leaveId,
    );

    const dialogRef = this.dialog.open(ViewEditLeaveDialogComponent, {
      autoFocus: false,
      data: {
        siteSection: this.requestedLeaveLabels.labelTab,
        leaveId: elementData.leaveId,
        newRequestLabels: this.newRequestLabels,
        dialogViewEditLabels: this.dialogViewEditLabels,
        dialogDeleteLeaveLabels: this.dialogDeleteLeaveLabels,
        uploadDocumentLabels: this.uploadDocumentLabels,
        isWithinFinancialYear: elementData?.isWithinFinancialYear,
        pendingCancellationData:
          filteredPendingCancellationData?.status === elementData?.status,
      },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getRequestLeaveData();
    });
  }

  /**
   * Add Sorting
   * @param data contain table data
   */
  sorting(data: LeaveData[]) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.sort = this.sort;
  }

  /**
   * Get section count & data
   * @param data table data
   * @param status selected filter
   * @param getCount tabs counts
   */
  getSectionData(data: LeaveData[], status: string, getCount?: string) {
    switch (status) {
      case this.constantData?.column?.pendingFilter:
        this.pendingData = data?.filter((res) => res?.status === status);

        /* Getting all the leaves with status pending cancelatio  */
        this.pendingCancellationData = data?.filter(
          (res) => res?.status
            === this.constantData?.column?.pendingCancellationFilter,
        );
        this.selectedLeave = status;
        this.leaveColumns = [
          this.constantData?.column?.leaveTypeColumn,
          this.constantData?.column?.startDateColumn,
          this.constantData?.column?.endDateColumn,
          this.constantData?.column?.durationColumn,
          this.constantData?.column?.submittedDateColumn,
          this.constantData?.column?.editColumn,
        ];
        /* Concatination of pending cancellation leaves as these are also the part of Pending leaves */
        this.sorting(this.pendingData.concat(this.pendingCancellationData));
        break;
      case this.constantData?.column?.approvedFilter:
        this.approvedData = data?.filter((res) => res?.status === status);

        this.selectedLeave = status;
        this.leaveColumns = [
          this.constantData?.column?.leaveTypeColumn,
          this.constantData?.column?.startDateColumn,
          this.constantData?.column?.endDateColumn,
          this.constantData?.column?.durationColumn,
          this.constantData?.column?.submittedDateColumn,
          this.constantData?.column?.approvedRejectedDateColumn,
          this.constantData?.column?.editColumn,
        ];
        this.sorting(this.approvedData);
        break;
      case this.constantData?.column?.rejectedFilter:
        this.rejectedData = data?.filter((res) => res?.status === status);

        this.selectedLeave = status;
        this.leaveColumns = [
          this.constantData?.column?.leaveTypeColumn,
          this.constantData?.column?.startDateColumn,
          this.constantData?.column?.endDateColumn,
          this.constantData?.column?.durationColumn,
          this.constantData?.column?.submittedDateColumn,
          this.constantData?.column?.approvedRejectedDateColumn,
          this.constantData?.column?.editColumn,
        ];
        this.sorting(this.rejectedData);
        break;
      default:
        break;
    }

    // On load check count
    if (getCount === 'count') {
      this.pendingData = data?.filter(
        (res) => res?.status === this.constantData?.column?.pendingFilter,
      );
      this.pendingCancellationData = data?.filter(
        (res) => res?.status === this.constantData?.column?.pendingCancellationFilter,
      );
      this.approvedData = data?.filter(
        (res) => res?.status === this.constantData?.column?.approvedFilter,
      );
      this.rejectedData = data?.filter(
        (res) => res?.status === this.constantData?.column?.rejectedFilter,
      );
    }
  }

  // Get response data
  getRequestLeaveData() {
    const employeeId = this.storageEncryptionService.getvalue(LOGGEDIN_EMP);
    this.requestedLeaveService.getRequestLeaveData(employeeId).subscribe(
      (res) => {
        this.isDataLoaded = true;
        this.cdr.detectChanges();
        if (res?.data?.leave_data?.length > 0) {
          const mappedArray = res.data.leave_data.map((data) => {
            const matchingItem = res.data.leaveTypes.find(
              (item2) => item2?.leaveCode === data?.leaveCode,
            );
            if (matchingItem) {
              const startDate = new Date(data?.startDate);
              const endDate = new Date(data?.endDate);
              const financialYearStartDate = new Date(
                this.newRequestLabels?.financialYearStartDate,
              );
              const financialYearEndDate = new Date(
                this.newRequestLabels?.financialYearEndDate,
              );

              const isLeaveinFinancialYear = this.checkIfWithinFinancialYear(
                startDate,
                endDate,
                financialYearStartDate,
                financialYearEndDate,
              );

              return {
                ...data,
                leave_type: matchingItem.leaveDescription,
                isWithinFinancialYear: isLeaveinFinancialYear,
              };
            }
            return data;
          });
          this.leaveData = mappedArray;
          this.getSectionData(mappedArray, this.selectedLeave, 'count');
        } else {
          this.leaveData = [];
          this.getSectionData(this.leaveData, this.selectedLeave, 'count');
        }
      },
      (err) => {
        this.isDataLoaded = true;
        this.debugService.log('error while getting leave list data', err);
        this.leaveData = [];
        this.getSectionData(this.leaveData, this.selectedLeave, 'count');
      },
    );
  }

  checkIfWithinFinancialYear(
    startDate: Date,
    endDate: Date,
    financialYearStartDate: Date,
    financialYearEndDate: Date,
  ): boolean {
    return (
      startDate <= financialYearEndDate && endDate >= financialYearStartDate
    );
  }

  onHeaderButtonsClick(data: LeaveData[], status: string, buttonLabel: string) {
    this.getSectionData(data, status);
    this.adobeAnalyticsOnButtonClick(buttonLabel);
  }

  adobeAnalyticsOnButtonClick(clickName: string) {
    this.analyticsService.clickEventDatalayer({
      isErrorPage: false,
      siteSection: 'Leave Request',
      siteSubSection: 'Requested Leave',
      clickInfo: {
        clickName,
        clickComponentType: AnalyticsComponent.BUTTON,
        componentName: this.requestedLeaveLabels.labelTab,
        componentID: `${this.siteSection}_${this.requestedLeaveLabels.labelTab}_${clickName}`,
      },
    });
  }
}
