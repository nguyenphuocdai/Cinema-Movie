import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../../../../shared/services/movie.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy {
  id: number;
  parentRouteId: number;
  currentMovie: any;
  private sub: any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _movieService: MovieService
  ) { }

  ngOnInit() {
    // this.sub = this.route.params.subscribe(params => {
    //   this.id = +params['id']; // (+) converts string 'id' to a number
    //   console.log(this.id);
    // });
    this.sub = this.route.params.subscribe(
      params => {
        this.id = +params['id'];
        this.getDetailMovie();
      });
    console.log(this.sub);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
  getDetailMovie() {
    this._movieService.getDetailMovie(this.id).subscribe((result) => {
      this.currentMovie = result;
      console.log(result);
    });
  }
}
