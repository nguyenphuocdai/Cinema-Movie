import { Component, OnInit } from '@angular/core';
import { ListMovie } from '../../../../shared/models/list-movie.model';
import { MovieService } from '../../../../shared/services/movie.service';

@Component({
  selector: 'app-movie-showing',
  templateUrl: './movie-showing.component.html',
  styleUrls: ['../home-page/home-page.component.scss']
})
export class MovieShowingComponent implements OnInit {
  listMovie: ListMovie;
  constructor(private movieService: MovieService, ) {
    window.scrollTo(0, 0);
  }

  ngOnInit() {
    this.getListMovie();
  }
  getListMovie() {
    this.movieService.getListMovie()
      .subscribe(
        (result) => {
          this.listMovie = result;
        },
        (err) => {
          console.log(SERVER_ERROR);
        }
      );
  }
}
