import { Component, OnInit } from '@angular/core';
import { element } from 'protractor';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styles: [
  ]
})
export class RegistrationComponent implements OnInit {

  hide = true;
  constructor(public service: UserService) { }

  ngOnInit(): void {
    this.service.formModel.reset();
  }

  onSubmit()  {
    this.service.register().subscribe(
      (res:any) =>{
        if(res.succeeded) {
          this.service.formModel.reset();
        } else {
          res.errors.forEach((element: { code: any; }) => {
            switch (element.code) {
              case 'DuplicateUserName':
                //username is aldready taken
                break;

              default:
                //register failed
                break;
            }
          });
        }
      },
      err =>{
        console.log(err);
      },
    )
  }

}
