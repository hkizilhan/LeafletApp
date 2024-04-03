import { Component } from '@angular/core';

import { LeafletMapComponent } from './leaflet-map/leaflet-map.component'
import { MarkerListComponent } from './marker-list/marker-list.component'
import { LatlangService } from './latlang.service'
import { Latlang } from './latlang'


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LeafletMapComponent, MarkerListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  latlangs: Latlang[] = []

  constructor (private latlangService: LatlangService) {
    
    latlangService.latlangsObs.subscribe((newLatlangs) => {
      this.latlangs = [...newLatlangs]
    })

  }

  ngOnInit(): void {
    
    this.latlangService.getAll()
  }


  downloadJson() {
    // Download Json
  }
}
