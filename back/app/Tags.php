<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tags extends Model
{
    protected $table="tags";
    protected $primaryKey = 'tagid';

 //    public function ques()
	// {
	//     return $this-> belongsToMany('App\Question', 'Question_tags', 'tag_id', 'q_id');
	// }
}

