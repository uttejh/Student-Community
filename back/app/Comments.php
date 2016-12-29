<?php

namespace App;

use App\Comments;
use Illuminate\Database\Eloquent\Model;

class Comments extends Model
{
    protected $table="comments";

    // public function commenter(){
    // 	return $this->belongsTo('App\Users','comment_by','id');
    // }

    public function commenter(){
    	return $this->belongsTo('App\Users','comment_by','id','q_id');
    }

}
