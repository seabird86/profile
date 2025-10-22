import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Params } from '@app/lib/constants/constants';
import { BlogMetadata } from '@app/lib/api/model/blog-metadata';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private apiUrl = `${environment.apiUrl}/api/blogs.json`;

  constructor(private http: HttpClient) { }

  getBlogs(params: HttpParams): Observable<BlogMetadata[]> {
    return this.http.get<BlogMetadata[]>(this.apiUrl, { params }).pipe(
      map((val: BlogMetadata[]) => {
        if (params.has('tag')) {
          val = val.filter(e => e.attributes.tags.find(el => el.toLowerCase() == params.get('tag')));
        }
        let page: number = parseInt(params.get(Params.PAGE) ?? '1');
        let size: number = parseInt(params.get(Params.SIZE) ?? '10');
        return val.slice(page * size - size, page * size);
      }));
  }


}
