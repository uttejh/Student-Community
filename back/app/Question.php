<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $table="questions";
    protected $primaryKey = 'q_id';

    public function comments()
    {
    	return $this->hasMany('App\Comments','qid','q_id');
    }

 //    public function tags()
	// {
	//     return $this-> belongsToMany('App\Tags', 'Question_tags', 'q_id', 'tag_id');
	// }

	public function qtags()
	{
		return $this->hasMany('App\Question_tags','q_id','q_id');
	}

	public function answers()
	{
		return $this->hasMany('App\Answers','qid','q_id');
	}

	public function asker()
	{
		return $this->hasOne('App\Users','id','askedby','q_id');
	}

	
}
