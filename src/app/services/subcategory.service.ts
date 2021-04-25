import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {
  readonly APIUrl = "http://127.0.0.1:8000";
  readonly PhotoUrl = "http://127.0.0.1:8000/media/";
  constructor(private http:HttpClient) { }
  getSubCategoryList():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + '/subcategory/');
  }

  addSubCategory(val:any){
    return this.http.post(this.APIUrl + '/subcategory/',val);
  }

  updateSubCategory(val:any){
    return this.http.put(this.APIUrl + '/subcategory/',val);
  }

  deleteSubCategory(val:any){
    return this.http.delete(this.APIUrl + '/subcategory/'+val);
  }
  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/SaveFile',val);
  }
}