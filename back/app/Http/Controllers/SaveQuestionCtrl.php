<?php namespace App\Http\Controllers;
use Request;
use Response;
use App\Users;
use App\Question;
use App\Question_tags;
use App\Tags;
// use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Model;


class SaveQuestionCtrl extends Controller
{
    public function saveques(){
    	$questiondata = Request::all();
        $token = Request::header('AuthToken');
        $userid = Users::select('id')->where('token','=',$token)->first();

        $var1 = $questiondata['title'];
        $var2 = $questiondata['tinymceModel'];
        $var3 = $questiondata['tags'];
      
        $flag=0;
        $tagslen = sizeof($var3);
        $j=0;
        if($tagslen<=5)
        {
            for($i=0;$i<$tagslen;$i++)
            {
                $tags_test[$i] = Tags::where('tag','=',$var3[$i])->first();
                $tags_id[$i] = $tags_test[$i]['tagid'];
                if($tags_test[$i]==null)
                {
                    $flags[$j] = $var3[$i];
                    $j++;
                    $flag = 1;
                }
            }

            $ids = array_unique($tags_id);

            if($flag!=1)
            {
                $question = new Question;
                $question->title = $var1;
                $question->body = $var2;
                $question->askedby = $userid['id'];
               
                $question->save();

                $qid = Question::where('title','=',$var1)->get();

                for($i=0;$i<sizeof($ids);$i++)
                {
                    $tag = new Question_tags;
                    // $tags = Tags::where('tag','=',$var3[$i])->first();
                    // $tags_id = $tags_test[$i]['tagid'];
                    $tag->tag_id = $ids[$i];
                    $tag->q_id = $qid[0]['q_id'];
                    $tag->save();
                }
                return 'success' ;
            }
            else
            {
                
                $retval = implode(",",$flags);
                return $retval.' is/are not registered as tags. Please add '.$retval.' as tags in tags section or remove them from your question.';
            }
        }
        else{
            return 'only 5 tags allowed';
        }
  
    	
    }
};