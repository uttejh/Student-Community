<?php

namespace App\Http\Controllers;

use Request;
use Response;
use App\Users;
use Illuminate\Database\Eloquent\Model;

// use App\Http\Requests;

class LoginCtrl extends Controller
{
    public function login(){
    	$detalis = Request::all();

    	$username = $detalis['username'];
    	$password = $detalis['password'];

    	$usercount = Users::where('username','=',$username)->where('password','=',md5($password))->count();

    	if($usercount == 1)
    	{
    		$user = Users::select('token','role')->where('username','=',$username)->where('password','=',md5($password))->first();
    	
    		return array('statusCode'=>'202','message'=>$user['token'],'role'=>$user['role'],'name'=>$username );
    	}
        else
        {
            return 'Invalid Username/password';
        }

    	

    }
}
