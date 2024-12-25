import { LabelsBaseManagerACMApproval } from './base-manager.interface';

export const baseManagerConstantValue = {
  baseManagerAcmRequestDetails: {
    status: {
      code: 200,
      viewMore: 'YES',
      message: 'Successfull operation',
      errors: null,
    },
    data: [
      {
        generatedRequestNo: 'REQ_NO_632832505',
        tripType: 'MULTICITY',
        journeyType: 'INTERNATIONAL',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Pilot',
        lastUpdatedDate: '2024-06-18T16:47:08.882126',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-06-19',
            departureTime: '07:40',
            flightNo: 'AI6654',
            arrivalDate: '2024-06-19',
            arrivalTime: '09:40',
            flyingDuration: '2h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-06-19',
            departureTime: '07:40',
            flightNo: 'AI6655',
            arrivalDate: '2024-06-19',
            arrivalTime: '09:40',
            flyingDuration: '2h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
          {
            fromStationCode: 'DEL',
            fromStationName: 'Delhi',
            toStationCode: 'BOM',
            toStationName: 'Mumbai',
            departureDate: '2024-06-20',
            departureTime: '07:40',
            flightNo: 'AI9932',
            arrivalDate: '2024-06-20',
            arrivalTime: '09:40',
            flyingDuration: '2h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'DEL',
            fromStationName: 'Delhi',
            toStationCode: 'BOM',
            toStationName: 'Mumbai',
            departureDate: '2024-06-20',
            departureTime: '07:40',
            flightNo: 'AI9933',
            arrivalDate: '2024-06-20',
            arrivalTime: '09:40',
            flyingDuration: '2h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
          {
            fromStationCode: 'BOM',
            fromStationName: 'Mumbai',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-06-20',
            departureTime: '07:40',
            flightNo: 'AI9932',
            arrivalDate: '2024-06-21',
            arrivalTime: '09:40',
            flyingDuration: '2h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
        ],
      },
      {
        generatedRequestNo: 'REQ_NO_1696566859',
        tripType: 'ROUNDTRIP',
        journeyType: 'DOMESTIC',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Pilot',
        lastUpdatedDate: '2024-06-18T16:47:49.013455',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-06-19',
            departureTime: '09:40',
            flightNo: 'AI1234',
            arrivalDate: '2024-06-20',
            arrivalTime: '09:40',
            flyingDuration: '24h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-06-19',
            departureTime: '09:40',
            flightNo: 'AI321',
            arrivalDate: '2024-06-20',
            arrivalTime: '08:40',
            flyingDuration: '23h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
          {
            fromStationCode: 'DEL',
            fromStationName: 'Delhi',
            toStationCode: 'CCU',
            toStationName: 'Kolkata',
            departureDate: '2024-06-21',
            departureTime: '09:40',
            flightNo: 'AI123434235',
            arrivalDate: '2024-06-22',
            arrivalTime: '08:40',
            flyingDuration: '23h00m',
            stops: 'Non-Stop',
            flightType: 'RETURN',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'DEL',
            fromStationName: 'Delhi',
            toStationCode: 'CCU',
            toStationName: 'Kolkata',
            departureDate: '2024-06-21',
            departureTime: '09:40',
            flightNo: 'AI3212332',
            arrivalDate: '2024-06-22',
            arrivalTime: '08:40',
            flyingDuration: '23h00m',
            stops: 'Non-Stop',
            flightType: 'RETURN',
            primary: 'NO',
            approved: 'NO',
          },
        ],
      },
      {
        generatedRequestNo: 'REQ_NO_1671372019',
        tripType: 'ONEWAY',
        journeyType: 'DOMESTIC',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Captain',
        lastUpdatedDate: '2024-06-14T17:28:24.654920',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI1234',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI321',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
        ],
      },
      {
        generatedRequestNo: 'REQ_NO_1548871916',
        tripType: 'ONEWAY',
        journeyType: 'DOMESTIC',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Captain',
        lastUpdatedDate: '2024-06-14T17:28:25.404794',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI1234',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI321',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
        ],
      },
      {
        generatedRequestNo: 'REQ_NO_1370832222',
        tripType: 'ONEWAY',
        journeyType: 'DOMESTIC',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Captain',
        lastUpdatedDate: '2024-06-14T17:28:26.124824',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI1234',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI321',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
        ],
      },
      {
        generatedRequestNo: 'REQ_NO_1952570915',
        tripType: 'ONEWAY',
        journeyType: 'DOMESTIC',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Captain',
        lastUpdatedDate: '2024-06-14T17:28:26.683010',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI1234',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI321',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
        ],
      },
      {
        generatedRequestNo: 'REQ_NO_935361053',
        tripType: 'ONEWAY',
        journeyType: 'DOMESTIC',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Captain',
        lastUpdatedDate: '2024-06-14T17:28:27.200139',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI1234',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI321',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
        ],
      },
      {
        generatedRequestNo: 'REQ_NO_1124809931',
        tripType: 'ONEWAY',
        journeyType: 'DOMESTIC',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Captain',
        lastUpdatedDate: '2024-06-14T17:28:27.697555',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI1234',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI321',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
        ],
      },
      {
        generatedRequestNo: 'REQ_NO_1839058404',
        tripType: 'ONEWAY',
        journeyType: 'DOMESTIC',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Captain',
        lastUpdatedDate: '2024-06-14T17:28:14.963840',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI1234',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-09-18',
            departureTime: '13:30',
            flightNo: 'AI321',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
        ],
      },
      {
        generatedRequestNo: 'REQ_NO_1009468162',
        tripType: 'ONEWAY',
        journeyType: 'DOMESTIC',
        status: 'PENDING',
        firstName: 'Koushik',
        middleName: 'Chandra',
        lastName: 'Das',
        empId: '12345678',
        designation: 'Captain',
        lastUpdatedDate: '2024-06-14T17:28:28.686141',
        trips: [
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI1234',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'YES',
            approved: 'NO',
          },
          {
            fromStationCode: 'CCU',
            fromStationName: 'Kolkata',
            toStationCode: 'DEL',
            toStationName: 'Delhi',
            departureDate: '2024-08-16',
            departureTime: '13:30',
            flightNo: 'AI321',
            arrivalDate: '2024-08-16',
            arrivalTime: '16:25',
            flyingDuration: '8h00m',
            stops: 'Non-Stop',
            flightType: 'ONWARD',
            primary: 'NO',
            approved: 'NO',
          },
        ],
      },
    ],
  },

  baseManagerRequestCount: {
    status: {
      code: 'string',
      message: 'string',
      errors: 'string',
    },
    data: [
      {
        81013162: {
          approvedCount: 0,
          pendingCount: 0,
          declinedCount: 0,
          totalCount: 0,
        },
        80006690: {
          approvedCount: 0,
          pendingCount: 0,
          declinedCount: 0,
          totalCount: 0,
        },
        80006686: {
          approvedCount: 0,
          pendingCount: 0,
          declinedCount: 0,
          totalCount: 0,
        },
        81011618: {
          approvedCount: 0,
          pendingCount: 0,
          declinedCount: 0,
          totalCount: 0,
        },
        80055899: {
          approvedCount: 100,
          pendingCount: 10,
          declinedCount: 10,
          totalCount: 120,
        },
      },
    ],
  },

  showBtnConfig: [
    {
      btnType: 'viewdetails',
      btnLabel: '',
      btnIcon: '',
      redirectionLink: '',
    },
  ],

  labelsBaseManagerAcmList: {
    pageTitle: 'BASE MANAGER',
    tabMyList: {
      labelTab: 'My List',
      btnPendingView: 'Pending',
      iconPendingView: 'timelapse',
      btnApprovedView: 'Approved',
      iconBtnApprovedView: 'check',
      btnDeclinedView: 'Declined',
      iconBtnDeclinedView: 'close',
      labelLastUpdatedOn: 'Last updated on',
      labelFrom: 'FROM',
      labelTo: 'TO',
      labelPrimaryFlightNo: 'PRIMARY FLIGHT NO.',
      labelAlternateflightNo: 'ALTERNATE FLIGHT NO.',
      btnViewDetails: 'View details',
      iconBtnViewDetails: 'visibility',
      labelSearch: 'Search Pilot name or SAP ID',
      iconLabelserach: 'search',
      iconFlightTakeoff: 'flight_takeoff',
      iconSwap: 'swap_horiz',
      iconFlight: 'flight',
      baseManagerMaping: [
        { name: 'Arjun Ahluwalia', id: '81013162' },
        { name: 'Divya Amarjeet Singh Duga', id: '80006690' },
        { name: 'Rishi Kumar Sharma', id: '80006686' },
        { name: 'Jaideep Banerjee', id: '81011618' },
        { name: 'Shivinder Singh Sahi', id: '80055899' },
      ],
    },
  },

  staticBaseManagerWithCountResponse: {
    status: {
      code: 200,
      message: 'Success',
      errors: 'string',
    },
    data: [
      {
        80006690: {
          approvedCount: 1,
          pendingCount: 2,
          declinedCount: 3,
          totalCount: 6,
        },
        80006686: {
          approvedCount: 8,
          pendingCount: 2,
          declinedCount: 4,
          totalCount: 14,
        },
        81011718: {
          approvedCount: 10,
          pendingCount: 20,
          declinedCount: 30,
          totalCount: 60,
        },
      },
    ],
  },
};

