import { Component, OnInit } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html'
})
export class SidebarComponent {

  public historialBusqueda: string[] = [];

  constructor(
    private gifsService: GifsService
  ) { }

  get historial () {
    return this.gifsService.historialBusqueda
  }

  buscar(query: string){
    this.gifsService.buscarGifs(query)
  }
}
