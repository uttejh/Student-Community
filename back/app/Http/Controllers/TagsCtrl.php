<?php

namespace App\Http\Controllers;

use Request;
use Response;
use App\Tags;
// use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;

class TagsCtrl extends Controller
{
    public function gettags(){

    	$num = Request::input('value');
    	$skip = ($num - 1)*24;
    	$tags = Tags::take(24)->skip($skip)->get();

    	$count = Tags::count();

    	return array('tags'=>$tags,'total'=>$count);
    }
}
