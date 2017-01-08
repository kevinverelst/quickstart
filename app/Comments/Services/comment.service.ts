import {Injectable} from "@angular/core";
import {Http, Response, Headers, RequestOptions} from "@angular/http";
import {Observable} from 'rxjs/Rx';
import {Comment} from '../model/comment'
import 'rxjs/add/operator/map';


@Injectable()
export class CommentService {

  constructor(private http: Http) {
  }

  private commentsUrl: string = 'http://localhost:3001/api/comments';
  private headers: Headers = new Headers({'Content-Type': 'application/json'});
  private options: RequestOptions = new RequestOptions({headers: this.headers});


  getComments(): Observable<Comment[]> {
    return this.http.get(this.commentsUrl)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  addComment(body: Object): Observable<Comment[]> {
    let bodyString = JSON.stringify(body);
    return this.http.post(this.commentsUrl, bodyString, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  updateComment(body: Object): Observable<Comment[]> {
    let bodyString = JSON.stringify(body);
    return this.http.put(`${this.commentsUrl}/${body['id']}`, bodyString, this.options)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }

  removeComment(id:string): Observable<Comment[]> {
    return this.http.delete(`${this.commentsUrl}/${id}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error'))
  }
}
