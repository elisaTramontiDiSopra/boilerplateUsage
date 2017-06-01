import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired } from 'angular2-jwt';
import { ApiBaseUrl } from 'app';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthService {
}
