import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ConfiguracionServico} from '../../servicios/configuracion.service';
import {Configuracion} from "../../modelo/configuracion.model";

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.css']
})
export class ConfiguracionComponent implements OnInit {
    permitirRegistro: boolean;

    constructor(private router: Router, private configuracionSevicio: ConfiguracionServico) {}

    ngOnInit(): void
    {
        this.configuracionSevicio.getConfiguracion().subscribe(
            (configuracion: Configuracion) => {
                this.permitirRegistro = configuracion.permitirRegistro;
            });
    }

    guardar(): void
    {
        const configuracion = {permitirRegistro: this.permitirRegistro};
        this.configuracionSevicio.modificarConfiguración(configuracion);
        this.router.navigate(['/']);
    }
}
