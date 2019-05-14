import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders,HttpRequest} from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  private _getUrl = "http://localhost:3000/api/videos";
  private _postUrl = "http://localhost:3000/api/video";
  private _putUrl = "http://localhost:3000/api/video";
  private _deleteUrl = "http://localhost:3000/api/video";

  constructor(public httpClient: HttpClient ) { }

  getVideos(){
    return this.httpClient.get(this._getUrl)
    .pipe(map(response => response));
  }

  addVideo(video : Video){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
   return this.httpClient.post(this._postUrl,JSON.stringify(video),options)
    .pipe(map(response => response));
  }

 updateVideo(video : Video){
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
   });
   let options = {
      headers: headers
   }
   return this.httpClient.put(this._putUrl+video._id,JSON.stringify(video),options)
    .pipe(map(response => response));
  }

  deleteVideo(video : Video){
    return this.httpClient.delete(this._deleteUrl+video._id)
    .pipe(map(response => response));
  }
}
