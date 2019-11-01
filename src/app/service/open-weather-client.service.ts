import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

@Injectable()
export class OpenWeatherClientService {

	private get url() {
		return 'https://api.openweathermap.org/data/2.5';
	}

	constructor(
		private _http: HttpClient
	) {
	}

	public getCurrent(lat, lon) {
		const querystring = this.buildQuerystring({lat: lat, lon: lon});
		return this._http.get(this.url + '/weather?' + querystring );
	}

	public getFiveDaysForecast(lat, lon) {
		const querystring = this.buildQuerystring({lat: lat, lon: lon});
		return this._http.get(this.url + '/forecast?' + querystring );
	}

	buildQuerystring(object) {
		object.appid = environment.openWeatherApiKey;
		object.units = 'metric'; // temperature units as celsius

		return Object.entries(object).map(item => {
			return `${item[0]}=${item[1]}`;
		}).join('&');
	}
}
