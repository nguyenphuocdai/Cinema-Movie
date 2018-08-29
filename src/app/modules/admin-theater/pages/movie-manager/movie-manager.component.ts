import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../../../shared/services/movie.service';
import { ListMovie } from '../../../../shared/models/list-movie.model';
import { ScriptService } from 'ngx-script-loader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RequestOptions, Headers, Http } from '@angular/http';

@Component({
  selector: 'app-movie-manager',
  templateUrl: './movie-manager.component.html',
  styleUrls: ['./movie-manager.component.scss']
})
export class MovieManagerComponent implements OnInit {
  msg: Boolean;
  listMovie: ListMovie;
  mycontent: string;
  log: string = '';
  @ViewChild("myckeditor") ckeditor: any;
  ckeConfig: any;
  ckeditorContent: any;
  previewImageUpload: any;
  previewImageName: string = '';

  isSuccess: Boolean;
  isShowDialogAddUser: Boolean = false;
  isLoadingDelete: Boolean = false;
  isEditSuccessfully: Boolean = false;
  showDialogEdit: Boolean = false;
  isAddSuccessfully: Boolean;
  
  private registerForm: FormGroup;
  private nameMovie: FormControl;
  private trailerMovie: FormControl;
  private imageMovie: FormControl;
  private descriptionMovie: FormControl;
  private startTimeMovie: FormControl;
  private typeGroup: FormControl;
  private viewMovie: FormControl;
  private agree: FormControl;
  private formIsSubmitting: boolean;

  
  private editForm: FormGroup;

  infoMovie: ListMovie = new ListMovie();
  date: Date = new Date();
  uploadFileData: FormData;
  selectedMovie: ListMovie;
  newMovie: ListMovie;

  settings = {
    bigBanner: false,
    timePicker: false,
    format: 'dd-MM-yyyy HH:mm',
    defaultOpen: false
  };

  constructor(
    private movieService: MovieService,
    private _loadScript: ScriptService,
    private datePipe: DatePipe,
    private http: Http
  ) {
    this._loadScript.loadScript('https://cdn.ckeditor.com/4.7.1/full/ckeditor.js')
      .subscribe((result) => {
        console.log(result);
      }, (error) => {
        console.log(error);
      })

  }

  ngOnInit() {
    this.ckeConfig = {
      uiColor: '#e0f2f4',
      allowedContent: true
  }; 
    this.CreateValidatorRegisterForm();
    this.CreateRegisterForm();

    this.getListMovie();
    //ckeditor
    // this.ckeditorContent = '<p>Some html</p>';

  }
  onDateSelect(value) {
    console.log(value);
  }
  getListMovie() {
    this.movieService.getListMovie()
      .subscribe(
        (result) => {
          this.listMovie = result;
        },
        (err) => {
          console.log(SERVER_ERROR);
        }
      );
  }


  private CreateRegisterForm() {
    this.registerForm = new FormGroup({
      nameMovie: this.nameMovie,
      trailerMovie: this.trailerMovie,
      imageMovie: this.imageMovie,
      startTimeMovie: this.startTimeMovie,
      descriptionMovie: this.descriptionMovie,
      typeGroup: this.typeGroup,
      agree: this.agree
    },
    );
  }

  private CreateValidatorRegisterForm() {
    this.nameMovie = new FormControl('', [Validators.required]);
    this.trailerMovie = new FormControl('', [Validators.required]);
    this.typeGroup = new FormControl('GP07', [Validators.required]);
    this.imageMovie = new FormControl('', [Validators.required]);
    this.startTimeMovie = new FormControl(this.date, [Validators.required]);
    this.descriptionMovie = new FormControl('', [Validators.required]);
    this.agree = new FormControl('', Validators.requiredTrue);
  }

  showDialogAdd() {
    this.isShowDialogAddUser = true;
  }

