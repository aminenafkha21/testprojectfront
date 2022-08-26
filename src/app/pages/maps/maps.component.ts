import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
declare const google: any;
import Swal from 'sweetalert2';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

  public copy: string;
  all : any ;
  constructor(private dataService: DataService, private toastr  : ToastrService) { }

  ngOnInit() {


    this.dataService.getFavouritesFiles().subscribe((data:any) => {
      this.all = data['data'];
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })
  }





  removefromWishlist(id:any) {



  
    Swal.fire({  
      title: 'Are you sure want to remove this file from starred?',  
      text: 'If you need any help, please contact us!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, make it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        
        
        
        this.dataService.removeFromWishlist(id).subscribe(
          (res) => {
            
            console.log("res : ",res);
  
            this.toastr.info('Oops!', 'Your file was removed from starred files!');
     
             
            this.ngOnInit() ;

  
          }, (err: any) => {
            console.log(err)
          })
  
          this.ngOnInit();
  
      } else if (result.dismiss === Swal.DismissReason.cancel) {  
        Swal.fire(  
          'Cancelled',  
          'Your file is safe :)',  
          'error'  
        )  
      }  
    })
  
  }
}
