import { Component, ApplicationRef } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Push, PushToken } from '@ionic/cloud-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public push: any;
  public pushToken: string;
  public messages = [];
  public clicked: Boolean = false;
  constructor(public navCtrl: NavController, push: Push, private applicationRef: ApplicationRef) {
    this.push = push;
  }

  private processPush(msg, that) {
    console.log('Push notification message received');
    console.log(msg);
    this.messages.push({
      title: msg.title,
      text: msg.text
    })
    this.applicationRef.tick();
  }

  registerPush() {
    this.clicked = true;

    this.push.register().then((t: PushToken) => {
      return this.push.saveToken(t);
    }).then((t: PushToken) => {

      this.push.rx.notification().subscribe(msg => this.processPush(msg, this));

      console.log('Token saved:', t.token);
      this.pushToken = t.token;
    }, (err) => {
      alert('Token error');
      console.log(err);
    });

  }
}

