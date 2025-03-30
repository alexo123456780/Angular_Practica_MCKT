<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clientes;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;


class ClientesAuthController extends Controller
{


    public function login(Request $request){


        try{

            $credencialesValidadas = $request->validate([

                'email' => 'required|string|email',
                'password' => 'required|string|min:4|max:20'
            ]);


            if(Auth::guard('clientes')->attempt($credencialesValidadas)){

                $cliente = Auth::guard('clientes')->user();

                $token = $cliente->createToken('authToken')->plainTextToken;


                return response()->json([

                    'status' => true,
                    'message' => 'Inicio de sesion exitoso',
                    'token' => $token,
                    'data' => $cliente,
                    'code' => 200

                ],200);


            }else{

                return response()->json([

                    'status' => false,
                    'message' => 'credenciales incorrectas',
                    'code' => 400

                ],400);



            }


        }catch(\Illuminate\Validation\ValidationException $e){

            return response()->json([

                'status' => false,
                'message' => 'Ocurrio un error de validacion',
                'warnig' => $e->errors(),
                'code' => 400

            ],400);

        }catch(\Exception $e){

            return response()->json([

                'status' => false,
                'message' => 'Ocurrio un error interno  en la solicitud',
                'warning' => $e->getMessage(),
                'code' => 500

            ],500);


        }



    }





    
}
