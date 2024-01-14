import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseGroupThumbnailComponent } from './course-group-thumbnail.component';

describe('CourseGroupThumbnailComponent', () => {
  let component: CourseGroupThumbnailComponent;
  let fixture: ComponentFixture<CourseGroupThumbnailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CourseGroupThumbnailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CourseGroupThumbnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
