import { Component, OnInit } from '@angular/core';
import { Video } from '../video';
import { VideoService } from '../video.service';

@Component({
  selector: 'app-video-center',
  templateUrl: './video-center.component.html',
  styleUrls: ['./video-center.component.css'],
  providers:[VideoService]
})
export class VideoCenterComponent implements OnInit {
  videos: Array<Video>;
  SelectedVideo :Video;
    private hideNewVideo : boolean = true;
  constructor(private _videoService:VideoService) { }

  ngOnInit() {
    this._videoService.getVideos()
    .subscribe((res)=>{
      this.videos=Object(res);
    });
  }

  onSelectVideo(video:any){
    this.SelectedVideo = video;
    this.hideNewVideo = true;
    console.log(this.SelectedVideo);
  }

  onSubmitAddVideo(video : Video){
    this._videoService.addVideo(video).subscribe(nv=>{
      this.videos.push(Object(nv));
      this.SelectedVideo = Object(nv);
      this.hideNewVideo = true;

    })
  }

  onUpdateVideoEvent(video : any){
    this._videoService.updateVideo(video).subscribe(nv=> video = nv);
    this.SelectedVideo = null;

  }
 
  onDeleteVideoEvent(video : any){
    let videoArray = this.videos;
    this._videoService.deleteVideo(video).subscribe(nv=> {
      for(let i = 0; i<videoArray.length; i++){
        if(videoArray[i]._id == video._id){
          videoArray.slice(i,1);
        }
      }
    });
    //this.videos = videoArray;
    this.SelectedVideo = null;
  }

  newVideo(){
    this.hideNewVideo = false;
  }  
}
