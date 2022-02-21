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
  imagesData: string[]=[];
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
    
    
    // this.form.patchValue({ image: file });

    //preview multiple images
    
    for(let i =0; i < this.filesToUpload.length; i++) 
    {

      const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (this.filesToUpload[i] && allowedMimeTypes.includes(this.filesToUpload[i].type)) {
        const reader = new FileReader();
        reader.onload = () => {
      // preview image
          this.imagesData.push(reader.result as string)
        };
        reader.readAsDataURL(this.filesToUpload[i])
    }}

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
