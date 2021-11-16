import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { RestaurentData } from './first-component.model';

@Component({
  selector: 'app-first-component',
  templateUrl: './first-component.component.html',
  styleUrls: ['./first-component.component.css']
})
export class FirstComponentComponent implements OnInit {

  formValue!:FormGroup
  restoModelObj : RestaurentData = new RestaurentData;
  allRestarentData: any;
  showAdd!:boolean;
  showUpdate!:boolean;
  
  constructor(private formBuilder:FormBuilder, private api: ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      email:[''],
      mobile:[''],
      address:[''],
      services:['']
    })
    this.getAllData();
  }

  clickAddResto(){
    this.formValue.reset();
    this.showAdd=true;
    this.showUpdate=false;
  }

  //define our data which is maped via services
  addResto(){
    this.restoModelObj.name = this.formValue.value.name;
    this.restoModelObj.email = this.formValue.value.email;
    this.restoModelObj.mobile = this.formValue.value.mobile;
    this.restoModelObj.address = this.formValue.value.address;
    this.restoModelObj.services = this.formValue.value.services;
    
    this.api.postRestaurent(this.restoModelObj).subscribe(res=>{
      console.log(res);
      alert("Restaurant added Successfully...");

      //Clear form data
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData(); //Auto fetch data when you post or submit (Without refresh)
    },
    err=>{
      alert("Somthing went Wrong...");
    }
    )
  }


  //Get All data
  getAllData(){
    this.api.getRestaurent().subscribe(res=>{
      this.allRestarentData = res;
    })
  }

  //Delete Record
  deleteResto(data:any){
    this.api.deleteRestaurent(data.id).subscribe(res=>{
      alert("Record deleted successfully...")
      this.getAllData();
    })
  }

  //Edit Records
  onEditResto(data:any){
    this.showAdd=false;
    this.showUpdate=true;
    this.restoModelObj.id = data.id;
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['mobile'].setValue(data.mobile);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['services'].setValue(data.services);
  }

  //Update Records
  updateResto(){
    this.restoModelObj.name = this.formValue.value.name;
    this.restoModelObj.email = this.formValue.value.email;
    this.restoModelObj.mobile = this.formValue.value.mobile;
    this.restoModelObj.address = this.formValue.value.address;
    this.restoModelObj.services = this.formValue.value.services;

    this.api.updateRestaurent(this.restoModelObj,this.restoModelObj.id).subscribe(res=>{
      alert("Record Updated");
      let ref = document.getElementById('clear');
      ref?.click();
      this.formValue.reset()
      this.getAllData();
    })
  }

}
