<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question_tags extends Model
{
    protected $table="question_tags";

    public function tags()
    {
    	return $this->belongsTo('App\Tags','tag_id','tagid');
    }

    public function relques()
    {
    	return $this->belongsTo('App\Question','q_id','q_id');
    }
}
