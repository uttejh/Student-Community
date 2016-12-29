<?php

namespace App\Http\Controllers;

use App\Question;
use App\Question_tags;
use Request;
use Response;
use App\Tags;
use App\Comments;
use App\Answers;
use App\AnswerComment;
use App\users;
use Illuminate\Database\Eloquent\Model;



class QuestionCtrl extends Controller
{
    public function getques(){
    

	    // $variable = Question::all();
	    $num=Request::input('value');
       
	    $skip = ($num -1)*10;

	    // $var = Question::with(array('asker' => function($query)
     //    {
     //        $query->select('id','username');

     //    }))->orderBy('q_id','DESC')->take(10)->skip($skip)->get();//->select('q_id','title')
     //->with(['asker'=>function($query){
        //     $query->select('id','username');
        // }])
        $var = Question::select('q_id','title','askedby')->with('asker')->with(['qtags.tags'=>function($query){
            $query->select('tagid','tag');
        }])->orderBy('q_id','DESC')->take(10)->skip($skip)->get();//->select('q_id','title')
	    $total = Question::count();
        $answercount = Question::with('answers')->get();
        $i=0;
        $ret[]=0;
        foreach($var as $qu) // or foreach(Location::with("users")->get() as $location)
        {
          $ret[$i++]= $qu->answers()->count();
        }

        return array('questions'=>$var,'total'=>$total,'count'=>$ret);
	     

    }

    public function gettagques(){
    

        // $variable = Question::all();
        $num=Request::input('value');
        $tag = Request::input('tag');
        $skip = ($num -1)*10;
        // $var[]=0;
        $tagid = Tags::select('tagid')->where('tag','=',$tag)->first();

        $var = Question_tags::with('relques')->where('tag_id','=',$tagid['tagid'])->with('tags')->orderBy('q_id','DESC')->take(10)->skip($skip)->get();
        $total = Question_tags::where('tag_id','=','1')->count();

        
        $i=0;
        $ret[]=0;
        $count[] = 0;
        $asker[]=0;
        $askerid[]=0;
        $tags[]=0;
       
        $size = sizeof($var);
        for($i=0;$i<$size;$i++){
            $ret[$i] = $var[$i]['q_id'];
            $count[$i] = Answers::where('qid','=',$ret[$i])->count();
            $askerid[$i] = Question::where('q_id','=',$ret[$i])->get();
            $asker[$i] = Users::where('id','=',$askerid[$i][0]['askedby'])->pluck('username');
            $tagsids[$i] = Question_tags::where('q_id','=',$ret[$i])->pluck('tag_id');
            $tags[$i] = Tags::where('tagid','=',$tagsids[$i])->pluck('tag');
            $ttt[$i] = Question_tags::with('tags')->where('q_id','=',$ret[$i])->take(10)->skip($skip)->get();
        }

       
        return array('questions'=>$var,'total'=>$total,'count'=>$count,'asker'=>$asker,'t'=>$ttt);
         

    }

    public function getquesdet(){
    	$id = Request::input('id');

    	$question = Question::with('qtags.tags')->with(['asker'=>function($query){
            $query->select('id','username');
        }])->with(['comments'=>function($query){
            $query->select('qid','comment','comment_by')->with(['commenter'=>function($query){
                $query->select('id','username');
            }]);
        }])->with(['answers.answercomments.anscommenter'=>function($query){
            $query->select('id','username');
        }])->with(['answers.answerer'=>function($query){
            $query->select('id','username');
        }])->where('q_id','=',$id)
        ->first();
        // $com = Comments::with('commenter')->where('q_id','=',$id)->get();
        // ->with(['answers'=>function($query){
        //         $query->select('answer','aid','qid');
        //     }])
        // $question = Question::where('q_id','=',$id)->with(
        //     ['answers'=>function($query){
        //         $query->select('answer','aid','qid');
        //     },
        //     'qtags.tags'=>function($query){
        //         $query->select('tag','tagid');
        //     },
            
        //     'comments'=>function($query){
        //         $query->select('comment','qid');
        //     }
        //     ]
        // )
        // ->get();
      

        
        $i=0;
        $tagnames[]=0;
        foreach ($question['qtags'] as $value) {
            $tagnames[$i] = $value['tags']['tag'];

            $i++;
        }
        $j=0;
        // $comments[]=0;
        // foreach ($question['comments'] as $value) {
        //     $comments[$j] = $value['comment'];

        //     $j++;
        // }
        $l=0;
        $anscomments[]=0;
        foreach ($question['answers'] as $value) {
            $anscomments[$l] = $value['answercomments'];

            $l++;
        }
        // $k=0;
        // $answers[]=0;
        // foreach ($question['answers'] as $value) {
        //     $answers[$k] = $value;

        //     $k++;
        // }
    	// return $question->toArray();
        // return $answers;
        $c = $question['created_at'];
        $date = date("d M y", time($c));
        $time = date("g:i a.", time($c));
    	return array('question'=>$question['title'],'body'=>$question['body'],'tags'=>$tagnames,'answer'=>$question['answers'],'answercomments'=>$anscomments,'comments'=>$question['comments'],'asked'=>$question['asker'],'created'=>'On '.$date.' at '.$time,'q'=>$question);
       
    }

    public function postcomment()
    {
        $id = Request::input('id');
        $comment = Request::input('comment');
        $token = Request::header('JWT-AuthToken') ;
        
        $count = Users::where('token','=',$token)->count();
        $userid = Users::select('id')->where('token','=',$token)->first();

        if($count == 1)
        {
            $comm = new Comments;
            $comm->qid = $id;
            $comm->comment = $comment;
            $comm->comment_by = $userid['id'];
            $comm->save();

            return $token;
        }
        else if($count == 0){
            return 'Please Login to Comment.';
        }
    }

    public function postanscomment()
    {
        $id = Request::input('id');
        $comment = Request::input('comment');
        $ansid = Request::input('ansid');
        $token = Request::header('JWT-AuthToken') ;

        $count = Users::where('token','=',$token)->count();
        $userid = Users::select('id')->where('token','=',$token)->first();
        
        if($count == 1){
            $comm = new AnswerComment;
            $comm->qid = $id;
            $comm->aid = $ansid;
            $comm->comment = $comment;
            $comm->commentby = $userid['id'];
            $comm->save();

            return 'success';
        }else{
            return 'Please Login to Comment.';
        }
    }    

    public function postanswer(){
        $id = Request::input('id');
        $answer = Request::input('answer');
        $token = Request::header('JWT-AuthToken');
        $userid = Users::select('id')->where('token','=',$token)->first();

        $ans = new Answers;
        $ans->qid = $id;
        $ans->answer = $answer;
        $ans->answered_by = $userid['id'];
        $ans->save();

        return 'saved';
    }
};
