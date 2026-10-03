import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 baseApiUrl="https://jsonplaceholder.typicode.com"
  constructor(private http: HttpClient) { }

  getUserData() {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }
  userSearch(searchTerm: string) {
    console.log("searchTerm",searchTerm)
    return this.http.get(`https://jsonplaceholder.typicode.com/posts?userId=${searchTerm}`);
  }
  getUser(){
    return this.http.get("https://jsonplaceholder.typicode.com/users");
  }
  getPost(user:any){
    return this.http.get<any[]>(`${this.baseApiUrl}/posts?userId=${user.id}`);
  }
  getComment(firstPostData:any){
    return this.http.get<Comment[]>(`${this.baseApiUrl}/comments?postId=${firstPostData.id}`);
      
  }
}
