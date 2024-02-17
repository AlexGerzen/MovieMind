import { Component } from '@angular/core';
import { Movie } from 'src/models/movie.class';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent {
  url: string = 'http://www.omdbapi.com/?i=tt3896198&apikey=dd98c964'
  movie: Movie = new Movie();

  constructor() {
    this.fetchMovie(this.url);
  }

  async fetchMovie(url: string) {
    try {
      const response = await fetch(url); // Die URL aufrufen
      if (!response.ok) {
        throw new Error('Fehler beim Abrufen der Daten');
      }
      const data = await response.json(); // Die JSON-Daten aus der Antwort extrahieren
      this.movie = new Movie(data);
      console.log(this.movie);
      
      return data;

    } catch (error) {
      console.error('Fehler beim Abrufen der Daten:', error);
      throw error;
    }
  }
}
