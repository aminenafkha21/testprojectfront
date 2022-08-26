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
  imagesize: any ;
  imagep: any ; 

  docp: any ; 
  docsize:any ; 

  videop : any ;
  videosize: any ;

  ngOnInit() {



    this.dataService.getArchivedFiles().subscribe((data:any) => {
      this.archived = data['data'];
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })



    this.dataService.getFavouritesFiles().subscribe((data:any) => {
      this.starred = data['data'];
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })



    
    this.dataService.getAllFiles().subscribe((data:any) => {
      this.allfiles = data['data'];
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })


      
    this.dataService.getstorageImages().subscribe((data:any) => {
      this.imagep = data.pourcentage;
      this.imagesize = data.size;

      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })


    this.dataService.getstorageDoc().subscribe((data:any) => {
      this.docp = data.pourcentage;
      this.docsize = data.size;

      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })


    this.dataService.getstorageVideos().subscribe((data:any) => {
      this.videop = data.pourcentage;
      this.videosize = data.size;

      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })



  }



}
