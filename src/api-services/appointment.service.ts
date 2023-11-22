import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AppointmentService {

    constructor(
        private http: HttpClient
    ){}
    
    getSlots(body:Record<string,any>){
        return this.http.post('http://localhost:5050/docavailability',body)
    }
}