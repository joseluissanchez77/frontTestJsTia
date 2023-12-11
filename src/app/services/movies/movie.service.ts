import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UrlParameterStandardI } from '../../../model/generalParameter.interface';
import { Observable } from 'rxjs';
import { MovieResponseI } from '../../../model/movie.inteface';
import { AdditionalResponseI } from '../../../model/additional.interface';
import { TimeLineResponseI } from '../../../model/timeline.interface';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  URL_API = environment.apiUrl;

  constructor(private http:HttpClient) { }

  getMoviesPaginate(dataOption? :UrlParameterStandardI):Observable<MovieResponseI>{


    // Crea una nueva instancia de HttpParams
    let params = new HttpParams();
    // Agrega los parámetros solo si no están vacíos
    if (dataOption) {
      if (dataOption.size) params = params.set('size', dataOption.size.toString());
      if (dataOption.page) params = params.set('page', dataOption.page.toString());
      if (dataOption.sort) params = params.set('sort', dataOption.sort);
      if (dataOption.order) params = params.set('order', dataOption.order);
      if (dataOption.start_date) params = params.set('start_date', dataOption.start_date);
      if (dataOption.end_date) params = params.set('end_date', dataOption.end_date);
      if (dataOption.product_id) params = params.set('product_id', dataOption.product_id.toString());
      if (dataOption.search_user) params = params.set('search_user', dataOption.search_user);
    }


    let direcion =`${this.URL_API}movies`;

    return this.http.get<MovieResponseI>(direcion,{ params: params });

  }

  getIndicadores(dataOption? :UrlParameterStandardI):Observable<AdditionalResponseI>{


    // Crea una nueva instancia de HttpParams
    let params = new HttpParams();
    // Agrega los parámetros solo si no están vacíos
    if (dataOption) {
      if (dataOption.size) params = params.set('size', dataOption.size.toString());
      if (dataOption.sort) params = params.set('sort', dataOption.sort);
      if (dataOption.order) params = params.set('order', dataOption.order);
      if (dataOption.start_date) params = params.set('start_date', dataOption.start_date);
      if (dataOption.end_date) params = params.set('end_date', dataOption.end_date);
      if (dataOption.product_id) params = params.set('product_id', dataOption.product_id.toString());
      if (dataOption.search_user) params = params.set('search_user', dataOption.search_user);
    }


    let direcion =`${this.URL_API}movies/additional`;

    return this.http.get<AdditionalResponseI>(direcion,{ params: params });

  }



  getLineaTiempo(dataOption? :UrlParameterStandardI):Observable<TimeLineResponseI>{

    // Crea una nueva instancia de HttpParams
    let params = new HttpParams();
    // Agrega los parámetros solo si no están vacíos
    if (dataOption) {
      if (dataOption.size) params = params.set('size', dataOption.size.toString());
      if (dataOption.page) params = params.set('page', dataOption.page.toString());
      if (dataOption.sort) params = params.set('sort', dataOption.sort);
      if (dataOption.order) params = params.set('order', dataOption.order);
      if (dataOption.start_date) params = params.set('start_date', dataOption.start_date);
      if (dataOption.end_date) params = params.set('end_date', dataOption.end_date);
      if (dataOption.product_id) params = params.set('product_id', dataOption.product_id.toString());
      if (dataOption.search_user) params = params.set('search_user', dataOption.search_user);
    }


    let direcion =`${this.URL_API}movies/timeline`;

    return this.http.get<TimeLineResponseI>(direcion,{ params: params });

  }
}
