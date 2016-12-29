<?php

namespace App\Http\Controllers;

use Request;
use Response;
use Carbon\Carbon;
use App\Paper;
use App\Tags;
// use App\Users;
use Illuminate\Database\Eloquent\Model;

class UserCtrl extends Controller
{
    public function uploadpost(){
		$date=Carbon::now();
 		$rand =mt_rand(0, $date->timestamp);
 		$destination_path="uploads";

    	$file=Request::file('file');
		$filesize = $file->getSize();
		$fileext = $file->getClientOriginalExtension();

		$details = Request::all();
		$name = $details['name'];
		$year = $details['year'];
		$branch = $details['branch'];
		$type = $details['rad'];
		// $qp = $details['qp'];
		// $mat = $details['mat'];


		$filename=$date->timestamp.$rand.'.'.$fileext;
		if($filesize>50971529)
		{
			$out=array(0,"File size too big");
		}
		else
		{
			$up=$file->move($destination_path,$filename);
			if($up)
			{
				$paper = new Paper;
				$filep = 'uploads/'.$filename;
				$paper->filepath = 'uploads/'.$filename;
				$paper->name = $name;
				$paper->year = $year;
				$paper->branch = $branch;
				$paper->type = $type;
				$paper->flag = 0;
				$paper->save();
				// $post = new Post;
				// $filep = 'uploads/'.$filename;
				// $post->filepath = 'uploads/'.$filename;
				// if($type == "other")
				// {
				// 	$post->type = $othertype;
				// }
				// else
				// {
				// 	$post->type = $type;
				// }
				// $post->model = $model;
				// $post->year = $year;
				// $post->amountexpected = $exp;
				// $post->tenure = $tenure;
				// $post->description = $desc;
				// $post->userid=$user[0];
				// $post->save();

				// $currentid = $post->id;
				
				// $Dummydetails = new Details;

				// $Dummydetails->from = $date;
				// $Dummydetails->to = $date;
				// $Dummydetails->status = "Pending";
				// $Dummydetails->amount = 0;
				// $Dummydetails->commodityid = $currentid;

				// $Dummydetails->save();
				// var_dump($something);


				$out=array(1,'uploads/'.$filename);
			}
			else
			{
				$out=array(0,"Error uploading file");
			}
		}
		return $details;


    }

    public function getlist(){
    	$det = Request::input('data');
    	$list = Paper::select('name')->distinct('name')->where('type','=',$det)->get();
    	// $u = $list->toArray();
    	// $u1 = array_unique($list);
    	return $list;
    }

    public function addtag(){
    	$details = Request::all();

    	$tag = new Tags;
    	$tag->tag = $details['thetag'];
    	$tag->description = $details['tagdesc'];
    	$tag->flag = 0;
    	$tag->save();

    	return 'success';
    }

    public function getpapers(){
    	$details= Request::input('sel');
    	$type = Request::input('type');

    	// $names = explode(",", $details);
    	
    	$returnvalue = Paper::select('name','year','branch','filepath')->whereIn('name',$details)->get();


    	return $returnvalue ;
    }
}
