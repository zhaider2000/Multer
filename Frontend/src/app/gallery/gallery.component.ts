import { Component, OnInit } from '@angular/core';
import { Gallery } from '../Gallery';
import { FormGroup, FormControl } from "@angular/forms";
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  form: FormGroup;
  profile: Gallery;
  imageData: string;

  constructor(private myservice:LoginService) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null),
      image: new FormControl(null),
    });
  }

  onFileSelect(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    const allowedMimeTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (file && allowedMimeTypes.includes(file.type)) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imageData = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    console.log(this.form.value)
    this.myservice.addProfile(this.form.value.name, this.form.value.image);
    this.form.reset();
    this.imageData = null;
  }

}
