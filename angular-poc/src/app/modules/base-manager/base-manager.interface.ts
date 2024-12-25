// import { AnalyticsInfo } from 'src/types/datalayer/analytics-info';

export interface LabelsBaseManagerAcmList {
  pageTitle: string;
  baseManagerCfList: string;
  tabList: TabBaseManagerList;
  analyticsInfo: any;
}

export interface TabBaseManagerList {
  labelTab: string;
  btnPendingView: string;
  iconPendingView: string;
  btnApprovedView: string;
  iconBtnApprovedView: string;
  btnDeclinedView: string;
  iconBtnDeclinedView: string;
  labelLastUpdatedOn: string;
  labelFrom: string;
  labelTo: string;
  labelPrimary: string;
  labelAlternate: string;
  btnViewDetails: string;
  iconBtnViewDetails: string;
  labelSearch: string;
  iconLabelSearch: string;
  iconSearchReset: string;
  labelNoRequestHeading: string;
  labelNoRequestPendingText: string;
  labelNoRequestApprovedText: string;
  labelNoRequestRejectedText: string;
  imgNoRequest: string;
  labelViewMore: string;
  iconViewMore: string;
  labelSearchResult: string;
  imgCardLogo: string;
  labelNameTitle: string;
}

export interface BaseManagerTabData {
  approvedCount: number;
  pendingCount: number;
  declinedCount: number;
  totalCount: number;
  empId: number | null;
  firstName: string;
  middleName: string;
  lastName: string;
}

export interface RequestData {
  generatedRequestNo: string;
  tripType: string;
  journeyType: string;
  status: string;
  comment: string | null;
  firstName: string;
  middleName: string | null;
  lastName: string | null;
  empId: string;
  designation: string;
  lastUpdatedDate: string;
  trips: TripData[];
  documents: DocumentData[];
}
export interface DocumentData {
  docId: string;
  originalFileName: string;
  docMimeType: string;
}

export interface TripData {
  primary: {
    journeyKey: string;
    fromStationCode: string;
    fromStationName: string;
    fromStationCity: string;
    fromTerminal: string | null;
    fromCountry: string;
    toStationCode: string;
    toStationName: string;
    toStationCity: string;
    toTerminal: string;
    toCountry: string;
    amadeusDepartureDate: string;
    amadeusArrivalDate: string;
    departureDate: string;
    departureTime: string;
    flightNo: string;
    arrivalDate: string;
    arrivalTime: string;
    flyingDuration: string;
    stops: number;
    stopStations: string | null;
    flightType: string;
    primary: boolean;
    approved: boolean;
  };
  alternative?: {
    journeyKey: string;
    fromStationCode: string;
    fromStationName: string;
    fromStationCity: string;
    fromTerminal: string | null;
    fromCountry: string;
    toStationCode: string;
    toStationName: string;
    toStationCity: string;
    toTerminal: string;
    toCountry: string;
    amadeusDepartureDate: string;
    amadeusArrivalDate: string;
    departureDate: string;
    departureTime: string;
    flightNo: string;
    arrivalDate: string;
    arrivalTime: string;
    flyingDuration: string;
    stops: number;
    stopStations: any;
    flightType: string;
    primary: boolean;
    approved: boolean;
  };
}

export interface DetailsComponent {
  labelPrimary: string;
  labelPrimaryBackgroundColor: string;
  labelPrimaryTextColor: string;
  labelAlternate: string;
  labelAlternateTextColor: string;
  labelAlternateBackgroundColor: string;
  iconBtnView: string;
  iconDocList: string;
  noAttachmentFoundImg: string;
  noAttachmentFoundText: string;
  labelPageTitle: string;
  labelRejected: string;
  labelRejectedTextColor: string;
  labelRejectedBackgroundColor: string;
  labelApproved: string;
  labelApprovedTextColor: string;
  labelApprovedBackgroundColor: string;
  labelBtnView: string;
  iconFlight: string;
  labelInputComment: string;
  labelInputCommentPlaceholder: string;
  labelAttachments: string;
}

