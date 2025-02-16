import { Component, OnInit } from '@angular/core';
import { SharedService } from '../shared.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent implements OnInit {
  news_array: any;
  constructor(private shared: SharedService) {}

  ngOnInit(): void {
    this.shared.getNews().subscribe(
      (v) => {
        this.news_array = v;
        this.news_array.reverse();
      },
      (e) => {}
    );
  }
}
