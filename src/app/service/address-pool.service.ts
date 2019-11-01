import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class AddressPoolService {

	private _pool: Set<String> = new Set();
	public get pool() {
		return Array.from(this._pool);
	}

	private _emitter: EventEmitter<String> = new EventEmitter<String>();
	public get emittter() {
		return this._emitter;
	}

	constructor() {}

	public addAddress(address) {
		this._pool.add(address['formatted_address']);
		this._emitter.emit(address);
	}
}