  registerMovie() {
    this.formIsSubmitting = true;
    this.infoMovie.TenPhim = this.nameMovie.value;
    this.infoMovie.Trailer = this.trailerMovie.value;
    this.infoMovie.MaNhom = this.typeGroup.value;
    this.infoMovie.HinhAnh = this.imageMovie.value;
    this.infoMovie.NgayKhoiChieu = this.startTimeMovie.value;
    this.infoMovie.MoTa = this.descriptionMovie.value;
    this.infoMovie.DanhGia = Math.floor(Math.random() * 100).toString();

    this.movieService.addMovie(this.infoMovie)
      .subscribe(
        (result) => {
          this.uploadFileData.append('TenPhim', this.nameMovie.value);
          this.movieService.uploadFileMovie(this.uploadFileData)
            .subscribe((result) => {
              console.log(result)
            });

          setTimeout(() => {
            this.formIsSubmitting = false;
            this.isShowDialogAddUser = false;

            this.isSuccess = true;
            this.isAddSuccessfully = true;

            this.getListMovie();

            this.newMovie = result;
            console.log(result);
          }, 3000)

        }, (error) => {
          this.formIsSubmitting = false;
          console.log(error);
        }
      );

  }
  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      this.uploadFileData = new FormData();
      this.uploadFileData.append('Files', file, file.name);
      this.previewImageName = file.name;
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.previewImageUpload = (<FileReader>event.target).result;
      }
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  deleteMovie(movieId: string) {
    this.movieService.deleteUser(this.movieService.NumberConverter(movieId))
      .subscribe(
        (result) => {
          console.log(result);
          this.getListMovie();
        }
        , (error) => { console.log(error) }
      )
  }
  private sendDelete($event: any, movieId: string): void {
    this.isLoadingDelete = true;
    setTimeout(() => {
      this.msg = true;
      this.isLoadingDelete = false;
      this.deleteMovie(movieId);
    }, 3000)
    setTimeout(() => {
      this.msg = false;
      this.isLoadingDelete = false;
    }, 8000)
  }
  private sendCancel($event: any): void {
    // this.msg = 'Backoff!'
  }
  private CreateEditForm() {
    this.editForm = new FormGroup({
      nameMovie: this.nameMovie,
      trailerMovie: this.trailerMovie,
      imageMovie: this.imageMovie,
      startTimeMovie: this.startTimeMovie,
      descriptionMovie: this.descriptionMovie,
      typeGroup: this.typeGroup,
      agree: this.agree
    },
    );
  }

  private CreateValidatorEditForm() {
    this.nameMovie = new FormControl(this.selectedMovie.TenPhim, [Validators.required]);
    this.trailerMovie = new FormControl(this.selectedMovie.Trailer, [Validators.required]);
    this.typeGroup = new FormControl(this.selectedMovie.MaNhom, [Validators.required]);
    this.imageMovie = new FormControl('', [Validators.required]);
    this.startTimeMovie = new FormControl(new Date(this.selectedMovie.NgayKhoiChieu), [Validators.required]);
    this.descriptionMovie = new FormControl(this.selectedMovie.MoTa, [Validators.required]);
    this.agree = new FormControl('', Validators.requiredTrue);
  }

  onSelectedMovie(movie: ListMovie): void {
    this.showDialogEdit = true;
    this.selectedMovie = movie;
    this.infoMovie.HinhAnh = this.selectedMovie.HinhAnh;
    this.CreateValidatorEditForm();
    this.CreateEditForm();
  }
  updateMovie() {
    this.formIsSubmitting = true;
    this.infoMovie.MaPhim = this.selectedMovie.MaPhim;
    this.infoMovie.TenPhim = this.nameMovie.value;
    this.infoMovie.Trailer = this.trailerMovie.value;
    this.infoMovie.MaNhom = this.typeGroup.value;
    this.infoMovie.HinhAnh = this.imageMovie.value;
    this.infoMovie.NgayKhoiChieu = this.startTimeMovie.value;
    this.infoMovie.MoTa = this.descriptionMovie.value;
    this.infoMovie.DanhGia = Math.floor(Math.random() * 100).toString();
    console.log(this.infoMovie);
    this.movieService.updateMovie(this.infoMovie)
      .subscribe(
        (res) => {
          if (this.uploadFileData !== undefined) {
            this.uploadFileData.append('TenPhim', this.nameMovie.value);
            this.movieService.uploadFileMovie(this.uploadFileData)
              .subscribe((result) => {
                console.log(result)
              });
          }

          setTimeout(() => {
            this.formIsSubmitting = false;
            this.showDialogEdit = false;
            this.isSuccess = true;
            this.isEditSuccessfully = true;
            this.getListMovie();
            this.newMovie = res;
            console.log(res);
          }, 3000)
          setTimeout(() => {
            this.isSuccess = false;
          }, 5000)
        }, (error) => {
          this.formIsSubmitting = false;
          this.showDialogEdit = false
          console.log(error);
        }
      );

  }
  onChange($event: any): void {
    console.log("onChange");
    //this.log += new Date() + "<br />";
  }
  onEditorChange($event: any): void {
    console.log("onEditorChange");
    //this.log += new Date() + "<br />";
  }
  onReady($event: any): void {
    console.log("onReady");
    //this.log += new Date() + "<br />";
  }
  onFocus($event: any): void {
    console.log("onFocus");
    //this.log += new Date() + "<br />";
  }
  onBlur($event: any): void {
    console.log("onBlur");
    //this.log += new Date() + "<br />";
  }
  onContentDom($event: any): void {
    console.log("onContentDom");
    //this.log += new Date() + "<br />";
  }
  onFileUploadRequest($event: any): void {
    console.log("onFileUploadRequest");
    //this.log += new Date() + "<br />";
  }
  onFileUploadResponse($event: any): void {
    console.log("onFileUploadResponse");
    //this.log += new Date() + "<br />";
  }
  onPaste($event: any): void {
    console.log("onPaste");
    //this.log += new Date() + "<br />";
  }
  onDrop($event: any): void {
    console.log("onDrop");
    //this.log += new Date() + "<br />";
  }
}