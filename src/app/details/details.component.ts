import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  movieId;
  movieIndex;
  movie;
  movies = [];
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.getMovies();
    this.movieId = this.route.snapshot.params.id;
    this.movieIndex = this.movies.findIndex(movie => movie.id == this.movieId);
    this.movie = this.movies[this.movieIndex];
  }

  getMovies() {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies && Array.isArray(JSON.parse(storedMovies))) {
      this.movies = JSON.parse(storedMovies);
    }
  }

  deleteMovie() {
    this.getMovies();
    this.movies.splice(this.movieIndex, 1);
    localStorage.setItem('movies', JSON.stringify(this.movies));
    this.router.navigate(['']);
  }

}
