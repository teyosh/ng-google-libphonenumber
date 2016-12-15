/// <reference path="../node_modules/@types/google-libphonenumber/index.d.ts" />

import { Injectable } from '@angular/core';
import glibphonenumber = require('google-libphonenumber');

@Injectable()
export class GoogleLibphonenumberService {
  constructor() {}
  get PhoneNumberFormat() {
    return glibphonenumber.PhoneNumberFormat;
  }
  get PhoneNumberType () {
    return glibphonenumber.PhoneNumberType;
  }
  get PhoneNumberUtil() {
    return glibphonenumber.PhoneNumberUtil;
  }
  get AsYouTypeFormatter() {
    return glibphonenumber.AsYouTypeFormatter;
  }
}