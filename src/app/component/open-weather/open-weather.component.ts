import { Component, OnInit } from '@angular/core';

import { AddressPoolService } from '../../service/address-pool.service';
import { OpenWeatherClientService } from '../../service/open-weather-client.service';

@Component({
	selector: 'app-open-weather',
	templateUrl: './open-weather.component.html',
	styleUrls: ['./open-weather.component.sass']
})
export class OpenWeatherComponent implements OnInit {

	private _current;
	public get current() {
		return this._current;
	}

	private _forecast;
	public get forecast() {
		return this._forecast;
	}

	constructor(
		private _addressPoolService: AddressPoolService,
		private _openWeatherClientService: OpenWeatherClientService
	) { }

	ngOnInit() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(location => {
				const { latitude, longitude } = location.coords;
				this.loadLocation(latitude, longitude);
			});
		}

		this._addressPoolService.emittter.subscribe(
			address => {
				const {lat, lng} = address.geometry.location;
				this.loadLocation(lat, lng);
			});
	}

	private loadLocation(lat, lng) {
		this._openWeatherClientService.getCurrent(lat, lng).subscribe(
			response => {this._current = response['main']}
		);
		this._openWeatherClientService.getFiveDaysForecast(lat, lng).subscribe(
			response => {this._forecast = response['list']}
		);

	}

}
