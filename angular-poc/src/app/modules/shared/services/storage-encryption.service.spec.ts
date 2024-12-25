import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { MSAL_GUARD_CONFIG, MsalGuardConfiguration, MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { InteractionType, PopupRequest } from '@azure/msal-browser';
import { StorageEncryptionService } from './storage-encryption.service';
import { AuthService } from './auth.service';

describe('StorageEncryptionService', () => {
  let service: StorageEncryptionService;
  let authServiceStub: { instance: any };
  const routerMock = {
    navigate: jasmine.createSpy('navigate'),
  };

  beforeEach(() => {
    authServiceStub = {
      instance: {
        getAllAccounts: jasmine
          .createSpy('getAllAccounts')
          .and.returnValue([{ username: 'testuser' }]),
        setActiveAccount: jasmine.createSpy('setActiveAccount'),
      },
    };
    const msalGuardConfigStub: MsalGuardConfiguration = {
      authRequest: {} as PopupRequest,
      interactionType: InteractionType.Popup,
    };
    TestBed.configureTestingModule({
      providers: [AuthService, StorageEncryptionService, Router, { provide: Router, useValue: routerMock }, { provide: MsalService, useValue: authServiceStub }, { provide: MSAL_GUARD_CONFIG, useValue: msalGuardConfigStub }],
    });
    service = TestBed.inject(StorageEncryptionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should encrypt and decrypt data correctly', () => {
    const testData = 'Test123';
    const encryptedData = (service as any).encrypt(testData); // accessing protected method
    expect(encryptedData).toBeTruthy(); // Modify as per your actual expectations

    const decryptedData = (service as any).decrypt(encryptedData); // accessing protected method
    expect(decryptedData).toBe(testData);
  });

  it('should retrieve decrypted value from session storage', async () => {
    const testData = 'Test123';
    const key = 'testKey';
    service.setvalue(key, testData);

    const decryptedValue = await service.getDecryptedValueFromSession(key);
    expect(decryptedValue).toBe(testData);
  });

  it('should delete value from session storage', () => {
    const testData = 'Test123';
    const key = 'testKey';
    service.setvalue(key, testData);

    service.deletevalue(key);
    const retrievedValue = sessionStorage.getItem(key);
    expect(retrievedValue).toBeNull();
  });

  it('should set and retrieve access token from local storage', () => {
    const accessToken = 'testAccessToken';
    service.setAccessToken(accessToken);
    const retrievedToken = service.accessToken;
    expect(retrievedToken).toBe(accessToken);

    service.deleteAccessToken();
    const deletedToken = localStorage.getItem('AD_ACCESS_TOKEN');
    expect(deletedToken).toBeNull();
  });

  it('should decrypt value retrieved from session storage', () => {
    const key = 'testKey';
    const testData = 'Test123';
    const encryptedData = (service as any).encrypt(testData);
    spyOn(sessionStorage, 'getItem').and.returnValue(encryptedData);

    const decryptedValue = service.getvalue(key);
    expect(decryptedValue).toBe(testData);
    expect(sessionStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should return empty string if key not found in session storage', () => {
    const key = 'nonExistingKey';
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    const decryptedValue = service.getvalue(key);
    expect(decryptedValue).toBe('');
    expect(sessionStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should reject if value not found in session storage after all attempts', fakeAsync(() => {
    const key = 'testKey';
    spyOn(sessionStorage, 'getItem').and.returnValue(null);

    let rejectedValue: string | null = null;
    service.getValueFromSessionStorage(key, false, 2, 100).catch((error) => {
      rejectedValue = error;
    });

    // Simulate all attempts with delay
    tick(100); // Attempt 1
    tick(100); // Attempt 2
    tick(100); // Attempt 3 (should reject)

    // Value should be rejected with empty string
    expect(rejectedValue).toBe('');
  }));
});
