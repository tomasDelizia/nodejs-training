import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Cargos } from "./Cargos";
import { Personas } from "./Personas";
import { Puntajes } from "./Puntajes";

@Index("fk_profesor_persona_idx", ["idPersona"], {})
@Index("fk_profesor_cargo_idx", ["idCargo"], {})
@Entity("profesores", { schema: "capacitacion" })
export class Profesores {
  @Column("int", { primary: true, name: "id_profesor" })
  idProfesor: number;

  @Column("int", { name: "id_cargo", nullable: true })
  idCargo: number | null;

  @Column("int", { name: "id_persona", nullable: true })
  idPersona: number | null;

  @ManyToOne(() => Cargos, (cargos) => cargos.profesores, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_cargo", referencedColumnName: "idCargo" }])
  cargo: Cargos;

  @ManyToOne(() => Personas, (personas) => personas.profesores, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_persona", referencedColumnName: "idPersona" }])
  persona: Personas;

  @OneToMany(() => Puntajes, (puntajes) => puntajes.profesor)
  puntajes: Puntajes[];
}