export enum BaseManagerRequestsListEnum {
  'APPROVED' = 'Approved',
  'WITHDRAWN' = 'Withdrawn',
  'PENDING' = 'Pending',
  'DECLINED' = 'Declined',
  'DOMESTIC' = 'Domestic',
  'INTERNATIONAL' = 'International',
  'MULTICITY' = 'Multi City',
  'ONEWAY' = 'One Way',
  'ROUNDTRIP' = 'Round Trip',
  'REJECTED' = 'Rejected',
}

export const JOURNEY_TYPES = {
  DOMESTIC: 'DOMESTIC',
  INTERNATIONAL: 'INTERNATIONAL',
};

export enum RequestStatusEnum {
  APPROVED = 'APPROVED',
  WITHDRAWN = 'WITHDRAWN',
  DECLINED = 'DECLINED',
  PENDING = 'PENDING',
  DOMESTIC = 'DOMESTIC',
  RETURN = 'RETURN',
}

export const labelsBaseManagerAcmList = {
  pageTitle: 'BASE MANAGER',
  baseManagerCfList:
    '/content/dam/my-ai/content_fragment/in/en/acm/base-manager-list',
  disclaimerCfList: '/content/dam/my-ai/content_fragment/disclaimer/acm/acm-',
  tabList: {
    labelTab: 'My List',
    btnPendingView: 'Pending',
    iconPendingView: 'timelapse',
    btnApprovedView: 'Approved',
    iconBtnApprovedView: 'check',
    btnDeclinedView: 'Rejected',
    iconBtnDeclinedView: 'close',
    labelLastUpdatedOn: 'Last Updated:',
    labelFrom: 'From',
    labelTo: 'To',
    btnViewDetails: 'View details',
    iconBtnViewDetails: 'visibility',
    labelSearch: 'Search Pilot name or SAP ID',
    iconLabelSearch: 'search',
    labelPrimary: 'Primary',
    labelAlternate: 'Alternative',
    iconSearchReset: 'close',
    labelNoRequestHeading: 'No requests',
    labelNoRequestPendingText:
      "You don't have any pending ACM requests right now.",
    labelNoRequestApprovedText:
      "You don't have any approved ACM requests right now.",
    labelNoRequestRejectedText:
      "You don't have any rejected ACM requests right now.",
    imgNoRequest: '/content/dam/my-ai/acm/noRequest.png',
    labelViewMore: 'View More',
    iconViewMore: 'keyboard_arrow_down',
    labelSearchResult: 'request associated with the search result for',
    imgCardLogo: '/content/dam/my-ai/acm/Fav.svg',
    labelNameTitle: 'Captain',
    labelStop: 'Stop',
    labelStops: 'Stops',
    labelSearchResultsFound: 'requests associated with the search result for',
  },
  analyticsInfo: {
    countryCode: 'in',
    countryName: 'India',
    language: 'en',
    pageName: 'myAI | Base Manager List',
    pageType: 'AEM',
    server: 'airindia.com',
    siteName: 'myAI',
  },
};

