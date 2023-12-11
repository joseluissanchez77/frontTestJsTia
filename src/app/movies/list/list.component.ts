import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MovieService } from '../../services/movies/movie.service';
import { UrlParameterStandardI } from '../../../model/generalParameter.interface';
import { Movie, MovieResponseI } from '../../../model/movie.inteface';
import { inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AdditionalResponseI } from '../../../model/additional.interface';
import { Data, TimeLineResponseI } from '../../../model/timeline.interface';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, NgbModule, ReactiveFormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent /*implements  OnInit,OnDestroy */ {
  page: number = 1;
  pageSize: number = 200;
  sort: string = 'product_id';

  start_date: string | null | undefined = '';
  end_date: string | null | undefined = '';
  product_id: string | null | undefined = '';
  search_user: string | null | undefined = '';

  collectionSize: number = 0;

  movieService: MovieService = inject(MovieService);

  @Input() objGetMovies: Movie[] = [];
  @Input() objGetMoviesBest: Movie[] = [];
  @Input() objGetMoviesWorst: Movie[] = [];
  @Input() objGetMoviesTimeLine: Data[] = [];

  formGroupMovies = this.fb.group({
    fcn_producto: [''],
    fcn_usuario: [''],
    fcn_fecha_inicio: [''],
    fcn_fecha_fin: ['' /* ,[this.validateEndDate.bind(this)] */],
  });

  formGroupIndicadores = this.fb.group({
    fcn_cantidad_usuario: [''],
    fcn_maximo_score: [''],
    fcn_minimo_score: [''],
    fcn_promedio_score: [''],
    fcn_total_registros: [''],
  });

  // Función de validación personalizada para comparar fechas
  validateEndDate(control: any) {
    let fecha_inicio: string | null | undefined =
      this.formGroupMovies.get('fcn_fecha_inicio')?.value;

    if (fecha_inicio) {
      const startDate = new Date(fecha_inicio);
      const endDate = new Date(control.value);

      if (endDate < startDate) {
        return { endDateInvalid: true };
      }

      return null;
    }
    return null;
  }
  constructor(private fb: FormBuilder) {
    this.movies();
    this.aditional();
    this.timeline();
  }
  // ngOnDestroy(): void {
  //   throw new Error('Method not implemented.');
  // }
  // ngOnInit(): void {
  //   throw new Error('Method not implemented.');
  // }

  movies() {
    let parameterUrl: UrlParameterStandardI = {
      size: this.pageSize,
      page: this.page,
      sort: this.sort,
      order: 'asc',
      start_date: this.start_date,
      end_date: this.end_date,
      product_id: this.product_id,
      search_user: this.search_user,
    };

    this.movieService.getMoviesPaginate(parameterUrl).subscribe({
      next: (rpt: MovieResponseI) => {
        //console.log(rpt.data);
        this.objGetMovies = rpt.data;
        this.collectionSize = rpt.total_register;
        this.formGroupIndicadores.get('fcn_total_registros')?.setValue(rpt.total_register.toString());
      },
      error: (e: any) => {
        console.log(e);
        // this.loading = false;
      },
    });
  }

  dataCustomerRow(data: Movie) {}

  loadPage(page: number) {
    this.movies();
    this.aditional();
    this.timeline();
  }

  buscarMovies() {
    let producto = this.formGroupMovies.get('fcn_producto')?.value;
    let usuario = this.formGroupMovies.get('fcn_usuario')?.value;
    let fecha_inicio = this.formGroupMovies.get('fcn_fecha_inicio')?.value;
    let fecha_fin = this.formGroupMovies.get('fcn_fecha_fin')?.value;

    this.start_date = fecha_inicio;
    this.end_date = fecha_fin;
    this.product_id = producto;
    this.search_user = usuario;

    this.movies();
  }



  aditional() {
    let parameterUrl: UrlParameterStandardI = {
      size: 10,
      sort: 'score',
      order: 'asc',
      start_date: this.start_date,
      end_date: this.end_date,
      product_id: this.product_id,
      search_user: this.search_user,
    };

    this.movieService.getIndicadores(parameterUrl).subscribe({
      next: (rpt: AdditionalResponseI) => {
        
        this.objGetMoviesBest = rpt.data_best_scores;
        this.objGetMoviesWorst = rpt.data_worst_scores;

        this.formGroupIndicadores.get('fcn_cantidad_usuario')?.setValue(rpt.statistics.amount_user.toString());
        this.formGroupIndicadores.get('fcn_maximo_score')?.setValue(rpt.statistics.max_score.toString());
        this.formGroupIndicadores.get('fcn_minimo_score')?.setValue(rpt.statistics.min_score.toString());
        this.formGroupIndicadores.get('fcn_promedio_score')?.setValue(rpt.statistics.avg_score.toString());


      },
      error: (e: any) => {
        console.log(e);
        // this.loading = false;
      },
    });
  }

  timeline() {
    let parameterUrl: UrlParameterStandardI = {
      size: this.pageSize,
      page: this.page,
      sort: this.sort,
      order: 'asc',
      start_date: this.start_date,
      end_date: this.end_date,
      product_id: this.product_id,
      search_user: this.search_user,
    };

    this.movieService.getLineaTiempo(parameterUrl).subscribe({
      next: (rpt: TimeLineResponseI) => {
        
        this.objGetMoviesTimeLine = rpt.data;

      },
      error: (e: any) => {
        console.log(e);
        // this.loading = false;
      },
    });
  }
  
}
