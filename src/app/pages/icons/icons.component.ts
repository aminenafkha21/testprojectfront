import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {

  public copy: string;
  all : any ;
  constructor(private dataService: DataService, private toastr : ToastrService) { }

  ngOnInit() {


    this.dataService.getAllFiles().subscribe((data:any) => {
      this.all = data;
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })
  }




  starred(id:any) {



  
    Swal.fire({  
      title: 'Are you sure want to add this file to wishlist?',  
      text: 'If you need any help, please contact us!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, make it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        
        
        
        this.dataService.addtoWishlist(id).subscribe(
          (res) => {
            
            console.log("res : ",res);
  
            this.toastr.info('Oops!', 'Your file was added to starred files!');
     

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



  
  archive(id:any) {



  
    Swal.fire({  
      title: 'Are you sure want to achive this file?',  
      text: 'If you need any help , please contact us!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, make it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        
        
        
        this.dataService.makeArchive(id).subscribe(
          (res) => {
            
            console.log("res : ",res);
  
            this.toastr.info('Oops!', 'Your file was archived!');
    
    
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
