import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit, AfterViewInit {
  public video: any;
  public player: any;

  constructor(private shared: SharedService) {}

  ngOnInit() {
    this.video = 'dTLAWHWvtew';
    this.startPlayer();
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    new FroalaEditor("#editor")
  }

  startPlayer() {
    /**
     * Function responsible for starting youtube player.
     */
    var tag = document.createElement('script');
    tag.src = 'http://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = () => this.initPlayer();
    this.shared.getCourseList().subscribe(response => {
      console.log(response);
    })
  }

  initPlayer() {
    /**
     * Function responsible for initializing youtube player.
     */
    this.player = new window['YT'].Player('player', {
      videoId: this.video,
      playerVars: {
        autoplay: 1,
        modestbranding: 1,
        controls: 1,
        disablekb: 1,
        rel: 0,
        showinfo: 0,
        fs: 0,
        playsinline: 1
      },
      events: {
        'onStateChange': this.onPlayerStateChange.bind(this),
        'onReady': this.onPlayerReady.bind(this),
      }
    });
  }

  onPlayerReady(event) {
  }

  onPlayerStateChange(event) {
  }
      
  cleanTime() {
    return Math.round(this.player.getCurrentTime())
  }

}