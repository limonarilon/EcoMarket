Shape de Producto:

package com.example.EcoMarket.Model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor

@Entity
@Table(name = "producto")
public class Model_Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String nombre;

    private int precio;
    private int stock;

    @ManyToMany(mappedBy = "productos")
    private List<Model_Pedido> pedidos;

}


Shape de Usuario:

package com.example.EcoMarket.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "usuario")
public class Model_Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;
    private String nombre;
    private String correo; // Cambiado a "correo" para ser coherente
    @Column(name = "password")
    private String contrasena; // Mapeado a la columna 'password' en la BD
    private String rol;
}
