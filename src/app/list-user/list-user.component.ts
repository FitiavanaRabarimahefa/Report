import { GetListInvitationService } from './../get-list-invitation-service/get-list-invitation.service';
import { Component, OnInit } from '@angular/core';
import { ValidationService } from '../validation-service/validation.service';
import { NgToastService} from 'ng-angular-popup';
import { DeleteUserService } from '../delete-user-service/delete-user.service';

interface search_mail {
  mail: String
}
interface identifiant {
  id:Number
}

const EMPTY_MODEL: search_mail = {
  mail: '',
};

const EMPTY_MODEL_delete:identifiant = {
  id:0,
};

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  confirm_validation: search_mail = { ...EMPTY_MODEL }
  apply_delete: identifiant = { ...EMPTY_MODEL_delete };

  constructor(
    private getInvitation: GetListInvitationService,
    private validate_mail: ValidationService,
    private deleteService:DeleteUserService,
    private toast:NgToastService
  ) { }
  tabList:any=[];

  ngOnInit(): void {
       this.getInvitation.get_invitation().subscribe({
        next:(res:any)=>{
           this.tabList=res.data;
        },
        error:(err:any)=>{
           return err;
        }
       })
  }

  delete(user_id) {
    this.apply_delete.id = user_id;
    console.log(this.apply_delete);
    this.deleteService.delete_user(this.apply_delete).subscribe({
      next: (res: any) => {
        if (res.success) {
          this.toast.success({ detail: "Suppression de compte ", summary: "le compte a été bien supprimer", duration: 2000 })
        }
        
      }, error:(err: any)=>{
        return err;
      }
      
    })
    
  }
  validate(mail){
    this.confirm_validation.mail = mail;
    this.validate_mail.validation(this.confirm_validation).subscribe({
      
      next: (res: any) => {
        if (res.success) {
          console.log(this.confirm_validation);
          this.toast.success({ detail: "Validation de compte ", summary: "Validation de compte avec succés", duration: 2000 })
        }
        
      }, error: (err: any) => {
        return err;
      }
    })
  }

}
