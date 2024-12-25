// myAI service params

export const EMPLOYEE_SERVICE_PATH = '/myai-emp';

/*  ------------- empolyee profile --------------------- */

export const TODO_REQUESTS = 'v1/api/todo/';

export const EMP_PROFILE = 'v1/api/empProfile';
export const GET_EMP_PROFILE = 'getEmpData';
export const GET_EMP_HOME_PROFILE = 'getEmpHomePageData';
export const GET_EMP_EXPERIENCE = '/getEmpExperience';
export const GET_EMP_EDUCATION = '/getEmpEducation';
export const SUBMIT_FEEDBACK_FORM = '/addEmpFeedback';
export const GET_EMP_ORG_CHART = '/getEmpOrgChart';

export const UPDATE_EMP_EXPERIENCE = '/updateExperienceRequest';
export const ADD_EMP_EXPERIENCE = '/addEmpExperience';
export const DELETE_EMP_EXPERIENCE = '/deleteExperience';

export const ADD_EMPLOYER_VERIFICATION_LETTER_LOG = '/addSelfServeDocumentLog';

export const UPDATE_EMP_EDUCATION = '/updateEducationRequest';
export const ADD_EMP_EDUCATION = '/addEmpEducation';
export const DELETE_EMP_EDUCATION = '/deleteEducation';

export const ADD_ID_CARD_IMAGE = 'v1/api/upload/document/profile';
export const GET_ID_CARD_IMAGE = '/getProfileImgData';

/*  ------------- Leave Module --------------------- */
export const EMP_LEAVE = 'v1/api/leave/employee';
export const EMP_LEAVE_WITH_ID = 'v1/api/leave';
export const EMP_WITH_ID = '/employee';
export const EMP_LEAVE_BALANCE = '/balance';
export const GET_EMP_LEAVE_LIST = '/getLeaveListData';
export const GET_HOLIDAY_CALENDARS_DATA = '/getHolidayCalenderData';
export const GET_HOLIDAY_CALENDARS = 'v1/api/holiday-calendarData';
export const EMP_LEAVE_SUBMIT = '/submit';
export const EMP_LEAVE_DURATION = '/duration';
export const GET_EMP_LEAVE_DETAILS = '/getLeaveDetails';
export const EMP_DELETE_LEAVE = '/deleteLeave';
export const EMP_CANCEL_LEAVE = '/cancel';
export const EMP_LEAVE_KEYWORD = '/leave';
export const POST_LEAVE_ATTACHMENT = '/attachment';
export const EMP_TEAM = 'v1/api/employee';
export const GET_TEAM_CALENDAR = 'team-calendar';

/*  ------------- My documents ----------------------*/
export const GET_OFFER_LETTERS = 'getOfferLetter';

/*  ------------- My Increment ----------------------*/
export const GET_INCREMENT_LETTERS_DATES = 'getIncrementLetterDates';
export const GET_INCREMENT_LETTERS = 'getIncrementLetters';

/*  ------------- Payslip --------------------- */
export const GET_EMP_PAYSLIP = 'payslip';
export const EMP_PAYSLIP = 'v1/api/payroll';

/*  ------------- Form 16 --------------------- */
export const GET_EMP_FORM16 = 'form16';

/*  ------------- My Team Module --------------------- */
export const GET_TEAM_DATA = 'getTeamData';

/*  ------------- Policies --------------------- */
export const DEFAULT_USER_PERSONA = 'General';

/*  ------------- Benefits --------------------- */
export const GET_BENEFITS_DATA = '/getBenefitCategoryList';

/* Home page how do i */
export const GET_HOW_DO_I_DATA = '/content/my-ai/in/en/jsonPage/jcr:content/root/container/howdoi_info.json';

/*  ------------- STORAGE KEYS --------------------- */
export const LOGGEDIN_EMP = 'employeeId';
export const LOGGEDIN_EMP_FUCTION = 'function';
export const LOGGEDIN_EMP_FUCTION_NAME = 'functionDesc';
export const ENV_CONFIG_FLAG = 'envConfigLoaded';
export const AD_ACCESS_TOKEN = 'AD_ACCESS_TOKEN';

/* ---------------------------- global api ---------------------*/
export const picklist = 'v1/api/picklists';

/* ---------------------------- search api ---------------------*/
export const GET_SEARCH_DATA = 'getSearchData';
export const GET_AEM_SEARCH_DATA_BY_KEYWORD = '/getSearchDataBykeyword;';
export const GET_GLOBAL_SEARCH_DATA = '/content/servlet/default.searchresult.json';

