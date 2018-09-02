import { Component, OnInit, AfterViewInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-movie-coming-soon',
  templateUrl: './movie-coming-soon.component.html',
  styleUrls: ['../home-page/home-page.component.scss']
})
export class MovieComingSoonComponent implements OnInit, AfterViewInit {

  introMovie = [
    { id: 1, url: ('../../../../../assets/img/backgrounds/leaf.jpg'), cate: "Comedy", actor: "Drama", IMB: "9.7", total: "10" },
    { id: 2, url: ('../../../../../assets/img/backgrounds/wynonna.jpg'), cate: "Toham", actor: "Damma", IMB: "8.7", total: "10" },
    { id: 3, url: ('../../../../../assets/img/backgrounds/war-is-coming.jpg'), cate: "Doham", actor: "LaiHam", IMB: "8.6", total: "10" },
    { id: 4, url: ('../../../../../assets/img/backgrounds/drive-angry.jpg'), cate: "NmHam", actor: "Break", IMB: "9.1", total: "10" },
    { id: 5, url: ('../../../../../assets/img/backgrounds/red-sonja.jpg'), cate: "Comedy", actor: "Point", IMB: "9.2", total: "10" },
    { id: 6, url: ('../../../../../assets/img/backgrounds/movie-time11.jpg'), cate: "Comeon", actor: "Continue", IMB: "9.5", total: "10" },
  ]
  constructor() { }

  ngOnInit() {
    console.log(this.introMovie);
  }
  ngAfterViewInit(): void {
    $('.owl-carousel').owlCarousel({
      items: 4,
      lazyLoad: true,
      loop: false,
      margin: 10,
      autoplay: true,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1000: {
          items: 4
        }
      }
    });
  }
}
