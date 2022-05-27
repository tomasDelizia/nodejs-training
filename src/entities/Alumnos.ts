import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reparticiones } from "./Reparticiones";
import { Personas } from "./Personas";
import { Puntajes } from "./Puntajes";

@Index("fk_alumnos_reparticion_idx", ["idReparticion"], {})
@Index("fk_alumno_personas_idx", ["idPersona"], {})
@Entity("alumnos", { schema: "capacitacion" })
export class Alumnos {
  @PrimaryGeneratedColumn({ type: "int", name: "id_alumno" })
  idAlumno: number;

  @Column("int", { name: "id_reparticion", nullable: true })
  idReparticion: number | null;

  @Column("int", { name: "id_persona", nullable: true })
  idPersona: number | null;

  @ManyToOne(() => Reparticiones, (reparticiones) => reparticiones.alumnos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([
    { name: "id_reparticion", referencedColumnName: "idReparticion" },
  ])
  reparticion: Reparticiones;

  @ManyToOne(() => Personas, (personas) => personas.alumnos, {
    onDelete: "NO ACTION",
    onUpdate: "NO ACTION",
  })
  @JoinColumn([{ name: "id_persona", referencedColumnName: "idPersona" }])
  persona: Personas;

  @OneToMany(() => Puntajes, (puntajes) => puntajes.alumno)
  puntajes: Puntajes[];
}
