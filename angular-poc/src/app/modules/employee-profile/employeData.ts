export const employeeExperience = [
  {
    companyName: 'TCS',
    address: {
      address1: '309, NH 48, Block A',
      address2: 'Sector 30',
      city: 'Gurugram',
      state: 'Haryana',
      country: 'India',
      pinCode: '122001',
    },
    startDate: '20-sep-2020',
    endDate: '20-sep-2021',
    jobTitle: 'Senior Designer',
    natureOfBusiness: '',
  },
  {
    companyName: 'Air India',
    address: {
      address1: '309, NH 48, Block A',
      address2: 'Sector 30',
      city: 'Gurugram',
      state: 'Haryana',
      country: 'India',
      pinCode: '122001',
    },
    startDate: '19-june-2019',
    endDate: '19-june-2020',
    jobTitle: 'Senior Designer',
    natureOfBusiness: '',
  },
];

export const educationData = [
  {
    educationId: '123456',
    qualificationType: 'qualificationType',
    qualificationName: 'B.E (comp engg.)',
    specialisation: 'specialisation',
    school: 'MySchool 1',
    modeOfEducation: '',
    startMonth: 'Jan',
    startYear: 2021,
    endMonth: 'Aug',
    endYear: 2023,
  },
  {
    educationId: '123456',
    qualificationType: '',
    qualificationName: '12th',
    specialisation: '',
    school: 'MySchool 2',
    modeOfEducation: '',
    startMonth: 'Jan',
    startYear: 2021,
    endMonth: 'Aug',
    endYear: 2023,
  },
];

export const leaveBalanceData = [
  {
    leaveCode: 'PL',
    leaveBalance: '5',
  },
  {
    leaveCode: 'CL',
    leaveBalance: '3',
  },
  {
    leaveCode: 'SL',
    leaveBalance: '5',
  },
  {
    leaveCode: 'ML',
    leaveBalance: '165',
  },
  {
    leaveCode: 'EL',
    leaveBalance: '5',
  },
];

export const myDocuments = [
  {
    title: 'Offer Letter',
    offerLetterDate: '13 Oct 2023',
  },
];
export const myDocumentsConstant = {
  OfferLetter: 'OfferLetter',
  offerLetterLabelForErrorMessage: 'offer letter',
};

export const employerVerificationLettersConstants = {
  documentsType: {
    address: 'proofOfAddress',
    invitation: 'invitationLetterForVisa',
    employment: 'employmentVerificationLetter',
  },
  dropdownJson: {
    heading: 'Employer Verification Letter',
    title:
      'The letters will reflect the request submission date and pre-filled employment details',
    employmentVerificationLetter: {
      cardTitle: 'Employment Verification Letter',
      cardDescription:
        'Proof of employment with Air India can be used for housing and rental applications',
      dropdownLabel: 'Purpose',
      dropdownOptions: [
        {
          value: 'obtaining a housing loan',
          label: 'Housing loan',
        },
        {
          value: 'securing a car loan',
          label: 'Car loan',
        },
        {
          value: 'securing a two wheeler loan',
          label: 'Two wheeler loan',
        },
        {
          value: 'obtaining education loan',
          label: 'Education loan',
        },
        {
          value: 'obtaining a gas connection',
          label: 'Gas connection',
        },
        {
          value: 'acquiring an airport entry pass',
          label: 'Airport entry pass',
        },
        {
          value: 'opening a new bank account',
          label: 'New bank account',
        },
        {
          value: 'providing employment proof',
          label: 'Employment proof',
        },
        {
          value: 'opening a new post office account',
          label: 'New post office account',
        },
        {
          value: 'registering a vehicle under the BH Series',
          label: 'Vehicle registration under the BH Series',
        },
      ],
      downloadButtonIcon: 'download_2',
      downloadButtonLabel: 'Download',
    },
    proofOfAddressLetter: {
      cardTitle: 'Proof of Address Letter',
      cardDescription:
        'Confirmation of your address can be used for loan applications, vehicle purchase and more',
      dropdownLabel: 'Purpose',
      dropdownOptions: [
        {
          value: 'housing loan',
          label: 'Housing loan',
        },
        {
          value: 'a car loan',
          label: 'Car loan',
        },
        {
          value: 'a two wheeler loan',
          label: 'Two wheeler loan',
        },
        {
          value: 'education loan',
          label: 'Education loan',
        },
        {
          value: 'a gas connection',
          label: 'Gas connection',
        },
        {
          value: 'an airport entry pass',
          label: 'Airport entry pass',
        },
        {
          value: 'a new bank account',
          label: 'New bank account',
        },
        {
          value: 'a new post office account',
          label: 'New post office account',
        },
        {
          value: 'vehicle registration under the BH Series',
          label: 'Vehicle registration under the BH Series',
        },
      ],
      downloadButtonIcon: 'download_2',
      downloadButtonLabel: 'Download',
    },
    invitationLetterForVisa: {
      cardTitle: 'Invitation Letter for Visa',
      cardDescription:
        'Letter to supplement a visa application for international travel',
      dropdownLabel: 'Country',
      dropdownOptions: [
        {
          value: 'India',
          label: 'India',
        },
        {
          value: 'Canada',
          label: 'Canada',
        },
      ],
      downloadButtonIcon: 'download_2',
      downloadButtonLabel: 'Download',
    },
  },
};

export const employePersonalDocument = {
  myDocuments: [
    {
      documentType: 'passport',
      content: [
        {
          key: '',
          value: '',
          label: '',
        },
        {
          key: '',
          value: '',
          label: '',
        },
        {
          key: '',
          value: '',
          label: '',
        },
        {
          key: '',
          value: '',
          label: '',
        },
      ],
    },
  ],
};

export const newIDCardData = {
  status: {
    code: 200,
    message: 'SUCCESS',
    errors: null,
  },
  data: {
    callingName: 'test7',
    profileImage:
      'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEAAAAAAAD/2wBDAAQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/2wBDAQQEBAQEBAQEBAQGBgUGBggHBwcHCAwJCQkJCQwTDA4MDA4MExEUEA8QFBEeFxUVFx4iHRsdIiolJSo0MjRERFz/wgARCAJYAlgDASIAAhEBAxEB/8QAHQABAAEFAQEBAAAAAAAAAAAAAAUCAwQGBwgBCf/aAAgBAQAAAAD38AAAABr/ABDzFyi5OdZ7/wBP3wAAAAAAAAAAMDyb5m0TAxcm9tXV/',
  },
};
