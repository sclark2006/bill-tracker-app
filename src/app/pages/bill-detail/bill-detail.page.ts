import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { BillService } from '../../services/bill.service';
import { Observable } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { Plugins, CameraResultType } from '@capacitor/core';
const { Camera } = Plugins;

@Component({
  selector: 'app-bill-detail',
  templateUrl: './bill-detail.page.html',
  styleUrls: ['./bill-detail.page.scss'],
})
export class BillDetailPage implements OnInit {

  public bill: Observable<any>;
  public billId: string;
  public placeholderPicture = 'assets/img/receipt.png';

  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public actionCtrl: ActionSheetController,
    public alertCtrl: AlertController,
    public billService: BillService,
    private authService: AuthService
    ) { }

  async ngOnInit() {
    this.billId = this.route.snapshot.paramMap.get('id');
    const bill$ = await this.billService.getBill(this.billId);
    this.bill = bill$.valueChanges();
  }

  async showOptions(): Promise<void> {
    const action = await this.actionCtrl.create({
      header: 'Modify your bill',
      buttons: [
        {
          text: 'Delete',
          role: 'destructive',
          icon: 'trash',
          handler: () => {
            this.billService.removeBill(this.billId).then(() => {
              this.router.navigateByUrl('home');
            });
          },
        },
        {
          text: 'Mark as Paid!',
          icon: 'checkmark',
          handler: () => {
            this.billService.payBill(this.billId);
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: 'close',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await action.present();
  }

  async uploadPicture(): Promise<void> {
    const user = await this.authService.getUser();
    if (user.isAnonymous === true) {
      // Redirects to Signup
      const alert = await this.alertCtrl.create({message: "If you want to continue you will need to provide an email and create a password",
                        buttons: [
                            { text: 'Cancel' },
                            { text: 'OK', handler: data => {
                              this.router.navigate(['/signup', this.billId]);
                            },
                          },
                        ]
                      });
      await alert.present();
    } else {
      // Take the picture
    }
  }


}
