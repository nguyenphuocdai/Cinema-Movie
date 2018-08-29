import { Component, OnInit, ViewChild } from '@angular/core';
import { MovieService } from '../../../../shared/services/movie.service';
import { ListMovie } from '../../../../shared/models/list-movie.model';
import { ScriptService } from 'ngx-script-loader';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Observable } from 'rxjs';
import { appConfig } from '../../../../app.config';

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
  isSuccess: Boolean;
  isAddSuccessfully: Boolean;
  newMovie: ListMovie;
  isShowDialogAddUser: Boolean = false;
  isLoadingDelete: Boolean = false;
  previewImageUpload: any;
  previewImageName: string = '';
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
  isEditSuccessfully: Boolean = false;
  private infoMovie: ListMovie = new ListMovie();
  date: Date = new Date();

  uploadFileData: FormData;

  private editForm: FormGroup;
  selectedMovie: ListMovie;
  showDialogEdit: Boolean = false;

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
      .subscribe((result) => console.log(result))

  }

  ngOnInit() {

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
    this.imageMovie = new FormControl(this.selectedMovie.HinhAnh, [Validators.required]);
    this.startTimeMovie = new FormControl(new Date(this.selectedMovie.NgayKhoiChieu), [Validators.required]);
    this.descriptionMovie = new FormControl(this.selectedMovie.MoTa, [Validators.required]);
    this.agree = new FormControl('', Validators.requiredTrue);
  }

  onSelectedMovie(movie: ListMovie): void {
    this.selectedMovie = movie;
    this.showDialogEdit = true;

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
          }, 8000)
        }, (error) => {
          this.formIsSubmitting = false;
          this.showDialogEdit = false
          console.log(error);
        }
      );

  }
  onChange($event: any): void {
  }
  onEditorChange($event: any): void {
  }
  onReady($event: any): void {
  }
  onFocus($event: any): void {
  }
  onBlur($event: any): void {
  }
  onContentDom($event: any): void {
  }
  onFileUploadRequest($event: any): void {
  }
  onFileUploadResponse($event: any): void {
  }
  onPaste($event: any): void {
  }
  onDrop($event: any): void {
  }

}