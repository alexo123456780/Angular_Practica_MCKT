<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;


use Illuminate\Foundation\Auth\User as Authenticatable;


class Clientes extends Authenticatable
{

    use HasApiTokens,HasFactory,Notifiable;

    protected $fillable = ['nombre_cliente','email','telefono','direccion','password','perfil_cliente'];
    
}
