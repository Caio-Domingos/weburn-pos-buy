import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebhooksService {
  constructor(private http: HttpClient) {}

  pagarmePaid(data: any) {
    return this.http.post(
      environment.functionsUrl + 'api/pagarme/subscriptionPaid',
      data
    );
  }
  guruPaid(data: any) {
    return this.http.post(
      environment.functionsUrl + 'api/guru/subscriptionPaid',
      data
    );
  }
  atommPaid(data: any) {
    return this.http.post(
      environment.functionsUrl + 'api/atomm/transactionPaid',
      data
    );
  }
}
