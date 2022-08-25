import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DataService } from 'src/app/services/data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  public copy: string;
  all : any ;
  constructor(private dataService: DataService , private toastr : ToastrService) { }

  ngOnInit() {


    this.dataService.getArchivedFiles().subscribe((data:any) => {
      this.all = data;
      console.log("chahrass",data)
    },(err: any) => {
      console.log("errapsp",err)
    })
  }




  removefromArchived(id:any) {



  
    Swal.fire({  
      title: 'Are you sure want to remove this file from Archived?',  
      text: 'If you need any help, please contact us!',  
      icon: 'warning',  
      showCancelButton: true,  
      confirmButtonText: 'Yes, make it!',  
      cancelButtonText: 'No, keep it'  
    }).then((result) => {  
      if (result.value) {  
        
        
        
        this.dataService.UnArchive(id).subscribe(
          (res) => {
            
            console.log("res : ",res);
  
            this.toastr.info('Oops!', 'Your file was removed from archived files!');
     
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