/* ---------------------------- Navigation api ----------------------------------*/
export const GET_NAVIGATION_DATA = '/content/my-ai/in/en/jsonPage/jcr:content/root/container/dynamic_menu.json';

export const GET_NAVIGATION_DATA_CREW = '/getCrewActionCategoryList';
export const GET_NAVIGATION_DATA_EMPLOYEE = '/getAllEmployeesActionCategoryList';

/* ------------------------Workplace api ------------------------------------*/
export const GET_WORKPLACE_DATA = 'communication';
export const feed = 'feed';
export const fields = 'id,message,created_time,updated_time,permalink_url,from.fields(name,id,picture.type(large)),seen.summary(total_count).limit(0),attachments,comments.limit(0).summary(total_count),reactions.type(LIKE).limit(0).summary(total_count).as(like_count),reactions.type(LOVE).limit(0).summary(total_count).as(love_count),reactions.type(HAHA).limit(0).summary(total_count).as(haha_count),reactions.type(WOW).limit(0).summary(total_count).as(wow_count),reactions.type(SAD).limit(0).summary(total_count).as(sad_count),reactions.type(ANGRY).limit(0).summary(total_count).as(angry_count),reactions.limit(0).summary(total_count).as(total_reaction_count)';

/* ---------------------------- Service now  api ----------------------------------*/

export const GET_INCIDENT_CATEGORY = 'servicemanagement/getIncidentCategory';

export const GET_INCIDENT_OPTIONS = 'servicemanagement/getIncidentOptions';

export const POST_LEISURE_TRAVEL = 'servicemanagement/leisureTravel';

export const POST_ATTACHMENT = 'servicemanagement/attachment';

export const GET_LOCATION_OPTIONS = 'servicemanagement/getLocation';

export const GET_INCIDENT_CI = 'servicemanagement/getIncidentCI';

export const GET_CATEGORY_SUB_ITEMS = 'servicemanagement/getCategorySubcatItems';

export const POST_SUBMIT_INCIDENT = 'servicemanagement/submitIncident';

export const GET_SR_MASTER_CONFIG = 'servicemanagement/getSrMasterConfig';

export const GET_SR_AMADEUS = 'v1/api/servicemanagement/srAmadeus/retrive';

export const POST_IT_SERVICE = 'servicemanagement/itService';
/* --------------------- AEM graphql middle URI ---------------------------*/

export const AEM_GRAPHQL_PATH = '/graphql/execute.json/my-ai';

/* ---------------------------- Roster api --------------------------------------*/
export const GET_ROSTER_DATA = 'psrapi/syncdata/latest';

export const MY_TEAM_ROUTE = '/content/my-ai/in/en/my-team.html';

/* --------------------------- myai-crew Crew --------------------------------------*/

export const CREW = 'crew';
export const CREW_ACTIVITY = 'crewActivity';
export const BID_SAVE = 'bid/save';
export const BID_UPDATE = 'bid/update';
export const BID_DELETE = 'bid/delete';
export const RECENT_SEARCH_SAVE = 'layover/recent-search/save';
export const GET_BID_CARD = 'bid/report';

export const POST_STARRED_STATUS = 'postStarredStatus';
export const GET_STARRED_STATUS = 'getStarredStatus';

/* ACM requests */
export const GET_ACM_DATA_COUNT = 'getAcmDataCount';
export const GET_ACM_DATA = 'getAcmData';
export const GET_ACM_DOCUMENT = 'getDocument';
export const GET_ACM_REQUESTS = 'getAcmRequests';
export const GET_ACM_BASE_MANAGER_REQUESTS = 'getAcmBaseManagerRequests';
export const POST_ACM_REQUEST = 'saveAcmRequest';
export const POST_ACM_DOCUMENTS = 'uploadDocument';
export const UPDATE_ACM_REQUEST = 'updateAcmRequest';

/* EACM Requests */
export const POST_EACM_DOCUMENTS = 'document/upload';
export const UPDATE_EACM_REQUEST = 'updateAcmRequest';
export const POST_EACM_REQUEST = 'request/save';
export const GET_EACM_DOCUMENT = 'fetchDocuments';
export const GET_EACM_REQUESTS = 'geteAcmRequests';

/* Quick Action api */
export const GET_QUICK_ACTION_GENERAL = '/getActionDataForAllEmployees';
export const GET_QUICK_ACTION_CREW = '/getActionDataForCrew';

/* Navigation api   */

export const GET_RECENT_AND_FREQUENTLY_USED_APPS = 'v1/api/analytics/employee';
export const GET_ANALYZE_APP = 'analyzeApp';
export const ADD_APP_COUNTER_FOR_ANALYZE_APP = 'addAppCounter';

