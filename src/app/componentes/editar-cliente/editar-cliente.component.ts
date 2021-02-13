import {Component, OnInit} from '@angular/core';
import {Cliente} from '../../modelo/cliente.model';
import {ClienteServicio} from '../../servicios/cliente.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'app-editar-cliente',
    templateUrl: './editar-cliente.component.html',
    styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
    cliente: Cliente = {
        nombre: ``,
        apellido: ``,
        email: ``,
        saldo: 0
    };

    id: string;

    // tslint:disable-next-line:max-line-length
    constructor(private clientesServicio: ClienteServicio, private flashMessages: FlashMessagesService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit(): void
    {
        this.id = this.route.snapshot.params.id;
        this.clientesServicio.getCliente(this.id).subscribe
        (cliente => {
            this.cliente = cliente;
        });
    }

    guardar({value, valid}: {value: Cliente, valid: boolean}): void
    {
        if (!valid)
        {
            this.flashMessages.show(`Por favor rellena el formaulario correctamente`, {
                cssClass: `alert-danger`, timeout: 4000
            });
        }
        else
        {
            value.id = this.id;
            // modificar cliente
            this.clientesServicio.modificarCliente(value);
            this.router.navigate([`/`]);
        }
    }

    eliminar(): void
    {
        if (confirm(`¿Seguro que desea eliminar el cliente?`))
        {
            this.clientesServicio.eliminarCliente(this.cliente);
            this.router.navigate([`/`]);
        }
    }
}
