import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload-input',
  templateUrl: './file-upload-input.component.html',
  styleUrls: ['./file-upload-input.component.scss']
})
export class FileUploadInputComponent implements OnInit {
  @Input() public files: File[] = [];

  @Output() filesChange: EventEmitter<File[]> = new EventEmitter<File[]>();

  constructor() { }

  ngOnInit(): void {
  }

  public onDrag(event: Event | DragEvent) {
    event.preventDefault();
  }

  public onDragEnd(event: Event | DragEvent) {
    event.preventDefault();
  }

  public onDragOver(event: Event | DragEvent) {
    event.preventDefault();
  }

  public onDrop(event: Event | DragEvent) {
    event.preventDefault();
    let ev = event as DragEvent;

    for (let i = 0; i < (ev.dataTransfer?.files.length ?? 0); i++) {
      let file = ev.dataTransfer?.files[i];
      this.files.push(file as File);
    }

    this.filesChange.next(this.files);
  }

  public removeFile(event: Event | MouseEvent, file: File) {
    this.files = this.files.filter(x => x != file);
    this.filesChange.next(this.files);
  }
}
