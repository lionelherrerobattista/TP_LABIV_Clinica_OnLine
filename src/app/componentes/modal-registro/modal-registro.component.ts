import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-registro',
  templateUrl: './modal-registro.component.html',
  styleUrls: ['./modal-registro.component.css']
})
export class ModalRegistroComponent implements OnInit {

  constructor(private route:Router,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private mdDialogRef: MatDialogRef<ModalRegistroComponent>) { }


  ngOnInit(): void {
  }



  seguirCargando() {

    this.mdDialogRef.close();
  }

  volverAlHome() {
    this.route.navigate(['principal']);
    this.mdDialogRef.close();
  }


}
