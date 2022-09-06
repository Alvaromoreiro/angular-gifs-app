import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interfaces/gifs.interfaces';

/*
  Consigue que el servicio sea declarado a nivel global
  providedIn: 'root' 
*/
@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiUrl: string = 'https://api.giphy.com/v1/gifs/search'
  private apiKey: string = 'SID1kuGJ6WMK8diuQnyVrSEuml5yWU0D';
  private limit: number = 10;
  private _historialBusqueda: string[] = [];

  public resultados: Gif[] = [];

  get historialBusqueda() {
    return [...this._historialBusqueda]
  }

  constructor(
    private http: HttpClient
  ){
    this._historialBusqueda = JSON.parse(localStorage.getItem('history')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('lastResult')!) || [];
  }

  buscarGifs( query: string ) {

    query = query.trim().toLowerCase();

    if(!this._historialBusqueda.includes(query)){ 
      this._historialBusqueda.unshift( query ) 
      this._historialBusqueda = this._historialBusqueda.splice(0,10)

      localStorage.setItem('history', JSON.stringify(this._historialBusqueda))
    }

    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('q',query)
      .set('limit',this.limit)

    this.http.get<SearchGifsResponse>(this.apiUrl , { params }).subscribe(
      (resp) => {
        localStorage.setItem('lastResult', JSON.stringify(resp.data))
        this.resultados = resp.data
      }
    )

  }

}
