import { Component } from '@angular/core';
import { UploadService } from '../../services/file-upload.service';
import { CommonModule } from '@angular/common';




@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})

export class UploadComponent {

  fileContent: string = '';
  errorMessage: string = '';
  isUploaded: boolean = false;

  constructor(private uploadService: UploadService) { }

  onFileChange(event: any): void {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.fileContent = reader.result as string;
      };
      reader.onerror = () => {
        this.errorMessage = 'Failed to read file!';
      };
    }
  }

  uploadToLocalStorage(): void {
    try {
      this.uploadService.saveToLocalStorage(this.fileContent);
      this.errorMessage = '';
      this.isUploaded = true;
    } catch (error) {
      this.errorMessage = 'Failed to save to local storage!';
      console.error(error);
    }
  }
}
