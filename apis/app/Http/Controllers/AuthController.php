<?php

namespace App\Http\Controllers;

// Remove the User model import as it's not being used
// use App\Models\User;
use Illuminate\Http\Request;
use App\Models\Usuarios;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;




class AuthController extends Controller{


    public function login(Request $request){

        try{

            $credencialesValidadas = $request->validate([

                'email' => 'required|email|string',
                'password' => 'required|string'
            ]);


            if(Auth::attempt($credencialesValidadas)){

                $user = Auth::user();

                $token = $user->createToken('authToken')->plainTextToken;


                return response()->json([

                    'status' => true,
                    'message' => 'Inicio de sesion exitoso',
                    'token' => $token,
                    'user' => $user,
                    'code' => 200

                ],200);

            }else{


                return response()->json([
                    
                    'status' => false,
                    'message' => 'Credenciales Invalidas',
                    'code' => 400
                ],400);

            }



        }catch(\Illuminate\Validation\ValidationException $e){

            return response()->json([

                'status' => false,
                'message' => 'Ocurrio un error de validacion',
                'warning' => $e->errors(),
                'code' => 400

            ],400);

        }

    }


}

