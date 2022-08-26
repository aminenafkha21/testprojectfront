import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Home',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/files', title: 'All Files',  icon:'ni-single-copy-04 text-blue', class: '' },
    { path: '/starred', title: 'Starred',  icon:'ni-favourite-28 text-red', class: '' },
    { path: '/archived', title: 'Archived',  icon:'ni-archive-2 text-orange', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  fileInfos?: Observable<any>;


  public menuItems: any[];
  public isCollapsed = true;
  selectedFiles: FileList;
  progressInfos = [];
  message = ''
  constructor(private router: Router,private uploadService: DataService) { }

  ngOnInit() {

    this.fileInfos = this.uploadService.getFiles();

    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }




  
  selectFiles(event) {
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
  }

  upload(idx, file) {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    this.uploadService.upload(file).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {

          this.message = event.body.message;
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      err => {
        this.progressInfos[idx].value = 0;
        this.message = 'Could not upload the file: ' + file.name  + ' ' +  err.error;

        console.log('erramine ' , err)
      });
  }

  uploadFiles() {
    this.message = '';

    for (let i = 0; i < this.selectedFiles.length; i++) {
      console.log('jdsodss',this.selectedFiles[i])
      this.upload(i, this.selectedFiles[i]);
    }
  }
}
