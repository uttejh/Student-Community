<?php

namespace App\Http\Controllers;

use Request;
use Response;
use App\Tags;
use App\Users;
// use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

class TagsCtrl extends Controller
{
    public function gettags(){

    	$num = Request::input('value');
    	$skip = ($num - 1)*24;
    	$tags = Tags::take(24)->orderBy('tag','ASC')->skip($skip)->get();

    	$count = Tags::count();

    	return array('tags'=>$tags,'total'=>$count);
    }

    public function deletetag(){
    	$data = Request::all();

        $token = Request::header('JWT-AuthToken');

        $admintoken = Users::select('role')->where('token','=',$token)->first();

        if($admintoken['role'] == 1){
            
            Tags::where('tagid','=',$data['id'])->delete();
            return 'Tag Deleted';
        }else{
            return 'bad request';
        }
    }
}
