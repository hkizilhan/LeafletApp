import { Component, AfterViewInit, Input } from '@angular/core';
import * as L from 'leaflet';

import { LatlangService } from '../latlang.service'

import { Latlang } from '../latlang'

@Component({
  selector: 'leaflet-map',
  standalone: true,
  imports: [],
  templateUrl: './leaflet-map.component.html',
  styleUrl: './leaflet-map.component.css'
})
export class LeafletMapComponent implements AfterViewInit {

  @Input() latlangs: Latlang[] = []

  defaultZoom = 12
  latlng = new L.LatLng(40.90469073272855, 29.204406738281254)
  
  private map!: L.Map

  private initMap(): void {

    const baseMapURl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    this.map = L.map('map', {
      center: this.latlng,
      zoom: this.defaultZoom
    })
    L.tileLayer(baseMapURl, {
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.map)

    this.map.on("moveend", (event => this.onMapMoveEnd(event)));

  }

  constructor(private latlangService: LatlangService) {
    // Fix: Leaflet icon paths
    let DefaultIcon = L.icon({
      iconUrl: '/media/marker-icon.png',
      shadowUrl: '/media/marker-shadow.png',
      iconAnchor:   [12, 41], // point of the icon which will correspond to marker's location
      shadowAnchor: [12, 41],  // the same for the shadow
      popupAnchor:  [-3, -50] // point from which the popup should open relative to the iconAnchor
    })
    L.Marker.prototype.options.icon = DefaultIcon
    
    // register current latlang observable for centering map
    latlangService.currentLatlangObs.subscribe((newLatlan) => {
      this.map.setView([newLatlan.lat, newLatlan.lng], this.defaultZoom)
    })
  }

  ngAfterViewInit(): void {
    // Deferred map initialization, after Angular preparing dom element 
    this.initMap()
  }

  onMapMoveEnd(event: L.LeafletEvent): void {
    this.latlng = this.map.getCenter()
  }

  setMarker() {
    this.latlng = this.map.getCenter()
    
    this.latlangService.add({
        lat: this.latlng.lat, 
        lng: this.latlng.lng,
        datetime: "from client"
      })
  }

  
  updateMarkers(){
    // clean markers
    this.map.eachLayer((layer)=>{
      if (layer.options.pane == "markerPane"){
        layer.remove()
      }
    })

    // Add markers
    this.latlangs.forEach((latlang) => {
      const marker = L.marker([latlang.lat, latlang.lng])
      marker.addTo(this.map)
    })
  }

  ngOnChanges() {
    if (this.map){
      this.updateMarkers()
    }else{
      // Delay markers update for first render
      setTimeout(() => {
        this.updateMarkers()
      }, 500)
    }
    

  }

}