export const GET_NAVIGATION = '/content/servlet/default.navigation.json';

/* Employee Dashboard Learning api */
export const EMP_LEARNING = 'v1/api/learning';
export const GET_MANAGER_COURSE_LIST = 'managerCourseList';
export const GET_LEARNING_DATA = '/v1/api/learning/employeeDashboard';

/* Employee Documents ocr api */
export const POST_OCR_DOCUMENT = 'ocrdocument/uploadDocument';
export const POST_SAVE_DOCUMENT = 'saveOcrDocument';
export const GET_FETCH_DOCUMENT = 'fetchDocuments';
export const GET_OCR_DOCUMENT = 'getOcrDocument/docId/';
export const GET_COMPETENCY_CARD = 'competency-card';

/* Learning Management api */
export const GET_COURSE_LIST = 'v1/api/learning/courseListing';
export const ENROLLED_COURSE = 'v1/api/learning/enrollCourse';
export const APPROVE_REJECT_COURSE = '/v1/api/learning/updateCourse';
/* RE-DIRECTION */
/* Employee Dashboard Learning api */
export const GET_AWARDS_DATA = 'v1/api/awardAndAppreciation/getAwardAndAppreciationData';

/* RE-DIRECTION */
export const GET_REDIRECTION_DATA = '/content/dam/my-ai/redirection.json';
/* Get Country list data */
export const GET_COUNTRY_LIST_DATA = '/content/dam/my-ai/countryCodeWithFlag.json';

/** Flying crew board */

export const GET_LEAVE_BALANCE = 'leavebalance/';
export const GET_FLYING_STATS = 'flyingstatistics/';
export const GET_BLOCK_HOURS = 'blockhours/';
export const GET_TAKEOFFS_LANDINGS = 'totalPerformance/';
export const GET_ROSTER_INFO = 'rosterInformation/';
export const GET_DOCUMENTS = 'fetchDocuments';
export const GET_AIRPORTS_LIST = '/v1/getAirportDetailsData';

/* My Board Leave Redirection */
export const MY_BOARD_LEAVE_REDIRECTION_URL = '/content/my-ai/in/en/leave.html';
export const MY_BOARD_LEAVE_REDIRECTION_URL_POC = '/content/myai/us/en/leave-page.html';


/* Workplace config */
export const WORKPLACE_CONFIG = '/content/dam/my-ai/workplace.json';

/* Staff Travel */
export const STAFF_TRAVEL_PNR_LIST = 'v1/api/staff-travel/pnrList/';
export const STAFF_TRAVEL_UPCOMING_TRIP = '/get/upComing';
export const STAFF_TRAVEL_PAST_TRIP = '/get/past';

/* Feedback url */
export const FEEDBACKDG_URL = '/myai-bot/feedback';

/* trip tabs info */
export const COMMON_GET = '/get';
export const STAFF_TRAVEL_LEGS_LIST = 'v1/api/staff-travel/fetch-tabs-info/';
export const STAFF_TRAVEL_FLIGHT_DETAIL = 'v1/api/staff-travel/fetch-flight-detail/';
export const STAFF_TRAVEL_PASSENGER_DETAIL = 'v1/api/staff-travel/fetch-pass-detail/get';
export const STAFF_TRAVEL_CONFIRM_INTENT = 'v1/api/staff-travel/save-intent';
export const STAFF_TRAVEL_BOARDING_PASS = 'v1/api/staff-travel/boarding-pass/get';
export const STAFF_TRAVEL_MAIL_BOARDING_PASS = 'v1/api/staff-travel/boarding-pass/email/notification';
export const STAFF_ADDITIONAL_DETAILS = 'v1/api/employee/additional-details';

/* Servlet calls */
export const GET_QUICK_ACTION_SERVLET = '/default.quickaction.json';
export const AEM_SERVLET_PATH = '/content/servlet';
export const GET_POLICY_DATA_SERVLET = '/default.policy.json?policyCategoryPath=';
export const GET_BANNER_DETAILS_SERVLET = '/default.bannerdetailsres.json?';
export const GET_SELF_SERVICE_PDF_SERVLET = '/default.dynamicpdf.json?';
export const GET_LEAVE_DESCRIPTION_SERVLET = '/default.leave.json?';
export const GET_SERVICE_NOW_DASHBOARD_SERVLET = '/default.servreq.json?';
export const GET_BENEFITS_DATA_SERVLET = '/default.benefits.json?';
export const GET_EELC_PDF_SERVLET = '/default.eelcpdf.json?';
export const GET_BASE_MANAGER_SERVLET = '/default.basemanager.json?';
export const GET_UPCOMING_ALERT_DATA_SERVLET = '/default.upcomingAlerts.json?';

