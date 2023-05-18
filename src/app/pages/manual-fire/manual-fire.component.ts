import { WebhooksService } from './../../services/webhooks.service';
import { Component } from '@angular/core';

enum Choices {
  PAGARME = 'Pagar.me',
  GURU = 'Guru',
  ATOMM = 'Atomm',
}

@Component({
  selector: 'app-manual-fire',
  templateUrl: './manual-fire.component.html',
  styleUrls: ['./manual-fire.component.scss'],
})
export class ManualFireComponent {
  choices = Choices;
  toSend: Choices = Choices.PAGARME;

  pagarme = this.createPagarme();
  guru = this.createGuru();
  atomm = this.createAtomm();

  constructor(private webhooksService: WebhooksService) {}

  createPagarme() {
    return {
      id: 0,
      event: {
        subscription: {
          customer: {
            email: '',
            name: '',
          },
          plan: {
            id: 0,
          },
        },
      },
    };
  }

  // body.subscriber.email,
  // body.subscriber.name,
  // body.product.marketplace_id,
  // ItemsType.GURU,
  // {},
  // { phone: body.subscriber.phone_number, cpf: body.subscriber.doc }

  createGuru() {
    return {
      subscriber: {
        email: '',
        name: '',
        phone_number: '',
        doc: '',
      },
      product: {
        marketplace_id: 0,
      },
    };
  }

  // if (body.payload.status !== 'APROVADO' || body.evento !== 'pedido') {
  //   return this.res.json({
  //     msg: 'Pedido não aprovado',
  //     body,
  //   });
  // }

  // const order: AttommOrder = await this.atommService.getOrder(
  //   body.payload.id_pedido
  // );

  createAtomm() {
    return {
      evento: 'pedido',
      payload: {
        status: 'APROVADO',
        id_pedido: 0,
      },
    };
  }
  changeTarget(target: any) {
    console.log('target', target.value);

    switch (target.value) {
      case Choices.PAGARME:
        this.pagarme = this.createPagarme();

        break;
      case Choices.GURU:
        this.guru = this.createGuru();

        break;
      case Choices.ATOMM:
        this.atomm = this.createAtomm();

        break;
    }
  }
  save() {
    let sub;
    switch (this.toSend) {
      case Choices.PAGARME:
        sub = this.webhooksService.pagarmePaid(this.pagarme);

        break;
      case Choices.GURU:
        sub = this.webhooksService.guruPaid(this.guru);

        break;
      case Choices.ATOMM:
        sub = this.webhooksService.atommPaid(this.atomm);

        break;
    }

    sub.subscribe({
      next: (res) => {
        console.log('res', res);
      },
      error: (err) => {
        console.log('err', err);
      },
      complete: () => {
        console.log('complete');
      },
    });
  }
}
