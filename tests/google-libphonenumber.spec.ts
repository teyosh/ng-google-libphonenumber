/// <reference path="../node_modules/@types/google-libphonenumber/index.d.ts" />

import { inject, TestBed, getTestBed } from '@angular/core/testing';
import {Injector} from "@angular/core";
import { GoogleLibphonenumberModule, GoogleLibphonenumberService } from '../src/google-libphonenumber.module';


describe('GoogleLibphonenumberService', () => {
  let injector: Injector;
  let PhoneNumberUtil: any;
  let PNF: any;
  let PNT: any;
  let phoneUtil: libphonenumber.PhoneNumberUtil;
  let service: GoogleLibphonenumberService;
  let AsYouTypeFormatter: any;
  beforeEach(() => {
    TestBed.configureTestingModule({
        imports: [GoogleLibphonenumberModule],
        providers: [
          GoogleLibphonenumberService
        ]
    });
    injector = getTestBed();
    service = injector.get(GoogleLibphonenumberService);
    PhoneNumberUtil = service.PhoneNumberUtil;
    phoneUtil = service.PhoneNumberUtil.getInstance();
    PNF = service.PhoneNumberFormat;
    PNT = service.PhoneNumberType;
    AsYouTypeFormatter = service.AsYouTypeFormatter;
  });
  afterEach(() => {
      injector = undefined;
      service = undefined;
      PhoneNumberUtil = undefined;
      phoneUtil = undefined;
      PNF = undefined;
      PNT = undefined;
  });

  it('is defined', () => {
      expect(GoogleLibphonenumberService).toBeDefined();
      expect(service).toBeDefined();
      expect(service instanceof GoogleLibphonenumberService).toBeTruthy();
  });
  describe('PhoneUtil', () => {
    var validNumbers = [
      '202-456-1414',
      '(202) 456-1414',
      '+1 (202) 456-1414',
      '202.456.1414',
      '202/4561414',
      '1 202 456 1414',
      '+12024561414',
      '1 202-456-1414'
    ];

    describe('International Format', function() {
      it('should format a number in the international format', function() {
        validNumbers.forEach(function(value) {
          var phoneNumber = service.PhoneNumberUtil.getInstance().parseAndKeepRawInput(value, 'US');

          expect(phoneUtil.format(phoneNumber, PNF.INTERNATIONAL)).toEqual('+1 202-456-1414');
        });
      });
    });

    describe('E164 Format', function() {
      it('should format a number in the E164 format', function() {
        validNumbers.forEach(function(value) {
          var phoneNumber = phoneUtil.parseAndKeepRawInput(value, 'US');

          expect(phoneUtil.format(phoneNumber, PNF.E164)).toEqual('+12024561414');
        });
      });
    });

    describe('National Format', function() {
      it('should format a number in the national format', function() {
        validNumbers.forEach(function(value) {
          var phoneNumber = phoneUtil.parseAndKeepRawInput(value, 'US');

          expect(phoneUtil.format(phoneNumber, PNF.NATIONAL)).toEqual('(202) 456-1414');
        });
      });
    });

    describe('RFC3966 Format', function() {
      it('should format a number in the RFC3966 format', function() {
        validNumbers.forEach(function(value) {
          var phoneNumber = phoneUtil.parseAndKeepRawInput(value, 'US');

          expect(phoneUtil.format(phoneNumber, PNF.RFC3966)).toEqual('tel:+1-202-456-1414');
        });
      });
    });

    describe('Phone Number Type', function() {
      it('should return a valid phone number type', function() {
        var phoneNumber = phoneUtil.parseAndKeepRawInput(validNumbers[0], 'US');

        expect(phoneUtil.getNumberType(phoneNumber)).toEqual(PNT.FIXED_LINE_OR_MOBILE);
      });
    });

    describe('Malformatted Number', function() {
      it('should throw an error when attempting to format a malformatted number', function() {
        try {
          phoneUtil.parseAndKeepRawInput('111111111111111111111', 'US');

          fail();
        } catch (e) {
          expect(e instanceof Error).toBeTruthy();
          expect(e.message).toEqual('The string supplied is too long to be a phone number');
        }
      });

      it('should return a reason for an invalid number', function() {
        var phoneNumber = phoneUtil.parseAndKeepRawInput('123456', 'US');

        expect(phoneUtil.isPossibleNumber(phoneNumber)).toBeFalsy();
        expect(phoneUtil.isPossibleNumberWithReason(phoneNumber)).toEqual(PhoneNumberUtil.ValidationResult.TOO_SHORT);
      });
    });
  });
  describe('AsYouTypeFormatter', function() {
    it('should format numbers as typed', function() {
      var formatter = new AsYouTypeFormatter('PT');
      var phoneNumber = '912345678';
      var sequence = [
        '9',
        '91',
        '912',
        '912 3',
        '912 34',
        '912 345',
        '912 345 6',
        '912 345 67',
        '912 345 678'
      ];

      for (var i = 0; i < phoneNumber.length; ++i) {
        expect(formatter.inputDigit(phoneNumber.charAt(i))).toEqual(sequence[i]);
      }
    });
  });
});
