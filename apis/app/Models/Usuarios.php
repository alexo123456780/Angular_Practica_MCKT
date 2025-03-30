<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Illuminate\Testing\Fluent\Concerns\Has;
use Laravel\Sanctum\HasApiTokens;

use Illuminate\Foundation\Auth\User as Authenticatable;

class Usuarios extends Authenticatable
{

    use HasApiTokens,Notifiable,HasFactory;

    protected $fillable = ['nombre','email','password','perfil_usuario'];


    public function productos(){

        return $this->hasMany(Productos::class,'usuario_id');

    }

    
}
