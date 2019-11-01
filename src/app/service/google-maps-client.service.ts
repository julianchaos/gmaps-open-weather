import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';


@Injectable()
export class GoogleMapsClientService {

	private get url() {
		return 'https://maps.googleapis.com/maps/api';
	}

	constructor(
		private _http: HttpClient
	) {
	}

	findGeocode(address: String) {
		const querystring = this.buildQuerystring({address: address});
		return this._http.get(this.url + '/geocode/json?' + querystring);
	}

	buildQuerystring(object) {
		object.key = environment.googleApiKey;

		return Object.entries(object).map(item => {
			return `${item[0]}=${item[1]}`;
		}).join('&');
	}


}
