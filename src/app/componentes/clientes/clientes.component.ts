import { Component, OnInit } from '@angular/core';
import {ClienteServicio} from '../../servicios/cliente.service';
import {Cliente} from '../../modelo/cliente.model';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit
{
    clientes: Cliente[] = [];

    constructor(private clientesServicio: ClienteServicio) {}

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
        let saldoTotal: number = 0;
        if (this.clientes)
        {
            this.clientes.forEach( cliente =>
            {
                saldoTotal += cliente.saldo;
            });
        }
        return saldoTotal;
    }
}
