import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../interfaces/book';

@Injectable({
  providedIn: 'root'
})
export class BookServiceService {

  private apiUrl = 'https://openlibrary.org/subjects/computers.json';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map(data => data.works.map((b: any) => ({
        key: b.key,
        title: b.title,
        edition_count: b.edition_count,
        cover_id: b.cover_id || 0,  // si pas de cover
        first_publish_year: b.first_publish_year || 0,
        subtitle: b.subtitle || '',
        description: typeof b.description === 'string' ? b.description : (b.description?.value || '')
      })))
    );
  }

  getBookById(id: string): Observable<Book> {
    return this.http.get<any>(`https://openlibrary.org/works/${id}.json`).pipe(
      map(b => ({
        key: b.key,
        title: b.title,
        edition_count: b.edition_count,
        cover_id: b.covers?.[0] || 0,
        first_publish_year: b.first_publish_year || 0,
        subtitle: b.subtitle || '',
        description: typeof b.description === 'string' ? b.description : (b.description?.value || '')
      }))
    );
  }

  searchByTitle(title: string): Observable<Book[]> {
    const url = `https://openlibrary.org/search.json?title=${title}`;
    return this.http.get<any>(url).pipe(
      map(data => data.docs.map((b: any) => ({
        key: b.key,
        title: b.title,
        edition_count: b.edition_count || 0,
        cover_id: b.cover_i || 0,
        first_publish_year: b.first_publish_year || 0,
        subtitle: b.subtitle || '',
        description: ''
      })))
    );
  }

  searchByYear(year: number): Observable<Book[]> {
    const url = `https://openlibrary.org/search.json?first_publish_year=${year}`;
    return this.http.get<any>(url).pipe(
      map(data => data.docs.map((b: any) => ({
        key: b.key,
        title: b.title,
        edition_count: b.edition_count || 0,
        cover_id: b.cover_i || 0,
        first_publish_year: b.first_publish_year || 0,
        subtitle: b.subtitle || '',
        description: ''
      })))
    );
  }

}
