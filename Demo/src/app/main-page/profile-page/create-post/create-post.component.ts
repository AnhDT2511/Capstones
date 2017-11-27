import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  tourPost : any = {};
  listTourDetail : any = [{checkbox : []}];
  options = [
    {name:'motorcycle', value:'1'},
    {name:'taxi', value:'2'},
    {name:'bus', value:'3'},
    {name:'train', value:'4'}
  ]
  constructor() { }
  showList(){
    console.log(this.listTourDetail);
  }

  saveTourPost(){
    
  }
  
  addMoreDetails(){
    this.listTourDetail.push({checkbox : []});
  }
  ngOnInit() {
  }

}
