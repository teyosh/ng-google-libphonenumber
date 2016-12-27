import { Injectable } from '@angular/core';
import * as googleLibphonenumber from 'google-libphonenumber';




@Injectable()
export class GoogleLibphonenumberService {
  constructor() {}
  get PhoneNumberFormat() {
    return googleLibphonenumber.PhoneNumberFormat;
  }
  get PhoneNumberType () {
    return googleLibphonenumber.PhoneNumberType;
  }
  get PhoneNumberUtil() {
    return googleLibphonenumber.PhoneNumberUtil;
  }
  get AsYouTypeFormatter() {
    return googleLibphonenumber.AsYouTypeFormatter;
  }
}