import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

   constructor ( private dataService:DataService) {

   }

  archived:any=[] ; 
  starred:any =[] ;
  allfiles:any =[] ;

  ngOnInit() {



    this.dataService.getArchivedFiles().subscribe((data:any) => {
      this.archived = data;
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })



    this.dataService.getFavouritesFiles().subscribe((data:any) => {
      this.starred = data;
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })



    
    this.dataService.getAllFiles().subscribe((data:any) => {
      this.allfiles = data;
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })



  }



}
