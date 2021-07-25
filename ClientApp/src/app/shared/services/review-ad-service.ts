import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IReviewAd } from "src/app/models/review-ad";
import { IReviewAdResponse } from "src/app/models/review-ad-response";

@Injectable({
    providedIn: 'root'
})
export class ReviewAdService {
    private baseUrl = 'api/reviewad';

    constructor(private http: HttpClient) { }    

    review(ad: IReviewAd): Observable<IReviewAdResponse> {
        return this.http.post<IReviewAdResponse>(`${this.baseUrl}`, ad);
    }
}
