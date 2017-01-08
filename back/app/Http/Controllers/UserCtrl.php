<?php

namespace App\Http\Controllers;

use Request;
use Response;
use Carbon\Carbon;
use App\Paper;
use App\Tags;
use App\Users;
use App\Question;
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
        $var1 = $details['thetag'];
        $var2 = $details['tagdesc'];
        if(!empty($var1) && !empty($var2))
        {
            if(strlen($var1) > 30){
                return 'The Tag field cannot be greater than 30 characters';
            }
            elseif (strlen($var2) < 30 || strlen($var2) > 250) {
                return 'The Description field must be between 30 and 250 characters';
            }
            else{
                $tag = new Tags;
                $tag->tag = $var1;
                $tag->description = $var2;
                $tag->flag = 0;
                $tag->save();

                return 'Tag was inserted Successfully';
            }
        }
        else{
            return 'The fields cannot be empty';
        }
    	
    }

    public function getpapers(){
    	$details= Request::input('sel');
    	$type = Request::input('type');

    	// $names = explode(",", $details);
    	
    	$returnvalue = Paper::select('pid','name','year','branch','filepath')->whereIn('name',$details)->get();


    	return $returnvalue ;
    }

    public function deletepaper(){
        $data = Request::all();

        $token = Request::header('JWT-AuthToken');

        $admintoken = Users::select('role')->where('token','=',$token)->first();
        $destination_path="uploads";

        if($admintoken['role'] == 1){
            $path = Paper::where('pid','=',$data['id'])->select('filepath')->first();
            unlink($path['filepath']);
            Paper::where('pid','=',$data['id'])->delete();
            
            return 'Paper Deleted';
        }else{
            return 'bad request';
        }
    }

    public function changepassword()
    {
    	$data = Request::all();

    	$token = Request::header('AuthToken');

    	$count = Users::where('token','=',$token)->count();

    	if($count == 1){
    		$old = users::select('password')->where('token','=',$token)->first();
    		if($old['password'] == md5($data['current'])){
    			$var1 = $data['new'];
    			$var2 = $data['confirm'];
    			$length = strlen($var1);
    			if(!empty($var1) == !empty($var2))
    			{
    				if($length > 5){
    					Users::where('token','=',$token)->update(['password'=>md5($var1)]) ;
    					return 'Password updated successfully.';
    				}
    				else
    				{
    					return 'The password must be atleast 6 character long.';
    				}
    				
    			}
    			else{
    				return 'The passwords do not match ';
    			}
    			
    		}
    		else{
    			return 'Your Present Password did not match with the password you typed.';
    		}
    	}else{
    		return 'Unauthenticated User';
    	}
    }

    public function userqs(){
    	// $data = Request::all();

    	$token = Request::header('AuthToken');

    	$count = Users::where('token','=',$token)->count();

    	if($count == 1)
    	{
    		$user = Users::select('id')->where('token','=',$token)->first();
    		$userqs = Question::where('askedby','=',$user['id'])->get();
    		$i=0;
        	$ret[]=0;
    		foreach($userqs as $qu) // or foreach(Location::with("users")->get() as $location)
	        {
	          $ret[$i++]= $qu->answers()->count();
	        }
    		return array('questions'=>$userqs,'answercount'=>$ret);
    	}
    	else{
    		return 'Unauthenticated user';
    	}
    }
}
