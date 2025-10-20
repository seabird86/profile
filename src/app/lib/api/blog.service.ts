import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogMetadata } from '@app/lib/api/model/blog-metadata';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = `${environment.apiUrl}/api/blogs.json`;

  constructor(private http: HttpClient) { }

  getBlogs(): Observable<BlogMetadata[]> {
    return this.http.get<any[]>(this.apiUrl);
  }


}
