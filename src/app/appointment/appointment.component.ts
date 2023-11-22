import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from 'src/api-services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {
  myForm: FormGroup
  slots_list: Record<string, any>[] = [];
  display_slots: boolean = false;
  specialist = [
    {
      key: 'general',
      name: 'General'
    },
    {
      key: 'heart',
      name: 'Heart'
    },
    {
      key: 'bone',
      name: 'Bones'
    },
  ]
  constructor(
    private _fb: FormBuilder,
    private _appointment_service: AppointmentService
  ) { }

  ngOnInit() {
    this.myForm = this._fb.group({
      specialist: ['', Validators.required],
      date: ['', Validators.required],
      start_time: ['', Validators.required],
      end_time: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log('Form submitted with data:', this.myForm.valid);
    if (this.myForm.valid === false) {
      this.myForm.markAllAsTouched()
    }
    const body = {
      docType: this.myForm.value.specialist,
      date: this.myForm.value.date,
      startTime: this.myForm.value.start_time,
      endTime: this.myForm.value.end_time
    }
    if (this.myForm.valid) {
      // this.slots_list = [
      //   {
      //     specialist: 'General',
      //     doctor: 'Abc',
      //     slot: '04:00 to 05:00'
      //   },
      //   {
      //     specialist: 'General',
      //     doctor: 'Xyz',
      //     slot: '05:00 to 06:00'
      //   },
      //   {
      //     specialist: 'General',
      //     doctor: 'Def',
      //     slot: '04:30 to 05:30'
      //   },
      // ]
      this.display_slots = true;
      this.myForm.reset()
      // ***************api to get slots based on the time selected by user *************
      this._appointment_service.getSlots(body).subscribe({
        next: (res: Record<string, any>) => {
          console.log('res',res);
          
          this.slots_list = res['result'];
          this.display_slots = true
        }, error: () => {
          this.slots_list = []
        }
      })
    }
  }
}
