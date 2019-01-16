import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  heading = 'Add New Movie';
  form;
  id;
  movies = [];
  movie;
  movieIndex;
  type = 'add';
  message;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
    ) {
    this.form = fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      year: ['', [Validators.required]],
      image: ['', [Validators.required]]
    });
  }

  get name() { return this.form.get('name'); }
  get description() { return this.form.get('description'); }
  get category() { return this.form.get('category'); }
  get year() { return this.form.get('year'); }
  get image() { return this.form.get('image'); }

  ngOnInit() {
    if (this.route.snapshot.params.id) {
      this.heading = 'Edit Movie Details';
      const movieId = this.route.snapshot.params.id;
      this.getMovies();
      this.movieIndex = this.movies.findIndex(movie => movie.id == movieId);
      if (this.movieIndex > -1) {
        this.movie = this.movies[this.movieIndex];
        this.setValues();
        this.type = 'update';
      }
    }
  }

  getMovies() {
    const storedMovies = localStorage.getItem('movies');
    if (storedMovies && Array.isArray(JSON.parse(storedMovies))) {
      this.movies = JSON.parse(storedMovies);
    }
  }

  addMovie() {
    const newMovie = this.form.value;
    let id = this.generateId();
    let movies = [];

    const storedMovies = localStorage.getItem('movies');
    if (storedMovies && Array.isArray(JSON.parse(storedMovies))) {
      movies = JSON.parse(storedMovies);
      let isIdPresent = movies.findIndex(movie => movie.id == id);
      while (isIdPresent != -1) {
        id = this.generateId();
        isIdPresent = movies.findIndex(movie => movie.id == id);
      }
    }
    newMovie['id'] = id;
    movies.push(newMovie);
    localStorage.setItem('movies', JSON.stringify(movies));
    this.message = 'Movie added successfully';
    this.form.reset();
    setTimeout(() => { this.message = null; }, 3000);
  }

  updateMovie() {
    this.getMovies();
    const holdId = this.movie.id;
    this.movies[this.movieIndex] = this.form.value;
    this.movies[this.movieIndex]['id'] = holdId;
    localStorage.setItem('movies', JSON.stringify(this.movies));
    this.message = 'Movie updated successfully';
    setTimeout(() => {
      this.message = null;
      this.router.navigate(['']);
    }, 3000);
  }

  setValues() {
    (<FormGroup>this.form)
    .setValue({
      name: this.movie.name,
      description: this.movie.description,
      category: this.movie.category,
      year: this.movie.year,
      image: this.movie.image
    });
  }



  generateId() {
    return Math.floor(100000 + Math.random() * 900000);
  }
}
