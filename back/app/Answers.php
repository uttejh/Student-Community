<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Answers extends Model
{
    protected $table="answers";
    protected $primaryKey = 'aid';

    public function answercomments()
    {
    	return $this->hasMany('App\AnswerComment','aid','aid');
    }

    public function answerer(){
    	return $this->belongsTO('App\Users','answered_by','id');
    }

    public static function boot()
    {
        parent::boot();    
    
        // cause a delete of a product to cascade to children so they are also deleted
        static::deleted(function($product)
        {
            $product->answercomments()->delete();
            
        });
    }   
}
