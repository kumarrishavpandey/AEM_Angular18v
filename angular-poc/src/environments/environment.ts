/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 ~ Copyright 2018 Adobe Systems Incorporated
 ~
 ~ Licensed under the Apache License, Version 2.0 (the "License");
 ~ you may not use this file except in compliance with the License.
 ~ You may obtain a copy of the License at
 ~
 ~     http://www.apache.org/licenses/LICENSE-2.0
 ~
 ~ Unless required by applicable law or agreed to in writing, software
 ~ distributed under the License is distributed on an "AS IS" BASIS,
 ~ WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 ~ See the License for the specific language governing permissions and
 ~ limitations under the License.
 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */
export const environment = {
  appRoot: window.location.origin.includes('benefits')
    ? '/content/my-ai-benefits/in/en/benefits.html'
    : '/content/my-ai/in/en/login.html',
  production: !window.location.origin.includes('localhost'),
  EMP_PROFILE_BASE_URL: 'https://myai-dev.airindia.com/myai-emp',
  EMP_LEAVE_BASE_URL: 'https://myai-dev.airindia.com/myai-lms',
  SERVICE_NOW_BASE_URL: '/myai-sms',
  STAFF_TRAVEL_BASE_URL: '/myai-sts',
  WORK_PLACE_URL: 'https://myai-dev.airindia.com/myai-cms',
  LEARNING_URL: 'https://myai-dev.airindia.com/myai-lrng',
  AEM_BASE_URL:
    new URL(window.location.origin).host === 'myai.airindia.com'
      ? 'https://myai.airindia.com'
      : '/AEMDATA',
  AEM_QA_BASE_URL:'https://myai-qa.airindia.com',
      
  clientId:
    new URL(window.location.origin).host === 'myai.airindia.com' ||
    new URL(window.location.origin).host === 'myai-beta.airindia.com' ||
    new URL(window.location.origin).host === 'compcard.airindiaexpress.com'
      ? '67aa20dc-8e01-45dc-971e-248d612d62cc'
      : '3a418c61-09d9-4e3f-aa96-448e9ee07415',
  authority:
    'https://login.microsoftonline.com/41591cc6-574f-45d5-819b-9a4773330aec/',
  MSAL_REDIRECT_URL: '/content/my-ai/in/en/home.html',
  MSAL_POST_LOGOUT_REDIRECT_URL: '/content/my-ai/in/en/login.html',
  DOCUMENT_OCR_BASE_URL: '/myai-ocr',
  FLYING_CREW_BASE_URL: '/myai-crew',
  COMPETENCY_BASE_URL: '/myai-competency-card',
  TCS_ION_APP_ID: 'c88ebd2f-b796-47e0-a867-f190bbc40c02',
  DISPRZ_APP_ID: '3c4f8b37-c81a-43e8-a503-d35dc0a747a4',
  CHATBOT_ENABLE: 'true',
  MSAL_COMP_CARD_REDIRECTION: '/content/my-ai/in/en/compcard.html',
  DYNAMIC_MEDIA: `https://s7ap1.scene7.com/is/image/${
    new URL(window.location.origin).hostname === 'myai.airindia.com'
      ? 'myAI/'
      : 'myAIstage/'
  }`,
  ROSTER_BG_DYNAMIC_MEDIA_PARAMETER: '?fmt=png',
  CHATBOT_JS_URL: 'https://myaibot-002.airindia.com/assets/myai-chatbot.js',
  CHATBOT_CSS_URL: 'https://myaibot-002.airindia.com/assets/myai-chatbot.css',
  FEEDBACKDG_BASE_URL: 'https://myaibot-001.airindia.com',
  PAYROLL_BASE_URL: '/myai-payroll',
  ACM_BASE_URL: '/myai-acm',
  EACM_BASE_URL: '/myai-acm/v1/api/eacm',
  IFLY_BASE_URL:
    'https://launcher.myapps.microsoft.com/api/signin/88454882-4870-418c-a2b6-ed07f8af81a5?tenantId=41591cc6-574f-45d5-819b-9a4773330aec',
  AIR_INDIA_WEB_LINK: 'https://www.airindia.com',
  IOS_APP_LINK: 'https://apps.apple.com/in/app/air-india/id932302964',
  PLAY_STORE_APP_LINK:
    'https://play.google.com/store/apps/details?id=com.bets.airindia.ui&pcampaignid=web_share',
  STORAGE_ENC: 'airindiaabobeaem',
  AEM_HEADER_URL: 'https://myai-dev.airindia.com/content/experience-fragments',
  TODO_BASE_URL: '/myai-todo',
  TENANT_ID: '41591cc6-574f-45d5-819b-9a4773330aec',
  MSAL_ENVIRONMENT: 'login.windows.net',
  NATIVE_APP_WHITE_LIST: [
    'ai-agent.html',
    'chatbot.html',
    'DG-feedback.html',
    'service-request.html',
    'it-service-request.html',
    'report-incident.html',
    'employee-leisure-travel-query.html',
  ],
  LINK_UNIFORM_MALE:
    'https://outlook.office365.com/owa/calendar/UniformDistributionMaleTest@airindianew.onmicrosoft.com/bookings/',
  LINK_UNIFORM_FEMALE:
    'https://outlook.office365.com/owa/calendar/UniformDistributionFemaleTest@airindianew.onmicrosoft.com/bookings/',
  API_TIMEOUT: 5000,
  DEBUG_MODE: true, // true or false
  MSAL_LOG_LEVEL: 0, // Error = 0, Warning = 1, Info = 2, Verbose = 3, Trace = 4
};
