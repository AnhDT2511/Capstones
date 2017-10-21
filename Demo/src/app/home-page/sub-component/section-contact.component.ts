import { Component, OnInit } from '@angular/core';
import {ViewEncapsulation} from '@angular/core'

@Component({
    selector: 'app-section-contact',
    encapsulation: ViewEncapsulation.None,
    template: `
    <section id="contact">
                <div class="container-fluid" style="padding: 0;">
                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <h2>Contact</h2>
                        <form class="form-horizontal" action="/action_page.php">
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">          
                                    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">
                                    <input type="email" class="form-control" id="email" placeholder="Enter email" name="email">
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-12">          
                                    <input type="password" class="form-control" id="pwd" placeholder="Enter password" name="pwd">
                                </div>
                            </div>
                            <div class="form-group">        
                                <div class="col-sm-12">
                                    <button type="submit" class="btn btn-default"><i class="fa fa-paper-plane" aria-hidden="true"></i>&nbsp;Submit</button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-6">
                        <div id="map"></div>
                    </div>
                </div>
            
                <script>
                    function myMap() {
                          var myCenter = new google.maps.LatLng(21.013058, 105.527425);
                          var mapCanvas = document.getElementById("map");
                          var mapOptions = {center: myCenter, zoom: 17};
                          var map = new google.maps.Map(mapCanvas, mapOptions);
                          var marker = new google.maps.Marker({position:myCenter});
                          marker.setMap(map);
    
                          google.maps.event.addListener(marker,'click',function() {
                            var pos = map.getZoom();
                            map.setZoom(9);
                            map.setCenter(marker.getPosition());
                            window.setTimeout(function() {map.setZoom(pos);},3000);
                          });
                    }
                </script>
    
                <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB2LlIj3sk2akFpnpNcXzX9_NS08Xda1sE&callback=myMap"></script>
            </section>
        `,
      styleUrls: ['../home-page.component.css']
})
export class SectionContactComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}
