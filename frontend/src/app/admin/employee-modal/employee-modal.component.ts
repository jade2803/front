import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee-modal',
  templateUrl: './employee-modal.component.html',
})
export class EmployeeModalComponent {
  employeeForm: FormGroup;
  isEditMode: boolean;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EmployeeModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.isEditMode = !!data.employee;
    this.employeeForm = this.fb.group({
      name: [
        data.employee?.name || '',
        [Validators.required, Validators.pattern(/^[a-zA-ZÀ-ÿ\s]*$/)] // Validación para solo letras y espacios
      ],
      email: [
        data.employee?.email || '',
        [Validators.required, Validators.email]
      ],
      role: [data.employee?.role || '', Validators.required],
      password: [''], // Contraseña opcional en edición
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      this.dialogRef.close(this.employeeForm.value);
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
