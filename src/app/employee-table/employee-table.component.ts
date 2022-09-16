import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeModel } from './employee-table.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-employee-table',
  templateUrl: './employee-table.component.html',
  styleUrls: ['./employee-table.component.scss'],
})
export class EmployeeTableComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formbuilber: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      EmployeeName: [''],
      EmployeeEmail: [''],
    });

    this.getAllEmployee();
  }
  clickAddEmploye() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postEmployeeDetails() {
    this.employeeModelObj.EmployeeName = this.formValue.value.EmployeeName;
    this.employeeModelObj.EmployeeEmail = this.formValue.value.EmployeeEmail;

    this.api.postEmploye(this.employeeModelObj).subscribe((res) => {
      console.log(res);
      alert('Employee Created SuceessFullY!');
      let ref = document.getElementById('cancel');
      ref?.click();
      this.formValue.reset();
      this.getAllEmployee();
    });
  }

  getAllEmployee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }
  deleteEmploye(id: any) {
    this.api.deleteEmploye(id).subscribe((res) => {
      alert('Employee Deleted');
      window.location.reload();
    });
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['EmployeeName'].setValue(row.EmployeeName);
    this.formValue.controls['EmployeeEmail'].setValue(row.EmployeeEmail);
  }

  updateEmployeeDetails() {
    this.employeeModelObj.EmployeeName = this.formValue.value.EmployeeName;
    this.employeeModelObj.EmployeeEmail = this.formValue.value.EmployeeEmail;

    this.api
      .UpdateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe((res) => {
        alert('Updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmployee();
      });
  }
}
