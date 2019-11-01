import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { SearchComponent } from './component/search/search.component';
import { OpenWeatherComponent } from './component/open-weather/open-weather.component';

import { GoogleMapsClientService } from './service/google-maps-client.service';
import { OpenWeatherClientService } from './service/open-weather-client.service';
import { AddressPoolService } from './service/address-pool.service';

@NgModule({
	declarations: [
		AppComponent,
		SearchComponent,
		OpenWeatherComponent
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,

		FormsModule,
		ReactiveFormsModule,
		MatAutocompleteModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule
	],
	providers: [
		GoogleMapsClientService,
		OpenWeatherClientService,
		AddressPoolService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
