import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies = [];
  constructor() { }

  ngOnInit() {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies && Array.isArray(JSON.parse(storedMovies))) {
      this.movies = JSON.parse(storedMovies);
    }
    this.filterMovies('name');
  }

  filterMovies(filter) {
    this.movies.sort((a, b) => (a[filter] > b[filter]) ? 1 : -1);
  }

}
