import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from './book.model';

@Injectable({ providedIn: 'root' })
export class BooksService {
  private readonly baseUrl = 'https://books.googleapis.com/books/v1/volumes?q=Angular';

  constructor(private http: HttpClient) {}

  getBooks(): Observable<Book[]> {
    const query: string = 'Angular';
    return this.http
      .get<{ items: Book[] }>('https://books.googleapis.com/books/v1/volumes?q=Tolkien')
      .pipe(
        map((books) => {
          return books?.items || []})
      );
  }
}

