import { Injectable } from '@angular/core';
import { Latlang } from './latlang'
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn: 'root'})
export class LatlangService {

  latlangs: Latlang[] = []
  
  private _latlangsData: Subject<Latlang[]> = new Subject<Latlang[]>()
  public latlangsObs = this._latlangsData.asObservable()

  private _currentLatlang: Subject<Latlang> = new Subject<Latlang>()
  public currentLatlangObs = this._currentLatlang.asObservable()


  constructor(private http: HttpClient) { 
    
    this._latlangsData.next(this.latlangs)

  }

  add(latlang: Latlang) {
    
    this.http.post("/api", {latlang}).subscribe((data) => {
      this.getAll()
    })

  }

  remove(id?: number) {
    
    this.http.delete(`/api/${id}`).subscribe((data => {
      this.getAll()
    }))

  }

  getAll(): void {
    
    this.http.get<any>("/api").subscribe((data) => {
      this._latlangsData.next(data)
    })

  }

  setCurrentLatlang(latlang: Latlang){

    this._currentLatlang.next(latlang)

  }

}
