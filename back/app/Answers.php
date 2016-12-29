<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answers extends Model
{
    protected $table="answers";

    public function answercomments()
    {
    	return $this->hasMany('App\AnswerComment','aid','aid');
    }

    public function answerer(){
    	return $this->belongsTO('App\Users','answered_by','id');
    }
}
