import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private BASE_URL: string = environment.Base_Url;


  constructor(private httpClient: HttpClient) { }


  getAllFiles(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/files`);
  }


  
  getArchivedFiles(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/archivedfiles`);
  }

  
  getFavouritesFiles(){

    return this.httpClient.get(`${this.BASE_URL}/api/v1/starredfiles`);
  }



  makeArchive(id:any) {
    return this.httpClient.post(`${this.BASE_URL}/api/v1/archivefile` , {id: id });

  }

  UnArchive(id:any) {
    return this.httpClient.post(`${this.BASE_URL}/api/v1/unarchivefile` , {id: id });

  }

  addtoWishlist(id:any) {
    return this.httpClient.post(`${this.BASE_URL}/api/v1/addtofavourites` , {id: id });

  }

  removeFromWishlist(id:any) {
    return this.httpClient.post(`${this.BASE_URL}/api/v1/removefromfavourites` , {id: id });

  }




  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('files', file);

    const req = new HttpRequest('POST', `${this.BASE_URL}/api/v1/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }
}
