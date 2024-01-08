import { AfterContentInit, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {
  public video: any;
  public player: any;
  public course: any;

  constructor(private shared: SharedService, private route: ActivatedRoute) {}

  ngOnInit() {
    console.log("INIT")
    let course_id = this.route.snapshot.params['id'];
    this.shared.getCourseById(course_id).subscribe(response => {
      this.course=response;
      this.video = this.course.movie_id;
    })
    this.startPlayer();
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    new FroalaEditor("#editor")
  }

  ngOnDestroy(): void {
    this.player.destroy()
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