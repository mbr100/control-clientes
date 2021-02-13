import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ClienteServicio} from '../../servicios/cliente.service';
import {Cliente} from '../../modelo/cliente.model';
import {FlashMessagesService} from 'angular2-flash-messages';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit
{
    clientes: Cliente[] = [];
    cliente: Cliente = {
        nombre: ``,
        apellido: ``,
        email: ``,
        saldo: 0
    };

    @ViewChild('clienteForm') clienteForm: NgForm;
    @ViewChild('bontonCerrar') botonCerrar: ElementRef;

    constructor(private clientesServicio: ClienteServicio, private flashMessages: FlashMessagesService) {}

    ngOnInit(): void {
        this.clientesServicio.getClientes().subscribe(
            clientes => {
                console.log(clientes);
                this.clientes = clientes;
            }, error =>
            {
                console.log(`no se ha podido conectar`);
            }
        );
    }

    getSaldoTotal(): number
    {
        let saldoTotal = 0;
        if (this.clientes)
        {
            this.clientes.forEach( cliente =>
            {
                saldoTotal += cliente.saldo;
            });
        }
        return saldoTotal;
    }

    agregar({value, valid}: {value: Cliente, valid: boolean}): void
    {
        if (!valid)
        {
            this.flashMessages.show(`Por favor rellena el formulario correctamente`, {
                cssClass: `alert-danger`, timeout: 4000
            });
        }
        else
        {
            // Agregar el nuevo cliente
            this.clientesServicio.agregarCliente(value);
            this.clienteForm.resetForm();
            this.cerrarModal();
        }
    }

    private cerrarModal(): void
    {
        this.botonCerrar.nativeElement.click();
    }
}
