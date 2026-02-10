import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Article } from '../models/article.model';

@Injectable({
  providedIn: 'root'
})
export class DevToService {
  private http = inject(HttpClient);
  private readonly DEV_TO_API = 'https://dev.to/api';
  private readonly username = 'pckalyan'; // Replace with your dev.to username
  
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(
      `${this.DEV_TO_API}/articles?username=${this.username}`
    ).pipe(
      map(articles => articles.sort((a, b) => 
        new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
      ))
    );
  }
}