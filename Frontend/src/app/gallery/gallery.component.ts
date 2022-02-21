import { Component, OnInit } from '@angular/core';
import { Gallery } from '../Gallery';
import { FormGroup, FormControl } from "@angular/forms";
import { LoginService } from '../services/login.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  form: FormGroup;
  profile: Gallery;
  imageData: string;
  filesToUpload: Array<File> = [];

  constructor(private myservice:LoginService,private http:HttpClient) { }

  ngOnInit(): void {  
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }

  onFileSelect(fileInput: any) {

    this.filesToUpload = <Array<File>>fileInput.target.files;
    //this.product.photo = fileInput.target.files[0]['name'];
    
    // console.log((event.target as HTMLInputElement).files.length)
    // const file = (event.target as HTMLInputElement).files[0];
    // this.form.patchValue({ image: file });
    // const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    // if (file && allowedMimeTypes.includes(file.type)) {
    //   const reader = new FileReader();
    //   reader.onload = () => {
    //     this.imageData = reader.result as string;
    //   };
    //   reader.readAsDataURL(file);
    // }
  }

  onSubmit() {
    console.log(this.form.value.name)   
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    console.log(files);
    formData.append("name",this.form.value.name)

    for(let i =0; i < files.length; i++){
        const fileName=files[i].name.substring(0,files[i].name.indexOf('.'))
        console.log(fileName)
        formData.append("uploads[]", files[i],fileName);
    }

    this.http.post('http://localhost:3000/photos', formData)
    .subscribe(files => console.log('files', files))

  }

}
