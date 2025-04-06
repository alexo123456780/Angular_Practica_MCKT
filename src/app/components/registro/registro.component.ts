import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AutServiceService } from '../../services/aut-service.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-registro',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss'
})



export class RegistroComponent {


  registroForm: FormGroup;
  errorMessage: string = '';
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  uploadType: 'url' | 'file' = 'url';
  isSubmitting: boolean = false;


  constructor(private fb:FormBuilder, private authService:AutServiceService, private router:Router){
    this.registroForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      perfil_usuario: [''],
      upload_type: ['url']
    });

    this.registroForm.get('upload_type')?.valueChanges.subscribe(value => {
      this.uploadType = value;
      
      if (value === 'url') {
        this.selectedFile = null;
        this.imagePreview = null;
      } else {
        this.registroForm.get('perfil_usuario')?.setValue('');
      }
      
      this.updateValidators();
    });
  }
  
  updateValidators(): void {
    const perfilUsuarioControl = this.registroForm.get('perfil_usuario');
    
    if (this.uploadType === 'url') {
      perfilUsuarioControl?.setValidators([Validators.required]);
    } else {
      perfilUsuarioControl?.clearValidators();
    }
    
    perfilUsuarioControl?.updateValueAndValidity();
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      
      const maxSizeMB = 1;
      const maxSizeBytes = maxSizeMB * 1024 * 1024;
      
      if (this.selectedFile.size > maxSizeBytes) {
        this.errorMessage = `La imagen es demasiado grande. El tamaño máximo permitido es ${maxSizeMB}MB.`;
        this.selectedFile = null;
        return;
      }
      
      this.compressAndPreviewImage(this.selectedFile);
    }
  }
  
  compressAndPreviewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const img = new Image();
      img.src = e.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Determinar el tamaño para la compresión
        let width = img.width;
        let height = img.height;
        
        // Redimensionar si es demasiado grande
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 800;
        
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }
        
        canvas.width = width;
        canvas.height = height;
        
        ctx?.drawImage(img, 0, 0, width, height);
        
        // Convertir a base64 con compresión
        this.imagePreview = canvas.toDataURL('image/jpeg', 0.7); // 0.7 es la calidad (70%)
      };
    };
    reader.readAsDataURL(file);
  }
  
  onsubmit(){
    if (this.isSubmitting) return;
    
    if(this.registroForm.valid || (this.uploadType === 'file' && this.selectedFile)){
      this.isSubmitting = true;
      this.errorMessage = '';
      
      const {nombre, email, password, perfil_usuario} = this.registroForm.value;
      
      if (this.uploadType === 'file' && this.selectedFile) {
        // Usar la imagen ya comprimida en formato base64
        if (this.imagePreview && typeof this.imagePreview === 'string') {
          this.authService.registro(nombre, email, password, this.imagePreview).subscribe({
            next: this.handleRegistroResponse.bind(this),
            error: (error) => {
              this.isSubmitting = false;
              console.error('Error en el registro:', error);
              this.errorMessage = error.error?.message || 'Error al registrar usuario. Verifique sus datos.';
            }
          });
        } else {
          this.isSubmitting = false;
          this.errorMessage = 'Error al procesar la imagen';
        }
      } else {
        // Si es una URL, usar el método normal
        this.authService.registro(nombre, email, password, perfil_usuario).subscribe({
          next: this.handleRegistroResponse.bind(this),
          error: (error) => {
            this.isSubmitting = false;
            console.error('Error en el registro:', error);
            this.errorMessage = error.error?.message || 'Error al registrar usuario. Verifique sus datos.';
          }
        });
      }
    } else {
      this.errorMessage = 'Por favor complete todos los campos requeridos';
    }
  }
  
  handleRegistroResponse(response: any) {
    this.isSubmitting = false;
    console.log(`La respuesta es: ${response.message}`);

    if(response && response.data && response.status && response.message){
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data));
      console.log('Intentando navegar al Login...');
      this.router.navigate(['/login'])
        .then(() => console.log('Navegación exitosa al login'))
        .catch(err => console.error('Error en la navegación:', err));
    } else {
      console.log(`Respuesta del servidor: ${response}`);
      this.errorMessage = 'Error en el servidor';
    }
  }






  






}
