import {AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Configuracion} from '../modelo/configuracion.model';
import {Observable} from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable()
export class ConfiguracionServico
{
    configuracionDoc: AngularFirestoreDocument<Configuracion>;
    configuracion: Observable<Configuracion>;

    // id unico
    id = `1`;

    constructor(private db: AngularFirestore) {}

    getConfiguracion(): Observable<Configuracion>
    {
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracion = this.configuracionDoc.valueChanges();
        return this.configuracion;
    }

    modificarConfiguración(configuracion: Configuracion): void
    {
        this.configuracionDoc = this.db.doc<Configuracion>(`configuracion/${this.id}`);
        this.configuracionDoc.update(configuracion);
    }

}