export interface TabCurrentRequests {
  detailsComponent: DetailsComponent;
  labelTab: string;
  labelSearchFlight: string;
  labelOtherAttachments: string;
  labelRejectionReason: string;
  labelRejectionDropDown: string;
  labelComments: string;
  iconFlightTakeoff: string;
  iconSwap: string;
  iconFlight: string;
  labelLastUpdated: string;
  labelCaptain: string;
  labelNoAttachmentFound: string;
  imgNoRequest: string;
  labelStop: string;
  labelStops: string;
  labelInputComment: string;
  labelInputCommentPlaceholder: string;
  labelHeading: string;
  labelApproved: string;
  labelRejected: string;
}

export interface TabHistory {
  detailsComponent: DetailsComponent;
  labelTab: string;
  labelFrom: string;
  labelTo: string;
  labelBtnDomestic: string;
  labelBtnInternational: string;
  iconBtnDomestic: string;
  iconBtnInternational: string;
  labelApproved: string;
  labelApprovedColorCode: string;
  labelApprovedColorCodeText: string;
  labelWithdrawn: string;
  labelWithdrawnColorCode: string;
  labelWithdrawnColorCodeText: string;
  labelDeclined: string;
  labelDeclinedColorCode: string;
  labelDeclinedColorCodeText: string;
  labelOneWay: string;
  labelRoundTrip: string;
  labelLastUpdatedOn: string;
  labelBtnViewDetails: string;
  iconBtnViewDetails: string;
  labelBtnDownload: string;
  iconBtnDownload: string;
  labelBtnView: string;
  iconBtnView: string;
  iconDocList: string;
  iconFlightTakeoff: string;
  iconSwap: string;
  iconFlight: string;
  labelFlightNo: string;
  labelBtnViewMore: string;
  iconBtnViewMore: string;
  labelNoRequestFound: string;
  imgNoRequest: string;
  labelStop: string;
  labelStops: string;
  imgCardLogo: string;
  labelOn: string;
  labelRejected: string;
  imgNoData: string;
}

export interface DialogApprovedAcm {
  labelDialogApprovedAcm: string;
  labelDialogApprovedMsg: string;
  iconDialogApprovedAcm: string;
  iconClose: string;
}

export interface DialogApproveAcm {
  labelApproveRequest: string;
  labelBtnClose: string;
  labelAddComment: string;
  labelCharsRemaining: string;
  iconColorDialogApproveAcm: string;
  commentMaxLength: string;
  addCommentPlaceHolder: string;
  labelBtnCancel: string;
  labelBtnApprove: string;
}

export interface DialogDeclinedAcm {
  labelDialogDeclinedAcm: string;
  labelDialogDeclinedMsg: string;
  iconDialogDeclinedAcm: string;
  iconClose: string;
  commentMaxLength: string;
}

export interface DialogRejectAcm {
  labelDialogRejectAcm: string;
  labelRejectReason: string;
  placeholderReason: string;
  placeholderComment: string;
  labelDialogRejectMsg: string;
  iconDialogRejectAcm: string;
  iconClose: string;
  charValidationMsg: string;
  btnReject: string;
  btnSubmit: string;
  labelBtnCancel: string;
  rejectReason: { label: string; value: string }[];
}

export interface LabelsBaseManagerACMApproval {
  labelBtnBack: string;
  iconBtnBack: string;
  labelBtnReject: string;
  labelBtnApprove: string;
  disclaimerCfList: string;
  tabCurrentRequests: TabCurrentRequests;
  tabHistory: TabHistory;
  dialogApprovedAcm: DialogApprovedAcm;
  dialogApproveAcm: DialogApproveAcm;
  dialogDeclinedAcm: DialogDeclinedAcm;
  dialogRejectAcm: DialogRejectAcm;
  analyticsInfo: any;
}

export interface AcmRequestDetailsComponent {
  labelsBaseManagerACMapproval: LabelsBaseManagerACMApproval;
  ':type': string;
}
