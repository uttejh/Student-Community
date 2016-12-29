<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnswerComment extends Model
{
    protected $table="answer_comments";

    public function anscommenter(){
    	return $this->belongsTo('App\Users','commentby','id','qid');
    }
}
