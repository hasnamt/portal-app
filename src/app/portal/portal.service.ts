import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

// import { MessageService } from './message.service';



@Injectable({ providedIn: 'root' })
export class PortalService {

  private postsUrl = 'api/posts';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    // private messageService: MessageService
    ) { }

  /** GET heroes from the server */
  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl)
      .pipe(
        tap(_ => 
            //this.log('fetched posts')
            console.log("test...")
        
        ),
        catchError(this.handleError<Post[]>('getPosts', []))
      );
  }



  /** GET hero by id. Will 404 if id not found */
  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_ => this.log(`fetched Post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

//   /* GET heroes whose name contains search term */
//   searchHeroes(term: string): Observable<Hero[]> {
//     if (!term.trim()) {
//       // if not search term, return empty hero array.
//       return of([]);
//     }
//     return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
//       tap(x => x.length ?
//          this.log(`found heroes matching "${term}"`) :
//          this.log(`no heroes matching "${term}"`)),
//       catchError(this.handleError<Hero[]>('searchHeroes', []))
//     );
//   }

  //////// Save methods //////////

  /** POST: add a new hero to the server */
  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post, this.httpOptions).pipe(
      tap((newPost: Post) => this.log(`added post w/ id=${newPost.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

//   /** DELETE: delete the hero from the server */
//   deleteHero(hero: Hero | number): Observable<Hero> {
//     const id = typeof hero === 'number' ? hero : hero.id;
//     const url = `${this.heroesUrl}/${id}`;

//     return this.http.delete<Hero>(url, this.httpOptions).pipe(
//       tap(_ => this.log(`deleted hero id=${id}`)),
//       catchError(this.handleError<Hero>('deleteHero'))
//     );
//   }

//   /** PUT: update the hero on the server */
//   updateHero(hero: Hero): Observable<any> {
//     return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
//       tap(_ => this.log(`updated hero id=${hero.id}`)),
//       catchError(this.handleError<any>('updateHero'))
//     );
//   }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
    //   this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
   private log(message: string) {
    //  this.messageService.add(`PortalService: ${message}`);
   }
}