/* API CALLS FOR PAYROLL  */

export const PAY_STATEMENT_FINANCIAL_YEAR = 'v1/api/getFinancialYearAndMonthList?type=';

export const PAY_STATEMENT_BYTE_DATA = 'v1/api/getPayslipAndOffCyclePayslip';
export const TAX_DOCUMENT_FORM16_LIST = 'v1/api/getFileName';
export const TAX_DOCUMENT_BYTE_DATA = 'v1/api/getForm16AndForm12BB';
/* ACM api */
export const GET_SEARCH_FLIGHT = 'searchFlights';
export const GET_VIEW_TRIP_DETAILS = 'getAcmData?requestNo=';
export const POST_WITHDRAW_REQUEST = 'withdrawRequest?requestNo=';
export const GET_GENERATE_PDF = 'getRequestPdf?requestNo=';
export const GET_DISCLAIMER_FROM_AEM = 'default.disclaimer.json?disclaimerCfPath=';

/* Base Manager List */
export const GET_BASE_MANAGER_LIST = '/v1/api/getBaseManagerList';

/** TODO APPROVAL APIS */
export const GET_PENDING_TODOS = 'pendingTodos/';
export const GET_HISTORY_TODOS = 'history/';
export const GET_TODO_DETAILS = 'viewDetail/';
export const GET_TODO_COUNTS = 'todoCount/';
export const GET_TODO_DOCUMENTS = 'getDocument/';
export const GET_TODO_TEAM_ABSENCE = 'getTeamAbsenceList/';
export const GET_TODO_EMP_SEARCH = 'searchGlobal';
export const GET_TODO_RETURN_TO_WORK = 'returnToWorkDate';
export const GET_TODO_TEAM_ABSENCE_COUNT = 'teamAbsenceCount';

/* Todo endpoints */
export const GET_NOC_VISA_REQUEST_LETTER = 'user/getDetail/';
// export const VISA_NOC_CONSTANT = 'visaNoc';
export const UPLOAD_NOC_VISA_DOCUMENT = 'visa/noc/user/uploadDocument';
export const GET_NOC_VISA_DOCUMENT = 'getDocument/visaNoc/';
export const POST_NOC_VISA_REQUEST = 'visa/noc/user/visaNocRequest';
export const GET_ALL_USER_VISA_REQUEST = 'visa/noc/user/allRequests/';
export const GET_VISA_NOC_LETTER = 'visa/noc/getVisaDocument/';

/* myID travel Partner URL */
export const GET_MYID_TRAVEL_PARTNER = '/content/servlet/default.partnerImages.json';

/* FAQ URL */
export const GET_FAQ_SERVLET = '/content/servlet/default.faq.json';

export const GET_MYID_TRAVEL_QUERY_PARAMS = 'fmt=png&wid=148&hei=46';

/** eACM URLs */
export const GET_RECENT_ENGINEERS = '/v1/api/eacm/recentEngineers';
export const SAVE_RECENT_ENGINEERS = '/v1/api/eacm/recentEngineers/save';
export const GET_DOMESTIC_AIRPORT_LIST = '/v1/api/eacm/getAirportDetailsData';
export const GET_EACM_SEARCH_FLIGHT = '/v1/api/eacm/searchFlights';
export const GET_SEARCH_ENGINEER = 'v1/api/eacm/engineer/search';
export const GET_CURRENT_EACM_REQUESTS = '/v1/api/eacm/currentEAcmRequest';
export const GET_HISTORY_EACM = '/v1/api/eacm/historyEAcmRequest';
export const POST_EACM_WITHDRAW_REQUEST = '/v1/api/eacm/request/withdraw';
export const GET_FLIGHT_AVAIL = '/v1/api/eacm/checkFlightAvail';
export const GET_VIEW_EACM_TRIP_DETAILS = '/v1/api/eacm/request/data?requestId=';
export const GET_RECENT_TRIPS = 'v1/api/eacm/getRecentTrips';
export const GET_EACM_CURRENT_HISTORY_SEARCH = '/v1/api/eacm/search';
export const GET_EACM_REQUESTED_SLIP = '/v1/api/eacm/getRequestedSlip';

/** logout URL */
export const MYAI_LOGOUT = 'v1/api/empProfile/logout';

export const FACE_API_MODEL = '/content/dam/my-ai/face-api/models';