export const labelsBaseManagerACMapproval: LabelsBaseManagerACMApproval = {
  labelBtnBack: 'Back',
  iconBtnBack: 'keyboard_backspace',
  labelBtnReject: 'Reject',
  labelBtnApprove: 'Approve',
  disclaimerCfList: '/content/dam/my-ai/content_fragment/disclaimer/acm/acm-',
  tabCurrentRequests: {
    detailsComponent: {
      labelPrimary: 'Primary',
      labelPrimaryBackgroundColor: null,
      labelPrimaryTextColor: null,
      labelAlternate: 'Alternate',
      labelAlternateTextColor: null,
      labelAlternateBackgroundColor: null,
      iconBtnView: 'visibility',
      iconDocList: 'article',
      noAttachmentFoundImg: '/content/dam/my-ai/icon/search-folder.svg',
      noAttachmentFoundText: 'No Attachment Found',
      labelPageTitle: 'DETAILS PAGE',
      labelRejected: 'Rejected',
      labelRejectedTextColor: null,
      labelRejectedBackgroundColor: null,
      labelApproved: 'Approved',
      labelApprovedTextColor: null,
      labelApprovedBackgroundColor: null,
      labelBtnView: 'View',
      iconFlight: 'flight',
      labelInputComment: 'Comment by Approver',
      labelInputCommentPlaceholder: 'No Comment',
      labelAttachments: 'Attachments',
    },
    labelTab: 'Current Request',
    labelSearchFlight: 'Select Flight',
    labelOtherAttachments: 'Other Attachments',
    labelRejectionReason: 'Rejection Reason',
    labelRejectionDropDown: 'Select Rejection Reason',
    labelComments: 'Comments',
    iconFlightTakeoff: 'flight_takeoff',
    iconSwap: 'swap_horiz',
    iconFlight: 'flight',
    labelLastUpdated: 'Last updated',
    labelCaptain: 'Captain',
    labelNoAttachmentFound: 'No Attachment Found',
    imgNoRequest: '/content/dam/my-ai/acm/noRequest.png',
    labelStop: 'Stop',
    labelStops: 'Stops',
    labelInputComment: 'Comment by Approver',
    labelInputCommentPlaceholder: 'No Comment',
    labelHeading: 'Details page',
    labelApproved: 'Approved',
    labelRejected: 'Rejected',
  },
  tabHistory: {
    detailsComponent: {
      labelPrimary: 'Primary',
      labelPrimaryBackgroundColor: null,
      labelPrimaryTextColor: null,
      labelAlternate: 'Alternate',
      labelAlternateTextColor: null,
      labelAlternateBackgroundColor: null,
      iconBtnView: 'visibility',
      iconDocList: 'article',
      noAttachmentFoundImg: '/content/dam/my-ai/icon/search-folder.svg',
      noAttachmentFoundText: 'No Attachment Found',
      labelPageTitle: 'DETAILS PAGE',
      labelRejected: 'Rejected',
      labelRejectedTextColor: null,
      labelRejectedBackgroundColor: null,
      labelApproved: 'Approved',
      labelApprovedTextColor: null,
      labelApprovedBackgroundColor: null,
      labelBtnView: 'View',
      iconFlight: 'flight',
      labelInputComment: 'Comment by Approver',
      labelInputCommentPlaceholder: 'No Comment',
      labelAttachments: 'Attachments',
    },
    labelTab: 'History',
    labelFrom: 'From',
    labelTo: 'To',
    labelBtnDomestic: 'Domestic',
    labelBtnInternational: 'International',
    iconBtnDomestic: 'flag',
    iconBtnInternational: 'public',
    labelApproved: 'Approved',
    labelApprovedColorCode: '#E5FFEC',
    labelApprovedColorCodeText: '#17732B',
    labelWithdrawn: 'Withdrawn',
    labelWithdrawnColorCode: '#FFEFDB',
    labelWithdrawnColorCodeText: '#A84907',
    labelDeclined: 'Declined',
    labelDeclinedColorCode: '#FFF4F7',
    labelDeclinedColorCodeText: '#AA1130',
    labelOneWay: 'One Way',
    labelRoundTrip: 'Round Trip',
    labelLastUpdatedOn: 'Last updated on',
    labelBtnViewDetails: 'View Details',
    iconBtnViewDetails: 'visibility',
    labelBtnDownload: 'Download',
    iconBtnDownload: 'download',
    labelBtnView: 'View',
    iconBtnView: null,
    iconDocList: 'article',
    iconFlightTakeoff: 'flight_takeoff',
    iconSwap: 'swap_horiz',
    iconFlight: 'flight',
    labelFlightNo: 'Flight no.',
    labelBtnViewMore: 'View more',
    iconBtnViewMore: 'keyboard_arrow_down',
    labelNoRequestFound: 'No Request Found',
    imgNoRequest: '/content/dam/my-ai/acm/noRequest.png',
    labelStop: 'Stop',
    labelStops: 'Stops',
    imgCardLogo: '/content/dam/my-ai/acm/Fav.svg',
    labelOn: 'On',
    labelRejected: 'Rejected',
    imgNoData: null,
  },
  dialogApproveAcm: {
    labelApproveRequest: 'Approve the Request',
    labelBtnClose: 'close',
    labelAddComment: 'Please add a Comment',
    labelCharsRemaining: 'characters remaining.',
    iconColorDialogApproveAcm: 'Approve',
    commentMaxLength: '500',
    addCommentPlaceHolder: 'Add a comment',
    labelBtnCancel: 'Cancel',
    labelBtnApprove: 'Approve',
  },
  dialogApprovedAcm: {
    labelDialogApprovedAcm: 'Success!',
    labelDialogApprovedMsg: 'The request has been approved successfully',
    iconDialogApprovedAcm: '/content/dam/my-ai/icon/success.gif',
    iconClose: 'close',
  },
  dialogDeclinedAcm: {
    labelDialogDeclinedAcm: 'Rejected Sucessfully',
    labelDialogDeclinedMsg: 'Request for ACM travel is rejected',
    iconDialogDeclinedAcm: '/content/dam/my-ai/icon/success.gif',
    iconClose: 'close',
    commentMaxLength: '500',
  },
  dialogRejectAcm: {
    labelDialogRejectAcm: 'Reject the Request',
    labelRejectReason: 'Please select a Rejection Reason',
    placeholderReason: 'Select Reason',
    placeholderComment: 'Add a Comment',
    labelDialogRejectMsg: 'The request has been rejected successfully',
    iconDialogRejectAcm: '/content/dam/my-ai/icon/success.gif',
    iconClose: 'close',
    charValidationMsg: 'characters remaining',
    btnReject: 'Reject',
    btnSubmit: 'Submit',
    labelBtnCancel: 'Cancel',
    rejectReason: [
      {
        label: 'Reason 1',
        value: 'reason1',
      },
    ],
  },
  analyticsInfo: {
    countryCode: 'in',
    countryName: 'India',
    language: 'en',
    pageName: 'Request Details',
    pageType: 'AEM',
    server: 'airindia.com',
    siteName: 'myAI',
  },
};

export const BaseManagerListPageSession = 'baseManagerListData';
export const BaseManagerDetailsPageSession = 'baseManagerDetailsData';

export const BaseManagerListURL = '/content/my-ai/in/en/base-manager-list.html';
export const BaseManagerDetailsURL = '/content/my-ai/in/en/base-manager-list/details.html';
