
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { GoogleMapsClientService } from '../../service/google-maps-client.service';
import { AddressPoolService } from '../../service/address-pool.service';

@Component({
	selector: 'app-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
	addressCtrl = new FormControl();
	filteredAddress: Observable<any[]>;

	constructor(
		private _googleMapsClientService: GoogleMapsClientService,
		private _addressPoolService: AddressPoolService
	) { }

	ngOnInit() {
		this.filteredAddress = this.addressCtrl.valueChanges
			.pipe(
				startWith(''),
				map(address => address ? this._filterAddress(address) : this._addressPoolService.pool.slice())
			);
	}

	private _filterAddress(value: String): any[] {
		const filterValue = value.toLowerCase();

		return this._addressPoolService.pool.filter(
			address => address.toLowerCase().indexOf(filterValue) >= 0
		);
	}

	onSubmit() {
		this._googleMapsClientService.findGeocode(this.addressCtrl.value)
			.subscribe(
				response => {
					if (response['results'].length === 0) {
						// TODO - show no address error
						return;
					}

					if (response['results'].length > 1) {
						// TODO - show address selector
						return;
					}

					// Saves response address do Address Pool
					this._addressPoolService.addAddress(response['results'][0]);

				},
				error => {
					// TODO - show generic error
				}
			);
	}
}
