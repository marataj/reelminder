import {
  AfterContentInit,
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { SharedService } from '../shared.service';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ModalService } from '../shared/modal.service';
import { Subscription } from 'rxjs';
import { AddEditCourseComponent } from '../add-edit-course/add-edit-course.component';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent implements OnInit, AfterViewInit, OnDestroy {
  public video: any;
  public player: any;
  public course: any;
  public editor: any;
  public notes: any;
  public group: any = null;
  @ViewChild('modal', { read: ViewContainerRef })
  entry!: ViewContainerRef;
  sub!: Subscription;
  constructor(
    private shared: SharedService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: ModalService
  ) {}

  ngOnInit() {
    let course_id = this.route.snapshot.params['id'];

    this.shared.getCourseById(course_id).subscribe((response) => {
      this.course = response;
      this.video = this.course.movie_id;
      this.getNotes();
      if (this.course.group)
        this.shared.getGroupById(this.course.group).subscribe((res) => {
          this.group = res;
        });
    });
    this.startPlayer();
    this.player.cueVideoById(this.course.movie_id);
  }

  ngAfterViewInit(): void {
    // @ts-ignore
    this.editor = new FroalaEditor('#editor');
  }

  ngOnDestroy(): void {
    this.player.destroy();
    if (this.sub) this.sub.unsubscribe();
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
    this.shared.getCourseList().subscribe((response) => {});
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
        playsinline: 1,
      },
      events: {
        onStateChange: this.onPlayerStateChange.bind(this),
        onReady: this.onPlayerReady.bind(this),
      },
    });
  }

  onPlayerReady(event) {}

  onPlayerStateChange(event) {}

  cleanTime() {
    return Math.round(this.player.getCurrentTime());
  }

  addNote() {
    let noteContent = this.editor.html.get();
    let video_time_s = Math.round(this.player.getCurrentTime());
    let note = {
      course: this.course.id,
      content: noteContent,
      time_s: video_time_s,
    };
    this.shared.createNote(this.course.id, note).subscribe((res) => {
      this.getNotes();
    });
  }

  getNotes() {
    this.shared.getNotesListByCourseId(this.course.id).subscribe((res) => {
      this.notes = res;
    });
  }

  setVideoTime(event: { time_s: number }) {
    this.player.seekTo(event.time_s, true);
  }

  deleteCourse() {
    this.shared.deleteCourse(this.course.id).subscribe((res) => {
      this.router.navigate(['courses']);
    });
  }

  deleteCourseModal() {
    let params = {
      title: `Are you sure to delete course "${this.course.title}"?`,
      body_icone: 'question',
      button_icone: `delete`,
    };
    this.sub = this.modalService
      .openModal(this.entry, params, ModalComponent)
      .subscribe((v) => {
        this.deleteCourse();
      });
  }

  createCourseModal(params: any) {
    this.sub = this.modalService
      .openModal(this.entry, params, AddEditCourseComponent)
      .subscribe((v) => {
        setTimeout(() => {
          this.ngOnInit();
        }, 500);
      });
  }
}
