import { Component, OnInit } from '@angular/core';
import { DeleteUserService } from '../delete-user-service/delete-user.service';
import { GetAllUserService } from '../service-get-all-user/get-all-user.service';

interface identifiant{
  id:Number
}

const EMPTY_MODEL_ID: identifiant={
  id:0
}



@Component({
  selector: 'app-list-all-user',
  templateUrl: './list-all-user.component.html',
  styleUrls: ['./list-all-user.component.css']
})
export class ListAllUserComponent implements OnInit {

  idDelete: identifiant = { ...EMPTY_MODEL_ID };

  constructor(
    private serviceGetUser: GetAllUserService,
    private serviceDeleteUser:DeleteUserService
  ) { }

  tabUser = [];
  tabSearchResult=[]

  ngOnInit(): void {
    this.serviceGetUser.getAllUser().subscribe({
      next: (res: any) => {
        this.tabUser = res.success;
        console.log(this.tabUser);
      },
      error: (err: any) => {

      }
     })
  }

  deleteUser(id) {
    this.idDelete.id = id;
    this.serviceDeleteUser.delete_user(this.idDelete).subscribe({
       next: (res: any) => {
        const index = this.tabUser.map(e => e.IM).indexOf(this.idDelete);
        this.tabUser.splice(1, index);

      },
      error: (err: any) => {
        return err;
      }
    })
  }

  search(idSearch) {
    const getIndex = this.tabUser.map(e=>e.IM).indexOf(parseInt(idSearch));
    this.tabSearchResult .push(this.tabUser[getIndex]);
    console.log(this.tabSearchResult)
    return this.tabSearchResult;

  }

}
