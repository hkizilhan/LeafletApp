import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'
import { Latlang } from '../latlang';
import { LatlangService } from '../latlang.service';

@Component({
  selector: 'marker-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './marker-list.component.html',
  styleUrl: './marker-list.component.css'
})
export class MarkerListComponent {

  @Input() latlangs: Latlang[] = []

  constructor (private latlangService: LatlangService) {
  }

  deleteLatlang(id?: number) {
  
    // TODO: error check
    this.latlangService.remove(id)

  }

  centerMarker(latlang: Latlang) {

    this.latlangService.setCurrentLatlang(latlang)
    
  }

}
