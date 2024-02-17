export class Movie {
    actors: string;
    awards: string;
    director: string;
    genre: string;
    plot: string;
    poster: string;
    released: string;
    length: string;
    title: string;
    year: number;
    imbdRating: string;

    constructor(movie?: any) {
        this.actors = movie ? movie.Actors : '';
        this.awards = movie ? movie.Awards : '';
        this.director = movie ? movie.Director : '';
        this.genre = movie ? movie.Genre : '';
        this.plot = movie ? movie.Plot : '';
        this.poster = movie ? movie.Poster : '';
        this.released = movie ? movie.Released : '';
        this.length = movie ? movie.Runtime : '';
        this.title = movie ? movie.Title : '';
        this.year = movie ? movie.Year : '';
        this.imbdRating = movie ? movie.imdbRating : '';
    }

    public toJson() {
        return {
            actors: this.actors,
            awards: this.awards,
            director: this.director,
            genre: this.genre,
            plot: this.plot,
            poster: this.poster,
            released: this.released,
            length: this.length,
            title: this.title,
            year: this.year,
            imbdRating: this.imbdRating
        }
    }
}